import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, ICONS } from '../constants'


const Header = ({ navigation, label }) => {
    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.menu} />
                <Text style={styles.label} >{label}</Text>
                <View style={styles.bell} />
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        marginBottom: 1,
        backgroundColor: COLORS.primary
    },
    main: {
        width: '85%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menu: {
        width: 27,
        height: 18,
    },
    bell: {
        width: 23,
        height: 22,
    },
    label: {
        color: COLORS.secondry,
        fontSize: 22,
        fontFamily: FONTS.Bold
    }
})
