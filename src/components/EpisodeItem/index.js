import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

const EpisodeItem = ({ anime }) => (
  <RectButton
    onPress={() => {}}
    style={styles.item}
  >
    <Text style={styles.episodeText}>{anime.number}</Text>
  </RectButton>
);

EpisodeItem.propTypes = {
  anime: PropTypes.shape().isRequired,
};

export default EpisodeItem;
