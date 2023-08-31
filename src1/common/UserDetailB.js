import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, ICONS } from '../constants'
import { useSelector } from 'react-redux'


export const UserDetailB = () => {

    return (
        <View style={styles.main} >
            <View style={{ height: 30 }} />
            <View style={styles.container}>
                <View style={{ width: '60%' }} >
                    <Text style={styles.hello} >Hello,</Text>
                    <Text numberOfLines={1} style={styles.name} >Rashid Ali!</Text>
                    <Text style={styles.bioLink} >Copy your bio link and paste it in your profile to let people find you.</Text>
                </View>
                <Image source={ICONS.userIcon} style={{ width: 100, height: 100 }} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    main: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        height: 230,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    container: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    hello: {
        color: COLORS.secondry,
        fontFamily: FONTS.Regular,
        fontSize: 22
    },
    name: {
        color: COLORS.secondry,
        fontFamily: FONTS.Bold,
        fontSize: 26
    },
    bioLink: {
        color: COLORS.secondry,
        fontFamily: FONTS.Regular,
        fontSize: 10
    },
})