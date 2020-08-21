import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import styles from './styles';

import { addToHistory as addToHistoryAction } from '../../store/actions';

const AnimeItem = ({ addToHistory, anime }) => {
  const { navigate } = useNavigation();

  return (
    <RectButton
      onPress={() => {
        addToHistory(anime);

        navigate('Anime', { anime });
      }}
      style={styles.item}
    >
      <View style={styles.titlesContainer}>
        <Text numberOfLines={1} style={styles.title}>{anime.title}</Text>
        {anime.alt_title && (
          <Text numberOfLines={1} style={styles.alternative}>{anime.alt_title}</Text>
        )}
      </View>
    </RectButton>
  );
};

AnimeItem.propTypes = {
  addToHistory: PropTypes.func.isRequired,
  anime: PropTypes.shape().isRequired,
};

const mapDispatchToProps = {
  addToHistory: addToHistoryAction,
};

export default connect(null, mapDispatchToProps)(AnimeItem);
