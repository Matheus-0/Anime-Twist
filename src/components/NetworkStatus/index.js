import NetInfo from '@react-native-community/netinfo';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Animated, Text } from 'react-native';

import styles from './styles';

const NetworkStatus = ({ style }) => {
  const [connected, setConnected] = useState(true);

  const [alertAnimation] = useState(new Animated.Value(100));

  const playAlertAnimation = (toValue) => {
    Animated.spring(alertAnimation, {
      toValue,
      useNativeDriver: true,
    }).start();
  };

  let timer = 0;

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        setConnected(state.isConnected);

        if (!state.isConnected) {
          playAlertAnimation(0);
        } else {
          setTimeout(() => {
            playAlertAnimation(100);
          }, 2000);
        }
      }, 2000);
    });
  }, []);

  return (
    <Animated.View
      style={[style, {
        backgroundColor: connected ? '#32aa50' : '#e63232',
        opacity: alertAnimation.interpolate({
          inputRange: [0, 100],
          outputRange: [1, 0],
        }),
        transform: [{
          scale: alertAnimation.interpolate({
            inputRange: [0, 100],
            outputRange: [1, 0],
          }),
          translateY: alertAnimation,
        }],
      }]}
    >
      <Text
        style={styles.text}
      >
        {connected ? 'Connected!' : 'No connection.'}
      </Text>
    </Animated.View>
  );
};

NetworkStatus.defaultProps = {
  style: {},
};

NetworkStatus.propTypes = {
  style: PropTypes.shape(),
};

export default NetworkStatus;
