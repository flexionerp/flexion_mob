import { StyleSheet, Text, TouchableOpacity, View, TextInput, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { COLORS, CUSTOMWIDTH, FONTS, ICONS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Feather';
import { RegularBtn } from './regularBtn';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { insertApproval } from '../redux/property/property.action';
import CustomDatePicker from './customDatePicker'
import { CardviewBtn } from './cardviewBtn';


export const HomeItem = ({ navigation, data }) => {
    const dispatch = useDispatch()
    const {
        ID, RESERVATION_ID, STATUS, PRE_RESERVATION_ID, REMARKS, UNIT_CODE,
        ORG_NAME, CUSTOMER_NAME, LOCATION_NAME, RECEIVED, INVOICES, DUE,
        COMMISSION_AMT, TOTAL_BOOKING, SALE_VALUE, COMMISSION_PER,
        APPROVAL_TYPE, LEVEL_NO, UNIT_ID, UNIT_NAME

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
            <View style={styles.itemContainer} >
                <ImageBackground
                    source={ICONS.unitBG}
                    style={styles.bgStyle}
                    resizeMode="cover">
                    <View style={styles.left}>
                        <View style={styles.top}>
                            <Text numberOfLines={1} style={styles.unitCode}>{CUSTOMER_NAME}</Text>
                            <Text numberOfLines={2} style={styles.name}>{UNIT_CODE}</Text>
                        </View>
                        <View style={styles.center}>
                            <Text style={styles.area}>Operating Unit - {ORG_NAME}</Text>
                            <Text style={styles.area}>Location - {LOCATION_NAME}</Text>
                            <Text style={styles.area}>Status - {STATUS}</Text>
                            <Text style={styles.area}>Reservation ID - {RESERVATION_ID}</Text>
                            <Text style={styles.area}>Remarks - {REMARKS}</Text>
                            <Text style={styles.area}>Pre Reservation ID - {PRE_RESERVATION_ID}</Text>
                            <Text style={styles.area}>Sale Price - {SALE_VALUE.trim()}</Text>
                            <Text style={styles.area}>Received Amount - {RECEIVED}</Text>
                            <Text style={styles.area}>Invoices - {INVOICES}</Text>
                            <Text style={styles.area}>Due Amount - {DUE}</Text>
                            <Text style={styles.area}>Commission Amount - {COMMISSION_AMT}</Text>
                            <Text style={styles.area}>Total Booking - {TOTAL_BOOKING}</Text>
                            <Text style={styles.area}>Commission Per - {COMMISSION_PER}</Text>
                            <Text style={styles.area}>Commission Per - {COMMISSION_PER}</Text>
                        </View>
                        <View style={styles.bottom}>
                            <CardviewBtn
                                label={"Approved"}
                                size="32%"
                                onClick={() => viewDetail(0)}
                            />
                            <View style={{width:10}} />
                            <CardviewBtn
                                label={"Rejected"}
                                size="32%"
                                onClick={() => viewDetail(1)}
                            />
                            <View style={{ width: 10 }} />

                           {
                                token == 5266 &&  <CardviewBtn
                                    label={"Hold"}
                                    size="32%"
                                    onClick={() => viewDetail(2)}
                                />
                           } 
                        </View>
                    </View>
                </ImageBackground>
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
    itemContainer: {
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        borderRadius: SCREEN_HEIGHT * 0.012,
        marginTop: 12,
        overflow: 'hidden'
    },
    bgStyle: {
        width: SCREEN_WIDTH * 0.90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SCREEN_HEIGHT * 0.01,
        height: SCREEN_HEIGHT * 0.44
    },
    left: {
        width: '100%',
    },
    right: {
        width: '45%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        // backgroundColor: 'green'
    },
    top: {
        marginBottom: 12
    },
    center: {
        marginBottom: 12
    },
    bottom: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap:'wrap'
    },
    unitCode: {
        color: COLORS.boldText,
        fontSize: SCREEN_WIDTH * 0.05,
        fontFamily: FONTS.Bold
    },
    name: {
        color: COLORS.boldText,
        fontSize: SCREEN_WIDTH * 0.037,
        fontFamily: FONTS.Medium
    },
    area: {
        color: COLORS.normalText,
        fontSize: SCREEN_WIDTH * 0.029,
        fontFamily: FONTS.Medium
    },
    btnStyle: {
        width: 107,
        height: 36,
        borderRadius: 11,
    },
    btnLable: {
        color: COLORS.normalText,
        fontSize: SCREEN_WIDTH * 0.029,
        fontFamily: FONTS.SemiBold,
        marginLeft: 5
    },
    btnImg: {
        width: 107,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: COLORS.secondry,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        shadowOpacity: 0.26,
    },
    progressBar: {
        width: 130,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center'
    },
    salePrice: {
        color: COLORS.green,
        textAlign: 'center',
        fontSize: SCREEN_WIDTH * 0.02,
        fontFamily: FONTS.Medium
    },
    paid: {
        color: COLORS.boldText,
        textAlign: 'center',
        fontSize: SCREEN_WIDTH * 0.018,
        fontFamily: FONTS.Medium,
        marginTop: SCREEN_HEIGHT * 0.002
    },
    due: {
        color: "#962424",
        textAlign: 'center',
        fontSize: SCREEN_WIDTH * 0.018,
        fontFamily: FONTS.Medium,
        marginTop: SCREEN_HEIGHT * 0.002
    },
    detail: {
        color: COLORS.boldText,
        textAlign: 'center',
        fontSize: SCREEN_WIDTH * 0.026,
        fontFamily: FONTS.Medium,
        marginRight: 6
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