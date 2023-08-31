import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FONTS, ICONS } from '../constant';
export const CardView = ({ data, navigation }) => {
   
    return (
        <View style={styles.card}>
            
        </View>
    );
};
const styles = StyleSheet.create({
    card: {
        width: wp('85%'),
        shadowColor: '#00000080',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        shadowOpacity: 0.26,
        backgroundColor: 'rgba(44, 153, 198, 0.5)',
        borderRadius: 4,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#70707026',
        borderWidth: 1,
    },
});