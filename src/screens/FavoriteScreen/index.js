import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Animated, View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';

import AnimeItem from '../../components/AnimeItem';

import { removeAllFavorite, removeFromFavorite } from '../../store/actions';

const FavoriteScreen = ({ navigation, removeAllFavorite, favorite }) => {
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
      removeAllFavorite();

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
      {favorite.length !== 0 ? (
        <>
          <Animated.View
            style={[styles.FavoriteDescriptionContainer, {
              opacity: fadeAnimation,
            }]}
          >
            <Text style={styles.FavoriteDescription}>These are anime you&apos;ve favorited.</Text>
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
              <Text style={styles.removeAllFavoriteText}>Clear all favorite list</Text>
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
            {favorite.map((_, index, array) => {
            // Mapping array in reverse order so that the most recent anime are shown on top
              const anime = array[array.length - 1 - index];

              return (
                <AnimeItem
                  anime={anime}
                  key={anime.id}
                  removeFromParentAnimation={() => playLayoutAnimation(200)}
                  toRemove
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
          <MaterialIcons name="favorite-border" size={80} color="white" />
          <Text style={styles.noFavoriteText}>
            No favorite anime found. Go watch your favorites animes!
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

FavoriteScreen.propTypes = {
  favorite: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
  }).isRequired,
  removeAllFavorite: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  removeAllFavorite,
};

const mapStateToProps = (state) => ({ favorite: state.animeReducer.favorites });

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteScreen);
