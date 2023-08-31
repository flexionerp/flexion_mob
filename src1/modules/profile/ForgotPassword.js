import { StyleSheet, Text, View, Image, ImageBackground, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, CUSTOMHEIGHT, CUSTOMWIDTH, FONTS, ICONS, SCREENS } from '../../constants';
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
        <LinearGradient
            colors={[COLORS.g1, COLORS.g2, COLORS.g3]}
            style={styles.container}>
            <View style={styles.main}>
                <View style={styles.top}>
                    <Image source={ICONS.logoFlx} style={{ width: 230, height: 56 }} resizeMode="contain" />
                    <Text style={styles.headingStyle} >Please reset your password.</Text>
                </View>
                <View style={{ height: CUSTOMHEIGHT(4) }} />

                <ImageBackground source={ICONS.forgotBG} style={{ width: CUSTOMWIDTH('85'), height: CUSTOMHEIGHT('58'), alignItems: 'center', justifyContent: 'center' }} resizeMode='stretch'>
                    <View style={{ height: CUSTOMHEIGHT('16') }} />
                    <View style={{ width: '85%' }} >
                        <CustomInputIcon
                            placeholder='Email Address'
                            value={email}
                            getValue={setEmail.bind(this)}
                            keyboardType={'email-address'}
                            icon={ICONS.email}
                        />
                        <View style={{ height: 12 }} />
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
                                        bgColor={COLORS.lightGreen}
                                    />
                            }
                        </View>
                        <View style={{ height: 12 }} />
                        <Text onPress={() => navigation.navigate(SCREENS.LOGINSCREEN)} style={styles.forgotStyle} >Already a member? <Text style={{ color: COLORS.lightGreen, fontFamily: FONTS.Bold }} >Login</Text></Text>
                    </View>
                </ImageBackground>
                <View style={{ height: CUSTOMHEIGHT(4) }} />
                <Text style={styles.footerText}>By pressing “submit” you agree to our{'\n'}
                    <Text style={{ textDecorationLine: 'underline' }} >terms & conditions</Text></Text>
            </View>
        </LinearGradient>
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
        color: COLORS.dark,
        fontSize: 18,
        fontFamily: FONTS.Regular,
        marginVertical: 6
    },
    forgotStyle: {
        color: COLORS.secondry,
        fontSize: 13,
        fontFamily: FONTS.Regular,
        alignSelf: 'center'
    },
    footerText: {
        color: COLORS.dark,
        fontSize: 13,
        fontFamily: FONTS.Medium,
        textAlign: 'center'
    }
})