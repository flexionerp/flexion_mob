import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native'

import React, { useState, useEffect } from 'react'
import { COLORS, CUSTOMHEIGHT, FONTS, ICONS, SCREENS } from '../../constants';
import { CustomInputIcon } from '../../common/customInputIcon'
import { CustomPassFieldIcon } from '../../common/customPassFieldIcon'
import { RegularBtn } from '../../common/regularBtn'
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/loader/loader.action';
import { userLogin } from '../../redux/user/user.action';


export function Login({ navigation, route }) {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.loader.loader)
    
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    //Admins
    // const [email, setEmail] = useState('sysadminlive');
    // const [email, setEmail] = useState('yhamid');
    // const [email, setEmail] = useState('Joclaire');
    // const [email, setEmail] = useState('d.christine@fakhruddin.ae');

    // const [email, setEmail] = useState('Vandana');
    const [email, setEmail] = useState('Joclaire');

    //customer
    // const [email, setEmail] = useState('hasharib.ali@gmail.com');

    //All the time pass
    const [password, setPassword] = useState('judjment');
    // const [password, setPassword] = useState('123456');

    useEffect(() => {
        
        return () => {
        }
    }, [])




    const apiHit = () => {
        if (password.length < 5) {
            alert("Password should be minimum 6 characters");
        } else {
            dispatch(setLoader(true))
            let data = {
                "username": email,
                password: password
            }
            dispatch(userLogin(data, navigation, clearData.bind(this)))
        }
    }


    const clearData = () => {
        setEmail('');
        setPassword('')
    }



    return (
        <KeyboardAvoidingView
            style={{ flex: 1, alignItems: 'center', backgroundColor: 'transparent', }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
            enabled>
            <ImageBackground
                source={ICONS.bgImg}
                style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', }} contentContainerStyle={{ flex: 1, width: '100%', backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.main}>
                        <Text style={styles.headingStyle} >Hello!</Text>
                        <View style={{ height: 12 }} />
                        <View style={{ width: '80%' }} >
                            <CustomInputIcon
                                placeholder='Registered Email'
                                value={email}
                                getValue={setEmail.bind(this)}
                                keyboardType={'email-address'}
                                icon={ICONS.userFrom}
                            />
                            <CustomPassFieldIcon
                                placeholder='Password'
                                value={password}
                                getValue={setPassword.bind(this)}
                                keyboardType={'email-address'}
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -8 }}>
                                <View style={styles.remember} />
                                <Text onPress={() => navigation.navigate("ForgotPassword")} style={styles.forgotStyle} >Forgot Password?</Text>
                            </View>
                            <View style={{ height: 25 }} />
                            <View style={styles.btnRow} >
                                {
                                    loader
                                        ?
                                        <View style={{ width: '45%', alignItems: 'center', }}>
                                            <ActivityIndicator size={"small"} color={COLORS.primary} />
                                        </View>
                                        :
                                        <RegularBtn
                                            label={"Sign in"}
                                            size="65%"
                                            onClick={() => apiHit()}
                                            bgColor={COLORS.primary}
                                        />
                                }
                            </View>
                        </View>
                        <View style={{ height: CUSTOMHEIGHT(4) }} />
                        <Text onPress={() => navigation.navigate(SCREENS.SIGNUPSCREEN)} style={styles.footerText}>Don't have an account? <Text style={{ textDecorationLine: 'underline' }} >Create</Text></Text>
                    </View>
                </ScrollView>
            </ImageBackground>
        </KeyboardAvoidingView>
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
        flex: 1,
        width: '100%',
        justifyContent: 'center',
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
    forgotStyle: {
        color: "#204866",
        fontSize: 13,
        fontFamily: FONTS.Regular,
        textAlign: 'right'
    },
    footerText: {
        color: "#A1A1A1",
        fontSize: 13,
        fontFamily: FONTS.Medium,
        textAlign: 'center'
    },
    btnRow: {
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    remember: {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        // marginBottom: 5
    },
})