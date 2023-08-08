import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, ICONS, FONTS, SCREEN_WIDTH } from '../../../constants'
import { ProgressBarCustom } from '../../../common/progressBarCustom'


const ConstructionUpdate = () => {
    return (
        <SafeAreaView style={{ flex: 1, width: '100%' }} >
            <ImageBackground
                source={ICONS.bgImg}
                style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', }} contentContainerStyle={{ width: '100%', backgroundColor: 'transparent', alignItems: 'center' }}>
                    <View style={styles.main}>
                        <Text style={styles.headingStyle} >Construction Update</Text>
                        <View style={{ height: 12 }} />
                        <View style={styles.inputContainer}>
                            <ProgressBarCustom count={0.7} label="Excavation" />
                            <ProgressBarCustom count={0.5} label="Shoring" />
                            <ProgressBarCustom count={0.4} label="concrete" />
                            <ProgressBarCustom count={0.3} label="Blockwork" />
                            <ProgressBarCustom count={0.2} label="External Plaster" />
                            <TouchableOpacity style={{ alignItems: 'center' }} >
                                <Text style={styles.moreLabel} >More</Text>
                                <Image source={ICONS.arrowDown} />
                            </TouchableOpacity>
                            <View style={styles.imgsContainer}>
                                {
                                    [1, 2, 3, 4, 5, 6, 7, 8,].map((item, index) => {
                                        return (
                                            <Image key={index} source={ICONS.constructImg} style={styles.imgStyle} resizeMode="cover" />
                                        )
                                    })
                                }
                            </View>
                            <TouchableOpacity style={{ alignItems: 'center' }} >
                                <Text style={styles.moreLabel} >More</Text>
                                <Image source={ICONS.arrowDown} />
                            </TouchableOpacity>
                            <View style={{ height: 80 }} />
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default ConstructionUpdate

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        width: '100%',
        alignItems: 'center',
    },
    headingStyle: {
        width: '90%',
        color: COLORS.boldText,
        fontSize: SCREEN_WIDTH * 0.044,
        fontFamily: FONTS.SemiBold,
    },
    inputContainer: {
        width: '90%',
        alignItems: 'center',
    },
    moreLabel: {
        color: "#7CACD0",
        fontSize: 10,
        fontFamily: FONTS.Medium
    },
    imgsContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 12
    },
    imgStyle: {
        width: '48%',
        height: 96,
        marginBottom: 20,
        borderWidth: 1.5,
        borderColor: '#CDA349',
        borderRadius: 8
    }

})