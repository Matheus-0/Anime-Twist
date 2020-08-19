/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated, Text, TextInput, View,
} from 'react-native';
import { useStore } from 'react-redux';

import styles from './styles';

import AnimeItem from '../../components/AnimeItem';

export default function SecondSearchScreen() {
  const store = useStore();

  const downloadTextAnimation = useRef(new Animated.Value(-100)).current;
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const [firstSearchDone, setFirstSearchDone] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    Animated.sequence([
      Animated.spring(fadeAnimation, {
        toValue: 1,
        useNativeDriver: false, // Disabled so interpolation can be used on width
      }),
      Animated.spring(downloadTextAnimation, {
        toValue: 0,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.screen}>
      <Animated.View
        style={[styles.animatedInput, {
          opacity: fadeAnimation,
          transform: [{
            translateY: fadeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [150, 30],
            }),
          }],
          width: fadeAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '90%'],
          }),
        }]}
      >
        <TextInput
          autoFocus
          onChangeText={(input) => setSearchInput(input)}
          onSubmitEditing={() => {
            if (!firstSearchDone) {
              setFirstSearchDone(true);
            }
          }}
          placeholder="Search"
          returnKeyType="search"
          style={{
            color: 'white',
            height: 40,
            marginHorizontal: 15,
          }}
        />
      </Animated.View>

      <Animated.View
        style={[styles.container, {
          left: downloadTextAnimation,
          opacity: downloadTextAnimation.interpolate({
            inputRange: [-100, 0],
            outputRange: [0, 1],
          }),
        }]}
      >
        <Text style={styles.downloadText}>Download your favourite anime!</Text>
        <Text style={{ color: 'white', marginTop: 15 }}>Look for English or Japanese titles.</Text>
      </Animated.View>
    </View>
  );
}
