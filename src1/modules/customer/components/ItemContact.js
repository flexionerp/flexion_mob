import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { COLORS, FONTS, SCREENS, Url } from '../../../constants'
import { CheckBox } from '../../../common/checkbox'


export const Item = ({ navigation, data }) => {
    let { CONTACT_TYPE, VALUE, IS_PRIMARY } = data


    return (
        <View style={styles.container}>
            <View style={styles.dataRow}>
                <View style={[styles.left, { width: '100%', borderBottomWidth: 0 }]}>
                    <Text style={styles.heading} >CONTACT TYPE</Text>
                    <Text style={styles.heading} >VALUE</Text>
                </View>
            </View>
            <View style={[styles.dataRow]}>
                <View style={[styles.left, { width: '100%', marginTop: 12 }]}>
                    <Text style={styles.label} >{CONTACT_TYPE}</Text>
                    <Text style={styles.value} >{VALUE}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <CheckBox
                    value={IS_PRIMARY == 1}
                    getValue={() => { }}
                />
                <Text style={[styles.label, { width: '90%' }]}>Is Primary</Text>
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
    heading: {
        color: COLORS.secondry,
        fontSize: 14,
        fontFamily: FONTS.Bold
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
        width: 100,
        height: 26,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4
    },
    btnLabel: {
        color: COLORS.primary,
        fontSize: 11,
        fontFamily: FONTS.SemiBold,
        marginBottom: 2
    }

})