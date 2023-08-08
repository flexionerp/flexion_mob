import { StyleSheet, Text, View, Image, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, SCREENS, Url } from '../../constants'
import Header from "../../common/Header";
import { RegularBtn } from '../../common/regularBtn'
import axios from 'axios'
import { BackButton } from '../../common/backButton';


export const DeleteAccountScreen = ({ navigation, route }) => {
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(false)
        return () => {

        }
    }, [])



    const deleteClick = () => {
        setLoader(true)
        let xmls = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><deleteaccount xmlns="http://tempuri.org/"><username>hasharib1111</username><email>hasharib.ali@gmail.com</email></deleteaccount></soap:Body></soap:Envelope>`;
        axios.post(`${Url}deleteaccount`,
            xmls,
            {
                headers:
                    { 'Content-Type': 'text/xml; charset=utf-8' }
            }).then(response => {
                const json = xmltoJson(response.data)
                const parseJson = JSON.parse(json)
                alert(parseJson.elements[0].elements[0].elements[0].elements[0].elements[0].text)
                navigation.navigate(SCREENS.LOGINSCREEN)
                setLoader(false)
            }).catch(err => {
                console.log("err: ", err);
                setLoader(false)
            });
    }



    return (
        <LinearGradient
            colors={['#E4EEFE', '#F9FCFF', '#FFFFFF']}
            style={styles.container}>
            <SafeAreaView style={styles.main}>
                <Header navigation={navigation} label={"Account Deletion"} />
                <View style={{ height: 15 }} />
                <BackButton navigation={navigation} />
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={styles.detailCard}>
                        <View style={{ width: '100%', marginVertical: 13, alignItems: 'center' }}>
                            <Text style={styles.headeing}>Deleting your Treppan account</Text>
                            <View style={{ height: 5 }} />
                            <Text style={styles.subHeadeing}>This is permanent</Text>
                            <Text style={styles.subdetail} >When you delete your Treppan account, you won't be able to retrieve information. Your all information will be deleted</Text>
                        </View>
                        <View style={{ height: 15 }} />
                        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <RegularBtn
                                label={"Cancel"}
                                size="30%"
                                bgColor={COLORS.primary}
                                onClick={() => navigation.goBack()}
                            />
                            {
                                loader
                                    ?
                                    <ActivityIndicator color={COLORS.secondry} size="small" style={{ marginRight: '25%' }} />
                                    :
                                    <RegularBtn
                                        label={"Confirm account deletion"}
                                        size="65%"
                                        bgColor={COLORS.primary}
                                        onClick={() => deleteClick()}
                                    />
                            }

                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    main: {
        width: '100%',
        alignItems: 'center',

    },
    header: {
        width: '100%',
        height: 60,
        alignItems: 'center',
    },
    detailCard: {
        width: '90%',
        borderRadius: 5,
        backgroundColor: COLORS.lightBlue,
        marginTop: 20,
        paddingVertical: 12,
        alignItems: 'center'
    },
    headeing: {
        width: '90%',
        fontSize: 19,
        color: COLORS.primary,
        fontFamily: FONTS.Bold
    },
    subHeadeing: {
        width: '90%',
        fontSize: 18,
        color: COLORS.primary,
        fontFamily: FONTS.SemiBold,
        opacity: 0.8
    },
    subdetail: {
        width: '90%',
        fontSize: 16,
        color: COLORS.primary,
        fontFamily: FONTS.Regular,
        opacity: 0.7
    },

})