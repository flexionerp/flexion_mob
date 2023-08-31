import { StyleSheet, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../../common/HeaderB'
import { COLORS } from '../../constants'
import { WebView } from 'react-native-webview';


const PayWebview = ({ navigation, route }) => {
    const { payUrl } = route.params

    useEffect(() => {
        return () => {

        }
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} label="Payment" />
            <WebView
                source={{ uri: payUrl }}
                style={{ marginTop: 20, flex: 1 }}
            />
        </SafeAreaView>
    )
}

export default PayWebview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondry,
    },
})