import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { COLORS, CUSTOMWIDTH, FONTS } from '../constants'
import Modal from "react-native-modal";
import { RegularBtn } from './regularBtn';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment/moment';
import { insertApproval } from '../redux/property/property.action';
import CustomDatePicker from '../common/customDatePicker'


export const HomeItem = ({ navigation, data }) => {
    const dispatch = useDispatch()
    const {
        ID, RESERVATION_ID, STATUS, PRE_RESERVATION_ID, REMARKS, UNIT_CODE,
        ORG_NAME, CUSTOMER_NAME, LOCATION_NAME, RECEIVED, INVOICES, DUE,
        COMMISSION_AMT, TOTAL_BOOKING, SALE_VALUE, COMMISSION_PER,
        APPROVAL_TYPE, LEVEL_NO, UNIT_ID
    } = data
    const { token, userDetail } = useSelector(state => state.user)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [comment, setComment] = useState(false)
    const [type, setType] = useState(0)
    const [type1, setType1] = useState(0)
    const [fromDate, setFromDate] = useState(new Date());

    const getFromDate = value => {
        const x = new Date().setHours(0, 0, 0, 0);
        const y = new Date(value).setHours(0, 0, 0, 0);
        if (y < x) {
            alert("DOB should not less than current date")
            setFromDate(new Date());
        } else {
            setFromDate(value);
        }
    };


    const viewDetail = (id) => {
        setIsModalVisible(true)
        if (id == 0) {
            setType(1)
            setType1(0)
            return;
        }
        if (id == 1) {
            setType(0)
            setType1(0)
            return;
        }
        if (id == 2) {
            setType(0)
            setType1(1)
            return;
        }
    }

    const approval = () => {
        if (comment == '') {
            alert("Comment field should not be blank")
            return;
        }
        let data = {
            RESERVE_ID: RESERVATION_ID,
            PRE_RESERVE_ID: PRE_RESERVATION_ID,
            PK: ID,
            LEVEL: LEVEL_NO,
            USER_INFO_ID: token,
            LOGIN_NAME: userDetail.LOGIN_NAME,
            TYPE: APPROVAL_TYPE,
            COMMENTS: comment,
            ORG_ID: 33,
            UNIT_ID: UNIT_ID,
            conf_val: type,
            conf_val1: type1,
            dt: setType1 == 1 ? moment(fromDate).format('DD-MMM-YY') : moment().format('DD-MMM-YY')
        }
        dispatch(insertApproval(data))
        setIsModalVisible(false)
    }

    return (
        <>
            <View style={styles.container}>
                <View style={[styles.dataRow]}>
                    <View style={[styles.left, { width: '100%' }]}>
                        <Text style={styles.label} >Customer Name</Text>
                        <Text style={styles.value} numberOfLines={2} >{CUSTOMER_NAME}</Text>
                    </View>
                </View>
                <View style={[styles.dataRow]}>
                    <View style={[styles.left, { width: '100%', marginTop: 14 }]}>
                        <Text style={styles.label} >Operating Unit</Text>
                        <Text style={styles.value} numberOfLines={2} >{ORG_NAME}</Text>
                    </View>
                </View>
                <View style={[styles.dataRow]}>
                    <View style={[styles.left, { width: '100%', marginTop: 14 }]}>
                        <Text style={styles.label} >Location</Text>
                        <Text style={styles.value} numberOfLines={2} >{LOCATION_NAME}</Text>
                    </View>
                </View>
                <View style={[styles.dataRow]}>
                    <View style={[styles.left, { width: '100%', marginTop: 14 }]}>
                        <Text style={styles.label} >Unit Code</Text>
                        <Text style={styles.value} numberOfLines={2} >{UNIT_CODE}</Text>
                    </View>
                </View>
                <View style={[styles.dataRow]}>
                    <View style={[styles.left, { width: '100%', marginTop: 14 }]}>
                        <Text style={styles.label} >Status</Text>
                        <Text style={styles.value} numberOfLines={2} >{STATUS}</Text>
                    </View>
                </View>
                <View style={[styles.dataRow]}>
                    <View style={[styles.left, { width: '100%', marginTop: 14 }]}>
                        <Text style={styles.label} >Reservation ID</Text>
                        <Text style={styles.value} >{RESERVATION_ID}</Text>
                    </View>
                </View>
                {/* <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={styles.left}>
                    <Text style={styles.label} >Reservation ID</Text>
                    <Text style={styles.value} >{RESERVATION_ID}</Text>
                </View>
                <View style={styles.left}>
                    <Text style={styles.label} >Approver ID</Text>
                    <Text style={styles.value} >{APPROVER_USER_ID}</Text>
                </View>
            </View> */}

                {/* <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={styles.left}>
                    <Text style={styles.label} >Unit ID</Text>
                    <Text style={styles.value} >{UNIT_ID}</Text>
                </View>
                <View style={styles.left}>
                    <Text style={styles.label} >Unit Name</Text>
                    <Text style={styles.value} >{UNIT_NAME}</Text>
                </View>
            </View> */}

                {/* <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={styles.left}>
                    <Text style={styles.label} >Status 1</Text>
                    <Text style={styles.value} >{STATUS_1}</Text>
                </View>
                <View style={styles.left}>
                    <Text style={styles.label} >Level No.</Text>
                    <Text style={styles.value} >{LEVEL_NO}</Text>
                </View>
            </View> */}
                <View style={[styles.dataRow]}>
                    <View style={[styles.left, { width: '100%', marginTop: 14 }]}>
                        <Text style={styles.label} >Remarks</Text>
                        <Text style={styles.value} numberOfLines={2} >{REMARKS}</Text>
                    </View>
                </View>

                <View style={[styles.dataRow]}>
                    <View style={[styles.left, { width: '100%', marginTop: 14 }]}>
                        <Text style={styles.label} >Pre Reservation ID</Text>
                        <Text style={styles.value} numberOfLines={2} >{PRE_RESERVATION_ID}</Text>
                    </View>
                </View>
                {/* <View style={[styles.dataRow]}>
                <View style={[styles.left, { width: '100%', marginTop: 14 }]}>
                    <Text style={styles.label} >Approval Type</Text>
                    <Text style={styles.value} numberOfLines={2} >{APPROVAL_TYPE}</Text>
                </View>
            </View> */}

                {/* <View style={[styles.dataRow]}>
                <View style={[styles.left, { width: '100%', marginTop: 14 }]}>
                    <Text style={styles.label} >Org ID</Text>
                    <Text style={styles.value} numberOfLines={2} >{ORG_ID}</Text>
                </View>
            </View> */}
                <View style={[styles.dataRow]}>
                    <View style={[styles.left, { width: '100%', marginTop: 14 }]}>
                        <Text style={styles.label} >Received Amount</Text>
                        <Text style={styles.value} numberOfLines={2} >{RECEIVED}</Text>
                    </View>
                </View>
                <View style={[styles.dataRow]}>
                    <View style={[styles.left, { width: '100%', marginTop: 14 }]}>
                        <Text style={styles.label} >Invoices</Text>
                        <Text style={styles.value} numberOfLines={2} >{INVOICES}</Text>
                    </View>
                </View>
                <View style={[styles.dataRow]}>
                    <View style={[styles.left, { width: '100%', marginTop: 14 }]}>
                        <Text style={styles.label} >Due Amount</Text>
                        <Text style={styles.value} numberOfLines={2} >{DUE}</Text>
                    </View>
                </View>
                <View style={[styles.dataRow]}>
                    <View style={[styles.left, { width: '100%', marginTop: 14 }]}>
                        <Text style={styles.label} >Commission Amount</Text>
                        <Text style={styles.value} numberOfLines={2} >{COMMISSION_AMT}</Text>
                    </View>
                </View>
                <View style={[styles.dataRow]}>
                    <View style={[styles.left, { width: '100%', marginTop: 14 }]}>
                        <Text style={styles.label} >Total Booking</Text>
                        <Text style={styles.value} numberOfLines={2} >{TOTAL_BOOKING}</Text>
                    </View>
                </View>
                <View style={[styles.dataRow]}>
                    <View style={[styles.left, { width: '100%', marginTop: 14 }]}>
                        <Text style={styles.label} >Sale Value</Text>
                        <Text style={styles.value} numberOfLines={2} >{SALE_VALUE}</Text>
                    </View>
                </View>
                <View style={[styles.dataRow]}>
                    <View style={[styles.left, { width: '100%', marginTop: 14 }]}>
                        <Text style={styles.label} >Commission Per</Text>
                        <Text style={styles.value} numberOfLines={2} >{COMMISSION_PER}</Text>
                    </View>
                </View>

                <View style={[styles.btnsRow, { marginTop: 18 }]}>
                    <TouchableOpacity onPress={() => viewDetail(0)} style={[styles.btnStyle, { marginRight: 5, width: 98 }]} >
                        <Text style={styles.btnLabel}>Approved</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => viewDetail(1)} style={[styles.btnStyle, { marginRight: 5, width: 98 }]} >
                        <Text style={styles.btnLabel}>Rejected</Text>
                    </TouchableOpacity>
                    {token == 5266
                        ?
                        <TouchableOpacity onPress={() => viewDetail(2)} style={[styles.btnStyle, { width: 98 }]} >
                            <Text style={styles.btnLabel}>Hold</Text>
                        </TouchableOpacity>
                        :
                        null
                    }
                </View>
            </View>
            <Modal
                onBackButtonPress={() => setIsModalVisible(false)}
                onBackdropPress={() => setIsModalVisible(false)}
                animationIn="fadeIn"
                animationOut="fadeOut"
                backdropOpacity={0.3}
                animationInTiming={300}
                animationOutTiming={300}
                isVisible={isModalVisible}
                style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ width: CUSTOMWIDTH('100'), alignItems: 'center', }}>
                    <View style={{ width: CUSTOMWIDTH('90'), }}>
                        <View style={styles.modalContainer}>
                            <TextInput
                                multiline={true}
                                style={styles.inputStyle}
                                placeholder={"Enter comment"}
                                onChangeText={(value) => setComment(value)}
                                value={comment}
                            />
                            {
                                type1 == 1
                                    ?
                                    <View style={{ width: '90%', marginBottom: 12 }}>
                                        <Text style={styles.labelStyle}>Due Date</Text>
                                        <CustomDatePicker
                                            value={fromDate}
                                            getValue={getFromDate.bind(this)}
                                        />
                                    </View>
                                    :
                                    null
                            }

                            <RegularBtn
                                label={"Save"}
                                size={'50%'}
                                bgColor={COLORS.primary}
                                onClick={() => approval()}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
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
        fontFamily: FONTS.Regular
    },
    btnsRow: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10
    },
    btnStyle: {
        width: 125,
        height: 26,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnLabel: {
        color: COLORS.primary,
        fontSize: 11,
        fontFamily: FONTS.SemiBold,
        marginBottom: 2
    },
    inputStyle: {
        fontSize: 13,
        color: COLORS.primary,
        height: 180,
        width: '90%',
        backgroundColor: COLORS.secondry,
        borderRadius: 4,
        textAlignVertical: 'top',
        padding: 8,
        marginBottom: 16
    },
    modalContainer: {
        backgroundColor: COLORS.lightGreen,
        width: CUSTOMWIDTH('80'),
        zIndex: 15,
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: 20
    },
    labelStyle: {
        width: '100%',
        color: COLORS.primary,
        fontSize: CUSTOMWIDTH('4'),
        fontFamily: FONTS.SemiBold,
        marginBottom: 6,
    },

})