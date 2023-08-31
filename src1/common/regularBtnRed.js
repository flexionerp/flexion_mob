import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { COLORS, FONTS } from '../constants'

export const RegularBtnRed = ({ label, size, onClick }) => {
    return (
        <TouchableOpacity onPress={() => onClick()} style={[styles.container]} >
            <Text style={styles.labelStyle} >{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 25,
        backgroundColor: COLORS.primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8
    },
    labelStyle: {
        color: COLORS.secondry,
        fontSize: 11,
        fontFamily: FONTS.Medium
    }
})
