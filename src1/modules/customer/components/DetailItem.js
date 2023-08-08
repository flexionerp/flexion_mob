import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { COLORS, FONTS, SCREENS, Url } from '../../../constants'
import moment from 'moment'


export const Item = ({ navigation, data }) => {
    let { CUSTOMER_ID, NAME, EMAIL, MOBILE, DOB,
        NATIONALITY, COUNTRY_NAME, CITY_NAME, 
        PASSPORT_NO, ADDRESS
     } = data

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
                    <Text style={styles.value} numberOfLines={2} >{NAME}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Email</Text>
                    <Text style={styles.value} >{EMAIL}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Contact No.</Text>
                    <Text style={styles.value} >{MOBILE}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Date Of Birth</Text>
                    <Text style={styles.value} >{moment(DOB).format('DD-MMM-YYYY')}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Nationality</Text>
                    <Text style={styles.value} >{NATIONALITY}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Country Name</Text>
                    <Text style={styles.value} >{COUNTRY_NAME}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >City</Text>
                    <Text style={styles.value} >{CITY_NAME}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Address</Text>
                    <Text style={styles.value} >{ADDRESS}</Text>
                </View>
            </View>
            
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Passport No.</Text>
                    <Text style={styles.value} >{PASSPORT_NO}</Text>
                </View>
            </View>
            
            <View style={styles.btnsRow}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.btnStyle]} >
                    <Text style={styles.btnLabel}>Back</Text>
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
        marginTop: 10,
        flexWrap: 'wrap'
    },
    btnStyle: {
        width: '95%',
        height: 40,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4
    },
    btnLabel: {
        color: COLORS.primary,
        fontSize: 13,
        fontFamily: FONTS.SemiBold,
        marginBottom: 2
    }

})