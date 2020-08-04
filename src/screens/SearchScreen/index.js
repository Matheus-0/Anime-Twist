import { Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './styles';

export default function SearchScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('SecondSearch')}
        style={styles.search}
      >
        <Feather
          color="white"
          name="search"
          size={24}
          style={{ marginRight: 10 }}
        />

        <Text style={styles.searchText}>Search for an anime.</Text>
      </TouchableOpacity>
    </View>
  );
}

SearchScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
