import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, ICONS } from '../constants'
import Share from 'react-native-share';


const Header = ({ navigation, label, url }) => {

    const onShare = async () => {
        const options = {
            title: 'Flexion SOA',
            message: `Check out statement of account for selected property`,
            url: url
        };
        try {
            Share.open(options)
                .then(res => {
                    alert("Statement of account shared successfully")
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
                <Text style={styles.label} >{label}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { }}>
                        <Image source={ICONS.download} style={[styles.bell, { marginRight: 8 }]} resizeMode="contain" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onShare}>
                        <Image source={ICONS.share} style={styles.bell} resizeMode="contain" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        // marginBottom: '5%'
    },
    main: {
        width: '90%',
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
        color: COLORS.boldText,
        fontSize: 22,
        fontFamily: FONTS.Bold,
        textAlign: 'center'
    }
})
