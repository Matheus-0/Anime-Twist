import CheckBox from '@react-native-community/checkbox';
import { Video } from 'expo-av';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Animated, LayoutAnimation, Text, View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

// Styles
import styles from './styles';

// Actions
import {
  markEpisodeAsComplete as markEpisodeAsCompleteAction,
  undoMarkEpisodeAsComplete as undoMarkEpisodeAsCompleteAction,
} from '../../store/actions';

// Components
import EpisodeItem from '../../components/EpisodeItem';

// API
import { decryptSource, getAnimeSources } from '../../services/api';

// Constants
import { baseURL, userAgent } from '../../constants';

const AnimeScreen = ({
  completeEpisodes,
  markEpisodeAsComplete,
  route,
  undoMarkEpisodeAsComplete,
}) => {
  const { anime } = route.params;

  const [animeSources, setAnimeSources] = useState(null);
  const [autoCheckBox, setAutoCheckBox] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [episodePlaying, setEpisodePlaying] = useState({});
  const [networkAvailable, setNetworkAvailable] = useState(true);
  const [orientationIsLandscape, setOrientationIsLandscape] = useState(false);
  const [showSourceError, setShowSourceError] = useState(false);
  const [videoCompletePosition, setVideoCompletePosition] = useState(null);
  const [videoSource, setVideoSource] = useState('');

  const [fadeAnimation] = useState(new Animated.Value(0));
  const [flatListFadeAnimation] = useState(new Animated.Value(0));

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

  useEffect(() => {
    playFadeAnimation(fadeAnimation);

    fetchData();
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

  const handleOnFullscreenUpdate = async () => {
    await lockAsync(
      orientationIsLandscape ? OrientationLock.PORTRAIT : OrientationLock.LANDSCAPE_RIGHT,
    );

    setOrientationIsLandscape(!orientationIsLandscape);
  };

  const handleOnLoad = (status) => {
    setVideoCompletePosition(status.durationMillis * 0.9);
  };

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
          setAutoCheckBox(true);
          setVideoCompletePosition(null);
          setShowSourceError(false);
          setEpisodePlaying(item);
          setToggleCheckBox(isComplete);
          setVideoSource(decryptSource(item.source));

          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
    </View>
  );
};

AnimeScreen.propTypes = {
  completeEpisodes: PropTypes.shape().isRequired,
  markEpisodeAsComplete: PropTypes.func.isRequired,
  route: PropTypes.shape().isRequired,
  undoMarkEpisodeAsComplete: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  markEpisodeAsComplete: markEpisodeAsCompleteAction,
  undoMarkEpisodeAsComplete: undoMarkEpisodeAsCompleteAction,
};

const mapStateToProps = (state) => ({
  completeEpisodes: state.animeReducer.animeObjectForEpisodes,
});

export default connect(mapStateToProps, mapDispatchToProps)(AnimeScreen);
