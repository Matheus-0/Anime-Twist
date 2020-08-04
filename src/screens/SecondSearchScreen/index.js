import React from 'react';
import {
  Animated, Text, TextInput, View,
} from 'react-native';

import styles from './styles';

export default class SecondSearchScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      downloadTextAnimation: new Animated.Value(-100),
      fadeAnimation: new Animated.Value(0),
      searchInput: '',
    };
  }

  componentDidMount() {
    const { downloadTextAnimation, fadeAnimation } = this.state;

    Animated.parallel([
      Animated.spring(fadeAnimation, {
        toValue: 1,
        useNativeDriver: false, // Disabled so interpolation can be used on width
      }),
      Animated.spring(downloadTextAnimation, {
        toValue: 0,
        useNativeDriver: false,
      }),
    ]).start();
  }

  render() {
    const { downloadTextAnimation, fadeAnimation, searchInput } = this.state;

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
            onChangeText={(input) => {
              this.setState({ searchInput: input });
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
}
