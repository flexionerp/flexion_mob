import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, ICONS } from '../constants'
import { useSelector } from 'react-redux'


export const UserDetail = () => {
    const { userDetail, isCustomer } = useSelector(state => state.user);

    return (
        <View style={styles.container}>
            <View style={{ width: '95%' }} >
                <Text style={styles.hello} >Hello,</Text>
                <Text numberOfLines={1} style={styles.name} >{userDetail && userDetail.FIRST_NAME + " " + userDetail.LAST_NAME}!</Text>
                {/* <Text style={styles.bioLink} >Copy your bio link and paste it in your profile to let people find you.</Text> */}
            </View>
            <Image source={''} style={{ width: 100, height: 100 }} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 12
    },
    hello: {
        color: COLORS.primary,
        fontFamily: FONTS.Regular,
        fontSize: 22
    },
    name: {
        color: COLORS.primary,
        fontFamily: FONTS.Bold,
        fontSize: 26
    },
    bioLink: {
        color: COLORS.primary,
        fontFamily: FONTS.Regular,
        fontSize: 10
    },
})