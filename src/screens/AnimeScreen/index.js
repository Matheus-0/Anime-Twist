import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator, Animated, Text, TouchableOpacity, Vibration, View,
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
  unmarkEpisodeAsComplete,
  unmarkEpisodeAsCurrent,
} from '../../store/actions';

import CustomModal from '../../components/CustomModal';
import EpisodeItem from '../../components/EpisodeItem';

import { getAnimeSources } from '../../services/api';

import { getAnimeTitle, millisToTime } from '../../utils';

const CHUNK_SIZE = 100;
const RESUME_SUBTRACT_VALUE = 5000; // Subtract 5 seconds when resuming because of small delay

const AnimeScreen = ({
  addToFavorites,
  completeEpisodes,
  currentEpisodes,
  favorites,
  markEpisodeAsComplete,
  markEpisodeAsCurrent,
  navigation,
  removeFromFavorites,
  route,
  settings,
  unmarkEpisodeAsComplete,
  unmarkEpisodeAsCurrent,
}) => {
  const { anime } = route.params;

  const floatingMenuOpen = useRef(false);
  const lastEpisodes = useRef({});

  const [animeSources, setAnimeSources] = useState(null);
  const [sourcesChunks, setSourcesChunks] = useState(null);
  const [chunkIndex, setChunkIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [networkAvailable, setNetworkAvailable] = useState(true);
  const [rangeModalVisible, setRangeModalVisible] = useState(false);
  const [resumeModalVisible, setResumeModalVisible] = useState(false);

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

  const getLastEpisodes = async () => {
    try {
      const result = await AsyncStorage.getItem('lastEpisodes');

      return result !== null ? JSON.parse(result) : {};
    } catch (error) {
      return {};
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

      if (settings.askResume && anime.id in lastEpisodes.current) {
        if (floatingMenuOpen.current) {
          playRotateAnimation(rotateButtonAnimation, 0);

          floatingMenuOpen.current = false;
        }

        setResumeModalVisible(true);
      }
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

  const handleEpisodeLongPress = (animeEpisode, isComplete) => {
    if (isComplete) unmarkEpisodeAsComplete(animeEpisode);
    else markEpisodeAsComplete(animeEpisode);

    Vibration.vibrate(25);
  };

  const handleEpisodePress = (animeEpisode) => {
    navigation.navigate('Video', {
      anime,
      animeSources,
      firstEpisode: animeEpisode,
      firstEpisodeTime: 0,
    });

    markEpisodeAsCurrent(animeEpisode);
  };

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);

    if (!isFavorite) addToFavorites(anime);
    else removeFromFavorites(anime);
  };

  const handleFloatingButtonPress = () => {
    playRotateAnimation(rotateButtonAnimation, floatingMenuOpen.current ? 0 : 1);

    floatingMenuOpen.current = !floatingMenuOpen.current;
  };

  const handleRangeItemPress = () => {
    playRotateAnimation(rotateButtonAnimation, 0);

    floatingMenuOpen.current = false;

    setRangeModalVisible(true);
  };

  const handleRangeModalNegativeResponse = () => setRangeModalVisible(false);

  const handleRangeModalResponse = (value) => {
    setRangeModalVisible(false);
    setChunkIndex(value);
  };

  const handleRemoveCurrentItemPress = () => {
    const currentEpisode = animeSources.find(
      (episode) => episode.number === currentEpisodes[anime.id],
    );

    unmarkEpisodeAsCurrent(currentEpisode);
  };

  const handleRenderItem = (item) => {
    const isComplete = isEpisodeComplete(item);
    const isCurrent = isEpisodeCurrent(item);

    return (
      <EpisodeItem
        animeEpisode={item}
        isComplete={isComplete}
        isCurrent={settings.highlight && isCurrent}
        key={String(item.number)}
        onLongPress={() => handleEpisodeLongPress(item, isComplete)}
        onPress={() => handleEpisodePress(item)}
      />
    );
  };

  const handleResumeModalNegativeResponse = () => setResumeModalVisible(false);

  const handleResumeModalPositiveResponse = () => {
    const episodeToPlay = animeSources.find(
      (e) => e.number === lastEpisodes.current[anime.id].episode,
    );

    navigation.navigate('Video', {
      anime,
      animeSources,
      firstEpisode: episodeToPlay,
      firstEpisodeTime: lastEpisodes.current[anime.id].millis - RESUME_SUBTRACT_VALUE,
    });

    setResumeModalVisible(false);

    markEpisodeAsCurrent(episodeToPlay);
  };

  const handleRetryPress = () => setNetworkAvailable(true);

  return (
    <View style={styles.container}>
      {anime.id in lastEpisodes.current && (
        <CustomModal
          isVisible={resumeModalVisible}
          onNegativeResponse={handleResumeModalNegativeResponse}
          onPositiveResponse={handleResumeModalPositiveResponse}
          text={
            `Resume?\n\nEpisode ${lastEpisodes.current[anime.id].episode} (${millisToTime(lastEpisodes.current[anime.id].millis - RESUME_SUBTRACT_VALUE)})`
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
        <Text numberOfLines={3} style={styles.title}>
          {getAnimeTitle(anime, settings.preferEnglish)}
        </Text>
      </Animated.View>

      {animeSources && animeSources.length !== 0 && (
        <Animated.Text
          style={[styles.tipText, {
            opacity: scrollViewFadeAnimation,
            transform: [{
              scale: scrollViewFadeAnimation,
            }],
          }]}
        >
          Press and hold to mark/unmark as complete.
        </Animated.Text>
      )}

      {sourcesChunks && (
        <Modal
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={rangeModalVisible}
          onBackButtonPress={handleRangeModalNegativeResponse}
          onBackdropPress={handleRangeModalNegativeResponse}
          useNativeDriver
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalPromptText}>Select range:</Text>

            {sourcesChunks.slice(0, sourcesChunks.length - 1).map((value, index) => (
              <TouchableOpacity
                activeOpacity={0.875}
                key={value}
                onPress={() => handleRangeModalResponse(value)}
                style={[styles.modalButton, value === chunkIndex ? styles.modalButtonRed : {}]}
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
              <AntDesign color="white" name="questioncircleo" size={75} />

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
                onPress={handleRetryPress}
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
            scale: fadeAnimation,
          }, {
            rotate: rotateButtonAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: ['0deg', '45deg'],
            }),
          }],
        }]}
      >
        <RectButton
          onPress={handleFloatingButtonPress}
          style={styles.floatingButton}
        >
          <AntDesign
            color="rgba(255, 255, 255, 0.75)"
            name="plus"
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
            onPress={handleFavoritePress}
            style={styles.floatingMenuItemButton}
          >
            <AntDesign
              color="rgba(255, 255, 255, 0.75)"
              name={isFavorite ? 'heart' : 'hearto'}
              size={20}
            />
          </RectButton>
        </View>

        {currentEpisodes[anime.id] !== undefined && (
          <View style={styles.floatingMenuItem}>
            <Text style={styles.floatingMenuItemText}>Remove highlighted episode!</Text>

            <RectButton
              onPress={handleRemoveCurrentItemPress}
              style={styles.floatingMenuItemButton}
            >
              <AntDesign
                color="rgba(255, 255, 255, 0.75)"
                name="minus"
                size={20}
              />
            </RectButton>
          </View>
        )}

        {sourcesChunks && sourcesChunks.length > 2 && (
          <View style={styles.floatingMenuItem}>
            <Text style={styles.floatingMenuItemText}>Select episodes range!</Text>

            <RectButton
              onPress={handleRangeItemPress}
              style={styles.floatingMenuItemButton}
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
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  route: PropTypes.shape().isRequired,
  settings: PropTypes.shape({
    askResume: PropTypes.bool.isRequired,
    highlight: PropTypes.bool.isRequired,
    preferEnglish: PropTypes.bool.isRequired,
  }).isRequired,
  unmarkEpisodeAsComplete: PropTypes.func.isRequired,
  unmarkEpisodeAsCurrent: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addToFavorites,
  markEpisodeAsComplete,
  markEpisodeAsCurrent,
  removeFromFavorites,
  unmarkEpisodeAsComplete,
  unmarkEpisodeAsCurrent,
};

const mapStateToProps = (state) => ({
  completeEpisodes: state.animeReducer.animeObjectForEpisodes,
  currentEpisodes: state.animeReducer.animeObjectForCurrentEpisode,
  favorites: state.animeReducer.favorites,
  settings: state.animeReducer.settings,
});

export default connect(mapStateToProps, mapDispatchToProps)(AnimeScreen);
