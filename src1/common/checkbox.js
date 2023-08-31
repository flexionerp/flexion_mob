import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';


export const CheckBox = ({ value, getValue }) => {
    function onStateSet() {
        getValue(!value);
    }
    return (
        <TouchableOpacity
            onPress={() => onStateSet()}
            style={[styles.main, !value && styles.inactive, value && styles.active]}>
            <Icon name="checkmark" size={14} color={'white'} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    main: {
        width: 18,
        height: 18,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inactive: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: COLORS.lightGreen,
    },
    active: {
        backgroundColor: COLORS.lightGreen,
    },
});
