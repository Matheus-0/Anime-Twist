import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';
import {
  Animated, LayoutAnimation, Text, View,
} from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';

import AnimeItem from '../../components/AnimeItem';

const HistoryScreen = ({ history, navigation }) => {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => fadeAnimation.setValue(0));

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(() => {
    Animated.spring(fadeAnimation, {
      tension: 10,
      toValue: 1,
      useNativeDriver: false,
    }).start();
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.historyTitleContainer, {
          opacity: fadeAnimation,
          top: fadeAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [-100, 0],
          }),
        }]}
      >
        <Text style={styles.historyTitle}>History</Text>
      </Animated.View>

      {history.length !== 0
        ? (
          <>
            <Animated.View
              style={[styles.historyDescriptionContainer, {
                opacity: fadeAnimation,
              }]}
            >
              <Text style={styles.historyDescription}>
                These are anime you&apos;ve visited recently.
              </Text>
            </Animated.View>

            <Animated.ScrollView
              contentContainerStyle={{ paddingHorizontal: 20 }}
              overScrollMode="never"
              style={{
                bottom: fadeAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 0],
                }),
                opacity: fadeAnimation,
                width: '100%',
              }}
            >
              {history.map((_, index, array) => {
                // Mapping array in reverse order so that the most recent anime are shown on top
                const anime = array[array.length - 1 - index];

                return (
                  <AnimeItem
                    anime={anime}
                    key={anime.id}
                    removeFromParentAnimation={() => {
                      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    }}
                    toRemove
                  />
                );
              })}
            </Animated.ScrollView>
          </>
        )
        : (
          <Animated.View
            style={[styles.noHistoryContainer, {
              bottom: fadeAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0],
              }),
              opacity: fadeAnimation,
            }]}
          >
            <AntDesign name="questioncircleo" size={80} color="white" />
            <Text style={styles.noHistoryText}>No history found. Go watch some anime!</Text>
          </Animated.View>
        )}
    </View>
  );
};

HistoryScreen.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired,
  navigation: PropTypes.shape({
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({ history: state.animeReducer.history });

export default connect(mapStateToProps)(HistoryScreen);
