import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
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

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={[styles.item, extraStyles]}
    >
      {isPlaying ? (
        <SimpleLineIcons color="rgba(255, 255, 255, 0.75)" name="control-play" size={16} />
      ) : (
        <Text style={styles.episodeText}>{animeEpisode.number}</Text>
      )}

      {isComplete && !isCurrent && (
        <AntDesign color="#e63232" name="check" size={16} style={styles.icon} />
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
