import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

const AnimeItem = ({ anime }) => {
  const { navigate } = useNavigation();

  return (
    <RectButton
      onPress={() => navigate('Anime', { anime })}
      style={styles.item}
    >
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={styles.title}>{anime.title}</Text>
        {anime.alt_title && (
          <Text numberOfLines={1} style={styles.alternative}>{anime.alt_title}</Text>
        )}
      </View>
    </RectButton>
  );
};

AnimeItem.propTypes = {
  anime: PropTypes.shape().isRequired,
};

export default AnimeItem;
