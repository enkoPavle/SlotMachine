import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {colors} from '../../../utils/colors';

const ButtonShadow = ({
  containerStyle,
  title,
  titleColor,
  onPress,
  disabled,
}) => {
  return (
    <View style={{...containerStyle}}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={1}>
        <Text
          style={{
            ...styles.title,
            color: disabled
              ? colors.deep_gray
              : titleColor
              ? titleColor
              : colors.black,
          }}>
          {title ? title : 'Button'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonShadow;

const styles = StyleSheet.create({
  container: {
    minWidth: 148,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',

    paddingVertical: 16,
    borderRadius: 32,
    shadowColor: '#111111',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
  },
});
