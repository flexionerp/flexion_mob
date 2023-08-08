import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { } from 'react'
import { COLORS, CUSTOMWIDTH, FONTS, SCREENS } from '../constants'


const Item = ({ navigation }) => {


    return (
        <View style={{ width: '100%', marginTop: 5 }} >
            <View style={styles.titlesRow}>
                <Text style={styles.itemText}>#732748</Text>
                <Text numberOfLines={1} style={[styles.itemText, {}]}>01-8-2022</Text>
                <Text numberOfLines={1} style={[styles.itemText, {}]}>AED 221.23</Text>
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: '#C1C1C1', marginVertical: 5 }} />
        </View>

    )
}


export const BookingRequestSection = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.labelRow}>
                <Text style={styles.request} >BOOKING REQUEST</Text>
                <Text onPress={() => { }} style={styles.all}>Views All</Text>
            </View>
            <View style={{ height: 10 }} />
            <View style={styles.titlesRow} >
                <Text style={styles.titleText}>Request No</Text>
                <Text style={styles.titleText}>Date</Text>
                <Text style={styles.titleText}>Amount</Text>
            </View>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '85%',
        alignItems: 'center',
        marginVertical: 12
    },
    labelRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    request: {
        color: COLORS.primary,
        fontSize: 17,
        fontFamily: FONTS.Bold
    },
    all: {
        color: COLORS.lightGreen,
        fontSize: 14,
        fontFamily: FONTS.Bold
    },
    titlesRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleText: {
        width: '24%',
        color: COLORS.primary,
        fontSize: 14,
        fontFamily: FONTS.Regular
    },
    itemText: {
        width: '24%',
        color: COLORS.primary,
        fontSize: 13,
        fontFamily: FONTS.Bold,
        marginHorizontal: 1.5
    },
    left: {
        width: CUSTOMWIDTH("40"),
        backgroundColor: COLORS.darkYellow,
        height: CUSTOMWIDTH("40"),
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center'
    },
    right: {
        width: CUSTOMWIDTH("40"),
        height: CUSTOMWIDTH("40"),
        justifyContent: 'space-between'
    },
})