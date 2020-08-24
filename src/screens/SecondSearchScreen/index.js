/* eslint-disable no-unused-vars */
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated, Text, TextInput, View,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

import AnimeItem from '../../components/AnimeItem';

import { getAnimeAlternativeTitle, getAnimeSlug, getAnimeTitle } from '../../utils/anime';

const SecondSearchScreen = ({ animeList }) => {
  const [scrollFadeAnimation] = useState(new Animated.Value(0));
  const [downloadTextAnimation] = useState(new Animated.Value(-100));
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [noResultsFadeAnimation] = useState(new Animated.Value(0));

  const [firstSearchDone, setFirstSearchDone] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    Animated.sequence([
      Animated.spring(fadeAnimation, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(downloadTextAnimation, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSearch = (text) => {
    const query = text.trim().toLowerCase();

    if (query) {
      scrollFadeAnimation.setValue(0);

      if (!firstSearchDone) setFirstSearchDone(true);

      let results = [];

      if (animeList) {
        results = animeList.filter(
          (anime) => {
            let alternative = getAnimeAlternativeTitle(anime);
            const slug = getAnimeSlug(anime);
            const title = getAnimeTitle(anime).toLowerCase();

            if (alternative) {
              alternative = alternative.toLowerCase();

              return slug.includes(query) || alternative.includes(query) || title.includes(query);
            }

            return slug.includes(query) || title.includes(query);
          },
        );
      }

      if (results.length === 0) {
        Animated.spring(noResultsFadeAnimation, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(scrollFadeAnimation, {
          tension: 10,
          toValue: 1,
          useNativeDriver: true,
        }).start();
      }

      setSearchResults(results);
    }
  };

  return (
    <View style={styles.screen}>
      <Animated.View
        style={[styles.animatedInput, {
          opacity: fadeAnimation,
          transform: [{
            translateY: fadeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [150, 30],
            }),
          }],
        }]}
      >
        <TextInput
          autoFocus
          onSubmitEditing={(event) => handleSearch(event.nativeEvent.text)}
          placeholder="Search"
          returnKeyType="search"
          style={styles.searchInput}
        />
      </Animated.View>

      {!firstSearchDone && (
        <Animated.View
          style={[styles.container, {
            opacity: downloadTextAnimation.interpolate({
              inputRange: [-100, 0],
              outputRange: [0, 1],
            }),
            transform: [{
              translateY: downloadTextAnimation,
            }],
          }]}
        >
          <Text style={styles.downloadText}>Watch your favourite anime!</Text>
          <Text style={styles.lookForTitleText}>Look for English or Japanese titles.</Text>
        </Animated.View>
      )}

      {firstSearchDone && searchResults.length === 0 && (
        <Animated.View style={[styles.container, {
          opacity: noResultsFadeAnimation,
          transform: [{
            translateY: noResultsFadeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [-100, 0],
            }),
          }],
        }]}
        >
          <Entypo color="white" name="emoji-sad" size={64} />
          <Text style={styles.noResultsText}>Oops! No results.</Text>
        </Animated.View>
      )}

      {firstSearchDone && searchResults.length !== 0 && (
        <Animated.ScrollView
          contentContainerStyle={styles.searchScrollContent}
          keyboardDismissMode="on-drag"
          overScrollMode="never"
          style={[styles.searchScroll, {
            opacity: scrollFadeAnimation,
            transform: [{
              translateY: scrollFadeAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0],
              }),
            }],
          }]}
        >
          {searchResults.map((result) => (
            <AnimeItem
              anime={result}
              key={result.id}
            />
          ))}
        </Animated.ScrollView>
      )}
    </View>
  );
};

SecondSearchScreen.propTypes = {
  animeList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({ animeList: state.animeReducer.animeList });

export default connect(mapStateToProps)(SecondSearchScreen);
