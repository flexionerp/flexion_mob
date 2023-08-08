import { StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { CustomInputP } from '../../../common/customInputP'
import { CustomMultiInput } from '../../../common/customMultiInput'
import { RegularBtn } from '../../../common/regularBtn'
import { COLORS, FONTS, SCREEN_WIDTH } from '../../../constants'
import { useSelector, useDispatch } from 'react-redux'
import { setLoader } from '../../../redux/loader/loader.action'
import { composeEmail } from '../../../redux/property/property.action'
import { BackButton } from '../../../common/backButton'


const ComposeEmail = ({ navigation, route }) => {
    const { detail } = route.params
    const dispatch = useDispatch()
    const generalData = useSelector(state => state.property.generalData)
    const { token } = useSelector(state => state.user)
    const { loader } = useSelector(state => state.loader)
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        return () => {
        }
    }, [])


    const apiHit = () => {
        if (subject == '') {
            alert("Subject field should not be blank");
            return;
        }
        if (message == '') {
            alert("Message field should not be blank");
            return;
        }
        let data = {
            subject,
            message,
            rid: detail.ID.toString(),
            USER_INFO_ID: token,
            // email: isCustomer ? 1 : 'info@fakhruddinproperties.com'
        }
        dispatch(setLoader(true))
        dispatch(composeEmail(data))
        clearForm()
    }
    const clearForm = () => {
        setSubject('')
        setMessage('')
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled
            style={{ flexGrow: 1, height: '100%', alignItems: 'center', backgroundColor: COLORS.secondry, }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.heading} >{generalData[0][0].UNIT_CODE}</Text>
                <Text style={styles.pp} >Compose Email</Text>
                <BackButton navigation={navigation} />
                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                    <View style={styles.bottom}>
                        <View style={{ height: 20 }} />
                        <CustomInputP
                            width={"100%"}
                            label="Subject"
                            placeholder='Subject'
                            value={subject}
                            getValue={setSubject.bind(this)}
                            keyboardType={'email-address'}
                        />
                        <CustomMultiInput
                            label="Message"
                            placeholder='Message'
                            value={message}
                            getValue={setMessage.bind(this)}
                            keyboardType={'email-address'}
                        />
                        <View style={{ height: 20 }} />
                        {
                            loader
                                ?
                                <ActivityIndicator color={COLORS.primary} size={'small'} />
                                :
                                <RegularBtn
                                    label={"Send"}
                                    size="50%"
                                    onClick={() => apiHit()}
                                    bgColor={COLORS.primary}
                                />
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default ComposeEmail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.secondry,
        alignItems: 'center'
    },
    heading: {
        width: '90%',
        color: COLORS.boldText,
        fontFamily: FONTS.SemiBold,
        fontSize: SCREEN_WIDTH * 0.05,
    },
    pp: {
        width: '90%',
        color: COLORS.boldText,
        fontFamily: FONTS.Medium,
        fontSize: SCREEN_WIDTH * 0.033,
        marginBottom: 4
    },
    bottom: {
        width: '90%',
        alignItems: 'center'
    },
})