import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS, CUSTOMWIDTH, FONTS, ICONS, SCREENS, } from '../../../constants'
import moment from 'moment'
import Modal from "react-native-modal";
import { useSelector, useDispatch } from 'react-redux';
import { insertConfirmReceipt } from '../../../redux/property/property.action';


export const Item = ({ navigation, data, bookedCount }) => {
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.user)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [confirmBtn, setConfirmBtn] = useState(0)
    let {
        ID, RECEIPT_NO, RECEIPT_DATE, CUSTOMER, RECEIVED_FROM,
        CNARRATION, AMOUNT, PRE_RESERVATION, IS_CONFIRM,
        PRE_RESERVATION_ID
    } = data

    const viewSOA = () => {
        let soaUrl = `http://tvh.flexion.ae:9092/api/reports/Customer/Receipt/${ID}/TRUE`;
        navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "Receipt" })
    }

    const btnClick = (id) => {
        if (id == 0) {
            setConfirmBtn(id)
            setIsModalVisible(true)
        } else {
            setConfirmBtn(id)
            setIsModalVisible(true)
        }
    }

    const confirm = () => {
        if (confirmBtn == 0) {
            let record = {
                id: ID,
                reserve_id: PRE_RESERVATION_ID,
                USER_INFO_ID: token
            }
            setIsModalVisible(false)
            dispatch(insertConfirmReceipt(record))
        } else {
            setIsModalVisible(false)
            alert("Email sent successfully!")
        }

    }
    const edit = () => {
        navigation.navigate(SCREENS.CREATEPAYMENT, { id: ID })
    }

    return (
        <View style={styles.container}>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Receipt No</Text>
                    <Text style={[styles.value, { width: '50%' }]} >{RECEIPT_NO}</Text>
                </View>
                <View style={[styles.left]}>
                    <Text style={styles.label} >Receipt Date</Text>
                    <Text style={[styles.value, { width: '50%' }]} >{moment(RECEIPT_DATE).format("MM-DD-YYYY")}</Text>
                </View>
            </View>

            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Customer</Text>
                    <Text style={styles.value} numberOfLines={2} >{CUSTOMER}</Text>
                </View>
            </View>

            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Received From</Text>
                    <Text style={styles.value} numberOfLines={2} >{RECEIVED_FROM}</Text>
                </View>
            </View>

            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Narration</Text>
                    <Text style={[styles.value, { width: '80%' }]} numberOfLines={3} >{CNARRATION}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Amount</Text>
                    <Text style={styles.value}>{AMOUNT}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Pre Res#</Text>
                    <Text style={styles.value} numberOfLines={2} >{PRE_RESERVATION}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Confirm</Text>
                    <Text style={styles.value} numberOfLines={2} >{IS_CONFIRM == "0" ? "No" : "Yes"}</Text>
                </View>
            </View>
            <View style={styles.btnsRow}>
                {
                    IS_CONFIRM == "0" && bookedCount.length > 200 && <TouchableOpacity onPress={edit} style={[styles.btnStyle, { marginRight: 5, width: 98 }]} >
                        <Text style={styles.btnLabel}>Add Details</Text>
                    </TouchableOpacity>
                }
                {
                    IS_CONFIRM == "0" && bookedCount.length > 200 && <TouchableOpacity onPress={() => { btnClick(0) }} style={[styles.btnStyle, { marginRight: 5, width: 98 }]} >
                        <Text style={styles.btnLabel}>Confirm</Text>
                    </TouchableOpacity>
                }
                {IS_CONFIRM == "1" && <>
                    <TouchableOpacity onPress={() => { btnClick(1) }} style={[styles.btnStyle, { marginRight: 5, width: 98 }]} >
                        <Text style={styles.btnLabel}>Send Email</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={viewSOA} style={[styles.btnStyle, { marginRight: 5 }]} >
                        <Text style={styles.btnLabel}>Pre & Print</Text>
                    </TouchableOpacity>
                </>
                }
                <TouchableOpacity onPress={() => navigation.navigate(SCREENS.RECEIPTDETAIL, { id: ID })} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>View Detail</Text>
                </TouchableOpacity>
            </View>

            <Modal
                onBackButtonPress={() => setIsModalVisible(false)}
                onBackdropPress={() => setIsModalVisible(false)}
                animationIn="fadeIn"
                animationOut="fadeOut"
                backdropOpacity={0.4}
                animationInTiming={300}
                animationOutTiming={300}
                isVisible={isModalVisible}
                style={{ flex: 0.96, justifyContent: 'center', zIndex: 50, }}
            >
                <View style={{ width: CUSTOMWIDTH('100'), alignItems: 'center', }}>
                    <View style={{ width: CUSTOMWIDTH('90'), }}>
                        <View style={{ backgroundColor: COLORS.primary, width: CUSTOMWIDTH('80'), zIndex: 15, borderRadius: 5, alignItems: 'center', paddingVertical: 12 }}>
                            {/* <Image source={ICONS.emailLarge} style={{ width: 90, height: 65, marginBottom: 10 }} resizeMode="contain" /> */}
                            <Text numberOfLines={1} style={{ fontSize: 22, color: '#FFFFFF', fontFamily: FONTS.Bold, marginVertical: 7 }}>
                                Attention!
                            </Text>
                            <Text style={{ fontSize: 16, color: '#FFFFFF', fontFamily: FONTS.Medium, width: '85%', alignSelf: 'center', textAlign: 'center' }}>
                                Are you sure , you want to confirm and send the email?
                            </Text>
                            <View style={{ width: '75%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                                <TouchableOpacity onPress={() => setIsModalVisible(false)} style={[styles.btnStyle, { marginRight: 5, width: 98 }]} >
                                    <Text style={styles.btnLabel}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => confirm()} style={[styles.btnStyle, { marginRight: 5, width: 98, backgroundColor: COLORS.lightGreen }]} >
                                    <Text style={styles.btnLabel}>Send</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: COLORS.primary,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15
    },

    dataRow: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    left: {
        width: '47.5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
        borderBottomWidth: 1,
        paddingBottom: 5
    },
    label: {
        color: COLORS.secondry,
        fontSize: 11,
        fontFamily: FONTS.SemiBold
    },
    value: {
        color: COLORS.secondry,
        fontSize: 9,
        fontFamily: FONTS.Regular,
        textAlign: 'right',
    },
    btnsRow: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: 7
    },
    btnStyle: {
        width: 100,
        height: 26,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    btnLabel: {
        color: COLORS.primary,
        fontSize: 11,
        fontFamily: FONTS.SemiBold,
        marginBottom: 2
    }

})