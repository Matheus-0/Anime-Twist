import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

// import { getAnimeSources } from '../../services/api';

const AnimeScreen = ({ route }) => {
  const { anime } = route.params;

  useEffect(() => {
    async function fetchData() {
      // console.log(await getAnimeSources(anime));
      // console.log(anime);
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{anime.title}</Text>
    </View>
  );
};

AnimeScreen.propTypes = {
  route: PropTypes.shape().isRequired,
};

export default AnimeScreen;
