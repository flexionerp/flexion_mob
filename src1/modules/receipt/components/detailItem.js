
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { COLORS, FONTS } from '../../../constants'
import moment from 'moment'



export const Item = ({ navigation, data }) => {
    let {
        ID, MOD_OF_PAY, AMOUNT, CHEQUE_NO, CHEQUE_DATE, BANK,
        BRANCH, NARRATION, CATEGORY, IS_CHEQUE_CANCELLED
    } = data

    return (
        <View style={styles.container}>
            <View style={styles.dataRow}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >ID</Text>
                    <Text style={styles.value} >{ID}</Text>
                </View>
            </View>

            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left]}>
                    <Text style={styles.label} >MOD of pay</Text>
                    <Text style={styles.value} >{MOD_OF_PAY}</Text>
                </View>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Cheque #</Text>
                    <Text style={styles.value} >{CHEQUE_NO}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Due Date</Text>
                    <Text style={styles.value} >{moment(CHEQUE_DATE).format("MM-DD-YYYY")}</Text>
                </View>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Bank</Text>
                    <Text style={styles.value} >{BANK}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Branch</Text>
                    <Text style={styles.value} >{BRANCH}</Text>
                </View>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Amount</Text>
                    <Text style={styles.value} >{AMOUNT && Math.abs(AMOUNT).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                </View>
            </View>

            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Narration</Text>
                    <Text style={[styles.value, { width: '80%' }]} numberOfLines={3} >{NARRATION}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Category</Text>
                    <Text style={styles.value} >{CATEGORY}</Text>
                </View>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Cheque Status</Text>
                    <Text style={styles.value} >{IS_CHEQUE_CANCELLED}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Cancellation Reason</Text>
                    <Text style={styles.value} numberOfLines={2} ></Text>
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
        fontFamily: FONTS.Regular,
        textAlign:'right'
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
