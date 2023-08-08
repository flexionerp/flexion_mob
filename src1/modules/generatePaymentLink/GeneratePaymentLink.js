import { StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../../common/HeaderB'
import { CustomInput } from '../../common/customInput'
import { RegularBtn } from '../../common/regularBtn'
import { COLORS } from '../../constants'
import { useSelector, useDispatch } from 'react-redux'
import { generateLink } from '../../redux/property/property.action'
import { setLoader } from '../../redux/loader/loader.action'


const GeneratePaymentLink = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const generalData = useSelector(state => state.property.generalData)
    const { loader } = useSelector(state => state.loader)
    const { detail } = route.params
    const [payment, setPayment] = useState('');

    useEffect(() => {
        return () => {

        }
    }, [])



    const apiHit = () => {
        if (payment == '') {
            alert("Amount field should not be blank");
            return;
        }
        const data = {
            due: parseInt(payment),
            unit_code: generalData[0][0].UNIT_CODE,
            id: detail.ID.toString(),
            name: generalData[0][0].CUSTOMER_NAME
        }
        dispatch(setLoader(true))
        dispatch(generateLink(data))
        setPayment('')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} label="Payment Link" />
            <View style={{ flex: 1, width: '100%', alignItems: 'center', }} >
                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%', alignItems: 'center', paddingBottom: 10 }} >
                    <View style={styles.bottom}>
                        <View style={{ height: 20 }} />
                        <CustomInput
                            isEdit={false}
                            label="Pre Res No."
                            placeholder=''
                            value={detail.PRE_RESERVE_NO.toString()}
                            getValue={() => { }}
                            keyboardType={'email-address'}
                        />
                        <CustomInput
                            isEdit={false}
                            label="Unit Desc"
                            placeholder=''
                            value={generalData[0][0].UNIT_CODE}
                            getValue={() => { }}
                            keyboardType={'email-address'}
                        />
                        <CustomInput
                            isEdit={false}
                            label="Customer Name"
                            placeholder=''
                            value={generalData[0][0].CUSTOMER_NAME}
                            getValue={() => { }}
                            keyboardType={'email-address'}
                        />
                        <CustomInput
                            isEdit={false}
                            label="Total Dues"
                            placeholder=''
                            value={generalData[0][0].DUE.replace(/\s/g, '')}
                            getValue={() => { }}
                            keyboardType={'email-address'}
                        />
                        <CustomInput
                            label="Enter Amount For Link Payment"
                            placeholder='Enter Amount'
                            value={payment}
                            getValue={setPayment.bind(this)}
                            keyboardType={'number-pad'}
                        />

                        <View style={{ height: 20 }} />
                        {
                            loader
                                ?
                                <ActivityIndicator color={COLORS.primary} size={'small'} />
                                :
                                < RegularBtn
                                    label={"Generate"}
                                    size="100%"
                                    onClick={() => apiHit()}
                                    bgColor={COLORS.primary}
                                />
                        }

                    </View>
                </ScrollView>
                <View style={{ height: 50 }} />
            </View>
        </SafeAreaView>
    )
}

export default GeneratePaymentLink

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
})