import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { COLORS, FONTS } from '../constants'

export const RegularBtn = ({ label, size, onClick, bgColor }) => {
    return (
        <TouchableOpacity onPress={() => onClick()} style={[styles.container, { width: size, backgroundColor: bgColor }]} >
            <Text style={styles.labelStyle} >{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '60%',
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelStyle: {
        color: COLORS.secondry,
        fontSize: 15,
        fontFamily: FONTS.Bold,
        marginBottom: 4
    }
})
