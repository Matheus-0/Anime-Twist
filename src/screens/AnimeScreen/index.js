import { Video } from 'expo-av';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Animated, LayoutAnimation, Text, View,
} from 'react-native';

import styles from './styles';

import EpisodeItem from '../../components/EpisodeItem';

import { getAnimeSources, decryptSource } from '../../services/api';

import { userAgent, baseURL } from '../../constants';

const AnimeScreen = ({ route }) => {
  const { anime } = route.params;

  const [animeSources, setAnimeSources] = useState([]);
  const [episodePlaying, setEpisodePlaying] = useState(0);
  const [orientationIsLandscape, setOrientationIsLandscape] = useState(false);
  const [videoCompletePosition, setVideoCompletePosition] = useState(0);
  const [videoSource, setVideoSource] = useState('');

  const [fadeAnimation] = useState(new Animated.Value(0));
  const [flatListFadeAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    async function fetchData() {
      const response = await getAnimeSources(anime);

      setAnimeSources(response);

      Animated.spring(flatListFadeAnimation, {
        tension: 10,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }

    Animated.spring(fadeAnimation, {
      tension: 10,
      toValue: 1,
      useNativeDriver: true,
    }).start();

    fetchData();
  }, []);

  const handleOnFullscreenUpdate = async () => {
    await lockAsync(
      orientationIsLandscape
        ? OrientationLock.PORTRAIT
        : OrientationLock.LANDSCAPE_RIGHT,
    );

    setOrientationIsLandscape(!orientationIsLandscape);
  };

  const handleOnLoad = (status) => {
    setVideoCompletePosition(status.durationMillis * 0.9);
  };

  const handleOnPlaybackStatusUpdate = (status) => {
    if (status.positionMillis > videoCompletePosition) {
      // console.log("I'm finished.", status.positionMillis, videoCompletePosition);
    }
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

          <View style={{ position: 'absolute' }}>
            {/* <Text style={{ color: 'white' }}>Loading...</Text> */}
          </View>
        </View>
      )}

      {animeSources.length !== 0
        ? (
          <View style={styles.episodesContainer}>
            <Animated.FlatList
              contentContainerStyle={styles.flatListContent}
              data={animeSources}
              keyExtractor={(item) => String(item.number)}
              numColumns={4}
              overScrollMode="never"
              renderItem={({ item }) => (
                <EpisodeItem
                  animeEpisode={item}
                  isPlaying={item.number === episodePlaying}
                  onPress={() => {
                    setEpisodePlaying(item.number);

                    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

                    setVideoSource(decryptSource(item.source));
                  }}
                />
              )}
              style={{
                opacity: flatListFadeAnimation,
                transform: [{
                  translateY: flatListFadeAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [200, 0],
                  }),
                }],
              }}
            />
          </View>
        ) : (
          <ActivityIndicator color="#e63232" size="large" style={styles.loading} />
        )}
    </View>
  );
};

AnimeScreen.propTypes = {
  route: PropTypes.shape().isRequired,
};

export default AnimeScreen;
