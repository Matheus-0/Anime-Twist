import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Animated, View, Text } from 'react-native';

import styles from './styles';

const FavoriteScreen = ({ navigation }) => {
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

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.favoriteTitleContainer, {
          opacity: fadeAnimation,
          transform: [{
            translateY: fadeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [-100, 0],
            }),
          }],
        }]}
      >
        <Text style={styles.favoriteTitle}>Favorite</Text>
      </Animated.View>
      {/* {history.length !== 0 ? (
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
      )} */}
    </View>
  );
};

// FavoriteScreen.propTypes = {
//   Favorite: PropTypes.arrayOf(PropTypes.object).isRequired,
//   navigation: PropTypes.shape({
//     addListener: PropTypes.func.isRequired,
//   }).isRequired,
//   removeAllFavorite: PropTypes.func.isRequired,
// };

// const mapDispatchToProps = {
//   removeAllFavorite,
// };

const mapStateToProps = (state) => ({ favorite: state.animeReducer.history });

export default connect()(FavoriteScreen);
