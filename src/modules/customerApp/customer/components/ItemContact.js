import { ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { COLORS, FONTS, ICONS, SCREEN_HEIGHT, SCREEN_WIDTH, } from '../../../../constants'
import { CheckBox } from '../../../../common/checkbox'
import Icon from 'react-native-vector-icons/Feather';


export const Item = ({ navigation, data }) => {
    let { CONTACT_TYPE, VALUE, IS_PRIMARY } = data


    return (
        <View style={styles.borderContainer} >
            <ImageBackground
                source={ICONS.unitBG}
                style={styles.container}
                resizeMode='cover'>
                <View style={styles.left}>
                    <View style={styles.top}>
                        <Text style={styles.unitCode}>{CONTACT_TYPE}</Text>
                        <Text style={styles.name}>{VALUE}</Text>
                    </View>
                    <View style={styles.center}>
                        <View style={[styles.dataRow, { marginTop: 0 }]}>
                            <Text style={[styles.area, {}]}>Is Primary - </Text>
                            <CheckBox
                                value={IS_PRIMARY == 1}
                                getValue={() => { }}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.right}>
                    <View />
                    <View />
                    <View />
                    {/* <View style={{ width: '100%', marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 2 }} >
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Icon name='arrow-left' size={12} />
                            <Text style={styles.detail} >Go Back</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    borderContainer: {
        borderRadius: SCREEN_HEIGHT * 0.006,
        overflow: 'hidden',
        marginTop: 12,
        borderColor: COLORS.borderColor,
        borderWidth: 1
    },
    container: {
        width: SCREEN_WIDTH * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SCREEN_HEIGHT * 0.01,
        height: Platform.OS == 'ios' ? SCREEN_HEIGHT * 0.13 : SCREEN_HEIGHT * 0.16,
    },
    left: {
        width: '78%',
    },
    right: {
        width: '20%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    top: {
        marginBottom: 12
    },
    center: {
        marginBottom: 12
    },
    bottom: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    unitCode: {
        color: COLORS.boldText,
        fontSize: SCREEN_WIDTH * 0.05,
        fontFamily: FONTS.Bold
    },
    name: {
        color: COLORS.boldText,
        fontSize: SCREEN_WIDTH * 0.037,
        fontFamily: FONTS.Medium
    },
    area: {
        color: COLORS.normalText,
        fontSize: SCREEN_WIDTH * 0.029,
        fontFamily: FONTS.Medium
    },
    dataRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    detail: {
        color: COLORS.boldText,
        textAlign: 'center',
        fontSize: SCREEN_WIDTH * 0.026,
        fontFamily: FONTS.Medium,
        marginLeft: 6
    },
})