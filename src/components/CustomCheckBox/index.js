import CheckBox from '@react-native-community/checkbox';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';

const CustomCheckBox = ({
  onValueChange, style, text, value,
}) => (
  <View style={[styles.container, style]}>
    <CheckBox
      value={value}
      onValueChange={onValueChange}
      tintColors={{
        true: '#e63232',
        false: 'gray',
      }}
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
