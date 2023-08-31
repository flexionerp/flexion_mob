import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, ICONS, } from '../constants'



export const BtnLI = ({ lable, onClick, size, icon }) => {
    return (
        <TouchableOpacity onPress={() => onClick()} style={[styles.mainCardView, { width: size }]} >
            <Image source={icon} />
            <Text style={styles.labelStyle} >{lable}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    mainCardView: {
        width: '100%',
        height: 60,
        shadowColor: '#00000080',
        elevation:5,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.26,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#70707026',
        borderWidth: 1,
        justifyContent:'center'
    },
    labelStyle: {
        color: COLORS.secondry,
        fontFamily: FONTS.Bold,
        fontSize: 16,
        marginBottom: 2,
        textAlign:'center',
        marginHorizontal:'7%'
    }
})
