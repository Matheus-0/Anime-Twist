import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import { Video } from 'expo-av';
import { getOrientationLockAsync, lockAsync, OrientationLock } from 'expo-screen-orientation';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator, Animated, LayoutAnimation, Text, TouchableOpacity, View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import styles from './styles';

import {
  addToFavorites,
  markEpisodeAsComplete,
  markEpisodeAsCurrent,
  removeFromFavorites,
  undoMarkEpisodeAsComplete,
  unmarkEpisodeAsCurrent,
} from '../../store/actions';

import CustomModal from '../../components/CustomModal';
import EpisodeItem from '../../components/EpisodeItem';

import { decryptSource, getAnimeSources } from '../../services/api';

import { millisToTime } from '../../utils/anime';

import { baseURL, userAgent } from '../../constants';

const AnimeScreen = ({
  addToFavorites,
  completeEpisodes,
  currentEpisodes,
  favorites,
  markEpisodeAsComplete,
  markEpisodeAsCurrent,
  removeFromFavorites,
  route,
  settings,
  undoMarkEpisodeAsComplete,
  unmarkEpisodeAsCurrent,
}) => {
  const CHUNK_SIZE = 100;
  const MIN_VIDEO_RESUME_POSITION = 90000; // 1 minute and a half

  const videoRef = useRef(null);

  const acceptedResume = useRef(false);
  const floatingMenuOpen = useRef(false);
  const lastEpisodes = useRef({});
  const videoCompletePosition = useRef(null);

  const { anime } = route.params;

  const [animeSources, setAnimeSources] = useState(null);
  const [sourcesChunks, setSourcesChunks] = useState(null);
  const [autoCheckBox, setAutoCheckBox] = useState(true);
  const [chunkIndex, setChunkIndex] = useState(0);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [episodePlaying, setEpisodePlaying] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [networkAvailable, setNetworkAvailable] = useState(true);
  const [rangeModalVisible, setRangeModalVisible] = useState(false);
  const [resumeModalVisible, setResumeModalVisible] = useState(false);
  const [showSourceError, setShowSourceError] = useState(false);
  const [titleNumberOfLines, setTitleNumberOfLines] = useState(0);
  const [videoSource, setVideoSource] = useState('');

  const [checkAnimation] = useState(new Animated.Value(0));
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [rotateButtonAnimation] = useState(new Animated.Value(0));
  const [scrollViewFadeAnimation] = useState(new Animated.Value(0));

  const isAnimeFavorite = (anime) => favorites.includes(anime);

  const playFadeAnimation = (animation, delay = 0) => Animated.spring(animation, {
    delay,
    tension: 10,
    toValue: 1,
    useNativeDriver: true,
  }).start();

  const playRotateAnimation = (animation, toValue) => Animated.spring(animation, {
    toValue,
    useNativeDriver: true,
  }).start();

  const deleteLastEpisodeTime = async () => {
    try {
      delete lastEpisodes.current[anime.id];

      await AsyncStorage.setItem('lastEpisodes', JSON.stringify(lastEpisodes.current));
    } catch (error) {
      // console.log(error);
    }
  };

  const getLastEpisodes = async () => {
    try {
      const result = await AsyncStorage.getItem('lastEpisodes');

      return result !== null ? JSON.parse(result) : {};
    } catch (error) {
      return {};
    }
  };

  const saveEpisodeTime = async (episode, millis) => {
    try {
      lastEpisodes.current[anime.id] = {
        episode: episode.number,
        millis,
      };

      await AsyncStorage.setItem('lastEpisodes', JSON.stringify(lastEpisodes.current));
    } catch (error) {
      // console.log(error);
    }
  };

  const fetchData = async () => {
    const response = await getAnimeSources(anime);
    const lastEpisodesResponse = await getLastEpisodes();

    const currentEpisodeNumber = currentEpisodes[anime.id];

    const chunks = [];

    if (response) {
      setAnimeSources(response);

      let index = 0;

      for (let i = 0; i < response.length; i += CHUNK_SIZE) {
        chunks.push(i);

        if (currentEpisodeNumber >= i + 1) index = i;
      }

      chunks.push(response.length);

      setSourcesChunks(chunks);
      setChunkIndex(index);

      lastEpisodes.current = lastEpisodesResponse;

      if (settings.askResume && anime.id in lastEpisodes.current) setResumeModalVisible(true);
    } else setNetworkAvailable(false);

    playFadeAnimation(scrollViewFadeAnimation);
  };

  useEffect(() => {
    playFadeAnimation(fadeAnimation);

    fetchData();

    setIsFavorite(isAnimeFavorite(anime));
  }, [networkAvailable]);

  const isEpisodeComplete = (episode) => {
    const arrayOfEpisodes = completeEpisodes[episode.anime_id];

    if (arrayOfEpisodes) return arrayOfEpisodes.includes(episode.number);

    return false;
  };

  const isEpisodeCurrent = (episode) => {
    const currentEpisodeNumber = currentEpisodes[episode.anime_id];

    if (currentEpisodeNumber) return episode.number === currentEpisodeNumber;

    return false;
  };

  const handleCheckBoxOnValueChange = (newValue) => {
    if (newValue) markEpisodeAsComplete(episodePlaying);
    else undoMarkEpisodeAsComplete(episodePlaying);

    setToggleCheckBox(newValue);
  };

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);

    if (!isFavorite) addToFavorites(anime);
    else removeFromFavorites(anime);
  };

  const handleOnFullscreenUpdate = async ({ fullscreenUpdate }) => {
    const orientation = await getOrientationLockAsync();

    const {
      LANDSCAPE, LANDSCAPE_RIGHT, PORTRAIT, PORTRAIT_UP,
    } = OrientationLock;

    switch (fullscreenUpdate) {
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT: {
        if (orientation === PORTRAIT || orientation === PORTRAIT_UP) {
          await lockAsync(LANDSCAPE_RIGHT);
        }

        break;
      }
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_DISMISS: {
        if (orientation === LANDSCAPE || orientation === LANDSCAPE_RIGHT) {
          await lockAsync(PORTRAIT);
        }

        break;
      }
      default:
        // console.error('Error.');
    }
  };

  const handleOnLoad = (status) => {
    videoCompletePosition.current = status.durationMillis * 0.9;
  };

  const handleOnLoadStart = async () => {
    if (acceptedResume.current) {
      await videoRef.current.setPositionAsync(lastEpisodes.current[anime.id].millis);
    }

    await videoRef.current.setProgressUpdateIntervalAsync(5000);
  };

  const handleOnPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      if (status.positionMillis > MIN_VIDEO_RESUME_POSITION
        && status.positionMillis < videoCompletePosition.current
      ) {
        saveEpisodeTime(episodePlaying, status.positionMillis);
      }
    }

    if (status.error) {
      setVideoSource('');
      setShowSourceError(true);
    }

    if (settings.autoMark
      && autoCheckBox
      && !isEpisodeComplete(episodePlaying)
      && videoCompletePosition.current
      && status.positionMillis > videoCompletePosition.current
    ) {
      deleteLastEpisodeTime();

      markEpisodeAsComplete(episodePlaying);

      setAutoCheckBox(false);
      setToggleCheckBox(true);
    }

    if (status.didJustFinish) {
      if (settings.autoplay && episodePlaying.number < animeSources.length) {
        const nextEpisode = animeSources.find((item) => item.number === episodePlaying.number + 1);

        unmarkEpisodeAsCurrent(episodePlaying);
        markEpisodeAsCurrent(nextEpisode);

        videoCompletePosition.current = null;

        setAutoCheckBox(true);
        setEpisodePlaying(nextEpisode);
        setToggleCheckBox(isEpisodeComplete(nextEpisode));
        setVideoSource(decryptSource(nextEpisode.source));
      }
    }
  };

  const handleRenderItem = (item) => {
    const isComplete = isEpisodeComplete(item);
    const isCurrent = isEpisodeCurrent(item);
    const isPlaying = item.number === episodePlaying.number;

    return (
      <EpisodeItem
        animeEpisode={item}
        isComplete={isComplete}
        isCurrent={settings.highlight && isCurrent}
        isPlaying={isPlaying}
        key={String(item.number)}
        onPress={() => {
          if (!videoSource) playFadeAnimation(checkAnimation, 700);

          if (!isPlaying) {
            acceptedResume.current = false;

            deleteLastEpisodeTime();
          }

          if (!isPlaying || showSourceError) {
            markEpisodeAsCurrent(item);

            videoCompletePosition.current = null;

            setAutoCheckBox(true);
            setShowSourceError(false);
            setEpisodePlaying(item);
            setToggleCheckBox(isComplete);
            setVideoSource(decryptSource(item.source));

            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          }
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {anime.id in lastEpisodes.current && (
        <CustomModal
          isVisible={resumeModalVisible}
          onNegativeResponse={() => setResumeModalVisible(false)}
          onPositiveResponse={() => {
            acceptedResume.current = true;

            const episodeToPlay = animeSources.find(
              (e) => e.number === lastEpisodes.current[anime.id].episode,
            );

            playFadeAnimation(checkAnimation, 700);

            setResumeModalVisible(false);
            setEpisodePlaying(episodeToPlay);
            setVideoSource(decryptSource(episodeToPlay.source));

            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          }}
          text={
            `Resume?\n\nEpisode ${lastEpisodes.current[anime.id].episode} (${millisToTime(lastEpisodes.current[anime.id].millis)})`
          }
        />
      )}

      <Animated.View
        style={[styles.titleContainer, {
          opacity: fadeAnimation,
          transform: [{
            translateY: fadeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [-100, 0],
            }),
          }],
        }]}
      >
        <Text
          numberOfLines={videoSource.length !== 0 ? titleNumberOfLines : 3}
          onTextLayout={(e) => setTitleNumberOfLines(e.nativeEvent.lines.length > 1 ? 1 : 2)}
          style={styles.title}
        >
          {anime.title}
        </Text>
      </Animated.View>

      {showSourceError && <Text style={styles.sourceErrorText}>Could not load video.</Text>}

      {videoSource.length !== 0 && (
        <View style={styles.videoContainer}>
          <Video
            onFullscreenUpdate={handleOnFullscreenUpdate}
            onLoad={handleOnLoad}
            onLoadStart={handleOnLoadStart}
            onPlaybackStatusUpdate={handleOnPlaybackStatusUpdate}
            ref={videoRef}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            shouldPlay
            source={{
              headers: {
                referer: baseURL,
                'user-agent': userAgent,
              },
              uri: videoSource,
            }}
            style={styles.video}
            useNativeControls
          />

          <Animated.View
            style={[styles.checkboxContainer, {
              opacity: checkAnimation,
              transform: [{
                translateY: checkAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 0],
                }),
              }],
            }]}
          >
            <Text style={styles.checkboxText}>Mark episode as complete!</Text>

            <CheckBox
              onValueChange={handleCheckBoxOnValueChange}
              value={toggleCheckBox}
              tintColors={{
                true: '#e63232',
                false: 'gray',
              }}
            />
          </Animated.View>
        </View>
      )}

      {sourcesChunks && (
        <Modal
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={rangeModalVisible}
          onBackButtonPress={() => setRangeModalVisible(false)}
          onBackdropPress={() => setRangeModalVisible(false)}
          useNativeDriver
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalPromptText}>Select range:</Text>

            {sourcesChunks.slice(0, sourcesChunks.length - 1).map((value, index) => (
              <TouchableOpacity
                activeOpacity={0.75}
                key={value}
                onPress={() => {
                  setRangeModalVisible(false);
                  setChunkIndex(value);
                }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>{`${value + 1} - ${sourcesChunks[index + 1]}`}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      )}

      {animeSources && sourcesChunks ? (
        <>
          {animeSources.length !== 0 ? (
            <View style={styles.episodesContainer}>
              <Animated.ScrollView
                contentContainerStyle={styles.listContent}
                overScrollMode="never"
                style={{
                  opacity: scrollViewFadeAnimation,
                  transform: [{
                    translateY: scrollViewFadeAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [200, 0],
                    }),
                  }],
                }}
              >
                {animeSources.slice(chunkIndex, chunkIndex + CHUNK_SIZE).map(
                  (item) => handleRenderItem(item),
                )}
              </Animated.ScrollView>
            </View>
          ) : (
            <Animated.View
              style={[styles.episodesNotFoundContainer, {
                opacity: scrollViewFadeAnimation,
                transform: [{
                  translateY: scrollViewFadeAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  }),
                }],
              }]}
            >
              <AntDesign name="questioncircleo" size={80} color="white" />

              <Text style={styles.episodesNotFoundText}>No episodes found.</Text>
            </Animated.View>
          )}
        </>
      ) : (
        <>
          {networkAvailable ? (
            <ActivityIndicator color="#e63232" size="large" style={styles.loading} />
          ) : (
            <Animated.View
              style={[styles.noConnectionContainer, {
                opacity: scrollViewFadeAnimation,
                transform: [{
                  translateY: scrollViewFadeAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  }),
                }],
              }]}
            >
              <Text style={styles.noConnectionText}>Connection error.</Text>

              <RectButton
                onPress={() => setNetworkAvailable(true)}
                style={styles.noConnectionButton}
              >
                <Text style={styles.noConnectionButtonText}>Retry</Text>
              </RectButton>
            </Animated.View>
          )}
        </>
      )}

      <Animated.View
        style={[styles.floatingButtonView, {
          opacity: fadeAnimation,
          transform: [{
            translateX: fadeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            }),
          }, {
            rotate: rotateButtonAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '45deg'],
            }),
          }],
        }]}
      >
        <RectButton
          style={styles.floatingButton}
          onPress={() => {
            playRotateAnimation(rotateButtonAnimation, floatingMenuOpen.current ? 0 : 1);

            floatingMenuOpen.current = !floatingMenuOpen.current;
          }}
        >
          <AntDesign
            name="plus"
            color="rgba(255, 255, 255, 0.75)"
            size={24}
          />
        </RectButton>
      </Animated.View>

      <Animated.View
        style={[styles.floatingMenu, {
          opacity: rotateButtonAnimation,
          transform: [{
            translateY: rotateButtonAnimation.interpolate({
              inputRange: [0, 0.1, 1],
              outputRange: [300, 10, 0],
            }),
          }],
        }]}
      >
        <View style={styles.floatingMenuItem}>
          <Text style={styles.floatingMenuItemText}>Mark as a favorite!</Text>

          <RectButton
            style={styles.floatingMenuItemButton}
            onPress={handleFavoritePress}
          >
            <AntDesign
              name={isFavorite ? 'heart' : 'hearto'}
              color="rgba(255, 255, 255, 0.75)"
              size={20}
            />
          </RectButton>
        </View>

        {sourcesChunks && sourcesChunks.length > 2 && (
          <View style={styles.floatingMenuItem}>
            <Text style={styles.floatingMenuItemText}>Select episodes range!</Text>

            <RectButton
              style={styles.floatingMenuItemButton}
              onPress={() => {
                playRotateAnimation(rotateButtonAnimation, 0);

                floatingMenuOpen.current = false;

                setRangeModalVisible(true);
              }}
            >
              <AntDesign
                name="swap"
                color="rgba(255, 255, 255, 0.75)"
                size={20}
              />
            </RectButton>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

AnimeScreen.propTypes = {
  addToFavorites: PropTypes.func.isRequired,
  completeEpisodes: PropTypes.shape().isRequired,
  currentEpisodes: PropTypes.objectOf(PropTypes.number).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  markEpisodeAsComplete: PropTypes.func.isRequired,
  markEpisodeAsCurrent: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  route: PropTypes.shape().isRequired,
  settings: PropTypes.shape({
    askResume: PropTypes.bool.isRequired,
    autoMark: PropTypes.bool.isRequired,
    autoplay: PropTypes.bool.isRequired,
    highlight: PropTypes.bool.isRequired,
  }).isRequired,
  undoMarkEpisodeAsComplete: PropTypes.func.isRequired,
  unmarkEpisodeAsCurrent: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addToFavorites,
  markEpisodeAsComplete,
  markEpisodeAsCurrent,
  removeFromFavorites,
  undoMarkEpisodeAsComplete,
  unmarkEpisodeAsCurrent,
};

const mapStateToProps = (state) => ({
  completeEpisodes: state.animeReducer.animeObjectForEpisodes,
  currentEpisodes: state.animeReducer.animeObjectForCurrentEpisode,
  favorites: state.animeReducer.favorites,
  settings: state.animeReducer.settings,
});

export default connect(mapStateToProps, mapDispatchToProps)(AnimeScreen);
