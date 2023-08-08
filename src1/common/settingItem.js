import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { COLORS, FONTS } from '../constants';


export const SettingItem = ({ label, onClick, icon }) => {
    return (
        <TouchableOpacity onPress={() => onClick()} style={{ marginTop: 15 }} >
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#C3DBFF', '#BEE4EB', '#B9EBD9']} style={styles.container} >
                <Text style={styles.labelStyle} >{label}</Text>
                <Image source={icon} style={{ width: 60, height: 60 }} resizeMode="contain" />
            </LinearGradient>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        width: wp('90'),
        height: 81,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 4,
        flexDirection: 'row',
        paddingHorizontal: '5%'
    },
    labelStyle: {
        color: COLORS.primary,
        fontSize: wp('5.5'),
        fontFamily: FONTS.Bold
    }
})
