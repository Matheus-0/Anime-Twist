import React, { useRef } from 'react';
import {
  Animated, Text, TextInput, View,
} from 'react-native';

import styles from './styles';

export default function SecondSearchScreen() {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  Animated.spring(fadeAnimation, {
    toValue: 1,
    useNativeDriver: false, // Disabled so interpolation can be used on width
  }).start();

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
          placeholder="Search"
          returnKeyType="search"
          style={{
            color: 'white',
            marginHorizontal: 15,
          }}
        />
      </Animated.View>

      <View style={styles.container}>
        <Text style={styles.downloadText}>Download your favourite anime!</Text>
        <Text style={{ color: 'white', marginTop: 15 }}>Look for English or Japanese titles.</Text>
      </View>
    </View>
  );
}
