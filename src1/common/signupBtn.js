import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, } from '../constants'
import { CardView } from './cardView'


export const SignupBtn = ({ lable, onClick, size }) => {
    return (
        <TouchableOpacity onPress={() => onClick()} style={{ width: size }} >
            <CardView style={styles.mainCardView}>
                <Text style={styles.labelStyle} >{lable}</Text>
            </CardView>
        </TouchableOpacity>

    )
}


const styles = StyleSheet.create({
    mainCardView: {
        width: '100%',
        height: 45,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    labelStyle: {
        color: COLORS.bgSplash,
        fontFamily: FONTS.VerdanaBold,
        fontSize: 19,
        marginBottom: 2
    }
})
