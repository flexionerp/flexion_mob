import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { COLORS, FONTS, SCREENS } from '../../../constants'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { setLoader } from '../../../redux/loader/loader.action'


export const Item = ({ navigation, data, label }) => {
    const dispatch = useDispatch();
    const {
        UNIT_CODE,
        UNIT_NAME,
        GROSS_AREA,
        PROPERTY_CODE,
        STATUS,
        UNIT_ID
    } = data;


    const btnClicked = () => {
        dispatch(setLoader(true))
        navigation.navigate("PreReservedForm", { unit_id: UNIT_ID })
    }


    return (
        <View style={styles.container}>
            <View style={[styles.dataRow]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Unit Code</Text>
                    <Text style={styles.value} numberOfLines={2} >{UNIT_CODE}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Unit Name</Text>
                    <Text style={styles.value} >{UNIT_NAME}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Gross Area</Text>
                    <Text style={styles.value} >{GROSS_AREA}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Property Code</Text>
                    <Text style={styles.value} >{PROPERTY_CODE}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Status</Text>
                    <Text style={styles.value} >{STATUS}</Text>
                </View>
            </View>
            <View style={[styles.btnsRow, { marginTop: 18 }]}>
                {
                    label == "Total Available" && <TouchableOpacity onPress={() => btnClicked()} style={[styles.btnStyle, { marginRight: 5, width: 120 }]} >
                        <Text style={styles.btnLabel}>Pre-Reserved</Text>
                    </TouchableOpacity>
                }
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