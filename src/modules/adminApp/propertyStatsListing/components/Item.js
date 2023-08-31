import { ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { COLORS, FONTS, ICONS, SCREENS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../constants'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Feather';


export const Item = ({ navigation, data }) => {
    const {
        UNIT_CODE, CUSTOMER_NAME, PRE_RESERVE_NO, AGENT_NAME,
        GROSS_AREA, UNIT_SPECS_NAME, SALE_VALUE, PRICE_VALUE,
        BOOKING_DATE, STATUS_NAME, AGEING
    } = data

    const viewReservation = () => {
        navigation.navigate("PropertyDetail", { detail: data })
    }
    const viewDetail = () => {
        let tempData = {
            STATUS: data.STATUS,
            ORG_ID: data.ORG_ID,
            ID: data.ID,
            UNIT_ID: data.UNIT_ID,
            PRE_RESERVE_NO: data.PRE_RESERVE_NO
        }
        navigation.navigate(SCREENS.DETAILDASHBOARD, { propertyData: tempData })
    }


    return (
        <View style={styles.itemContainer} >
            <ImageBackground
                source={ICONS.unitBG}
                style={styles.bgStyle}
                resizeMode="cover">
                <View style={styles.left}>
                    <View style={styles.top}>
                        <Text numberOfLines={1} style={styles.unitCode}>{UNIT_CODE}</Text>
                        <Text numberOfLines={2} style={styles.name}>{CUSTOMER_NAME}</Text>
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.area}>Booking Date - {moment(BOOKING_DATE).format('MM/DD/YYYY')}</Text>
                        <Text style={styles.area}>Status - {STATUS_NAME}</Text>
                        <Text style={styles.area}>Unit Dec - {UNIT_SPECS_NAME}</Text>
                        <Text style={styles.area}>Ageing - {AGEING}</Text>
                        <Text style={styles.area}>Res No. - {PRE_RESERVE_NO}</Text>
                        <Text style={styles.area}>Total Area - {GROSS_AREA} sqft</Text>
                    </View>
                    <View style={styles.bottom}>

                    </View>
                </View>
                <View style={styles.right}>
                    <View />
                    <ImageBackground source={ICONS.progressBar} style={styles.progressBar}>
                        <Text style={styles.salePrice} >Sale Price{'\n'}<Text style={{ fontSize: SCREEN_WIDTH * 0.03 }}>{SALE_VALUE.trim()}</Text></Text>
                    </ImageBackground>
                    <View style={{ width: '100%', marginBottom: -5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10 }} >
                        <TouchableOpacity onPress={() => navigation.navigate("DetailDashbaord", { propertyData: data })} style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={styles.detail} >View Detail</Text>
                            <Icon name='arrow-right' size={12} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        borderRadius: SCREEN_HEIGHT * 0.013,
        marginTop: 12,
        overflow: 'hidden'
    },
    bgStyle: {
        width: SCREEN_WIDTH * 0.90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SCREEN_HEIGHT * 0.01,
        height: Platform.OS == 'ios' ? SCREEN_HEIGHT * 0.23 : SCREEN_HEIGHT * 0.33
    },
    left: {
        width: '53%',
        // backgroundColor:'red'
    },
    right: {
        width: '45%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        // backgroundColor: 'green'
    },
    top: {
        marginBottom: 12
    },
    center: {
        marginBottom: 12
    },
    bottom: {

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
    btnStyle: {
        width: 107,
        height: 36,
        borderRadius: 11,
    },
    btnLable: {
        color: COLORS.normalText,
        fontSize: SCREEN_WIDTH * 0.029,
        fontFamily: FONTS.SemiBold,
        marginLeft: 5
    },
    btnImg: {
        width: 107,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: COLORS.secondry,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        shadowOpacity: 0.26,
    },
    progressBar: {
        width: 130,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center'
    },
    salePrice: {
        color: COLORS.green,
        textAlign: 'center',
        fontSize: SCREEN_WIDTH * 0.02,
        fontFamily: FONTS.Medium
    },
    paid: {
        color: COLORS.boldText,
        textAlign: 'center',
        fontSize: SCREEN_WIDTH * 0.018,
        fontFamily: FONTS.Medium,
        marginTop: SCREEN_HEIGHT * 0.002
    },
    due: {
        color: "#962424",
        textAlign: 'center',
        fontSize: SCREEN_WIDTH * 0.018,
        fontFamily: FONTS.Medium,
        marginTop: SCREEN_HEIGHT * 0.002
    },
    detail: {
        color: COLORS.boldText,
        textAlign: 'center',
        fontSize: SCREEN_WIDTH * 0.026,
        fontFamily: FONTS.Medium,
        marginRight: 6
    }
})