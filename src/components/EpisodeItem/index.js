import { SimpleLineIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const EpisodeItem = ({
  animeEpisode,
  isComplete,
  isCurrent,
  isPlaying,
  onPress,
}) => {
  let extraStyles = {};

  if (isCurrent) extraStyles = styles.currentItem;
  else if (isComplete) extraStyles = styles.completeItem;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[styles.item, extraStyles]}
    >
      {isPlaying ? (
        <SimpleLineIcons name="control-play" size={16} color="rgba(255, 255, 255, 0.75)" />
      ) : (
        <Text style={styles.episodeText}>{animeEpisode.number}</Text>
      )}
    </TouchableOpacity>
  );
};

EpisodeItem.propTypes = {
  animeEpisode: PropTypes.shape().isRequired,
  isComplete: PropTypes.bool.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default EpisodeItem;
