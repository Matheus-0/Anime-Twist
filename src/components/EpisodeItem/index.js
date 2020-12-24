import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const EpisodeItem = ({
  animeEpisode,
  isComplete,
  isCurrent,
  onLongPress,
  onPress,
}) => {
  const extraStyles = (isCurrent) ? styles.currentItem : {};

  return (
    <TouchableOpacity
      activeOpacity={0.875}
      onLongPress={onLongPress}
      onPress={onPress}
      style={[styles.item, extraStyles]}
    >
      <Text style={styles.episodeText}>{animeEpisode.number}</Text>

      {isComplete && (
        <AntDesign
          color={isCurrent ? '#282828' : '#e63232'}
          name="check"
          size={16}
          style={styles.icon}
        />
      )}
    </TouchableOpacity>
  );
};

EpisodeItem.propTypes = {
  animeEpisode: PropTypes.shape().isRequired,
  isComplete: PropTypes.bool.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  onLongPress: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default EpisodeItem;
