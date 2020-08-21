import { Video } from 'expo-av';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import styles from './styles';

import EpisodeItem from '../../components/EpisodeItem';

import { getAnimeSources } from '../../services/api';
import { userAgent, baseURL } from '../../constants';

const AnimeScreen = ({ route }) => {
  const { anime } = route.params;

  const [animeSources, setAnimeSources] = useState([]);
  const [orientationIsLandscape, setOrientationIsLandscape] = useState(false);
  const [videoSource, setVideoSource] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await getAnimeSources(anime);

      setAnimeSources(response);
    }

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <EpisodeItem animeEpisode={item} setParentVideoSource={setVideoSource} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text numberOfLines={3} style={styles.title}>{anime.title}</Text>
      </View>

      {videoSource.length !== 0 && (
        <View style={styles.videoContainer}>
          <Video
            onFullscreenUpdate={async () => {
              await lockAsync(
                orientationIsLandscape
                  ? OrientationLock.PORTRAIT
                  : OrientationLock.LANDSCAPE_RIGHT,
              );

              setOrientationIsLandscape(!orientationIsLandscape);
            }}
            resizeMode="contain"
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
        </View>
      )}

      <View style={styles.episodesContainer}>
        <FlatList
          contentContainerStyle={styles.flatListContent}
          data={animeSources}
          initialNumToRender={50}
          keyExtractor={(item) => String(item.number)}
          numColumns={4}
          overScrollMode="never"
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

AnimeScreen.propTypes = {
  route: PropTypes.shape().isRequired,
};

export default AnimeScreen;
