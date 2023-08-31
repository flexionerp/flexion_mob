import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, ICONS } from '../constants'
import Share from 'react-native-share';


const Header = ({ navigation, label, url }) => {

    const onShare = async () => {
        const options = {
            title: 'Flexion Booking Form',
            message: `Check out this booking on Flexion`,
            url: url
        };
        try {
            Share.open(options)
                .then(res => {
                    alert("Booking form shared successfully")
                })
                .catch(err => {
                    err && console.log(err);
                });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={ICONS.back} style={styles.menu} />
                </TouchableOpacity>

                <Text style={styles.label} >{label}</Text>
                <TouchableOpacity onPress={onShare}>
                    <Image source={ICONS.shareWhite} style={styles.bell} resizeMode="contain" />
                </TouchableOpacity>
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
