import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Animated, LayoutAnimation, Text, View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import styles from './styles';

import { removeAllHistory as removeAllHistoryAction } from '../../store/actions';

import AnimeItem from '../../components/AnimeItem';

const HistoryScreen = ({ history, navigation, removeAllHistory }) => {
  const [fadeAnimation] = useState(new Animated.Value(0));
  const [scrollViewAnimation] = useState(new Animated.Value(100));

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      fadeAnimation.setValue(0);
      scrollViewAnimation.setValue(100);
    });

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(() => {
    Animated.parallel([
      Animated.spring(fadeAnimation, {
        tension: 10,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(scrollViewAnimation, {
        tension: 10,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  });

  const playLayoutAnimation = (duration) => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        duration, LayoutAnimation.Types.easeOut, LayoutAnimation.Properties.opacity,
      ),
    );
  };

  const handleRemoveAllHistory = () => {
    Animated.spring(scrollViewAnimation, {
      tension: 10,
      toValue: 100,
      useNativeDriver: true,
    }).start(() => {
      removeAllHistory();

      playLayoutAnimation(400);
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.historyTitleContainer, {
          opacity: fadeAnimation,
          transform: [{
            translateY: fadeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [-100, 0],
            }),
          }],
        }]}
      >
        <Text style={styles.historyTitle}>History</Text>
      </Animated.View>

      {history.length !== 0 ? (
        <>
          <Animated.View
            style={[styles.historyDescriptionContainer, {
              opacity: fadeAnimation,
            }]}
          >
            <Text style={styles.historyDescription}>These are anime you&apos;ve visited.</Text>
          </Animated.View>

          <Animated.View
            style={[styles.removeAllHistoryContainer, {
              opacity: fadeAnimation,
              transform: [{
                translateX: fadeAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0],
                }),
              }],
            }]}
          >
            <RectButton
              onPress={handleRemoveAllHistory}
              style={styles.removeAllHistoryButton}
            >
              <Text style={styles.removeAllHistoryText}>Clear all history</Text>
            </RectButton>
          </Animated.View>

          <Animated.ScrollView
            contentContainerStyle={styles.scrollViewContainer}
            overScrollMode="never"
            style={[styles.scrollView, {
              opacity: scrollViewAnimation.interpolate({
                inputRange: [0, 100],
                outputRange: [1, 0],
              }),
              transform: [{
                translateY: scrollViewAnimation,
              }],
            }]}
          >
            {history.map((_, index, array) => {
              // Mapping array in reverse order so that the most recent anime are shown on top
              const anime = array[array.length - 1 - index];

              return (
                <AnimeItem
                  anime={anime}
                  key={anime.id}
                  removeFromParentAnimation={() => playLayoutAnimation(200)}
                  toRemove
                />
              );
            })}
          </Animated.ScrollView>
        </>
      ) : (
        <Animated.View
          style={[styles.noHistoryContainer, {
            opacity: fadeAnimation,
            transform: [{
              translateY: fadeAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0],
              }),
            }],
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
  removeAllHistory: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  removeAllHistory: removeAllHistoryAction,
};

const mapStateToProps = (state) => ({ history: state.animeReducer.history });

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);
