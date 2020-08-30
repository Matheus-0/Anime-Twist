/* eslint-disable no-shadow */
import { AntDesign } from '@expo/vector-icons';
import CheckBox from '@react-native-community/checkbox';
import { useFocusEffect } from '@react-navigation/native';
import { Video } from 'expo-av';
import { getOrientationLockAsync, lockAsync, OrientationLock } from 'expo-screen-orientation';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Animated, LayoutAnimation, Text, View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import styles from './styles';

import {
  addToFavorites, markEpisodeAsComplete, removeFromFavorites, undoMarkEpisodeAsComplete,
} from '../../store/actions';

import EpisodeItem from '../../components/EpisodeItem';

import { decryptSource, getAnimeSources } from '../../services/api';

import { baseURL, userAgent } from '../../constants';

const AnimeScreen = ({
  addToFavorites,
  completeEpisodes,
  favorites,
  markEpisodeAsComplete,
  navigation,
  removeFromFavorites,
  route,
  undoMarkEpisodeAsComplete,
}) => {
  const { anime } = route.params;

  const [animeSources, setAnimeSources] = useState(null);
  const [autoCheckBox, setAutoCheckBox] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [episodePlaying, setEpisodePlaying] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [networkAvailable, setNetworkAvailable] = useState(true);
  const [showSourceError, setShowSourceError] = useState(false);
  const [videoCompletePosition, setVideoCompletePosition] = useState(null);
  const [videoSource, setVideoSource] = useState('');

  const [fadeAnimation] = useState(new Animated.Value(0));
  const [flatListFadeAnimation] = useState(new Animated.Value(0));

  const isAnimeFavorite = (anime) => favorites.includes(anime);

  const playFadeAnimation = (animation) => Animated.spring(animation, {
    tension: 10,
    toValue: 1,
    useNativeDriver: true,
  }).start();

  const fetchData = async () => {
    const response = await getAnimeSources(anime);

    if (response) setAnimeSources(response);
    else setNetworkAvailable(false);

    playFadeAnimation(flatListFadeAnimation);
  };

  useFocusEffect(() => setIsFavorite(isAnimeFavorite(anime)));

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', async () => {
      const orientation = await getOrientationLockAsync();

      const { PORTRAIT, LANDSCAPE, LANDSCAPE_RIGHT } = OrientationLock;

      if (orientation === LANDSCAPE || orientation === LANDSCAPE_RIGHT) {
        await lockAsync(PORTRAIT);
      }
    });

    return unsubscribe;
  }, [navigation]);

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

  const handleOnLoad = (status) => setVideoCompletePosition(status.durationMillis * 0.9);

  const handleOnPlaybackStatusUpdate = (status) => {
    if (status.error) {
      setVideoSource('');
      setShowSourceError(true);
    }

    if (videoCompletePosition
      && autoCheckBox
      && status.positionMillis > videoCompletePosition
      && !isEpisodeComplete(episodePlaying)
    ) {
      markEpisodeAsComplete(episodePlaying);

      setAutoCheckBox(false);
      setToggleCheckBox(true);
    }

    if (status.didJustFinish) {
      if (episodePlaying.number < animeSources.length) {
        const nextEpisode = animeSources.find((item) => item.number === episodePlaying.number + 1);

        setAutoCheckBox(true);
        setVideoCompletePosition(null);
        setEpisodePlaying(nextEpisode);
        setToggleCheckBox(isEpisodeComplete(nextEpisode));
        setVideoSource(decryptSource(nextEpisode.source));
      }
    }
  };

  const handleRenderItem = (item) => {
    const isComplete = isEpisodeComplete(item);

    return (
      <EpisodeItem
        animeEpisode={item}
        isComplete={isComplete}
        isPlaying={item.number === episodePlaying.number}
        key={String(item.number)}
        onPress={() => {
          if (episodePlaying.number !== item.number) {
            setAutoCheckBox(true);
            setVideoCompletePosition(null);
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
        <Text numberOfLines={3} style={styles.title}>{anime.title}</Text>
      </Animated.View>

      {showSourceError && <Text style={styles.sourceErrorText}>Could not load video.</Text>}

      {videoSource.length !== 0 && (
        <View style={styles.videoContainer}>
          <Video
            onFullscreenUpdate={handleOnFullscreenUpdate}
            onLoad={handleOnLoad}
            onPlaybackStatusUpdate={handleOnPlaybackStatusUpdate}
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

          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxText}>Mark episode as complete!</Text>

            <CheckBox
              value={toggleCheckBox}
              onValueChange={handleCheckBoxOnValueChange}
              style={styles.checkbox}
              tintColors={{
                true: '#e63232',
                false: 'gray',
              }}
            />
          </View>
        </View>
      )}

      {animeSources ? (
        <>
          {animeSources.length !== 0 ? (
            <View style={styles.episodesContainer}>
              <Animated.ScrollView
                contentContainerStyle={styles.listContent}
                overScrollMode="never"
                style={{
                  opacity: flatListFadeAnimation,
                  transform: [{
                    translateY: flatListFadeAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [200, 0],
                    }),
                  }],
                }}
              >
                {animeSources.map((item) => handleRenderItem(item))}
              </Animated.ScrollView>
            </View>
          ) : (
            <View style={styles.episodesNotFoundContainer}>
              <Text style={styles.episodesNotFoundText}>No episodes found.</Text>
            </View>
          )}
        </>
      ) : (
        <>
          {networkAvailable ? (
            <ActivityIndicator color="#e63232" size="large" style={styles.loading} />
          ) : (
            <View style={styles.noConnectionContainer}>
              <Text style={styles.noConnectionText}>Connection error.</Text>

              <RectButton
                onPress={() => setNetworkAvailable(true)}
                style={styles.noConnectionButton}
              >
                <Text style={styles.noConnectionButtonText}>Retry</Text>
              </RectButton>
            </View>
          )}
        </>
      )}

      <Animated.View
        style={[styles.favoriteButtonView, {
          opacity: fadeAnimation,
          transform: [{
            translateX: fadeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            }),
          }],
        }]}
      >
        <RectButton
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
        >
          <AntDesign
            name={isFavorite ? 'heart' : 'hearto'}
            color="rgba(255, 255, 255, 0.75)"
            size={24}
          />
        </RectButton>
      </Animated.View>
    </View>
  );
};

AnimeScreen.propTypes = {
  addToFavorites: PropTypes.func.isRequired,
  completeEpisodes: PropTypes.shape().isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  markEpisodeAsComplete: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
  }).isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  route: PropTypes.shape().isRequired,
  undoMarkEpisodeAsComplete: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  addToFavorites,
  markEpisodeAsComplete,
  removeFromFavorites,
  undoMarkEpisodeAsComplete,
};

const mapStateToProps = (state) => ({
  completeEpisodes: state.animeReducer.animeObjectForEpisodes,
  favorites: state.animeReducer.favorites,
});

export default connect(mapStateToProps, mapDispatchToProps)(AnimeScreen);
