import { Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

const SearchScreen = ({ navigation }) => (
  <View style={styles.container}>
    <RectButton
      activeOpacity={1}
      onPress={() => navigation.navigate('SecondSearch')}
      style={styles.search}
    >
      <Feather
        color="white"
        name="search"
        size={24}
        style={styles.icon}
      />

      <Text style={styles.searchText}>Search for an anime.</Text>
    </RectButton>
  </View>
);

SearchScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SearchScreen;
