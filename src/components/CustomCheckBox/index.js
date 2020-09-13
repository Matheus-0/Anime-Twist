import CheckBox from '@react-native-community/checkbox';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const CustomCheckBox = ({
  onPress, style, text, value,
}) => (
  <TouchableOpacity
    activeOpacity={1}
    onPress={onPress}
    style={[styles.container, style]}
  >
    <CheckBox
      value={value}
      onValueChange={onPress}
      tintColors={{
        true: '#e63232',
        false: 'gray',
      }}
    />

    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

CustomCheckBox.defaultProps = {
  style: {},
};

CustomCheckBox.propTypes = {
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape(),
  text: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
};

export default CustomCheckBox;
