import { SimpleLineIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { Video } from 'expo-av';
import { lockAsync, OrientationLock } from 'expo-screen-orientation';
import { setStatusBarHidden } from 'expo-status-bar';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator, Animated, Text, TouchableOpacity, View,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

import {
  markEpisodeAsComplete,
  markEpisodeAsCurrent,
} from '../../store/actions';

import { decryptSource } from '../../services/api';

import { referer, userAgent } from '../../constants';

import { getAnimeTitle, millisToTime } from '../../utils';

const MIN_VIDEO_RESUME_POSITION = 90000; // 1 minute and a half
const PLAYER_HIDE_TIMEOUT = 5000; // 5 seconds
const RESUME_SUBTRACT_VALUE = 5000; // Subtract 5 seconds when resuming because of small delay
const SEEK_MILLIS = 5000; // 5 seconds

let timeout = null;

const VideoScreen = ({
  completeEpisodes,
  markEpisodeAsComplete,
  markEpisodeAsCurrent,
  navigation,
  route,
  settings,
}) => {
  const {
    anime, animeSources, canResume, firstEpisode, firstEpisodeTime,
  } = route.params;

  const videoRef = useRef(null);

  const deleteTime = useRef(true);
  const lastEpisodes = useRef({});
  const nextEpisodeViewActive = useRef(false);
  const resumeViewActive = useRef(true);
  const videoCompletePosition = useRef(null);
  const videoIsPaused = useRef(false);
  const videoPausedOnSlide = useRef(false);
  const videoPlayerIsHidden = useRef(false);

  const [episodePlaying, setEpisodePlaying] = useState({});
  const [showError, setShowError] = useState(false);
  const [videoDurationMillis, setVideoDurationMillis] = useState(0);
  const [videoIsLoading, setVideoIsLoading] = useState(true);
  const [videoPositionMillis, setVideoPositionMillis] = useState(0);
  const [videoPositionMillisForText, setVideoPositionMillisForText] = useState(0);

  const [controlsOpacityAnimation] = useState(new Animated.Value(1));
  const [iconOpacityAnimation] = useState(new Animated.Value(0));
  const [nextEpisodeViewOpacityAnimation] = useState(new Animated.Value(0));
  const [resumeViewOpacityAnimation] = useState(new Animated.Value(1));

  const isEpisodeComplete = (episode) => {
    const arrayOfEpisodes = completeEpisodes[episode.anime_id];

    if (arrayOfEpisodes) return arrayOfEpisodes.includes(episode.number);

    return false;
  };

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

  const playOpacityAnimation = (animation, toValue) => Animated.spring(animation, {
    friction: 10,
    toValue,
    useNativeDriver: true,
  }).start();

  const handleHideTimeout = (onlyClear = false) => {
    if (timeout) clearTimeout(timeout);

    if (!onlyClear && !videoPlayerIsHidden.current) {
      timeout = setTimeout(() => {
        playOpacityAnimation(controlsOpacityAnimation, 0);
        playOpacityAnimation(nextEpisodeViewOpacityAnimation, 0);
        playOpacityAnimation(resumeViewOpacityAnimation, 0);

        videoPlayerIsHidden.current = true;
      }, PLAYER_HIDE_TIMEOUT);
    }
  };

  const loadVideo = (source, positionMillis = 0) => {
    videoRef.current.unloadAsync();

    handleHideTimeout();

    videoRef.current.loadAsync({
      headers: {
        Referer: referer,
        'User-Agent': userAgent,
      },
      uri: source,
    }, {
      positionMillis,
      progressUpdateIntervalMillis: 500,
      shouldPlay: true,
    });

    videoIsPaused.current = false;

    iconOpacityAnimation.setValue(0);
  };

  const setInitialData = async () => {
    const lastEpisodesResponse = await getLastEpisodes();

    if (lastEpisodesResponse) {
      lastEpisodes.current = lastEpisodesResponse;
    }

    setEpisodePlaying(firstEpisode);

    if (videoRef.current) loadVideo(decryptSource(firstEpisode.source), firstEpisodeTime);
  };

  useEffect(() => {
    const { LANDSCAPE, PORTRAIT } = OrientationLock;

    setStatusBarHidden(true);

    lockAsync(LANDSCAPE);

    setInitialData();

    return () => {
      setStatusBarHidden(false);

      lockAsync(PORTRAIT);
    };
  }, []);

  const handleBackArrowPress = () => navigation.goBack();

  const handleLoad = (status) => {
    videoCompletePosition.current = status.durationMillis * 0.9;

    setVideoDurationMillis(status.durationMillis);
  };

  const handleMainTouchablePress = () => {
    playOpacityAnimation(controlsOpacityAnimation, videoPlayerIsHidden.current ? 1 : 0);

    if (nextEpisodeViewActive.current) {
      playOpacityAnimation(nextEpisodeViewOpacityAnimation, videoPlayerIsHidden.current ? 1 : 0);
    }

    if (resumeViewActive.current) {
      playOpacityAnimation(resumeViewOpacityAnimation, videoPlayerIsHidden.current ? 1 : 0);
    }

    videoPlayerIsHidden.current = !videoPlayerIsHidden.current;

    handleHideTimeout();
  };

  const playNextEpisode = () => {
    playOpacityAnimation(nextEpisodeViewOpacityAnimation, 0);
    playOpacityAnimation(resumeViewOpacityAnimation, 0);

    const nextEpisode = animeSources.find((item) => item.number === episodePlaying.number + 1);

    markEpisodeAsCurrent(nextEpisode);

    deleteTime.current = true;
    nextEpisodeViewActive.current = false;
    resumeViewActive.current = false;
    videoCompletePosition.current = null;

    setEpisodePlaying(nextEpisode);
    setShowError(false);
    setVideoDurationMillis(0);
    setVideoIsLoading(true);
    setVideoPositionMillis(0);
    setVideoPositionMillisForText(0);

    loadVideo(decryptSource(nextEpisode.source));
  };

  const handlePlaybackStatusUpdate = (status) => {
    if (status.positionMillis !== undefined) {
      setVideoPositionMillis(status.positionMillis);
      setVideoPositionMillisForText(status.positionMillis);

      if (status.positionMillis < videoCompletePosition.current) {
        if (status.positionMillis > MIN_VIDEO_RESUME_POSITION) {
          saveEpisodeTime(episodePlaying, status.positionMillis - RESUME_SUBTRACT_VALUE);
        }

        if (nextEpisodeViewActive.current) {
          playOpacityAnimation(nextEpisodeViewOpacityAnimation, 0);

          nextEpisodeViewActive.current = false;
        }
      }
    }

    if (status.isLoaded) {
      if (!videoIsLoading) {
        if (status.isBuffering && !status.isPlaying && !videoIsPaused.current) {
          setVideoIsLoading(true);
        }
      } else if (status.isPlaying && videoCompletePosition.current) {
        setVideoIsLoading(false);
      }
    }

    if (status.error) {
      setShowError(true);
      setVideoIsLoading(false);
    }

    if (status.positionMillis > MIN_VIDEO_RESUME_POSITION) {
      playOpacityAnimation(resumeViewOpacityAnimation, 0);

      resumeViewActive.current = false;
    }

    if (
      videoCompletePosition.current
      && status.positionMillis > videoCompletePosition.current
    ) {
      if (episodePlaying.number < animeSources.length) {
        nextEpisodeViewActive.current = true;
      }

      if (deleteTime.current) {
        deleteLastEpisodeTime();

        deleteTime.current = false;

        if (settings.autoMark && !isEpisodeComplete(episodePlaying)) {
          markEpisodeAsComplete(episodePlaying);
        }
      }
    }

    if (status.didJustFinish) {
      videoIsPaused.current = true;

      iconOpacityAnimation.setValue(1);

      if (
        settings.autoplay
        && episodePlaying.number < animeSources.length
      ) {
        playNextEpisode();
      }
    }
  };

  const handlePlayPausePress = () => {
    if (videoIsPaused.current) videoRef.current.playAsync();
    else videoRef.current.pauseAsync();

    videoIsPaused.current = !videoIsPaused.current;

    iconOpacityAnimation.setValue(videoIsPaused.current ? 1 : 0);

    handleHideTimeout();
  };

  const handleResumePress = () => {
    playOpacityAnimation(resumeViewOpacityAnimation, 0);

    videoRef.current.setPositionAsync(lastEpisodes.current[anime.id].millis);
  };

  const handleRetryPress = () => {
    setShowError(false);
    setVideoIsLoading(true);

    loadVideo(decryptSource(episodePlaying.source), videoPositionMillis);
  };

  const handleSliderValueChange = (value) => setVideoPositionMillisForText(value);

  const handleSlidingComplete = (value) => {
    if (videoPausedOnSlide.current) {
      videoRef.current.playFromPositionAsync(value);

      videoIsPaused.current = false;
      videoPausedOnSlide.current = false;

      iconOpacityAnimation.setValue(0);
    } else videoRef.current.setPositionAsync(value);

    handleHideTimeout();
  };

  const handleSlidingStart = () => {
    if (!videoIsPaused.current) {
      videoRef.current.pauseAsync();

      videoIsPaused.current = true;
      videoPausedOnSlide.current = true;

      iconOpacityAnimation.setValue(1);
    }

    handleHideTimeout(true);
  };

  const handleSeeking = (value) => {
    let nextMillis = videoPositionMillis + value;

    if (nextMillis < 0) nextMillis = 0;
    else if (nextMillis > videoDurationMillis) nextMillis = videoDurationMillis;

    videoRef.current.setPositionAsync(nextMillis);

    handleHideTimeout();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handleMainTouchablePress}
      style={styles.containerTouchable}
    >
      <Animated.View style={styles.container}>
        <Animated.View
          style={[styles.transparentView, {
            opacity: controlsOpacityAnimation,
          }]}
        />

        <Video
          onLoad={handleLoad}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          ref={videoRef}
          resizeMode={Video.RESIZE_MODE_CONTAIN}
          style={styles.video}
        />

        <Animated.View
          style={[styles.upperLeftView, {
            opacity: controlsOpacityAnimation,
            transform: [{
              translateY: controlsOpacityAnimation.interpolate({
                inputRange: [0, 0, 1],
                outputRange: [-500, 0, 0],
              }),
            }],
          }]}
        >
          <TouchableOpacity
            activeOpacity={0.875}
            onPress={handleBackArrowPress}
            style={styles.backButton}
          >
            <SimpleLineIcons
              color="white"
              name="arrow-left"
              size={20}
            />
          </TouchableOpacity>

          <Text numberOfLines={1} style={styles.titleText}>
            {getAnimeTitle(anime, settings.preferEnglish)}
          </Text>

          <Text style={styles.episodeText}>
            {`Episode ${episodePlaying.number}`}
          </Text>
        </Animated.View>

        <ActivityIndicator
          animating={videoIsLoading}
          color="#e63232"
          size={75}
          style={styles.loading}
        />

        {showError ? (
          <View style={styles.errorView}>
            <Text style={styles.errorText}>
              {'Could not load video.\nCheck your internet connection and try again.'}
            </Text>

            <TouchableOpacity
              activeOpacity={0.875}
              onPress={handleRetryPress}
              style={styles.errorButton}
            >
              <Text style={styles.errorText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Animated.View
            style={[styles.centerControls, {
              opacity: controlsOpacityAnimation,
              transform: [{
                translateY: controlsOpacityAnimation.interpolate({
                  inputRange: [0, 0, 1],
                  outputRange: [500, 0, 0],
                }),
              }],
            }]}
          >
            <TouchableOpacity
              activeOpacity={0.875}
              onPress={() => handleSeeking(-SEEK_MILLIS)}
              style={styles.centerControlsButton}
            >
              <SimpleLineIcons
                color="white"
                name="control-rewind"
                size={24}
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.875}
              onPress={handlePlayPausePress}
              style={styles.centerControlsButton}
            >
              <Animated.View
                style={[styles.centerControlsPlayPauseIcon, {
                  opacity: iconOpacityAnimation,
                }]}
              >
                <SimpleLineIcons
                  color="white"
                  name="control-play"
                  size={32}
                />
              </Animated.View>

              <Animated.View
                style={[styles.centerControlsPlayPauseIcon, {
                  opacity: iconOpacityAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0],
                  }),
                }]}
              >
                <SimpleLineIcons
                  color="white"
                  name="control-pause"
                  size={32}
                />
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.875}
              onPress={() => handleSeeking(SEEK_MILLIS)}
              style={styles.centerControlsButton}
            >
              <SimpleLineIcons
                color="white"
                name="control-forward"
                size={24}
              />
            </TouchableOpacity>
          </Animated.View>
        )}

        {canResume && (
          <Animated.View
            style={[styles.resumeView, {
              opacity: resumeViewOpacityAnimation,
              transform: [{
                translateY: resumeViewOpacityAnimation.interpolate({
                  inputRange: [0, 0, 1],
                  outputRange: [500, 0, 0],
                }),
              }],
            }]}
          >
            <TouchableOpacity
              activeOpacity={0.875}
              disabled={!videoDurationMillis}
              onPress={handleResumePress}
              style={styles.bottomButton}
            >
              <SimpleLineIcons
                color="white"
                name="control-play"
                size={12}
              />

              <Text style={styles.bottomButtonText}>Resume from last time!</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        <Animated.View
          style={[styles.nextEpisodeView, {
            opacity: nextEpisodeViewOpacityAnimation,
            transform: [{
              translateY: nextEpisodeViewOpacityAnimation.interpolate({
                inputRange: [0, 0, 1],
                outputRange: [500, 0, 0],
              }),
            }],
          }]}
        >
          <TouchableOpacity
            activeOpacity={0.875}
            onPress={playNextEpisode}
            style={styles.bottomButton}
          >
            <SimpleLineIcons
              color="white"
              name="control-play"
              size={12}
            />

            <Text style={styles.bottomButtonText}>Play next episode!</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.Text
          style={[styles.timeText, styles.timeTextLeft, {
            opacity: controlsOpacityAnimation,
            transform: [{
              translateY: controlsOpacityAnimation.interpolate({
                inputRange: [0, 0, 1],
                outputRange: [500, 0, 0],
              }),
            }],
          }]}
        >
          {millisToTime(videoPositionMillisForText)}
        </Animated.Text>

        <Animated.View
          style={[styles.sliderView, {
            opacity: controlsOpacityAnimation,
            transform: [{
              translateY: controlsOpacityAnimation.interpolate({
                inputRange: [0, 0, 1],
                outputRange: [500, 0, 0],
              }),
            }],
          }]}
        >
          <Slider
            maximumValue={videoDurationMillis}
            minimumTrackTintColor="#e63232"
            minimumValue={0}
            onSlidingComplete={handleSlidingComplete}
            onSlidingStart={handleSlidingStart}
            onValueChange={handleSliderValueChange}
            step={1}
            style={styles.slider}
            thumbTintColor="#e63232"
            value={videoPositionMillis}
          />
        </Animated.View>

        <Animated.Text
          style={[styles.timeText, styles.timeTextRight, {
            opacity: controlsOpacityAnimation,
            transform: [{
              translateY: controlsOpacityAnimation.interpolate({
                inputRange: [0, 0, 1],
                outputRange: [500, 0, 0],
              }),
            }],
          }]}
        >
          {millisToTime(videoDurationMillis)}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

VideoScreen.propTypes = {
  completeEpisodes: PropTypes.shape().isRequired,
  markEpisodeAsComplete: PropTypes.func.isRequired,
  markEpisodeAsCurrent: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.shape().isRequired,
  settings: PropTypes.shape({
    autoMark: PropTypes.bool.isRequired,
    autoplay: PropTypes.bool.isRequired,
    preferEnglish: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapDispatchToProps = {
  markEpisodeAsComplete,
  markEpisodeAsCurrent,
};

const mapStateToProps = (state) => ({
  completeEpisodes: state.animeReducer.animeObjectForEpisodes,
  settings: state.animeReducer.settings,
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoScreen);
