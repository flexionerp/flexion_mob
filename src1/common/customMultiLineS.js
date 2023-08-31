import React from 'react'
import { StyleSheet, View, TextInput, Text, Platform } from 'react-native'
import { COLORS, CUSTOMWIDTH, FONTS } from '../constants'



export const CustomMultiInput = ({ keyboardType, getValue, value, placeholder, maxLength, label }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headingStyle}>{label}</Text>
            <TextInput
                multiline={true}
                style={[styles.inputStyle]}
                placeholder={placeholder}
                placeholderTextColor={'#707070'}
                keyboardType={keyboardType}
                onChangeText={(value) => getValue(value)}
                value={value}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 18,
        alignItems: 'center',

    },
    inputStyle: {
        width: "100%",
        height: 250,
        color: COLORS.primary,
        fontSize: 15,
        fontFamily: FONTS.Regular,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 4
    },
    headingStyle: {
        width: '100%',
        color: COLORS.primary,
        fontSize: CUSTOMWIDTH('4'),
        fontFamily: FONTS.Bold,
        marginBottom: Platform.OS == 'android' ? 8 : 10,
    },

})
