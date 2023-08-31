import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, CUSTOMHEIGHT, CUSTOMWIDTH, FONTS, ICONS, SCREENS } from '../../../constants'
import moment from 'moment'
import Modal from "react-native-modal";


export const Item = ({ navigation, data }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    let { DUE_TYPE, DUE_DATE, PERCENTAGE,
        DESCRIPTION, AMOUNT, INVOICE_NO,
        FLAG, ID
    } = data

    useEffect(() => {
        return () => {

        }
    }, [])


    const viewDetail = () => {

        let soaUrl = FLAG == "Y" ? `http://tvh.flexion.ae:9092/api/Reports/customer/FPDL_INV_REG/${INVOICE_NO}/true/33` : `http://tvh.flexion.ae:9092/api/Reports/customer/FPDL_INV_PER/${ID}/true`;
        navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "Payment Plan" })
    }

    return (
        <View style={styles.container}>
            <View style={styles.dataRow}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Due Type</Text>
                    <Text style={styles.value} >{DUE_TYPE}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={styles.left}>
                    <Text style={styles.label} >Due Date</Text>
                    <Text style={styles.value} >{moment(DUE_DATE).format('DD-MMM-YY')}</Text>
                </View>
                <View style={styles.left}>
                    <Text style={styles.label} >%</Text>
                    <Text style={styles.value} >{PERCENTAGE}</Text>
                </View>
            </View>

            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Description</Text>
                    <Text style={styles.value} numberOfLines={2} >{DESCRIPTION}</Text>
                </View>
            </View>

            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={styles.left}>
                    <Text style={styles.label} >Amount</Text>
                    <Text style={styles.value} >{AMOUNT && Math.abs(AMOUNT).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                </View>
                <View style={styles.left}>
                    <Text style={styles.label} >%</Text>
                    <Text style={styles.value} >{PERCENTAGE}</Text>
                </View>
            </View>

            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={styles.left}>
                    <Text style={styles.label} >INV NO</Text>
                    <Text style={styles.value} >{INVOICE_NO}</Text>
                </View>
                <View style={styles.left}>
                    <Text style={styles.label} >INV</Text>
                    <Text style={styles.value} >{FLAG}</Text>
                </View>
            </View>

            <View style={styles.btnsRow}>
                <TouchableOpacity onPress={() => { setIsModalVisible(true) }} style={[styles.btnStyle, { marginRight: 5, width: 98 }]} >
                    <Text style={styles.btnLabel}>Send Email</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => viewDetail()} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>View</Text>
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
                <View style={{ width: CUSTOMWIDTH('100'), height: CUSTOMHEIGHT('25'), alignItems: 'center', }}>
                    <View style={{ width: CUSTOMWIDTH('90'), height: CUSTOMHEIGHT('25'), }}>
                        <View style={{ backgroundColor: COLORS.primary, width: CUSTOMWIDTH('80'), height: CUSTOMHEIGHT('25'), zIndex: 15, borderRadius: 5, alignItems: 'center', paddingVertical: 12 }}>
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
        width: 100,
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
    }

})