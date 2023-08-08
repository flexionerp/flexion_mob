import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS, CUSTOMHEIGHT, CUSTOMWIDTH, FONTS, ICONS, } from '../../../constants'
import { CheckBox } from '../../../common/checkbox'
import Modal from "react-native-modal";


export const Item = ({ navigation, data }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    let { CUSTOMER_ID, PERCENTAGE, NAME, IS_PRIMARY, ORG_ID
    } = data

    const viewDetail = () => {
        let soaUrl = `http://tvh.flexion.ae:9092/api/reports/customer/soa_customer/${CUSTOMER_ID}/true/33`;
        navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "Customer" })
    }

    return (
        <View style={styles.container}>
            <View style={styles.dataRow}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Customer ID</Text>
                    <Text style={styles.value} >{CUSTOMER_ID}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Customer Name</Text>
                    <Text style={styles.value} >{NAME}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <View style={[styles.left, { width: '100%' }]}>
                    <Text style={styles.label} >Percentage</Text>
                    <Text style={styles.value} >{PERCENTAGE}</Text>
                </View>
            </View>
            <View style={[styles.dataRow, { marginTop: 14 }]}>
                <CheckBox
                    value={IS_PRIMARY == 1}
                    getValue={() => { }}
                />
                <Text style={[styles.label, { width: '90%' }]}>Is Primary</Text>
            </View>
            <View style={styles.btnsRow}>
                <TouchableOpacity onPress={() => navigation.navigate("CustomerDetail", { CUSTOMER_ID, ORG_ID })} style={[styles.btnStyle, { marginRight: 5, width: 98 }]} >
                    <Text style={styles.btnLabel}>Detail</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("CustomerContacts", { CUSTOMER_ID })} style={[styles.btnStyle, { marginRight: 5, width: 98 }]} >
                    <Text style={styles.btnLabel}>Contacts</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => viewDetail()} style={[styles.btnStyle, { marginRight: 5, width: 98 }]} >
                    <Text style={styles.btnLabel}>SOA</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setIsModalVisible(true) }} style={[styles.btnStyle, { marginRight: 5, width: 98 }]} >
                    <Text style={styles.btnLabel}>Send CC</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setIsModalVisible(true) }} style={[styles.btnStyle, { marginRight: 5, width: 98 }]} >
                    <Text style={styles.btnLabel}>Send SOA</Text>
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
                            <Image source={ICONS.emailLarge} style={{ width: 90, height: 65, marginBottom:10 }} resizeMode="contain" />
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
        marginTop: 10,
        flexWrap: 'wrap'
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