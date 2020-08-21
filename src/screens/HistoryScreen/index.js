import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

import AnimeItem from '../../components/AnimeItem';

const HistoryScreen = ({ history }) => (
  <View style={styles.container}>
    <View style={styles.historyTitleContainer}>
      <Text style={styles.historyTitle}>History</Text>
    </View>

    <View style={styles.historyDescriptionContainer}>
      <Text style={styles.historyDescription}>These are anime you&apos;ve visited recently.</Text>
    </View>

    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 20 }}
      overScrollMode="never"
      style={{ width: '100%' }}
    >
      {history.map((_, index, array) => {
        // Mapping array in reverse order so that the most recent anime are shown on top
        const anime = array[array.length - 1 - index];

        return (
          <AnimeItem anime={anime} key={anime.id} />
        );
      })}
    </ScrollView>
  </View>
);

HistoryScreen.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({ history: state.animeReducer.history });

export default connect(mapStateToProps)(HistoryScreen);
