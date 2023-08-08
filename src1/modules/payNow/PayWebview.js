import { StyleSheet, SafeAreaView, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, ICONS } from '../../constants'
import { WebView } from 'react-native-webview';


const PayWebview = ({ navigation, route }) => {
    const { payUrl } = route.params
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        return () => {

        }
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.backRow}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnStyle}>
                    <Image source={ICONS.backios} style={{ width: 18, height: 18 }} resizeMode="contain" />
                </TouchableOpacity>
            </View>
            <WebView
                onLoad={() => setLoader(false)}
                source={{ uri: payUrl }}
                style={{ marginTop: -35, flex: 1 }}
            />
            {loader && (
                <ActivityIndicator
                    style={{ position: "absolute", flex: 1 , top:80, alignSelf:'center' }}
                    size="small"
                    color={COLORS.primary}
                />
            )}
        </SafeAreaView>
    )
}

export default PayWebview

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondry,
    },
    backRow: {
        width: '95%',
        justifyContent: 'center',
        alignSelf:'center'
    },
    btnStyle: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})