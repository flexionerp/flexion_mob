import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { COLORS, FONTS, SCREENS } from '../../../constants'
import moment from 'moment'



export const Item = ({ navigation, data }) => {
    let { PRE_RESERVE_NO, PRE_RESERVE_DATE, RESERVE_DATE, SALE_VALUE, SALES_STATUS,
        AGEING, UNIT_CODE, UNIT_SPECS_NAME, GROSS_AREA, CUSTOMER_NAME, AGENT_NAME, 
        NATIONALITY, BROKER_NAME, CR_AMT, PDCAMT, OUTSTANDING,
    } = data

    return (
        <View style={styles.container}>
            <View style={styles.dataRow}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Pre Res No.</Text>
                    <Text style={styles.value} >{PRE_RESERVE_NO}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Pre Res Date</Text>
                    <Text style={styles.value} numberOfLines={2} >{moment(PRE_RESERVE_DATE).format("DD-MMM-YYYY")}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Res Date</Text>
                    <Text style={styles.value} numberOfLines={2} >{moment(RESERVE_DATE).format("DD-MMM-YYYY")}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Sale Value</Text>
                    <Text style={styles.value} >{SALE_VALUE.trim()}</Text>
                </View>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Sale Status</Text>
                    <Text style={styles.value} >{SALES_STATUS}</Text>
                </View>
            </View>
           
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Aging</Text>
                    <Text style={styles.value} >{AGEING}</Text>
                </View>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Unit Code</Text>
                    <Text style={styles.value} >{UNIT_CODE}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Unit Spes Name</Text>
                    <Text style={styles.value} >{UNIT_SPECS_NAME}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Total Area</Text>
                    <Text style={styles.value} >{GROSS_AREA}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Customer</Text>
                    <Text style={styles.value} numberOfLines={2} >{CUSTOMER_NAME}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Agent</Text>
                    <Text style={styles.value} numberOfLines={2} >{AGENT_NAME}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Nationality</Text>
                    <Text style={styles.value} numberOfLines={2} >{NATIONALITY}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Broker</Text>
                    <Text style={styles.value} numberOfLines={2} >{BROKER_NAME}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Outstanding</Text>
                    <Text style={styles.value} >{OUTSTANDING && Math.abs(OUTSTANDING).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                </View>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Collected Amount</Text>
                    <Text style={styles.value} >{CR_AMT && Math.abs(CR_AMT).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >PDC Amount</Text>
                    <Text style={styles.value} >{PDCAMT}</Text>
                </View>
            </View>
            <View style={styles.btnsRow}>
                <TouchableOpacity onPress={() => { }} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>View</Text>
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