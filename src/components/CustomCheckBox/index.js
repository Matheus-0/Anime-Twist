import CheckBox from 'expo-checkbox';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

const CustomCheckBox = ({
  onValueChange, style, text, value,
}) => (
  <View style={[styles.container, style]}>
    <CheckBox
      color="#e63232"
      onValueChange={onValueChange}
      value={value}
    />

    <Text style={styles.text}>{text}</Text>
  </View>
);

CustomCheckBox.defaultProps = {
  style: {},
};

CustomCheckBox.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  style: PropTypes.shape(),
  text: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
};

export default CustomCheckBox;
