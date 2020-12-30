import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Animated, Text, TextInput, View,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

import AnimeItem from '../../components/AnimeItem';

import { customIncludes, replaceWithSpaces } from '../../utils';

const MAX_RESULTS = 100;

const SecondSearchScreen = ({ animeList, navigation, settings }) => {
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [noResultsFadeAnimation] = useState(new Animated.Value(0));
  const [scrollFadeAnimation] = useState(new Animated.Value(0));
  const [watchTextAnimation] = useState(new Animated.Value(-25));

  const [firstSearchDone, setFirstSearchDone] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [previousSearch, setPreviousSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    Animated.sequence([
      Animated.spring(fadeAnimation, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(watchTextAnimation, {
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleAnimeItemPress = (anime) => navigation.navigate('Anime', { anime });

  const handleChangeText = (text) => setSearchText(text);

  const handleSearch = () => {
    const query = replaceWithSpaces(searchText).trim().toLowerCase();

    if (query) {
      scrollFadeAnimation.setValue(0);

      if (!firstSearchDone) setFirstSearchDone(true);

      let results = [];

      if (animeList) {
        let count = 0;

        results = animeList.filter(
          (anime) => {
            if (count < MAX_RESULTS) {
              let alternative = anime.alt_title;

              if (alternative) {
                alternative = alternative.toLowerCase();

                if (customIncludes(alternative, query)) {
                  count += 1;

                  return true;
                }
              }

              const { slug } = anime.slug;
              const { title } = anime;

              if (customIncludes(slug, query) || customIncludes(title, query)) {
                count += 1;

                return true;
              }
            }

            return false;
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

  const handleSubmitEditing = () => {
    const currentSearch = replaceWithSpaces(searchText).trim().toLowerCase();

    if (currentSearch && currentSearch !== previousSearch) {
      setIsSearching(true);
      setPreviousSearch(currentSearch);
    }
  };

  useEffect(() => {
    if (isSearching) {
      handleSearch();

      setIsSearching(false);
    }
  }, [isSearching]);

  return (
    <View style={styles.screen}>
      <Animated.View
        style={[styles.animatedInput, {
          opacity: fadeAnimation,
          transform: [{
            translateY: fadeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [150, 0],
            }),
          }],
        }]}
      >
        <TextInput
          autoFocus
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
          placeholder="Search"
          placeholderTextColor="#d2d2d2"
          returnKeyType="search"
          style={styles.searchInput}
        />
      </Animated.View>

      {isSearching ? (
        <ActivityIndicator
          color="#e63232"
          size="large"
          style={styles.loading}
        />
      ) : (
        <>
          {firstSearchDone ? (
            <>
              {searchResults.length === 0 ? (
                <Animated.View
                  style={[styles.container, {
                    opacity: noResultsFadeAnimation,
                    transform: [{
                      translateY: noResultsFadeAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-25, 0],
                      }),
                    }],
                  }]}
                >
                  <AntDesign
                    color="white"
                    name="questioncircleo"
                    size={75}
                  />

                  <Text style={styles.noResultsText}>Oops! No results.</Text>
                </Animated.View>
              ) : (
                <Animated.ScrollView
                  contentContainerStyle={styles.searchScrollContent}
                  keyboardDismissMode="on-drag"
                  overScrollMode="never"
                  style={[styles.searchScroll, {
                    opacity: scrollFadeAnimation,
                    transform: [{
                      translateY: scrollFadeAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-50, 0],
                      }),
                    }],
                  }]}
                >
                  {searchResults.map((result) => (
                    <AnimeItem
                      anime={result}
                      key={result.id}
                      onPress={() => handleAnimeItemPress(result)}
                      preferEnglish={settings.preferEnglish}
                    />
                  ))}
                </Animated.ScrollView>
              )}
            </>
          ) : (
            <Animated.View
              style={[styles.container, {
                opacity: watchTextAnimation.interpolate({
                  inputRange: [-25, 0],
                  outputRange: [0, 1],
                }),
                transform: [{
                  translateY: watchTextAnimation,
                }],
              }]}
            >
              <Text style={styles.watchText}>Watch your favourite anime!</Text>
              <Text style={styles.lookForTitleText}>Look for English or Japanese titles.</Text>
            </Animated.View>
          )}
        </>
      )}
    </View>
  );
};

SecondSearchScreen.propTypes = {
  animeList: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  settings: PropTypes.shape({
    preferEnglish: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  animeList: state.animeReducer.animeList,
  settings: state.animeReducer.settings,
});

export default connect(mapStateToProps)(SecondSearchScreen);
