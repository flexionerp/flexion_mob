import { StyleSheet, ScrollView, Text, View, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, FONTS, ICONS, SCREENS } from '../../constants';
import { CustomInputIcon } from '../../common/customInputIcon'
import { RegularBtn } from '../../common/regularBtn'
import { useDispatch, useSelector } from 'react-redux';
import { ForgotPasswordApi } from '../../redux/user/user.action';
import { setLoader } from '../../redux/loader/loader.action';


export function ForgotPassword({ navigation, route }) {
    const dispatch = useDispatch()
    const loader = useSelector(state => state.loader.loader)
    const [email, setEmail] = useState('');

    useEffect(() => {
        dispatch(setLoader(false))
        return () => {
        }
    }, [])


    const apiCall = () => {
        if (email == '') {
            alert("Please enter your email")
            return;
        }
        const data = {
            email
        }
        dispatch(setLoader(true))
        dispatch(ForgotPasswordApi(data, navigation))
        clearData()
    }

    const clearData = () => {
        setEmail('');
    }


    return (
        <ImageBackground
            source={ICONS.bgImg}
            style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', }} contentContainerStyle={{ flex: 1, width: '100%', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.main}>
                    <Text style={styles.headingStyle} >Forgot Password</Text>
                    <View style={{ height: 12 }} />
                    <View style={{ width: '85%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                        <CustomInputIcon
                            placeholder='Email Address'
                            value={email}
                            getValue={setEmail.bind(this)}
                            keyboardType={'email-address'}
                            icon={ICONS.userFrom}
                        />
                    </View>
                    <View style={{ height: 50 }} />
                    <View style={{ width: '85%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                        {
                            loader
                                ?
                                <View style={{ width: '45%', alignItems: 'center', }}>
                                    <ActivityIndicator size={"small"} color={COLORS.lightGreen} />
                                </View>
                                :
                                <RegularBtn
                                    label={"SEND"}
                                    size="45%"
                                    onClick={() => apiCall()}
                                    bgColor={COLORS.primary}
                                />
                        }
                    </View>
                    <View style={{ height: 20 }} />
                    <Text onPress={() => navigation.navigate(SCREENS.LOGINSCREEN)} style={styles.footerText} >Already a member? <Text style={{ textDecorationLine: 'underline' }} >Login</Text></Text>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    top: {
        alignItems: 'center'
    },
    headingStyle: {
        color: "#204866",
        fontSize: 32,
        fontFamily: FONTS.SemiBold,
        marginVertical: 6
    },
    footerText: {
        color: "#A1A1A1",
        fontSize: 13,
        fontFamily: FONTS.Medium,
        textAlign: 'center'
    },
})