import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import CustomCheckBox from '../../components/CustomCheckBox';
import CustomModal from '../../components/CustomModal';

import { changeSetting, eraseAllData } from '../../store/actions';

import styles from './styles';

const SettingsScreen = ({
  changeSetting, eraseAllData, settings,
}) => {
  const [eraseSettingsModalVisible, setEraseSettingsModalVisible] = useState(false);

  const [fadeAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(fadeAnimation, {
      tension: 10,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  });

  const eraseTimeData = async () => {
    try {
      await AsyncStorage.removeItem('lastEpisodes');
    } catch (error) {
      // console.log(error);
    }
  };

  const handleClearDataPress = () => setEraseSettingsModalVisible(true);

  const handleModalNegativeResponse = () => setEraseSettingsModalVisible(false);

  const handleModalPositiveResponse = () => {
    setEraseSettingsModalVisible(false);

    eraseAllData();
    eraseTimeData();
  };

  return (
    <View style={styles.container}>
      <CustomModal
        isVisible={eraseSettingsModalVisible}
        onNegativeResponse={handleModalNegativeResponse}
        onPositiveResponse={handleModalPositiveResponse}
        text="All data related to anime episodes will be erased. Continue?"
      />

      <Animated.View
        style={[styles.settingsTitleContainer, {
          opacity: fadeAnimation,
          transform: [{
            translateY: fadeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [-100, 0],
            }),
          }],
        }]}
      >
        <Text style={styles.settingsTitle}>Settings</Text>
      </Animated.View>

      <Animated.View
        style={[styles.eraseAllDataContainer, {
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
          onPress={handleClearDataPress}
          style={styles.eraseButton}
        >
          <Text style={styles.eraseButtonText}>Clear anime data</Text>
        </RectButton>
      </Animated.View>

      <Animated.View
        style={[styles.settingsContainer, {
          opacity: fadeAnimation,
          transform: [{
            translateY: fadeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            }),
          }],
        }]}
      >
        <Text style={styles.sectionTitle}>Appearance</Text>

        <CustomCheckBox
          onValueChange={() => changeSetting('preferEnglish', !settings.preferEnglish)}
          value={settings.preferEnglish}
          style={styles.customCheckBox}
          text="Prefer English titles."
        />

        <Text style={styles.sectionTitle}>Player</Text>

        <CustomCheckBox
          onValueChange={() => changeSetting('autoplay', !settings.autoplay)}
          value={settings.autoplay}
          style={styles.customCheckBox}
          text="Automatically play next episode."
        />

        <Text style={styles.sectionTitle}>Tracking</Text>

        <CustomCheckBox
          onValueChange={() => changeSetting('askResume', !settings.askResume)}
          value={settings.askResume}
          style={styles.customCheckBox}
          text="Always ask me to resume."
        />

        <CustomCheckBox
          onValueChange={() => changeSetting('autoMark', !settings.autoMark)}
          value={settings.autoMark}
          style={styles.customCheckBox}
          text="Automatically mark episode as complete."
        />

        <CustomCheckBox
          onValueChange={() => changeSetting('highlight', !settings.highlight)}
          value={settings.highlight}
          style={styles.customCheckBox}
          text="Highlight last played episode."
        />
      </Animated.View>
    </View>
  );
};

SettingsScreen.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  eraseAllData: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    askResume: PropTypes.bool.isRequired,
    autoMark: PropTypes.bool.isRequired,
    autoplay: PropTypes.bool.isRequired,
    highlight: PropTypes.bool.isRequired,
    preferEnglish: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapDispatchToProps = {
  changeSetting,
  eraseAllData,
};

const mapStateToProps = (state) => ({ settings: state.animeReducer.settings });

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
