import { StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { COLORS, CUSTOMHEIGHT, CUSTOMWIDTH, FONTS, ICONS, SCREENS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../constants'
import moment from 'moment'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Feather';
import { CardviewBtn } from '../../../../common/cardviewBtn';


export const Item = ({ navigation, data }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    let {
        ID, RECEIPT_NO, RECEIPT_DATE, CUSTOMER, RECEIVED_FROM,
        CNARRATION, AMOUNT, PRE_RESERVATION
    } = data

    const viewSOA = () => {
        let soaUrl = `http://tvh.flexion.ae:9092/api/reports/Customer/Receipt/${ID}/TRUE`;
        navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "Receipt" })
    }

    return (
        <View style={styles.borderContainer} >
            <ImageBackground
                source={ICONS.unitBG}
                style={styles.container}
                resizeMode='cover'>
                <View style={styles.left}>
                    <View style={styles.top}>
                        <Text style={styles.unitCode}>{PRE_RESERVATION}</Text>
                        <Text style={styles.name}>{AMOUNT && Math.abs(AMOUNT).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.area}>ID - {ID}</Text>
                        <Text style={styles.area}>Receipt No - {RECEIPT_NO}</Text>
                        <Text style={styles.area}>Receipt Date - {moment(RECEIPT_DATE).format('DD-MMM-YYYY')}</Text>
                        <Text style={styles.area}>Customer - {CUSTOMER}</Text>
                        <Text numberOfLines={2} style={styles.area}>Narration - {CNARRATION}</Text>

                    </View>
                    <View style={styles.bottom}>
                        <CardviewBtn
                            label={"Pre & Print"}
                            size="32%"
                            onClick={() => viewSOA()}
                        />
                    </View>
                </View>
                <View style={styles.right}>
                    <View />
                    <View />
                    <TouchableOpacity onPress={() => { setIsModalVisible(true) }}>
                        <ImageBackground source={ICONS.ppBG} style={styles.btnImg} resizeMode="cover" >
                            <View style={styles.btnRow} >
                                <Text style={styles.btnLable}>Send Email</Text>
                            </View>
                            <View style={{ width: '85%', alignItems: 'flex-end' }} >
                                <Icon name='arrow-right' size={14} />
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    <View />
                    <View style={{ width: '100%', marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 2 }} >
                        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.RECEIPTDETAIL, { id: ID })} style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={styles.detail} >View Detail</Text>
                            <Icon name='arrow-right' size={12} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>

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
                <View style={{ width: CUSTOMWIDTH('100'),  alignItems: 'center', }}>
                    <View style={{ width: CUSTOMWIDTH('90'),  }}>
                        <View style={{ backgroundColor: COLORS.primary, width: CUSTOMWIDTH('80'), zIndex: 15, borderRadius: 5, alignItems: 'center', paddingVertical: 12 }}>
                            <Image source={ICONS.emailLarge} style={{ width: 90, height: 65, marginBottom: 10 }} resizeMode="contain" />
                            <Text numberOfLines={1} style={{ fontSize: 22, color: '#FFFFFF', fontFamily: FONTS.Bold, marginVertical: 7 }}>
                                Attention!
                            </Text>
                            <Text style={{ fontSize: 16, color: '#FFFFFF', fontFamily: FONTS.Medium, width: '85%', alignSelf: 'center', textAlign: 'center' }}>
                                Please confirm, Do you want to send the email
                            </Text>
                            <View style={{ width: '75%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                                <TouchableOpacity onPress={() => setIsModalVisible(false)} style={[styles.btnStyle, { marginRight: 5, width: 98 }]} >
                                    <Text style={styles.btnLabel}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setIsModalVisible(false)} style={[styles.btnStyle, { marginRight: 5, width: 98, backgroundColor: COLORS.lightGreen }]} >
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
    borderContainer: {
        borderRadius: SCREEN_HEIGHT * 0.019,
        overflow: 'hidden',
        marginTop: 12,
        borderColor: COLORS.borderColor,
        borderWidth: 1
    },
    container: {
        width: SCREEN_WIDTH * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SCREEN_HEIGHT * 0.01,
        height: Platform.OS == 'ios' ? SCREEN_HEIGHT * 0.26 : SCREEN_HEIGHT * 0.37,
    },
    left: {
        width: '78%',
    },
    right: {
        width: '20%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
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
        justifyContent: 'space-between',
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
    dataRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnImg: {
        width: 80,
        height: 46,
        shadowColor: '#000000',
        shadowOffset: { width: 4, height: 5 },
        elevation: 5,
        shadowRadius: 4,
        shadowOpacity: 0.26,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    btnLable: {
        color: COLORS.normalText,
        fontSize: SCREEN_WIDTH * 0.025,
        fontFamily: FONTS.Medium,
        marginLeft: 5
    },

    btnRow: {
        flexDirection: 'row',
        alignItems: 'center'
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
        fontSize: SCREEN_WIDTH * 0.029,
        fontFamily: FONTS.Bold
    },
    paid: {
        color: COLORS.boldText,
        textAlign: 'center',
        fontSize: SCREEN_WIDTH * 0.023,
        fontFamily: FONTS.SemiBold,
        marginTop: SCREEN_HEIGHT * 0.006
    },
    detail: {
        color: COLORS.boldText,
        textAlign: 'center',
        fontSize: SCREEN_WIDTH * 0.026,
        fontFamily: FONTS.Medium,
        marginLeft: 6
    },
    btnStyle: {
        width: 100,
        height: 26,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4
    },
    btnLabel: {
        color: COLORS.primary,
        fontSize: 11,
        fontFamily: FONTS.SemiBold,
        marginBottom: 2
    }
})