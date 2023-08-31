import {
    StyleSheet, Text, View, 
    SafeAreaView, ScrollView, 
    ActivityIndicator, TouchableOpacity
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, FONTS } from '../../constants'
import { BackButton } from '../../common/backButton';
import { CustomInput } from '../../common/customInput'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather';
import { setLoader } from '../../redux/loader/loader.action';
import { ResetPasswordApi } from '../../redux/user/user.action';


const ResetPassword = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { loader } = useSelector(state => state.loader)
    const { userDetail } = useSelector(state => state.user)
    const [oldPass, setOldPass] = useState('')
    const [newPass, setNewPassword] = useState('')
    const [rePassword, setRePassword] = useState('')


    useEffect(() => {
        return () => { }
    }, [])


    const apiHit = () => {
        if (oldPass == '') {
            alert("Temporary password field should not be blank");
            return;
        }
        if (newPass == '') {
            alert("New password field should not be blank");
            return;
        }
        if (rePassword != newPass) {
            alert("Password does not match");
            return;
        }
        let data = {
            email: userDetail.EMAIL,
            temp_password: oldPass,
            new_password: newPass
        }
        dispatch(setLoader(true));
        dispatch(ResetPasswordApi(data));
        fieldClear()
    }

    const fieldClear = () => {
        setOldPass('');
        setNewPassword('');
        setRePassword('');
    }


    return (
        <SafeAreaView style={styles.container}>
            <BackButton navigation={navigation} label="Reset Password" />
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                <View style={styles.bottom}>
                    <View style={{ height: '10%' }} />
                    <CustomInput
                        width={"100%"}
                        label="Temporary/Old Password"
                        placeholder='Temporary Password'
                        value={oldPass}
                        getValue={setOldPass.bind(this)}
                        keyboardType={'email-address'}
                    />
                    <CustomInput
                        width={"100%"}
                        label="New Password"
                        placeholder='New Password'
                        value={newPass}
                        getValue={setNewPassword.bind(this)}
                        keyboardType={'email-address'}
                    />
                    <CustomInput
                        width={"100%"}
                        label="Re-enter New Password"
                        placeholder='Re-enter New Password'
                        value={rePassword}
                        getValue={setRePassword.bind(this)}
                        keyboardType={'email-address'}
                    />
                </View>
                <View style={{ height: '10%' }} />
                {
                    loader
                        ?
                        <ActivityIndicator size={'small'} color={COLORS.primary} />
                        :
                        <TouchableOpacity onPress={() => apiHit()} style={{ flexDirection: 'row', alignItems: 'center' }} >
                            <Text style={styles.btnLabel} >Save</Text>
                            <Icon name='arrow-right' size={14} />
                        </TouchableOpacity>
                }
                <View style={{ height: 80 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

export default ResetPassword;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondry,
        alignItems: 'center'
    },
    bottom: {
        width: '90%',
        alignItems: 'center'
    },
    btnLabel: {
        color: COLORS.boldText,
        fontSize: 14,
        fontFamily: FONTS.SemiBold,
        marginRight: 6
    }
});