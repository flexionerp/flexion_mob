import React, { useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, TextInput, Platform } from 'react-native'
import { COLORS, FONTS, ICONS } from '../constants'


const SearchBar = ({ value, getInputValue }) => {

    const clicked = (value) => {
        getInputValue('')
    }

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={"Search Units"}
                    onChangeText={(text) => getInputValue(text)}
                    value={value}
                />
                <TouchableOpacity onPress={() => clicked(false)}>
                    <Image source={ICONS.searchIcon} style={styles.menu} resizeMode="contain" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 46,
        alignItems: 'center',
        marginTop: Platform.OS=='ios' ? 0 : 6
    },
    main: {
        width: '90%',
        height: 46,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth:1,
        borderColor:'#CDA349',
        borderRadius:15,
        paddingHorizontal: '5%'
    },
    menu: {
        width: 20,
        height: 20,
    },
    inputStyle: {
        width: '90%',
        height: 46,
        fontSize: 14,
        color: '#9CBBD2',
        fontFamily: FONTS.Bold,

    }
})