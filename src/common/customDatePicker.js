import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { COLORS, FONTS, ICONS } from '../constants'
import moment from 'moment';

export default ({ value, getValue, start, end }) => {
    const [open, setOpen] = useState(false)

    const setDate = (value) => {
        const x = new Date(start);
        const z = new Date(end);
        const y = new Date(value);
        if (y < x) {
            alert("Repeat end should not less than start date")
            getValue(start);
            setOpen(false)
        } else if (y > z) {
            alert("Repeat end should be less than end date")
            getValue(end);
            setOpen(false)
        } else {
            getValue(value);
            setOpen(false)
        }
    }

    return (
        <>
            <TouchableOpacity onPress={() => setOpen(true)} style={styles.container} >
                <Text style={styles.valueStyle} >{moment(value).format('DD MMM, YYYY')}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <TouchableOpacity>
                        <Image source={ICONS.calendar} style={{ width: 18, height: 18 }} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <View style={{ width: 8 }} />
                </View>
            </TouchableOpacity>

            <DatePicker
                modal
                mode="date"
                open={open}
                date={value}
                onConfirm={(date) => {
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        borderColor: COLORS.borderColor,
        borderWidth: 1,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10
    },
    valueStyle: {
        color: "#9CBBD2",
        fontSize: wp('3'),
        fontFamily: FONTS.Regular
    }
})