import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { ICONS } from '../constants'


export function BackButton({navigation}) {
    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={ICONS.backios} style={{ width: 10, height: 16 }} />
            </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        width:'88%',
        height:30,
        justifyContent:'center'
    }
})