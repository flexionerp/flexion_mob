import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { COLORS, FONTS, ICONS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../constants'
import moment from 'moment'



export const Item = ({ navigation, data }) => {
    let { STATUS_NAME, STATUS_CHANGE_DATE, LOGIN_NAME } = data


    return (
        <View style={styles.borderContainer} >
            <ImageBackground
                source={ICONS.unitBG}
                style={styles.container}
                resizeMode='cover'>
                <View style={styles.left}>
                    <View style={styles.top}>
                        <Text style={styles.unitCode}>{STATUS_NAME}</Text>
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.area}>Created By - {LOGIN_NAME}</Text>
                        <Text style={styles.area}>Status Change Date - {moment(STATUS_CHANGE_DATE).format('MM/DD/YYYY hh:mm A')}</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <View />
                    <View />
                    <View />
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    borderContainer: {
        borderRadius: SCREEN_HEIGHT * 0.009,
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
        height: SCREEN_HEIGHT * 0.12,
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
})