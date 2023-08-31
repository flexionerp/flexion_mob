import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { COLORS, FONTS, SCREENS } from '../../../constants'
import moment from 'moment'



export const Item = ({ navigation, data }) => {
    let { APPROVAL_TYPE, STATUS, COMMENTS, SUBMITTED_DT, ACTION_DT, APPROVER_NAME } = data

    return (
        <View style={styles.container}>
            <View style={styles.dataRow}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Approval Type</Text>
                    <Text style={styles.value} >{APPROVAL_TYPE}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Submit Date</Text>
                    <Text style={styles.value} >{moment(SUBMITTED_DT).format("MM-DD-YYYY hh:mm A")}</Text>
                </View>
            </View>

            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Approval Name</Text>
                    <Text style={styles.value} >{APPROVER_NAME}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Status</Text>
                    <Text style={styles.value} >{STATUS}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Action Date</Text>
                    <Text style={styles.value} >{moment(ACTION_DT).format("MM-DD-YYYY hh:mm A")}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Comments</Text>
                    <Text style={styles.value} >{COMMENTS}</Text>
                </View>
            </View>
            
           

            {/* <View style={styles.btnsRow}>
                <TouchableOpacity onPress={() => { }} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>PPlan</Text>
                </TouchableOpacity>
            </View> */}

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