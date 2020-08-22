import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import {
  Animated, Text, TouchableOpacity, View,
} from 'react-native';

import styles from './styles';

const SearchScreen = ({ navigation }) => {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => fadeAnimation.setValue(0));

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(() => {
    Animated.spring(fadeAnimation, {
      toValue: 1,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
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
    </View>
  );
};

SearchScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SearchScreen;
