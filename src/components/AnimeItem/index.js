import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

const AnimeItem = ({ alternative, title }) => (
  <RectButton
    onPress={() => {}}
    style={styles.item}
  >
    <View style={{ flex: 1 }}>
      <Text numberOfLines={1} style={styles.title}>{title}</Text>
      {alternative && <Text numberOfLines={1} style={styles.alternative}>{alternative}</Text>}
    </View>
  </RectButton>
);

AnimeItem.defaultProps = {
  alternative: '',
};

AnimeItem.propTypes = {
  alternative: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default AnimeItem;
