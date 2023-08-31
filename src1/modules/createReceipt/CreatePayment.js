import { StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, CUSTOMWIDTH, FONTS } from '../../constants'
import Header from '../../common/HeaderB'
import { DropDownSingle } from '../../common/dropDownColoredSingle'
import { CustomInput } from '../../common/customInput'
import { RegularBtn } from '../../common/regularBtn'
import CustomDatePicker from '../../common/customDatePicker'
import { useSelector, useDispatch } from 'react-redux'
import { getBankModeList, insertPaymentDetail, getReservationNoList, getReceiptsList } from '../../redux/property/property.action'
import moment from 'moment'
import { setLoader } from '../../redux/loader/loader.action'


const CreatePayment = ({ navigation, route }) => {
    const { id } = route.params;
    const dispatch = useDispatch();
    const { bankList, modeList, categoryList } = useSelector(state => state.property)
    const { loader } = useSelector(state => state.loader)
    const { token } = useSelector(state => state.user)
    const [modOfPay, setModOfPay] = useState(null)
    const [modOfPayId, setModOfPayId] = useState(null)
    const [bank, setBank] = useState(null)
    const [bankId, setBankId] = useState(null)
    const [category, setCategory] = useState(null)
    const [categoryId, setCategoryId] = useState(null)
    const [cheque, setCheque] = useState('')
    const [amount, setAmount] = useState('')
    const [narration, setNarration] = useState('')
    const [dueDate, setDueDate] = useState(new Date());

    useEffect(() => {
        dispatch(getBankModeList())
        return () => {

        }
    }, [])

    const getMode = (value, id) => {
        setModOfPay(value)
        setModOfPayId(id)
    }

    const getBank = (value, id) => {
        setBank(value)
        setBankId(id)
    }

    const getCategory = (value, id) => {
        setCategory(value)
        setCategoryId(id)
    }

    const getDueDate = value => {
        const x = new Date().setHours(0, 0, 0, 0);
        const y = new Date(value).setHours(0, 0, 0, 0);
        if (y < x) {
            alert("From date should not less than current date")
            setDueDate(value);
        } else {
            setDueDate(value);
        }
    };

    const apiHit = () => {
        if (modOfPayId == null) {
            alert("Select Mod Of Pay")
            return;
        }
        if (cheque == '') {
            alert("Check field should not be blank")
            return;
        }
        if (bankId == null) {
            alert("Select Bank")
            return;
        }
        if (amount == '') {
            alert("Amount field should not be blank")
            return;
        }
        if (narration == '') {
            alert("Narration field should not be blank")
            return;
        }
        if (categoryId == null) {
            alert("Select Category")
            return;
        }
        let data = {
            cheque: parseInt(cheque),
            amount: parseInt(amount),
            hdr_id: id,
            modOfPay: modOfPayId,
            dueDate: moment(dueDate).format("YYYY-MM-DD"),
            bank: bankId,
            NARRATION: narration,
            USER_INFO_ID: token,
            category: categoryId,
            branch: 0
        }
        dispatch(setLoader(true))
        dispatch(insertPaymentDetail(data, navigation))
        clearForm()
    }

    const clearForm = () => {
        setModOfPay(null)
        setModOfPayId(null)
        setBank(null)
        setBankId(null)
        setCategory(null)
        setCategoryId(null)
        setCheque('')
        setAmount('')
        setNarration('')
    }

    const onCloseClick = () => {
        dispatch(getReceiptsList(token))
        navigation.navigate(`Receipt\n  `)
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled
            style={{ flexGrow: 1, height: '100%', alignItems: 'center', backgroundColor: COLORS.secondry, }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
            <SafeAreaView style={styles.container}>
                <Header navigation={navigation} label="Create Payment" />
                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                    <View style={styles.bottom}>
                        <View style={{ height: 20 }} />
                        <View style={{ width: '100%', marginBottom: 16 }}>
                            <DropDownSingle
                                name={modOfPay}
                                data={modeList}
                                getValue={getMode.bind(this)}
                                label="MOD of Pay"
                            />
                        </View>
                        <CustomInput
                            label="Cheque"
                            placeholder=''
                            value={cheque}
                            getValue={setCheque.bind(this)}
                            keyboardType={"number-pad"}
                        />
                        <View style={{ width: '100%', marginBottom: 16 }}>
                            <Text style={styles.labelStyle}>Due Date</Text>
                            <CustomDatePicker
                                value={dueDate}
                                getValue={getDueDate.bind(this)}
                            />
                        </View>
                        <View style={{ width: '100%', marginBottom: 16 }}>
                            <DropDownSingle
                                name={bank}
                                data={bankList}
                                getValue={getBank.bind(this)}
                                label="Bank"
                            />
                        </View>
                        <CustomInput
                            label="Amount"
                            placeholder=''
                            value={amount}
                            getValue={setAmount.bind(this)}
                            keyboardType={"number-pad"}
                        />
                        <CustomInput
                            label="Narration"
                            placeholder=''
                            value={narration}
                            getValue={setNarration.bind(this)}
                            keyboardType={"email-address"}
                        />
                        <View style={{ width: '100%', marginBottom: 16 }}>
                            <DropDownSingle
                                name={category}
                                data={categoryList}
                                getValue={getCategory.bind(this)}
                                label="Category"
                            />
                        </View>
                    </View>
                    <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <RegularBtn
                            label={"Close"}
                            size={'45%'}
                            bgColor={COLORS.primary}
                            onClick={() => onCloseClick()}
                        />
                        {
                            loader
                                ?
                                <ActivityIndicator color={COLORS.primary} size="small" />
                                :
                                <RegularBtn
                                    label={"Save & Next"}
                                    size={'45%'}
                                    bgColor={COLORS.primary}
                                    onClick={() => apiHit()}
                                />
                        }
                    </View>


                    <View style={{ height: 80 }} />
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default CreatePayment

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
    labelStyle: {
        width: '100%',
        color: COLORS.primary,
        fontSize: CUSTOMWIDTH('4'),
        fontFamily: FONTS.SemiBold,
        marginBottom: 6,
    },
})