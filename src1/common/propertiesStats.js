import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const Item = () => {
    return <View style={styles.item}>
        <Text>Not Released</Text>
        <Text>353</Text>
    </View>
}

export function PropertyStats() {
    return (
        <View style={styles.container}>
            <Item />
            <Item />
            <Item />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '85%',
        height: 60,
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    item: {
        width: '32.5%',
        height: 60,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    }
})