import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';

export default function AnimeItem({ alternative, style, title }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[style, styles.item]}
    >
      <View style={{ flex: 5 }}>
        <Text style={styles.title}>{title}</Text>
        {alternative && <Text style={styles.alternative}>{alternative}</Text>}
      </View>

      <View style={{ alignItems: 'center', flex: 1 }}>
        <Ionicons
          color="white"
          name="ios-arrow-forward"
          size={24}
        />
      </View>
    </TouchableOpacity>
  );
}

AnimeItem.defaultProps = {
  alternative: '',
  style: {},
};

AnimeItem.propTypes = {
  alternative: PropTypes.string,
  style: PropTypes.shape(),
  title: PropTypes.string.isRequired,
};
