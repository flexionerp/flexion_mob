import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { COLORS, FONTS } from '../../../constants'
import moment from 'moment'



export const Item = ({ navigation, data }) => {
    let { STATUS_NAME, STATUS_CHANGE_DATE, LOGIN_NAME } = data
    

    return (
        <View style={styles.container}>
            
            <View style={styles.dataRow}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Status Name </Text>
                    <Text style={styles.value} numberOfLines={2} >{STATUS_NAME}</Text>
                </View>
            </View>

            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Created By</Text>
                    <Text style={styles.value} >{LOGIN_NAME}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Status Change Date</Text>
                    <Text style={styles.value} >{moment(STATUS_CHANGE_DATE).format("MM/DD/YYYY hh:mm A")}</Text>
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
        marginBottom: 10
    },
    btnStyle: {
        width: 140,
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