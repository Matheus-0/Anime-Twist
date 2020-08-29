/* eslint-disable no-shadow */
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  Animated, LayoutAnimation, Text, View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import styles from './styles';

import AnimeItem from '../../components/AnimeItem';

import { removeAllFavorites } from '../../store/actions';

const FavoritesScreen = ({ navigation, removeAllFavorites, favorites }) => {
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [scrollViewAnimation] = useState(new Animated.Value(100));

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      fadeAnimation.setValue(0);
      scrollViewAnimation.setValue(100);
    });

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(() => {
    Animated.parallel([
      Animated.spring(fadeAnimation, {
        tension: 10,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(scrollViewAnimation, {
        tension: 10,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  });

  const playLayoutAnimation = (duration) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        duration, LayoutAnimation.Types.easeOut, LayoutAnimation.Properties.opacity,
      ),
    );
  };

  const handleRemoveAllFavorite = () => {
    Animated.spring(scrollViewAnimation, {
      tension: 10,
      toValue: 100,
      useNativeDriver: true,
    }).start(() => {
      removeAllFavorites();

      playLayoutAnimation(400);
    });
  };
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.favoriteTitleContainer, {
          opacity: fadeAnimation,
          transform: [{
            translateY: fadeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [-100, 0],
            }),
          }],
        }]}
      >
        <Text style={styles.favoriteTitle}>Favorites</Text>
      </Animated.View>
      {favorites.length !== 0 ? (
        <>
          <Animated.View
            style={[styles.favoriteDescriptionContainer, {
              opacity: fadeAnimation,
            }]}
          >
            <Text style={styles.favoriteDescription}>These are your favorite anime.</Text>
          </Animated.View>

          <Animated.View
            style={[styles.removeAllFavoriteContainer, {
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
              onPress={handleRemoveAllFavorite}
              style={styles.removeAllFavoriteButton}
            >
              <Text style={styles.removeAllFavoriteText}>Clear all</Text>
            </RectButton>
          </Animated.View>

          <Animated.ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            overScrollMode="never"
            style={[styles.scrollView, {
              opacity: scrollViewAnimation.interpolate({
                inputRange: [0, 100],
                outputRange: [1, 0],
              }),
              transform: [{
                translateY: scrollViewAnimation,
              }],
            }]}
          >
            {favorites.map((_, index, array) => {
              const anime = array[array.length - 1 - index];

              return (
                <AnimeItem
                  anime={anime}
                  key={anime.id}
                  removeFromParentAnimation={() => playLayoutAnimation(200)}
                  favoriteRemove
                />
              );
            })}
          </Animated.ScrollView>
        </>
      ) : (
        <Animated.View
          style={[styles.noFavoriteContainer, {
            opacity: fadeAnimation,
            transform: [{
              translateY: fadeAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
              }),
            }],
          }]}
        >
          <AntDesign name="questioncircleo" size={80} color="white" />

          <Text style={styles.noFavoriteText}>
            No favorite anime found. Favorite one first!
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

FavoritesScreen.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
  }).isRequired,
  removeAllFavorites: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  removeAllFavorites,
};

const mapStateToProps = (state) => ({ favorites: state.animeReducer.favorites });

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
