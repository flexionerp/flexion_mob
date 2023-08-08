import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, FONTS, ICONS, SCREENS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../constants'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Feather';


export const Item = ({ navigation, data }) => {
    let { BROKER_ID, NAME, IS_VERIFIED_BY, IS_CONFIRMED_BY,
        CMONTHS, COMMISSION_PER, COMM_MONTH, COMMISSION_AMT,
        PAYMONTH, UNIT_CODE, CUSTOMER_NAME, RESERVE_DATE,
        BOOKING_DATE, SALE_VALUE, PRE_RESERVE_NO, CUSTOMER_ID,
        IS_CONFIRMED
    } = data

    useEffect(() => {

        return () => {

        }
    }, [])

    return (
        <View style={styles.borderContainer} >
            <ImageBackground
                source={ICONS.unitBG}
                style={styles.container}
                resizeMode='cover'>
                <View style={styles.left}>
                    <View style={styles.top}>
                        <Text style={styles.unitCode}>{NAME}</Text>
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.area}>Broker ID - {BROKER_ID}</Text>
                        <Text style={styles.area}>C-Month - {CMONTH}</Text>
                        <Text style={styles.area}>Verified By - {IS_VERIFIED_BY}</Text>
                        <Text style={styles.area}>Confirmed By - {IS_CONFIRMED_BY}</Text>
                        <Text style={styles.area}>Approval User - {APPROVAL_USER}</Text>
                        <Text style={styles.area}>Status - {STATUS}</Text>
                        <Text style={styles.area}>Commission Per - {COMMISSION_PER}</Text>
                        <Text style={styles.area}>Commission Month - {COMM_MONTH}</Text>
                        <Text style={styles.area}>Commission Amount - {COMMISSION_AMT}</Text>
                        <Text style={styles.area}>Payment Month - {PAYMONTH}</Text>
                        <Text style={styles.area}>Unit Code - {UNIT_CODE}</Text>
                        <Text style={styles.area}>Customer Name - {CUSTOMER_NAME}</Text>
                        <Text style={styles.area}>Customer ID - {CUSTOMER_ID}</Text>
                        <Text style={styles.area}>Reserve Date - {moment(RESERVE_DATE).format("DD-MMM-YYYY")}</Text>
                        <Text style={styles.area}>Booking Date - {moment(BOOKING_DATE).format("DD-MMM-YYYY")}</Text>
                        <Text style={styles.area}>Sale Value - {SALE_VALUE}</Text>
                        <Text style={styles.area}>Pre Reserve No - {PRE_RESERVE_NO}</Text>
                        <Text style={styles.area}>Is Confirmed - {IS_CONFIRMED}</Text>
                    </View>
                    <View style={styles.bottom} />
                </View>
                <View style={styles.right}>
                    <View />
                    <View />
                    <View />
                    <View style={{ width: '100%', marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 2 }} >
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Icon name='arrow-left' size={12} />
                            <Text style={styles.detail} >Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>

    )
}

const styles = StyleSheet.create({
    borderContainer: {
        borderRadius: SCREEN_HEIGHT * 0.019,
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
        height: SCREEN_HEIGHT * 0.28,
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
        // justifyContent: 'space-between',
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
    btnLable: {
        color: COLORS.normalText,
        fontSize: SCREEN_WIDTH * 0.025,
        fontFamily: FONTS.Medium,
        marginLeft: 5
    },

    btnRow: {
        flexDirection: 'row',
        alignItems: 'center'
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
        fontSize: SCREEN_WIDTH * 0.029,
        fontFamily: FONTS.Bold
    },
    paid: {
        color: COLORS.boldText,
        textAlign: 'center',
        fontSize: SCREEN_WIDTH * 0.023,
        fontFamily: FONTS.SemiBold,
        marginTop: SCREEN_HEIGHT * 0.006
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
    }
})