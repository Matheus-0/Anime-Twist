import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, Vibration } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';

import { markEpisodeAsComplete, undoMarkEpisodeAsComplete } from '../../store/actions';

const EpisodeItem = ({
  animeEpisode,
  isComplete,
  isCurrent,
  markEpisodeAsComplete,
  onPress,
  undoMarkEpisodeAsComplete,
}) => {
  let extraStyles = {};

  if (isCurrent) extraStyles = styles.currentItem;

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onLongPress={() => {
        if (isComplete) undoMarkEpisodeAsComplete(animeEpisode);
        else markEpisodeAsComplete(animeEpisode);

        Vibration.vibrate(25);
      }}
      onPress={onPress}
      style={[styles.item, extraStyles]}
    >
      <Text style={styles.episodeText}>{animeEpisode.number}</Text>

      {isComplete && (
        <AntDesign color={isCurrent ? '#282828' : '#e63232'} name="check" size={16} style={styles.icon} />
      )}
    </TouchableOpacity>
  );
};

EpisodeItem.propTypes = {
  animeEpisode: PropTypes.shape().isRequired,
  isComplete: PropTypes.bool.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  markEpisodeAsComplete: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  undoMarkEpisodeAsComplete: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  markEpisodeAsComplete,
  undoMarkEpisodeAsComplete,
};

export default connect(null, mapDispatchToProps)(EpisodeItem);
