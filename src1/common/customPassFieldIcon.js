import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Image, TouchableOpacity } from 'react-native'
import { COLORS, FONTS, ICONS, } from '../constants'


export const CustomPassFieldIcon = ({ getValue, value, placeholder, keyboardType }) => {
    const [hide, setHide] = useState(true)


    return (
        <View style={styles.container} >
            <Image source={ICONS.lock} style={{ width: 18, height: 18 }} resizeMode="contain" />
            <TextInput
                style={styles.inputStyle}
                placeholder={placeholder}
                placeholderTextColor={"#C8C8C8"}
                keyboardType={keyboardType}
                onChangeText={(value) => getValue(value)}
                value={value}
                secureTextEntry={hide}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setHide(!hide)}>
                    <Image source={hide ? ICONS.eyeClose : ICONS.eyeOpen} style={{ width: 18, height: 14, marginLeft: 5 }} resizeMode="contain" />
                </TouchableOpacity>
            </View>
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
        width: "80%",
        height: 45,
        color: '#9A9A9A',
        fontSize: 15,
        fontFamily: FONTS.Regular,
        paddingHorizontal: 3,
    }

})
