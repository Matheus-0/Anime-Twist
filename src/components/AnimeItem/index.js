import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import styles from './styles';

import { removeFromFavorites } from '../../store/actions';

const AnimeItem = ({
  anime,
  favoriteRemove,
  removeFromFavorites,
  removeFromParentAnimation,
  style,
}) => {
  const { navigate } = useNavigation();

  const [removeFadeAnimation] = useState(new Animated.Value(1));
  const [removePositionAnimation] = useState(new Animated.Value(0));

  const handleAnimeItemPress = () => navigate('Anime', { anime });

  const handleRemoveAnime = () => {
    removeFromParentAnimation();

    removeFromFavorites(anime);
  };

  // This is called before removing the anime so that the animation can finish first
  const handleRemoveAnimation = () => {
    Animated.parallel([
      Animated.spring(removeFadeAnimation, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.spring(removePositionAnimation, {
        toValue: -100,
        useNativeDriver: true,
      }),
    ]).start(handleRemoveAnime);
  };

  return (
    <Animated.View
      style={[styles.item, style, {
        opacity: removeFadeAnimation,
        transform: [{
          translateX: removePositionAnimation,
        }],
      }]}
    >
      <RectButton
        onPress={handleAnimeItemPress}
        style={styles.titlesAndRemoveContainer}
      >
        <View style={styles.titlesContainer}>
          <Text numberOfLines={1} style={styles.title}>{anime.title}</Text>
          {anime.alt_title && (
            <Text numberOfLines={1} style={styles.alternative}>{anime.alt_title}</Text>
          )}
        </View>

        {favoriteRemove && (
          <RectButton
            onPress={handleRemoveAnimation}
            style={styles.removeContainer}
          >
            <Ionicons color="rgba(255, 255, 255, 0.75)" name="md-heart-dislike" size={24} />
          </RectButton>
        )}
      </RectButton>
    </Animated.View>
  );
};

AnimeItem.defaultProps = {
  favoriteRemove: false,
  removeFromParentAnimation: () => {},
  style: {},
};

AnimeItem.propTypes = {
  anime: PropTypes.shape().isRequired,
  favoriteRemove: PropTypes.bool,
  removeFromFavorites: PropTypes.func.isRequired,
  removeFromParentAnimation: PropTypes.func,
  style: PropTypes.shape(),
};

const mapDispatchToProps = { removeFromFavorites };

export default connect(null, mapDispatchToProps)(AnimeItem);
