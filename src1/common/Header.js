import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { COLORS, FONTS, ICONS, SCREENS } from '../constants'


const Header = ({ navigation, label, value, getInputValue }) => {
    const [show, setShow] = useState(false)

    const clicked = (value) => {
        setShow(value)
        getInputValue('')
    }

    return (
        <View style={styles.container}>
            {
                show
                    ?
                    <View style={styles.main}>
                        <TouchableOpacity onPress={() => clicked(false)}>
                            <Image source={ICONS.cross} style={styles.menu} resizeMode="contain" />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder={"Search..."}
                            onChangeText={(text) => getInputValue(text)}
                            value={value}
                        />
                       
                    </View>
                    :
                    <View style={styles.main}>
                        <View style={styles.menu} />
                        <Text style={styles.label} >{label}</Text>
                        <TouchableOpacity onPress={() => clicked(true)}>
                            <Image source={ICONS.search} style={styles.bell} />
                        </TouchableOpacity>
                    </View>
            }
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        backgroundColor: COLORS.primary
    },
    main: {
        width: '85%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menu: {
        width: 30,
        height: 17,
    },
    bell: {
        width: 23,
        height: 22,
    },
    label: {
        width: '60%',
        color: COLORS.secondry,
        fontSize: 22,
        fontFamily: FONTS.Bold,
        textAlign: 'center'
    },
    inputStyle: { width: '88%', height: 40, backgroundColor: COLORS.secondry, borderRadius: 4, fontSize: 11, color: COLORS.primary, paddingHorizontal: 6 }
})