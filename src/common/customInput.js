import React from 'react'
import { StyleSheet, View, TextInput, Text, Platform } from 'react-native'
import { COLORS, CUSTOMWIDTH, FONTS } from '../constants'



export const CustomInput = ({ keyboardType, getValue, value, placeholder, width }) => {
    return (
        <View style={[styles.container, { width: width }]}>
            <TextInput
                style={[styles.inputStyle]}
                placeholder={placeholder}
                placeholderTextColor={"#9CBBD2"}
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
        borderWidth: 1,
        borderColor: '#CDA349',
        borderRadius: 15,
        paddingHorizontal: 10,
    },
    inputStyle: {
        width: "100%",
        height: 50,
        color: '#9CBBD2',
        fontSize: 15,
        fontFamily: FONTS.Regular,
        paddingHorizontal: 3,
    },
})
