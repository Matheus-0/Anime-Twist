import { SimpleLineIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const EpisodeItem = ({
  animeEpisode,
  isComplete,
  isPlaying,
  onPress,
}) => {
  let extraStyles = {};

  if (isComplete) extraStyles = styles.completeItem;
  else if (isPlaying) extraStyles = styles.playingItem;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[styles.item, extraStyles]}
    >
      {isPlaying ? (
        <SimpleLineIcons name="control-play" size={16} color="grey" />
      ) : (
        <Text style={styles.episodeText}>{animeEpisode.number}</Text>
      )}
    </TouchableOpacity>
  );
};

EpisodeItem.propTypes = {
  animeEpisode: PropTypes.shape().isRequired,
  isComplete: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default EpisodeItem;
