import { SimpleLineIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

const EpisodeItem = ({
  animeEpisode,
  animeObjectForEpisodes,
  isPlaying,
  onPress,
}) => {
  const isComplete = () => {
    const episodesArray = animeObjectForEpisodes[animeEpisode.anime_id] || [];

    return episodesArray.includes(animeEpisode.number);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        // console.log(isComplete());
        // console.log(animeObjectForEpisodes);
        onPress();
      }}
      style={[styles.item, isPlaying ? styles.playingItem : {}]}
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
  animeObjectForEpisodes: PropTypes.shape().isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  animeObjectForEpisodes: state.animeReducer.animeObjectForEpisodes,
});

export default connect(mapStateToProps)(EpisodeItem);
