import React from 'react'
import { StyleSheet, View, TextInput, Image, } from 'react-native'
import { COLORS, FONTS } from '../constants'



export const CustomMultiInput = ({ keyboardType, getValue, value, placeholder, }) => {
    return (
        <View style={styles.container}>
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
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.secondry,
        borderRadius: 8,
        paddingHorizontal: 10
    },

    inputStyle: {
        width: "95%",
        height: 100,
        color: '#707070',
        fontSize: 13,
        fontFamily: FONTS.Regular,
        paddingHorizontal: 3,
    }

})
