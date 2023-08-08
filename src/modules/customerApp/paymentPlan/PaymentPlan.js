import {
    StyleSheet, Text, View, SafeAreaView, Image,
    TouchableOpacity, ImageBackground, FlatList, Platform
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, FONTS, ICONS, CUSTOMHEIGHT, CUSTOMWIDTH, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../constants';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import Modal from "react-native-modal";
import { BackButton } from '../../../common/backButton';



const Item = ({ navigation, data }) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    let { DUE_TYPE, DUE_DATE, AMOUNT, INVOICE_NO,
        FLAG, ID
    } = data

    const viewDetail = () => {
        let soaUrl = FLAG == "Y" ? `http://tvh.flexion.ae:9092/api/Reports/customer/FPDL_INV_REG/${INVOICE_NO}/true/33` : `http://tvh.flexion.ae:9092/api/Reports/customer/FPDL_INV_PER/${ID}/true`;
        navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "Payment Plan" })
    }

    return (
        <ImageBackground
            source={ICONS.ppBG}
            style={styles.bgStyle}
            resizeMode="stretch">
            <View style={styles.left}>
                <View style={styles.top}>
                    <Text style={styles.unitCode}>{DUE_TYPE}</Text>
                    <Text style={styles.name}>{AMOUNT && Math.abs(AMOUNT).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                </View>
                <View style={styles.center}>
                    <Text style={styles.area}>Paid on - {moment(DUE_DATE).format('DD/MM/YY')} <Text style={[styles.area, { color: '#8D0101' }]}> Pending - 0.0</Text></Text>
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
                    <TouchableOpacity onPress={() => viewDetail()} style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={styles.detail} >View Detail</Text>
                        <Icon name='arrow-right' size={12} />
                    </TouchableOpacity>
                </View>
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
        </ImageBackground>
    )
}

const PaymentPlan = ({ navigation, route }) => {
    const detail = route.params.detail
    const generalData = useSelector(state => state.property.generalData)
    const [list, setList] = useState([])
    const [search, setSearch] = useState('');

    useEffect(() => {
        setList(generalData[1])
        return () => {

        }
    }, [generalData])

    const emputyComponent = () => (
        <Text style={{ color: '#000000', fontSize: 13, fontFamily: FONTS.Bold, alignSelf: 'center' }} >Empty Result</Text>
    )
    const getSearch = (item) => {
        setSearch(item)
        var unit_list = generalData[1];
        const filteredUnites = unit_list
            ? unit_list.filter((filterUnit) => {
                return (filterUnit.DUE_TYPE
                    .toLowerCase()
                    .includes(item.toLowerCase()) ||
                    moment(filterUnit.DUE_DATE).format('DD-MMM-YY')
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.DESCRIPTION
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.PERCENTAGE
                        .toString()
                        .includes(item) ||
                    filterUnit.AMOUNT
                        .toString()
                        .includes(item)
                )
            })
            : [];
        setList(filteredUnites)

    }

    return (
        <SafeAreaView style={styles.container} >
            <Text style={styles.heading} >{detail.UNIT_CODE}</Text>
            <Text style={styles.pp} >Payment Plan</Text>
            <BackButton navigation={navigation} label="" />
            <View style={{ height: 3, width: '100%' }} />
            <FlatList
                style={{ width: '100%' }}
                data={list}
                renderItem={({ item }) => (
                    <View style={{ width: '100%', alignItems: 'center' }} >
                        <Item data={item} navigation={navigation} />
                    </View>
                )}
                keyExtractor={item => item.ID}
                ListEmptyComponent={emputyComponent}
            />
        </SafeAreaView>
    )
}

export default PaymentPlan

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#DFE3E6',
        alignItems: 'center'
    },
    heading: {
        width: '90%',
        color: COLORS.boldText,
        fontFamily: FONTS.SemiBold,
        fontSize: SCREEN_WIDTH * 0.05,
    },
    pp: {
        width: '90%',
        color: COLORS.boldText,
        fontFamily: FONTS.Medium,
        fontSize: SCREEN_WIDTH * 0.033,
        marginBottom: 4
    },
    listingConatiner: {
        width: '90%',
        alignItems: 'center',
    },
    bgStyle: {
        width: SCREEN_WIDTH * 0.90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SCREEN_HEIGHT * 0.01,
        height: Platform.OS == 'ios' ? SCREEN_HEIGHT * 0.12 : SCREEN_HEIGHT * 0.18,
        marginTop: 12
    },
    left: {
        width: '68%',
    },
    right: {
        width: '30%',
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
        paddingTop: 10
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
        marginRight: 6
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