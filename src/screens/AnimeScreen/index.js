import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import styles from './styles';

import EpisodeItem from '../../components/EpisodeItem';

import { getAnimeSources } from '../../services/api';

const AnimeScreen = ({ route }) => {
  const { anime } = route.params;

  const [animeSources, setAnimeSources] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await getAnimeSources(anime);

      setAnimeSources(response);

      // console.log(anime);
    }

    fetchData();
  }, []);

  const renderItem = ({ item }) => <EpisodeItem anime={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{anime.title}</Text>
      </View>

      <View style={styles.episodesContainer}>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={animeSources}
          initialNumToRender={50}
          keyExtractor={(item) => String(item.number)}
          numColumns={4}
          overScrollMode="never"
          renderItem={renderItem}
          style={{}}
        />
      </View>
    </View>
  );
};

AnimeScreen.propTypes = {
  route: PropTypes.shape().isRequired,
};

export default AnimeScreen;
