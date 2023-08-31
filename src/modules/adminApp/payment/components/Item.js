import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { COLORS, FONTS, ICONS, SCREEN_HEIGHT, SCREEN_WIDTH  } from '../../../../constants'
import Icon from 'react-native-vector-icons/Feather';

export const Item = ({ navigation, data }) => {
    let { CUSTOMER_ID, NATIONALITY, CUSTOMERNAME, UNITS, RESERVE_SALES,
        INVOICED_AMOUNT, PRE_RESERVE_SALES, COLLECTED_AMOUNT,
        OUTSTANDING_AMOUNT, UNDEPOSITED_CHQ,
    } = data

    const viewSOA = () => {
        let soaUrl = `http://tvh.flexion.ae:9092//api/reports/customer/soa_customer/${CUSTOMER_ID}/true/33`;
        navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "Finance" })
    }

    return (
        <View style={styles.borderContainer} >
            <ImageBackground
                source={ICONS.unitBG}
                style={styles.container}
                resizeMode='cover'>
                <View style={styles.left}>
                    <View style={styles.top}>
                        <Text style={styles.unitCode}>{CUSTOMERNAME}</Text>
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.area}>Customer ID - {CUSTOMER_ID}</Text>
                        <Text style={styles.area}>Nationality - {NATIONALITY}</Text>
                        <Text style={styles.area}>No. of Units - {UNITS}</Text>
                        <Text style={styles.area}>Reserve Sales - {RESERVE_SALES && Math.abs(RESERVE_SALES).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                        <Text style={styles.area}>Pre Reserve Sales - {PRE_RESERVE_SALES && Math.abs(PRE_RESERVE_SALES).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                        <Text style={styles.area}>Invoiced Amount - {INVOICED_AMOUNT && Math.abs(INVOICED_AMOUNT).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                        <Text style={styles.area}>Collected Amount - {COLLECTED_AMOUNT && Math.abs(COLLECTED_AMOUNT).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                        <Text style={styles.area}>Outstanding Amount - {OUTSTANDING_AMOUNT && Math.abs(OUTSTANDING_AMOUNT).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                        <Text style={styles.area}>Undeposited Chq - {UNDEPOSITED_CHQ}</Text>
                    </View>
                    <View style={styles.bottom}/>
                </View>
                <View style={styles.right}>
                    <View />
                    <View />
                    <View />
                    <View style={{ width: '100%', marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 2 }} >
                        <TouchableOpacity onPress={() => viewSOA()} style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={styles.detail} >SOA</Text>
                            <Icon name='arrow-right' size={12} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
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
        height: SCREEN_HEIGHT * 0.28,
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
        // justifyContent: 'space-between',
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