import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS } from '../../../constants';



export const RowItem = ({ label, value, onClick }) => {

    return (
        <TouchableOpacity onPress={() => onClick()} style={styles.container} >
            <View style={styles.labelRow} >
                <Text style={styles.labelStyle} >{label}</Text>
                <Text style={styles.valueStyle} >{value}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 12
    },
    labelRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    labelStyle: {
        color: COLORS.boldText,
        fontSize: 14,
        fontFamily: FONTS.SemiBold
    },
    valueStyle: {
        color: COLORS.normalText,
        fontSize: 13,
        fontFamily: FONTS.Regular
    }

})