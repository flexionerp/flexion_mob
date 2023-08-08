import React from 'react'
import { StyleSheet, View, TextInput, Image, } from 'react-native'
import { COLORS, FONTS } from '../constants'



export const CustomInputIcon = ({ keyboardType, getValue, value, placeholder, maxLength, icon, onFocus }) => {
    return (
        <View style={styles.container}>
            <Image source={icon} style={{ width: 24, height: 24 }} resizeMode="contain" />
            <TextInput
                maxLength={maxLength ? 9 : 200}
                style={[styles.inputStyle]}
                placeholder={placeholder}
                placeholderTextColor={"#C8C8C8"}
                keyboardType={keyboardType}
                onChangeText={(value) => getValue(value)}
                value={value}
                onFocus={() => onFocus && onFocus()}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#CDA349',
        borderRadius: 15
    },
    inputStyle: {
        width: "90%",
        height: 50,
        color: '#9A9A9A',
        fontSize: 15,
        fontFamily: FONTS.Regular,
        paddingHorizontal: 3,
    }

})
