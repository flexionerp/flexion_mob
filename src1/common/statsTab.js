import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, CUSTOMWIDTH, FONTS, SCREENS } from '../constants'




export const StatsTab = ({ units, navigation }) => {

    useEffect(() => {

        return () => {

        }
    }, [])


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { }} style={styles.left} >
                <Text style={styles.leftCount}>100</Text>
                <Text style={styles.leftLabel}>TOTAL PROPERTY</Text>
            </TouchableOpacity>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '85%',
        alignItems: 'center',
        marginVertical: 12,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    },
    left: {
        width: '100%',
        backgroundColor: COLORS.primary,
        height: CUSTOMWIDTH("40"),
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
   
    leftCount: {
        color: COLORS.secondry,
        fontFamily: FONTS.Bold,
        fontSize: 50
    },
    leftLabel: {
        color: COLORS.secondry,
        fontFamily: FONTS.SemiBold,
        fontSize: 14,
    },
    rightCount: {
        color: COLORS.black,
        fontFamily: FONTS.Bold,
        fontSize: 28
    },
    rightLabel: {
        color: "#354052",
        fontFamily: FONTS.Bold,
        fontSize: 11,
        marginLeft: '10%'
    }
})