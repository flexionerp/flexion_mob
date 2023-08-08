import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { COLORS, FONTS, SCREENS } from '../../../constants'
import moment from 'moment'



export const Item = ({ navigation, data }) => {
    let { CUSTOMER_ID, NATIONALITY, CUSTOMERNAME, UNITS, RESERVE_SALES,
        INVOICED_AMOUNT, PRE_RESERVE_SALES, COLLECTED_AMOUNT,
        OUTSTANDING_AMOUNT, UNDEPOSITED_CHQ,
    } = data

    const viewSOA = () => {
        let soaUrl = `http://tvh.flexion.ae:9092//api/reports/customer/soa_customer/${CUSTOMER_ID}/true/33`;
        navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "Finance" })
    }

    return (
        <View style={styles.container}>
            <View style={styles.dataRow}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Customer ID</Text>
                    <Text style={styles.value} >{CUSTOMER_ID}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Customer Name</Text>
                    <Text style={styles.value} numberOfLines={2} >{CUSTOMERNAME}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Nationality</Text>
                    <Text style={styles.value} numberOfLines={2} >{NATIONALITY}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left]}>
                    <Text style={styles.label} >No. of Units</Text>
                    <Text style={styles.value} >{UNITS}</Text>
                </View>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Reserve Sales</Text>
                    <Text style={styles.value} >{RESERVE_SALES && Math.abs(RESERVE_SALES).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Pre Reserve Sales</Text>
                    <Text style={styles.value} >{PRE_RESERVE_SALES && Math.abs(PRE_RESERVE_SALES).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                </View>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Invoiced Amount</Text>
                    <Text style={styles.value} >{INVOICED_AMOUNT && Math.abs(INVOICED_AMOUNT).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Collected Amount</Text>
                    <Text style={styles.value} >{COLLECTED_AMOUNT && Math.abs(COLLECTED_AMOUNT).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                </View>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Outstanding Amount</Text>
                    <Text style={styles.value} >{OUTSTANDING_AMOUNT && Math.abs(OUTSTANDING_AMOUNT).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Undeposited Chq</Text>
                    <Text style={styles.value} >{UNDEPOSITED_CHQ}</Text>
                </View>
            </View>
            <View style={styles.btnsRow}>
                <TouchableOpacity onPress={viewSOA} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>SOA</Text>
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