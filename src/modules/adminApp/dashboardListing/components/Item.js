import { Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { COLORS, FONTS, ICONS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../constants'
import { useDispatch } from 'react-redux'
import { setLoader } from '../../../../redux/loader/loader.action'
import Icon from 'react-native-vector-icons/Feather';

export const Item = ({ navigation, data }) => {
    const dispatch = useDispatch();
    const {
        UNIT_CODE,
        UNIT_NAME,
        GROSS_AREA,
        PROPERTY_CODE,
        STATUS,
        UNIT_ID
    } = data;


    const btnClicked = () => {
        dispatch(setLoader(true))
        navigation.navigate("PreReservedForm", { unit_id: UNIT_ID })
    }


    return (
        <View style={styles.borderContainer} >
            <ImageBackground
                source={ICONS.unitBG}
                style={styles.container}
                resizeMode='cover'>
                <View style={styles.left}>
                    <View style={styles.top}>
                        <Text style={styles.unitCode}>{UNIT_CODE}</Text>
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.area}>Unit Name - {UNIT_NAME}</Text>
                        <Text style={styles.area}>Gross Area - {GROSS_AREA}</Text>
                        <Text style={styles.area}>Property Code - {PROPERTY_CODE}</Text>
                        <Text style={styles.area}>Status - {STATUS}</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <View />
                    <View />
                    <TouchableOpacity onPress={btnClicked}>
                        <ImageBackground source={ICONS.ppBG} style={styles.btnImg} resizeMode="cover" >
                            <View style={styles.btnRow} >
                                <Text style={styles.btnLable}>Pre-Reserve</Text>
                            </View>
                            <View style={{ width: '85%', alignItems: 'flex-end' }} >
                                <Icon name='arrow-right' size={14} />
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
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
        height: Platform.OS == 'ios' ? SCREEN_HEIGHT * 0.15 : SCREEN_HEIGHT * 0.22,
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
    btnStyle: {
        width: 100,
        height: 26,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4
    },
    btnLabel: {
        color: COLORS.primary,
        fontSize: 11,
        fontFamily: FONTS.SemiBold,
        marginBottom: 2
    },
    btnLable: {
        color: COLORS.normalText,
        fontSize: SCREEN_WIDTH * 0.025,
        fontFamily: FONTS.Medium,
        marginLeft: 5
    },
    btnImg: {
        width: 80,
        height: 46,
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 5 },
        elevation: 5,
        shadowRadius: 4,
        shadowOpacity: 0.26,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
});