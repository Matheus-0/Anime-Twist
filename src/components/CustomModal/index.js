import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import styles from './styles';

const CustomModal = ({
  isVisible, onNegativeResponse, onPositiveResponse, text,
}) => (
  <Modal
    animationIn="fadeIn"
    animationOut="fadeOut"
    coverScreen={false}
    isVisible={isVisible}
    onBackButtonPress={onNegativeResponse}
    onBackdropPress={onNegativeResponse}
    style={styles.modal}
    useNativeDriver
  >
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          activeOpacity={0.875}
          onPress={onNegativeResponse}
          style={styles.button}
        >
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.875}
          onPress={onPositiveResponse}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

CustomModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onNegativeResponse: PropTypes.func.isRequired,
  onPositiveResponse: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default CustomModal;
