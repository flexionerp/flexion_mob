import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { COLORS, FONTS, SCREENS } from '../../../constants'
import moment from 'moment'


export const Item = ({ navigation, data }) => {

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
        <View style={styles.container}>
            <View style={[styles.dataRow]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Customer Name</Text>
                    <Text style={styles.value} numberOfLines={2} >{data.CUSTOMER_NAME}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Nationality</Text>
                    <Text style={styles.value} >{data.NATIONALITY}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Pre Reserve No</Text>
                    <Text style={styles.value} >{data.PRE_RESERVE_NO}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Pre Reserve Date</Text>
                    <Text style={styles.value} >{moment(data.PRE_RESERVE_DATE).format('MM-DD-YYYY')}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Reservation Date</Text>
                    <Text style={styles.value} >{moment(data.RESERVE_DATE).format('MM-DD-YYYY')}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Unit Code</Text>
                    <Text style={styles.value} >{data.UNIT_CODE}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Broker Name</Text>
                    <Text style={styles.value} numberOfLines={2} >{data.BROKER_NAME}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={styles.left}>
                    <Text style={styles.label} >Agent</Text>
                    <Text style={styles.value} >{data.AGENT_NAME}</Text>
                </View>
                <View style={styles.left}>
                    <Text style={styles.label} >Sale Price</Text>
                    <Text style={styles.value} >{0}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={styles.left}>
                    <Text style={styles.label} >Status</Text>
                    <Text style={styles.value} >{data.STATUS_NAME}</Text>
                </View>
                <View style={styles.left}>
                    <Text style={styles.label} >Total Area</Text>
                    <Text style={styles.value} >{data.GROSS_AREA}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={styles.left}>
                    <Text style={styles.label} >Unit Desc</Text>
                    <Text style={styles.value} >{data.UNIT_SPECS_NAME}</Text>
                </View>
                <View style={styles.left}>
                    <Text style={styles.label} >Ageing</Text>
                    <Text style={styles.value} >{data.AGEING}</Text>
                </View>
            </View>

            <View style={[styles.btnsRow, { marginTop: 18 }]}>
                {/* <TouchableOpacity onPress={() => viewReservation()} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>Reservation Details</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => viewDetail()} style={[styles.btnStyle, { marginRight: 5, width: 98 }]} >
                    <Text style={styles.btnLabel}>View Details</Text>
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
        width: 125,
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