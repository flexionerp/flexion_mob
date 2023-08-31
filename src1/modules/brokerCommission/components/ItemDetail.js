import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, FONTS } from '../../../constants'
import moment from 'moment'



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
        <View style={styles.container}>
            <View style={styles.dataRow}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Broker ID</Text>
                    <Text style={styles.value} >{BROKER_ID}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Broker Name</Text>
                    <Text style={styles.value} numberOfLines={2} >{NAME}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >C-Month</Text>
                    <Text style={styles.value} >{CMONTHS}</Text>

                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Verified By</Text>
                    <Text style={styles.value} >{IS_VERIFIED_BY}</Text>
                </View>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Confirmed By</Text>
                    <Text style={styles.value} >{IS_CONFIRMED_BY}</Text>
                </View>
            </View>

            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Commission Per</Text>
                    <Text style={styles.value} >{COMMISSION_PER}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Commission Month</Text>
                    <Text style={styles.value} >{COMM_MONTH}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Commission Amount</Text>
                    <Text style={styles.value} >{COMMISSION_AMT}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Payment Month</Text>
                    <Text style={styles.value} >{PAYMONTH}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Unit Code</Text>
                    <Text style={styles.value} >{UNIT_CODE}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Customer Name</Text>
                    <Text style={styles.value} >{CUSTOMER_NAME}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Customer ID</Text>
                    <Text style={styles.value} >{CUSTOMER_ID}</Text>
                </View>
            </View>

            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Reserve Date</Text>
                    <Text style={styles.value} >{moment(RESERVE_DATE).format("DD-MMM-YYYY")}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Booking Date</Text>
                    <Text style={styles.value} >{moment(BOOKING_DATE).format("DD-MMM-YYYY")}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Sale Value</Text>
                    <Text style={styles.value} >{SALE_VALUE}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Pre Reserve No</Text>
                    <Text style={styles.value} >{PRE_RESERVE_NO}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Is Confirmed</Text>
                    <Text style={styles.value} >{IS_CONFIRMED}</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: COLORS.primary,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15
    },

    dataRow: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    left: {
        width: '47.5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
        borderBottomWidth: 1,
        paddingBottom: 5
    },
    label: {
        color: COLORS.secondry,
        fontSize: 11,
        fontFamily: FONTS.SemiBold
    },
    value: {
        color: COLORS.secondry,
        fontSize: 9,
        fontFamily: FONTS.Regular
    },
    btnsRow: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 5,
        flexWrap: 'wrap'
    },
    btnStyle: {
        width: 110,
        height: 26,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    btnLabel: {
        color: COLORS.primary,
        fontSize: 10,
        fontFamily: FONTS.SemiBold,
        marginBottom: 2
    }

})