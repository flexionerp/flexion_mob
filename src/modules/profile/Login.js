import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    TextInput
} from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import { COLORS, CUSTOMHEIGHT, CUSTOMWIDTH, FONTS, ICONS, SCREENS } from '../../constants';
import { CustomInputIcon } from '../../common/customInputIcon'
import { CustomPassFieldIcon } from '../../common/customPassFieldIcon'
import { CheckBox } from '../../common/checkbox'
import { RegularBtn } from '../../common/regularBtn'
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/loader/loader.action';
import { userLogin } from '../../redux/user/user.action';


export function Login({ navigation, route }) {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.loader.loader)
    const [remember, setRemember] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [saved_credintials_list, setCredintialsList] = useState([])
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Admins credentials is here 
    // const [email, setEmail] = useState('sysadminlive');  
    // const [email, setEmail] = useState('yhamid');
    // const [email, setEmail] = useState('Joclaire');
    // const [email, setEmail] = useState('d.christine@fakhruddin.ae');

    // const [email, setEmail] = useState('Vandana');
    // const [email, setEmail] = useState('Joclaire');

    //Customer credentials is here
    // const [email, setEmail] = useState('hasharib.ali@gmail.com');

    //All time password
    // const [password, setPassword] = useState('judjment');
    // const [password, setPassword] = useState('123456');

    useEffect(() => {
        dispatch(setLoader(false))
        getData();
        return () => {
        }
    }, [])

    const getData = async () => {
        try {
            let data = await AsyncStorage.getItem('@saved_credintials_list');
            let credintials_list = await JSON.parse(data);
            if (credintials_list != null) {
                setCredintialsList(credintials_list);
                { credintials_list.length > 0 ? isModalVisible(true) : isModalVisible(false) }
            } else {
                setCredintialsList([]);
            }
        } catch (e) {

        }
    }


    const apiHit = () => {
        if (password.length < 5) {
            alert("Password should be minimum 6 characters");
        } else {
            dispatch(setLoader(true))
            let data = {
                "username": email,
                password: password
            }
            dispatch(userLogin(data, navigation, Storecredentials.bind(this)))
        }
    }

    const Storecredentials = async () => {
        if (remember) {
            var new_user = {
                "email": email,
                "password": password
            }
            try {
                let filteredUser = saved_credintials_list.filter(user => user.email != email);
                let temp = [...filteredUser, new_user]
                AsyncStorage.setItem('@saved_credintials_list', JSON.stringify(temp));
                getData()
                clearData()
            } catch (e) {
                console.log(e)
            }
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
                                onFocus={() => saved_credintials_list.length > 0 ? setIsModalVisible(true) : setIsModalVisible(false)}
                            />
                            <CustomPassFieldIcon
                                placeholder='Password'
                                value={password}
                                getValue={setPassword.bind(this)}
                                keyboardType={'email-address'}
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -4 }}>
                                <View style={styles.remember}>
                                    <CheckBox
                                        value={remember}
                                        getValue={setRemember.bind(this)}
                                    />
                                    <Text style={styles.rememberText}>Remember Me ?</Text>
                                </View>
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
                <Modal
                    onBackButtonPress={() => setIsModalVisible(false)}
                    onBackdropPress={() => setIsModalVisible(false)}
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    backdropOpacity={0}
                    animationInTiming={300}
                    animationOutTiming={300}
                    isVisible={isModalVisible}
                    style={{ flex: 0.8, justifyContent: 'flex-end' }}
                >
                    <View style={{ width: CUSTOMWIDTH('100'), height: CUSTOMHEIGHT('25'), alignItems: 'center', }}>
                        <View style={{ width: CUSTOMWIDTH('90'), height: CUSTOMHEIGHT('25'), }}>
                            <View style={{ backgroundColor: COLORS.primary, width: CUSTOMWIDTH('80'), height: CUSTOMHEIGHT('25'), zIndex: 15, borderRadius: 5 }}>
                                {saved_credintials_list.map((item, index) => {
                                    return <TouchableOpacity key={index} onPress={() => { setEmail(item.email); setPassword(item.password); setIsModalVisible(false); }}>
                                        <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'center' }}>
                                            <Text numberOfLines={1} style={{ fontSize: 16, color: '#FFFFFF', width: CUSTOMWIDTH('50'), fontFamily: FONTS.Medium }}>
                                                {item.email}
                                            </Text>
                                            <TextInput secureTextEntry={true} editable={false} style={{ fontSize: 13, color: '#FFFFFF', marginLeft: 10, width: 60, height: 30, textAlign: 'right', marginTop: 5, width: CUSTOMWIDTH('24') }}>
                                                {item.password}
                                            </TextInput>
                                        </View>
                                    </TouchableOpacity>
                                })}
                            </View>
                        </View>

                    </View>
                </Modal>
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
        marginLeft: '1.5%'
    },
    rememberText: {
        color: "#204866",
        fontSize: 12,
        fontFamily: FONTS.Regular,
        marginLeft: 8
    },
})