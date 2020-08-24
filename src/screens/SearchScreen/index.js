import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Animated, Image, Text, TouchableOpacity, View, ActivityIndicator,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import styles from './styles';

import { loadAnimeList as loadAnimeListAction } from '../../store/actions';

import { getAnimeList } from '../../services/api';

import logo from '../../assets/images/logo.png';

const SearchScreen = ({ loadAnimeList, navigation }) => {
  const [isReady, setIsReady] = useState(false);
  const [failedRequest, setFailedRequest] = useState(false);

  const [fadeAnimation] = useState(new Animated.Value(0));

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

  const loadResourcesAsync = async () => {
    const animeList = await getAnimeList();

    if (animeList) {
      loadAnimeList(animeList);

      setIsReady(true);

      Animated.spring(fadeAnimation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      setFailedRequest(true);
    }
  };

  useEffect(() => {
    loadResourcesAsync();
  }, [failedRequest]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => fadeAnimation.setValue(0));

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(() => {
    Animated.spring(fadeAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  });

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.image}
      />
      {isReady ? (
        <AnimatedTouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('SecondSearch')}
          style={[styles.search, {
            opacity: fadeAnimation,
          }]}
        >
          <Feather
            color="white"
            name="search"
            size={24}
            style={styles.icon}
          />

          <Text style={styles.searchText}>Search for an anime.</Text>
        </AnimatedTouchableOpacity>
      ) : (
        <>
          {failedRequest ? (
            <>
              <View style={styles.requestFailedContainer}>
                <Text style={styles.requestFailedText}>Connection error.</Text>
              </View>
              <RectButton
                onPress={() => {
                  setFailedRequest(false);
                }}
                style={styles.requestFailedButton}
              >
                <Text style={styles.requestFailedButtonText}>
                  Retry
                </Text>
              </RectButton>
            </>
          ) : (
            <>
              <ActivityIndicator color="#e63232" size="large" style={styles.loading} />
              <Text style={styles.loadingText}>Loading anime data...</Text>
            </>
          )}
        </>
      )}
    </View>
  );
};

SearchScreen.propTypes = {
  loadAnimeList: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = {
  loadAnimeList: loadAnimeListAction,
};

export default connect(null, mapDispatchToProps)(SearchScreen);
