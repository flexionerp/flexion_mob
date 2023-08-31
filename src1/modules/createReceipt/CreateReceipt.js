import { StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, CUSTOMWIDTH, FONTS, } from '../../constants'
import Header from '../../common/HeaderB'
import { DropDownSingle } from '../../common/dropDownColoredSingle'
import { CustomInput } from '../../common/customInput'
import { RegularBtn } from '../../common/regularBtn'
import { useSelector, useDispatch } from 'react-redux'
import { getCustomersList, getReservationNoList, insertReceipt, getBankModeList } from "../../redux/property/property.action";
import { setLoader } from '../../redux/loader/loader.action'
import moment from 'moment'

const CreateReceipt = ({ navigation }) => {
    const dispatch = useDispatch();
    const { customersList, reservationNoList } = useSelector(state => state.property)
    const { loader } = useSelector(state => state.loader)
    const { token } = useSelector(state => state.user)
    const [customer, setCustomer] = useState(null)
    const [customerId, setCustomerId] = useState(null)
    const [receiptDate, setReceiptDate] = useState(new Date());
    const [from, setFrom] = useState('');
    const [narration, setNarration] = useState('');
    const [preNo, setPreNo] = useState(null);
    const [preNoId, setPreNoId] = useState(null);
    const [reference, setReference] = useState('');

    useEffect(() => {
        dispatch(getCustomersList())
        dispatch(getBankModeList())
        return () => {

        }
    }, [])

    const getCustomer = (value, id) => {
        setFrom(value)
        setCustomer(value)
        setCustomerId(id)
        dispatch(getReservationNoList(id))
        setPreNo(null)
        setPreNoId(null)
    }

    const getResNo = (value, id) => {
        setPreNo(value)
        setPreNoId(id)
    }

    const apiHit = () => {
        if (customerId == null) {
            alert("Please select customer");
            return;
        }
        if (narration == '') {
            alert("Narration field should not be blank");
            return;
        }
        // if (preNoId == null) {
        //     alert("Please select pre reservation no");
        //     return;
        // }
        if (reference == '') {
            alert("Reference code field should not be blank");
            return;
        }
        dispatch(setLoader(true))
        let data = {
            PRE_RESERVATION_NO: preNoId == null ? 0 : preNoId,
            CUSTOMER: customerId,
            NARRATION: narration,
            RECEIPT_DATE: moment(receiptDate).format("YYYY-MM-DD"),
            RECEIVED_FROM: from,
            REFERENCE_CODE: reference,
            CURR: 2,
            USER_INFO_ID: token,
        }
        dispatch(insertReceipt(data, navigation))
    }



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled
            style={{ flexGrow: 1, height: '100%', alignItems: 'center', backgroundColor: COLORS.secondry, }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
            <SafeAreaView style={styles.container}>
                <Header navigation={navigation} label="Create Receipt" />
                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                    <View style={styles.bottom}>
                        <View style={{ height: 20 }} />
                        {/* <CustomInput
                        label="Tracking Code"
                        placeholder='Enter Code'
                        value={trackingCode}
                        getValue={setTrackingCode.bind(this)}
                        keyboardType={'email-address'}
                    />
                    <CustomInput
                        label="Receipt No"
                        placeholder='Enter No'
                        value={receiptNo}
                        getValue={setReceiptNo.bind(this)}
                        keyboardType={'email-address'}
                    /> */}
                        <View style={{ width: '100%', marginBottom: 16 }}>
                            <Text style={styles.labelStyle}>Receipt Date</Text>
                            <View style={styles.dateStyle}>
                                <Text style={styles.valueStyle} >{moment(receiptDate).format('DD MMM, YYYY')}</Text>
                            </View>
                        </View>
                        {/* <View style={{ width: '100%', marginBottom: 16 }}>
                        <DropDownSingle
                            name={opUnit}
                            data={typeArray}
                            getValue={setOpUnit.bind(this)}
                            label="Operating Unit"
                        />
                    </View> */}
                        <View style={{ width: '100%', marginBottom: 16 }}>
                            <DropDownSingle
                                name={customer}
                                data={customersList}
                                getValue={getCustomer.bind(this)}
                                label="Customer"
                            />
                        </View>
                        <CustomInput
                            label="Received From"
                            placeholder='Enter name'
                            value={from}
                            getValue={setFrom.bind(this)}
                            keyboardType={'email-address'}
                        />
                        <CustomInput
                            label="Narration"
                            placeholder='Enter Narration'
                            value={narration}
                            getValue={setNarration.bind(this)}
                            keyboardType={'email-address'}
                        />
                        <View style={{ width: '100%', marginBottom: 16 }}>
                            {
                                !loader && <DropDownSingle
                                    name={preNo}
                                    data={reservationNoList}
                                    getValue={getResNo.bind(this)}
                                    label="Pre Reservation No"
                                />

                            }
                        </View>
                        <CustomInput
                            label="Reference Code"
                            placeholder='Enter Code'
                            value={reference}
                            getValue={setReference.bind(this)}
                            keyboardType={'email-address'}
                        />
                    </View>
                    <View style={{ height: 20 }} />

                    {
                        loader
                            ?
                            <ActivityIndicator color={COLORS.primary} size="small" />
                            :
                            <RegularBtn
                                label={"Save + Next"}
                                size={'90%'}
                                bgColor={COLORS.primary}
                                onClick={() => apiHit()}
                            />
                    }

                    <View style={{ height: 80 }} />
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default CreateReceipt

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:'100%',
        backgroundColor: COLORS.secondry,
        alignItems: 'center'
    },
    bottom: {
        width: '90%',
        alignItems: 'center'
    },
    labelStyle: {
        width: '100%',
        color: COLORS.primary,
        fontSize: CUSTOMWIDTH('4'),
        fontFamily: FONTS.SemiBold,
        marginBottom: 6,
    },
    dateStyle: {
        width: "100%",
        height: 45,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 4,
        justifyContent: 'center'
    },
    valueStyle: {
        color: COLORS.primary,
        fontSize: 12,
        fontFamily: FONTS.Regular
    }
})