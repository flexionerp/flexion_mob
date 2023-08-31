import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '../../constants/colors'
import { FONTS, ICONS } from '../../constants'

const Splash = ({ navigation, route }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("AuthRoutes")
        }, 500)
        return () => {

        }
    }, [])



    return (
        <ImageBackground source={ICONS.bgImg} style={styles.container}>
            <View style={styles.main}>
                <View />
                <View style={{ alignItems: 'center', width: '100%' }} >
                    <Image source={ICONS.logoFlx} style={{ width: 241, height: 60 }} resizeMode="contain" />
                    <Text style={styles.label} >By Fakhruddin Properties</Text>
                    <Image source={ICONS.splashLine} style={{ width: '80%', marginTop: 14 }} resizeMode="contain" />
                </View>
                <Image source={ICONS.companyLogo} style={{ width: 100, height: 105 }} />
            </View>
        </ImageBackground>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bgColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        flex: 0.9,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        fontSize: 15,
        color: '#6188A6',
        fontFamily: FONTS.Medium,
        marginVertical: 5
    }
})