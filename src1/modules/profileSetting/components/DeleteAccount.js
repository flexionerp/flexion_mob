import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS } from '../../../constants';



export const DeleteAccount = ({ label, onClick }) => {

    return (
        <View  style={styles.container} >
            <View style={styles.labelRow} >
                <Text style={styles.labelStyle} >{label}</Text>
                <TouchableOpacity style={styles.deleteBtn} onPress={() => onClick()}>
                <Text style={styles.valueStyle} >DELETE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '95%',
        alignItems: 'center',
        marginTop: 10,
        borderBottomColor: COLORS.borderColor,
        borderBottomWidth: 1,
        paddingBottom: 10,
        alignSelf:'center'
    },
    labelRow: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    labelStyle: {
        color: COLORS.darkYellow,
        fontSize: 15,
        fontFamily: FONTS.SemiBold
    },
    valueStyle: {
        color: COLORS.secondry,
        fontSize: 13,
        fontFamily: FONTS.Regular
    },
    deleteBtn: { width: 90, height: 30, backgroundColor: '#FE0000', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }

})