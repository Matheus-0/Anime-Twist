import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Animated, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import CustomCheckBox from '../../components/CustomCheckBox';
import CustomModal from '../../components/CustomModal';

import { changeSetting, eraseAllData, resetSettings } from '../../store/actions';

import styles from './styles';

const SettingsScreen = ({
  changeSetting, eraseAllData, resetSettings, settings,
}) => {
  const [eraseSettingsModalVisible, setEraseSettingsModalVisible] = useState(false);

  const [fadeAnimation] = useState(new Animated.Value(0));

  useFocusEffect(() => {
    Animated.spring(fadeAnimation, {
      tension: 10,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  });

  const handleModalNegativeResponse = () => setEraseSettingsModalVisible(false);

  const handleModalPositiveResponse = () => {
    setEraseSettingsModalVisible(false);

    eraseAllData();
  };

  return (
    <View style={styles.container}>
      <CustomModal
        isVisible={eraseSettingsModalVisible}
        onNegativeResponse={handleModalNegativeResponse}
        onPositiveResponse={handleModalPositiveResponse}
        text="All completed and highlighted episodes will be erased. Continue?"
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
        style={[styles.settingsDescriptionContainer, {
          opacity: fadeAnimation,
        }]}
      >
        <Text style={styles.settingsDescription}>Basic settings that you can change.</Text>
      </Animated.View>

      <Animated.View
        style={[styles.settingsContainer, {
          opacity: fadeAnimation,
          transform: [{
            translateX: fadeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [-100, 0],
            }),
          }],
        }]}
      >
        <Text style={styles.sectionTitle}>Player</Text>

        <CustomCheckBox
          onPress={() => changeSetting('autoplay', !settings.autoplay)}
          value={settings.autoplay}
          style={styles.customCheckBox}
          text="Automatically play next episode."
        />

        <Text style={styles.sectionTitle}>Tracking</Text>

        <CustomCheckBox
          onPress={() => changeSetting('autoMark', !settings.autoMark)}
          value={settings.autoMark}
          style={styles.customCheckBox}
          text="Automatically mark episodes as complete."
        />

        <CustomCheckBox
          onPress={() => changeSetting('highlight', !settings.highlight)}
          value={settings.highlight}
          style={styles.customCheckBox}
          text="Highlight last played episode."
        />
      </Animated.View>

      <Animated.View
        style={[styles.resetButtonsContainer, {
          opacity: fadeAnimation,
          transform: [{
            translateY: fadeAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            }),
          }],
        }]}
      >
        <RectButton
          onPress={() => resetSettings()}
          style={styles.resetButton}
        >
          <Text style={styles.resetButtonText}>Reset to defaults</Text>
        </RectButton>

        <RectButton
          onPress={() => setEraseSettingsModalVisible(true)}
          style={styles.resetButton}
        >
          <Text style={styles.resetButtonText}>Erase all anime data</Text>
        </RectButton>
      </Animated.View>
    </View>
  );
};

SettingsScreen.propTypes = {
  changeSetting: PropTypes.func.isRequired,
  eraseAllData: PropTypes.func.isRequired,
  resetSettings: PropTypes.func.isRequired,
  settings: PropTypes.objectOf(PropTypes.bool).isRequired,
};

const mapDispatchToProps = {
  changeSetting,
  eraseAllData,
  resetSettings,
};

const mapStateToProps = (state) => ({ settings: state.animeReducer.settings });

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
