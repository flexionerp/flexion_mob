import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { } from '../../../constants'
import { WebView } from 'react-native-webview';
import { BackButton } from '../../../common/backButton'


const Blogs = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container} >
            <BackButton navigation={navigation} label="Blogs" />
            <WebView
                source={{ uri: 'https://fakhruddinproperties.com/en/blogs' }}
                style={{ marginTop: 20, flex: 1 }}
            />

        </SafeAreaView>
    )
}

export default Blogs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
})