import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, ICONS, SCREEN_WIDTH } from '../constants'
import Icon from 'react-native-vector-icons/Feather';

export const CardviewBtn = ({ label, size, onClick, bgColor }) => {
    return (
        <TouchableOpacity style={{ width: size }} onPress={() => onClick()} >
            <ImageBackground source={ICONS.ppBG} style={[styles.container, { width: '100%' }]} resizeMode="cover" >
                <Text style={styles.labelStyle} >{label}</Text>
                <Icon name='arrow-right' size={14} />
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 35,
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 5 },
        elevation: 5,
        shadowRadius: 4,
        shadowOpacity: 0.26,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    labelStyle: {
        color: COLORS.normalText,
        fontSize: SCREEN_WIDTH * 0.026,
        fontFamily: FONTS.Medium,
        marginRight: 6
    }
})
