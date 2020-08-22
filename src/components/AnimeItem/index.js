import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import {
  Animated, Text, TouchableOpacity,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import styles from './styles';

import {
  addToHistory as addToHistoryAction,
  removeFromHistory as removeFromHistoryAction,
} from '../../store/actions';

const AnimeItem = ({
  addToHistory,
  anime,
  removeFromHistory,
  removeFromParentAnimation,
  style,
  toRemove,
}) => {
  const { navigate } = useNavigation();

  const defaultHeight = 55;
  const defaultMargin = 15;

  const removeFadeAnimation = useRef(new Animated.Value(1)).current;
  const removeHeightAnimation = useRef(new Animated.Value(defaultHeight)).current;
  const removeMarginAnimation = useRef(new Animated.Value(defaultMargin)).current;
  const removePositionAnimation = useRef(new Animated.Value(0)).current;

  const handleRemoveAnime = () => {
    removeFromParentAnimation();

    removeFromHistory(anime);
  };

  const handleRemoveAnimation = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(removeFadeAnimation, {
          toValue: 0,
          useNativeDriver: false,
        }),
        Animated.spring(removePositionAnimation, {
          toValue: -100,
          useNativeDriver: false,
        }),
      ]),
    ]).start(handleRemoveAnime);
  };

  return (
    <Animated.View
      style={[styles.item, style, {
        height: removeHeightAnimation,
        left: removePositionAnimation,
        marginBottom: removeMarginAnimation,
        opacity: removeFadeAnimation,
      }]}
    >
      <RectButton
        onPress={() => {
          addToHistory(anime);

          navigate('Anime', { anime });
        }}
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
  addToHistory: addToHistoryAction,
  removeFromHistory: removeFromHistoryAction,
};

export default connect(null, mapDispatchToProps)(AnimeItem);
