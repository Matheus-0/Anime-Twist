import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator, Animated, Text, TouchableOpacity, View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';

import styles from './styles';

import {
  addToFavorites,
  markEpisodeAsCurrent,
  removeFromFavorites,
} from '../../store/actions';

import CustomModal from '../../components/CustomModal';
import EpisodeItem from '../../components/EpisodeItem';

import { getAnimeSources } from '../../services/api';

import { millisToTime } from '../../utils/anime';

const AnimeScreen = ({
  addToFavorites,
  completeEpisodes,
  currentEpisodes,
  favorites,
  markEpisodeAsCurrent,
  navigation,
  removeFromFavorites,
  route,
  settings,
}) => {
  const CHUNK_SIZE = 100;

  const floatingMenuOpen = useRef(false);
  const lastEpisodes = useRef({});

  const { anime } = route.params;

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

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);

    if (!isFavorite) addToFavorites(anime);
    else removeFromFavorites(anime);
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
        onPress={() => {
          navigation.navigate('Video', {
            anime,
            animeSources,
            firstEpisode: item,
            firstEpisodeIsComplete: isComplete,
            firstEpisodeTime: 0,
          });

          markEpisodeAsCurrent(item);
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
            const episodeToPlay = animeSources.find(
              (e) => e.number === lastEpisodes.current[anime.id].episode,
            );

            navigation.navigate('Video', {
              anime,
              animeSources,
              firstEpisode: episodeToPlay,
              firstEpisodeIsComplete: isEpisodeComplete(episodeToPlay),
              firstEpisodeTime: lastEpisodes.current[anime.id].millis,
            });

            setResumeModalVisible(false);

            markEpisodeAsCurrent(episodeToPlay);
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
        <Text numberOfLines={3} style={styles.title}>{anime.title}</Text>
      </Animated.View>

      <Animated.Text
        style={[styles.tipText, {
          opacity: fadeAnimation,
          transform: [{
            scale: fadeAnimation,
          }],
        }]}
      >
        Press and hold to mark/unmark as watched.
      </Animated.Text>

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
  markEpisodeAsCurrent: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  route: PropTypes.shape().isRequired,
  settings: PropTypes.shape({
    askResume: PropTypes.bool.isRequired,
    highlight: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapDispatchToProps = {
  addToFavorites,
  markEpisodeAsCurrent,
  removeFromFavorites,
};

const mapStateToProps = (state) => ({
  completeEpisodes: state.animeReducer.animeObjectForEpisodes,
  currentEpisodes: state.animeReducer.animeObjectForCurrentEpisode,
  favorites: state.animeReducer.favorites,
  settings: state.animeReducer.settings,
});

export default connect(mapStateToProps, mapDispatchToProps)(AnimeScreen);
