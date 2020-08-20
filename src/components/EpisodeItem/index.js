import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

import { decryptSource } from '../../services/api';

const EpisodeItem = ({ animeEpisode, setParentVideoSource }) => (
  <RectButton
    onPress={() => setParentVideoSource(decryptSource(animeEpisode.source))}
    style={styles.item}
  >
    <Text style={styles.episodeText}>{animeEpisode.number}</Text>
  </RectButton>
);

EpisodeItem.propTypes = {
  animeEpisode: PropTypes.shape().isRequired,
  setParentVideoSource: PropTypes.func.isRequired,
};

export default EpisodeItem;
