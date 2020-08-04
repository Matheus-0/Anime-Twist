import React, { useEffect, useRef } from 'react';
import {
  Animated, Text, TouchableOpacity, View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

export default function SearchScreen({ navigation }) {
  // const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      duration: 500,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => { navigation.navigate('SecondSearch'); }}
        style={[styles.search, { opacity: fadeAnimation }]}
      >
        <Feather color="white" name="search" size={24} style={{ marginRight: 10 }} />
        <Text style={styles.searchText}>Search for an anime.</Text>
      </TouchableOpacity>
    </View>
  );
}

// Add props validation later
