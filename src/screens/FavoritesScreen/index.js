import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Animated, LayoutAnimation, Text, View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import AnimeItem from '../../components/AnimeItem';
import CustomModal from '../../components/CustomModal';

import { removeAllFavorites, removeFromFavorites } from '../../store/actions';

import styles from './styles';

const FavoritesScreen = ({
  favorites, navigation, removeAllFavorites, removeFromFavorites, settings,
}) => {
  const [clearFavoritesModalVisible, setClearFavoritesModalVisible] = useState(false);

  const [fadeAnimation] = useState(new Animated.Value(0));

  useFocusEffect(() => {
    Animated.spring(fadeAnimation, {
      tension: 10,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  });

  const playLayoutAnimation = (duration) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        duration, LayoutAnimation.Types.easeOut, LayoutAnimation.Properties.opacity,
      ),
    );
  };

  const handleAnimeItemPress = (anime) => navigation.navigate('Anime', { anime });

  const handleAnimeItemRemovePress = (anime) => {
    playLayoutAnimation(200);

    removeFromFavorites(anime);
  };

  const handleClearAllPress = () => setClearFavoritesModalVisible(true);

  const handleRemoveAllFavorites = () => {
    removeAllFavorites();

    playLayoutAnimation(400);
  };

  const handleModalNegativeResponse = () => setClearFavoritesModalVisible(false);

  const handleModalPositiveResponse = () => {
    setClearFavoritesModalVisible(false);

    handleRemoveAllFavorites();
  };

  return (
    <View style={styles.container}>
      <CustomModal
        isVisible={clearFavoritesModalVisible}
        onNegativeResponse={handleModalNegativeResponse}
        onPositiveResponse={handleModalPositiveResponse}
        text="All your favorite anime list will be cleared. Continue?"
      />

      <Animated.View
        style={[styles.favoritesTitleContainer, {
          opacity: fadeAnimation,
          transform: [{
            translateY: fadeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [-37.5, 0],
            }),
          }],
        }]}
      >
        <Text style={styles.favoritesTitle}>Favorites</Text>
      </Animated.View>

      {favorites.length !== 0 ? (
        <>
          <Animated.View
            style={[styles.removeAllFavoritesContainer, {
              opacity: fadeAnimation,
              transform: [{
                translateX: fadeAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [25, 0],
                }),
              }],
            }]}
          >
            <RectButton
              onPress={handleClearAllPress}
              style={styles.removeAllFavoritesButton}
            >
              <Text style={styles.removeAllFavoritesText}>Clear all</Text>
            </RectButton>
          </Animated.View>

          <Animated.ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            overScrollMode="never"
            style={[styles.scrollView, {
              opacity: fadeAnimation,
              transform: [{
                translateY: fadeAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              }],
            }]}
          >
            {favorites.map((_, index, array) => {
              // Mapping in reverse order so that the recent favourites show up first
              const anime = array[array.length - 1 - index];

              return (
                <AnimeItem
                  anime={anime}
                  favoriteRemove
                  key={anime.id}
                  onPress={() => handleAnimeItemPress(anime)}
                  onRemovePress={() => handleAnimeItemRemovePress(anime)}
                  preferEnglish={settings.preferEnglish}
                />
              );
            })}
          </Animated.ScrollView>
        </>
      ) : (
        <Animated.View
          style={[styles.noFavoritesContainer, {
            opacity: fadeAnimation,
            transform: [{
              translateY: fadeAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [25, 0],
              }),
            }],
          }]}
        >
          <AntDesign
            color="white"
            name="questioncircleo"
            size={75}
          />

          <Text style={styles.noFavoritesText}>
            No favorite anime. Explore a bit!
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

FavoritesScreen.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  removeAllFavorites: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    preferEnglish: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapDispatchToProps = {
  removeAllFavorites,
  removeFromFavorites,
};

const mapStateToProps = (state) => ({
  favorites: state.animeReducer.favorites,
  settings: state.animeReducer.settings,
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);
