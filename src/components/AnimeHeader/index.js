import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import styles from './styles';

const AnimeHeader = (props) => {
  console.log('Header props', props);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Anime Title</Text>
      <RectButton
        style={styles.favoriteButton}

      >
        <FontAwesome color="#e63232" name="heart" size={28} />
      </RectButton>
    </View>
  );
};

export default AnimeHeader;
