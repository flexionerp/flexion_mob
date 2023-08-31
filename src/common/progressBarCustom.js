import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { COLORS, FONTS, SCREEN_WIDTH } from '../constants';

export const ProgressBarCustom = ({label, count}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label} >{label}</Text>
            <Progress.Bar progress={count} width={SCREEN_WIDTH * 0.9} height={8} borderRadius={4} color="#CDA349" unfilledColor='#E2E2E2' borderWidth={0} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginBottom:10
    },
    label: {
        width: '100%',
        color: COLORS.boldText,
        fontSize: 12,
        fontFamily: FONTS.Medium,
        marginBottom: 6
    }
})