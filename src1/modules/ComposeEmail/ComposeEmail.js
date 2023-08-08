import { StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import Header from '../../common/HeaderB'
import { CustomInput } from '../../common/customInput'
import { CustomMultiInput } from '../../common/customMultiLineS'
import { RegularBtn } from '../../common/regularBtn'
import { COLORS } from '../../constants'
import { useSelector, useDispatch } from 'react-redux'
import { setLoader } from '../../redux/loader/loader.action'
import { composeEmail } from '../../redux/property/property.action'


const ComposeEmail = ({ navigation, route }) => {
    const { detail } = route.params
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.user)
    const { loader } = useSelector(state => state.loader)
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

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
            USER_INFO_ID: token
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
                <Header navigation={navigation} label="Compose Email" />
                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                    <View style={styles.bottom}>
                        <View style={{ height: 20 }} />
                        {/* <CustomInput
                        label="From"
                        placeholder='From'
                        value={from}
                        getValue={setFrom.bind(this)}
                        keyboardType={'email-address'}
                    />
                    <CustomInput
                        label="To"
                        placeholder='To'
                        value={to}
                        getValue={setTo.bind(this)}
                        keyboardType={'email-address'}
                    />
                    <CustomInput
                        label="CC"
                        placeholder='CC'
                        value={cc}
                        getValue={setCc.bind(this)}
                        keyboardType={'email-address'}
                    /> */}
                        <CustomInput
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
                                    size="100%"
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
    bottom: {
        width: '90%',
        alignItems: 'center'
    },
})