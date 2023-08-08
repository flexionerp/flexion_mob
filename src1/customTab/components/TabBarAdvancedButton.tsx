import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabBg } from '../svg';
import { ICONS } from "../../constants";

type Props = BottomTabBarButtonProps & {
  bgColor?: string;
};

export const TabBarAdvancedButton: React.FC<Props> = ({
  bgColor,
  ...props
}) => (
  <View
    style={styles.container}
    pointerEvents="box-none"
  >
    <TabBg
      color={bgColor}
      style={styles.background}
    />
    <TouchableOpacity
      style={styles.button}
      onPress={props.onPress}
    >
      <Image
        source={ICONS.infinite}
        style={{ width: 24, height: 24 }}
        resizeMode={'contain'}
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 75,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
  },
  button: {
    top: -22.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 27,
    backgroundColor: '#243664',
  },
});
