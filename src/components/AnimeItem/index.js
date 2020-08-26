/* eslint-disable no-shadow */
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Animated, Text, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import styles from './styles';

import { addToHistory, removeFromHistory } from '../../store/actions';

const AnimeItem = ({
  addToHistory,
  anime,
  removeFromHistory,
  removeFromParentAnimation,
  style,
  toRemove,
}) => {
  const { navigate } = useNavigation();

  const [removeFadeAnimation] = useState(new Animated.Value(1));
  const [removePositionAnimation] = useState(new Animated.Value(0));

  const handleAnimeItemPress = () => {
    addToHistory(anime);

    navigate('Anime', { anime });
  };

  const handleRemoveAnime = () => {
    removeFromParentAnimation();

    removeFromHistory(anime);
  };

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
        transform: [{
          translateX: removePositionAnimation,
        }],
        opacity: removeFadeAnimation,
      }]}
    >
      <RectButton
        onPress={handleAnimeItemPress}
        style={styles.titlesContainer}
      >
        <Text numberOfLines={1} style={styles.title}>{anime.title}</Text>
        {anime.alt_title && (
          <Text numberOfLines={1} style={styles.alternative}>{anime.alt_title}</Text>
        )}
      </RectButton>

      {toRemove && (
        <TouchableOpacity
          onPress={handleRemoveAnimation}
          style={styles.removeContainer}
        >
          <AntDesign color="white" name="close" size={24} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

AnimeItem.defaultProps = {
  removeFromParentAnimation: () => {},
  style: {},
  toRemove: false,
};

AnimeItem.propTypes = {
  addToHistory: PropTypes.func.isRequired,
  anime: PropTypes.shape().isRequired,
  removeFromHistory: PropTypes.func.isRequired,
  removeFromParentAnimation: PropTypes.func,
  style: PropTypes.shape(),
  toRemove: PropTypes.bool,
};

const mapDispatchToProps = {
  addToHistory,
  removeFromHistory,
};

export default connect(null, mapDispatchToProps)(AnimeItem);
