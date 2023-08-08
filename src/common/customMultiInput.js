import React from 'react'
import { StyleSheet, View, TextInput, Image, } from 'react-native'
import { COLORS, FONTS } from '../constants'



export const CustomMultiInput = ({ keyboardType, getValue, value, placeholder, }) => {
    return (
        <View style={styles.container}>
            <TextInput
                numberOfLines={4}
                multiline={true}
                style={[styles.inputStyle]}
                placeholder={placeholder}
                placeholderTextColor={'#C8C8C8'}
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
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        borderRadius: 15,
        paddingHorizontal: 10,
    },
    inputStyle: {
        width: "100%",
        height: 100,
        color: COLORS.black,
        fontSize: 15,
        fontFamily: FONTS.Regular,
        paddingHorizontal: 3,
    }
})
