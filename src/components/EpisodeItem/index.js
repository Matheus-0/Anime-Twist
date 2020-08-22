import { SimpleLineIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const EpisodeItem = ({
  animeEpisode,
  isPlaying,
  onPress,
}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={[styles.item, isPlaying ? styles.playingItem : {}]}
  >
    {isPlaying ? (
      <SimpleLineIcons name="control-play" size={16} color="grey" />
    ) : (
      <Text style={styles.episodeText}>{animeEpisode.number}</Text>
    )}
  </TouchableOpacity>
);

EpisodeItem.propTypes = {
  animeEpisode: PropTypes.shape().isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default EpisodeItem;
