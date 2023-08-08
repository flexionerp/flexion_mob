import React from 'react'
import { StyleSheet, View, TextInput, } from 'react-native'
import { FONTS } from '../constants'



export const CustomInputP = ({ keyboardType, getValue, value, placeholder, isEdit, width }) => {
    return (

        <View style={[styles.container, { width }]}>
            <TextInput
                editable={isEdit != undefined ? false : true}
                style={[styles.inputStyle]}
                placeholder={placeholder}
                placeholderTextColor={"#C8C8C8"}
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
        borderRadius: 15
    },
    inputStyle: {
        width: "90%",
        height: 50,
        color: '#000000',
        fontSize: 15,
        fontFamily: FONTS.Regular,
        paddingHorizontal: 3,
    }
})
