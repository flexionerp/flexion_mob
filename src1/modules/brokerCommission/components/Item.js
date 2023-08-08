import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { COLORS, FONTS, SCREENS } from '../../../constants'
import moment from 'moment'



export const Item = ({ navigation, data }) => {
    let { BROKER_ID, NAME, IS_VERIFIED_BY, IS_CONFIRMED_BY,
        CMONTH, STATUS, APPROVAL_USER
    } = data

    const viewDetail = () => {
        navigation.navigate(SCREENS.COMMISSIONDETAIL, { brokerId: BROKER_ID, cMonth: CMONTH })
    }
    const viewReport = () =>{
        let soaUrl = `http://tvh.flexion.ae:9092/api/Reports/customer/broker_comm/%7BPN_RESERVATION_HDR.BROKER_ID%7D=${BROKER_ID}/TRUE/33/0`;
        navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "View Report" })
    }

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
                    <Text style={styles.value} >{CMONTH}</Text>

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
                    <Text style={styles.label} >Approval User</Text>
                    <Text style={styles.value} >{APPROVAL_USER}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Status</Text>
                    <Text style={styles.value} >{STATUS}</Text>
                </View>
            </View>
            <View style={styles.btnsRow}>
                <TouchableOpacity onPress={viewReport} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>View Report</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={viewDetail} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>View Detail</Text>
                </TouchableOpacity>
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
        marginTop: 10
    },
    btnStyle: {
        width: 100,
        height: 26,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnLabel: {
        color: COLORS.primary,
        fontSize: 11,
        fontFamily: FONTS.SemiBold,
        marginBottom: 2
    }

})