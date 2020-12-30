import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Animated, Text, View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import styles from './styles';

import { loadAnimeList, updateFavorites } from '../../store/actions';

import { getAnimeList } from '../../services/api';

import logo from '../../assets/images/logo.png';

const SearchScreen = ({
  favorites, loadAnimeList, navigation, updateFavorites,
}) => {
  const [isReady, setIsReady] = useState(false);
  const [failedRequest, setFailedRequest] = useState(false);

  const [fadeAnimation] = useState(new Animated.Value(0));
  const [failedRequestFadeAnimation] = useState(new Animated.Value(0));
  const [searchFadeAnimation] = useState(new Animated.Value(0));

  const playFadeAnimation = (animation) => Animated.spring(animation, {
    tension: 10,
    toValue: 1,
    useNativeDriver: true,
  }).start();

  const loadResourcesAsync = async () => {
    const animeList = await getAnimeList();

    if (animeList) {
      loadAnimeList(animeList);

      const newFavorites = [];

      favorites.forEach((anime) => {
        animeList.some((secondAnime) => {
          if (anime.id === secondAnime.id) {
            newFavorites.push(secondAnime);

            return true;
          }

          return false;
        });
      });

      updateFavorites(newFavorites);

      setIsReady(true);

      playFadeAnimation(searchFadeAnimation);
    } else {
      setFailedRequest(true);

      playFadeAnimation(failedRequestFadeAnimation);
    }
  };

  useEffect(() => {
    if (!failedRequest) loadResourcesAsync();
  }, [failedRequest]);

  useFocusEffect(() => playFadeAnimation(fadeAnimation));

  const handleFailedRequestPress = () => setFailedRequest(false);

  const handleSearchPress = () => navigation.navigate('SecondSearch');

  const handleSettingsPress = () => navigation.navigate('Settings');

  return (
    <View style={styles.container}>
      <Animated.Image
        source={logo}
        style={[styles.image, {
          opacity: fadeAnimation,
          transform: [{
            translateY: fadeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [-37.5, 0],
            }),
          }],
        }]}
      />

      {isReady ? (
        <Animated.View
          style={[styles.searchView, {
            opacity: searchFadeAnimation,
          }]}
        >
          <RectButton
            onPress={handleSearchPress}
            style={styles.search}
          >
            <AntDesign
              color="white"
              name="search1"
              size={24}
              style={styles.icon}
            />

            <Text style={styles.searchText}>Search for an anime!</Text>
          </RectButton>
        </Animated.View>
      ) : (
        <>
          {failedRequest ? (
            <Animated.View
              style={[styles.requestFailedContainer, {
                opacity: failedRequestFadeAnimation,
                transform: [{
                  translateY: failedRequestFadeAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [25, 0],
                  }),
                }],
              }]}
            >
              <Text style={styles.requestFailedText}>Connection error.</Text>

              <RectButton
                onPress={handleFailedRequestPress}
                style={styles.requestFailedButton}
              >
                <Text style={styles.requestFailedButtonText}>Retry</Text>
              </RectButton>
            </Animated.View>
          ) : (
            <ActivityIndicator
              color="#e63232"
              size="large"
            />
          )}
        </>
      )}

      <Animated.View
        style={[styles.settingsButtonView, {
          opacity: fadeAnimation,
          transform: [{
            scale: fadeAnimation,
          }],
        }]}
      >
        <RectButton
          onPress={handleSettingsPress}
          style={styles.settingsButton}
        >
          <AntDesign
            color="rgba(255, 255, 255, 0.75)"
            name="setting"
            size={24}
          />
        </RectButton>
      </Animated.View>
    </View>
  );
};

SearchScreen.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadAnimeList: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  updateFavorites: PropTypes.func.isRequired,
};

const mapDispatchToProps = { loadAnimeList, updateFavorites };

const mapStateToProps = (state) => ({ favorites: state.animeReducer.favorites });

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
