import { StyleSheet, Text, View, SafeAreaView, ScrollView, } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS, FONTS, ICONS } from '../../../constants';
import moment from 'moment';


const UnitDetail = ({ navigation, route }) => {
    let { CUSTOMER_NAME, NATIONALITY, PRE_RESERVE_NO, PRE_RESERVE_DATE,
        RESERVE_DATE, UNIT_CODE, AGENT_NAME, SALE_VALUE, STATUS_NAME,
        GROSS_AREA, UNIT_SPECS_NAME, BROKER_NAME
    } = route.params.detail

    useEffect(() => {
        return () => {

        }
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            {/* <Header navigation={navigation} label={"Detail"} /> */}
            <View style={{ height: 12 }} />
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                <View style={styles.listingConatiner}>
                    <View style={styles.detailCard}>
                        <Text style={styles.statusLabel}>View Details</Text>
                        <View style={styles.left}>
                            <Text style={styles.label} >Customer</Text>
                            <Text style={styles.value} >{CUSTOMER_NAME}</Text>
                        </View>
                        <View style={styles.left}>
                            <Text style={styles.label} >Nationality</Text>
                            <Text style={styles.value} >{NATIONALITY}</Text>
                        </View>
                        <View style={styles.left}>
                            <Text style={styles.label} >Pre Reserve No</Text>
                            <Text style={styles.value} >{PRE_RESERVE_NO}</Text>
                        </View>
                        <View style={styles.left}>
                            <Text style={styles.label} >Pre Reserve No</Text>
                            <Text style={styles.value} >{moment(PRE_RESERVE_DATE).format('MM/DD/YYYY')}</Text>
                        </View>
                        <View style={styles.left}>
                            <Text style={styles.label} >Reservation Date</Text>
                            <Text style={styles.value} >{moment(RESERVE_DATE).format('MM/DD/YYYY')}</Text>
                        </View>

                        <View style={styles.left}>
                            <Text style={styles.label} >Unit Code</Text>
                            <Text style={styles.value} >{UNIT_CODE}</Text>
                        </View>
                        <View style={styles.left}>
                            <Text style={styles.label} >Broker Name</Text>
                            <Text style={styles.value} >{BROKER_NAME}</Text>
                        </View>
                        <View style={styles.left}>
                            <Text style={styles.label} >Agent</Text>
                            <Text style={styles.value} >{AGENT_NAME}</Text>
                        </View>
                        <View style={styles.left}>
                            <Text style={styles.label} >Sale Price</Text>
                            <Text style={styles.value} >{SALE_VALUE}</Text>
                        </View>
                        <View style={styles.left}>
                            <Text style={styles.label} >Status</Text>
                            <Text style={styles.value} >{STATUS_NAME}</Text>
                        </View>
                        <View style={styles.left}>
                            <Text style={styles.label} >Total Area</Text>
                            <Text style={styles.value} >{GROSS_AREA}
                            </Text>
                        </View>
                        <View style={styles.left}>
                            <Text style={styles.label} >Unit Desc</Text>
                            <Text style={styles.value} >{UNIT_SPECS_NAME}</Text>
                        </View>
                        <View style={styles.left}>
                            <Text style={styles.label} >Ageing</Text>
                            <Text style={styles.value} ></Text>
                        </View>
                        <View style={styles.left}>
                            <Text style={styles.label} >Deal ID</Text>
                            <Text style={styles.value} ></Text>
                        </View>
                        <View style={styles.left}>
                            <Text style={styles.label} >Deal Creation</Text>
                            <Text style={styles.value} ></Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default UnitDetail;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.secondry
    },
    listingConatiner: {
        width: '85%',
        alignItems: 'center',
        backgroundColor: COLORS.primary
    },
    detailCard: {
        width: '100%',
        backgroundColor: COLORS.cardColor,
        borderRadius: 5,

        paddingVertical: 12,
        alignItems: 'center'
    },
    statusLabel: {
        width: '95%',
        color: COLORS.secondry,
        fontFamily: FONTS.SemiBold,
        fontSize: 15,
    },
    left: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: 'rgba(255, 255, 255, 0.5)',
        borderBottomWidth: 1,
        marginBottom: 8
    },
    label: {
        width: '47.5%',
        color: COLORS.secondry,
        fontSize: 11,
        fontFamily: FONTS.SemiBold,
    },
    value: {
        width: '47.5%',
        color: COLORS.secondry,
        fontSize: 9,
        fontFamily: FONTS.Regular,
        textAlign: 'right',
    },
})