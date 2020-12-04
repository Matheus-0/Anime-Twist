import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

const AnimeItem = ({
  anime,
  favoriteRemove,
  onPress,
  onRemovePress,
  preferEnglish,
  style,
}) => {
  let mainTitle = '';
  let secondTitle = '';

  if (preferEnglish) {
    if (anime.alt_title) {
      mainTitle = anime.alt_title;
      secondTitle = anime.title;
    } else mainTitle = anime.title;
  } else {
    mainTitle = anime.title;

    if (anime.alt_title) secondTitle = anime.alt_title;
  }

  return (
    <View style={[styles.item, style]}>
      <RectButton
        onPress={onPress}
        style={styles.titlesAndRemoveContainer}
      >
        <View style={styles.titlesContainer}>
          <Text numberOfLines={1} style={styles.title}>{mainTitle}</Text>

          {secondTitle.length !== 0 && (
            <Text numberOfLines={1} style={styles.alternative}>{secondTitle}</Text>
          )}
        </View>

        {anime.ongoing === 1 && (
          <View style={styles.ongoing}>
            <Ionicons color="#e63232" name="md-tv" size={20} />
          </View>
        )}

        {favoriteRemove && (
          <RectButton
            onPress={onRemovePress}
            style={styles.removeContainer}
          >
            <Ionicons color="rgba(255, 255, 255, 0.75)" name="md-heart-dislike" size={20} />
          </RectButton>
        )}
      </RectButton>
    </View>
  );
};

AnimeItem.defaultProps = {
  favoriteRemove: false,
  onRemovePress: () => {},
  style: {},
};

AnimeItem.propTypes = {
  anime: PropTypes.shape().isRequired,
  favoriteRemove: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  onRemovePress: PropTypes.func,
  preferEnglish: PropTypes.bool.isRequired,
  style: PropTypes.shape(),
};

export default AnimeItem;
