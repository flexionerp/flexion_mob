import {
    StyleSheet, Text, View,
    ImageBackground,
    SafeAreaView,
    ScrollView, Image
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { FONTS, ICONS } from '../../../constants'
import { BtnLI } from '../../../common/btnLI'
import { BtnLIM } from '../../../common/btnLIM'
import {
    getCountryList,
    getCountList,
    getReservationList,
    getPropertyStats,
    getCustomerReceivable,
    getSaleSummeryStats
} from '../../../redux/property/property.action';
import { useDispatch, useSelector } from 'react-redux';
import { StatsRow } from '../../../common/statsRowCustomer'

const StatsItem = ({ label, value }) => {
    return (
        <View style={styles.statsContainer}>
            <Text style={styles.customerName} >{value}</Text>
            <Text style={styles.hello} >{label}</Text>
        </View>
    )
}

const CustomerDetail = () => {
    const { userDetail } = useSelector(state => state.user);
    return (
        <View style={styles.customerContainer}>
            <Text style={styles.hello} >Hello,</Text>
            <Text style={styles.customerName} >{userDetail && userDetail.FIRST_NAME + " " + userDetail.LAST_NAME}!</Text>
        </View>
    )
}

const UnitCount = () => {
    const dispatch = useDispatch();
    const { token, } = useSelector(state => state.user)
    const { reservationList, totalUnitsCount, } = useSelector(state => state.property)
    const [available, setAvailable] = useState([])
    const [booked, setBooked] = useState([]);

    useEffect(() => {
        dispatch(getReservationList(token))
        dispatch(getPropertyStats())
        dispatch(getCountList())
        return () => { }
    }, [token])

    useEffect(() => {
        setAvailableUnits()
        return () => {
        }
    }, [totalUnitsCount, reservationList, token])

    const setAvailableUnits = () => {
        let tempcount = totalUnitsCount.filter(({ STATUS }) => STATUS == "PRE_RESERVED" || STATUS == "AVAILABLE" || STATUS == "RELEASED")
        let tempBooked = reservationList.filter(({ STATUS_NAME }) => STATUS_NAME == "Booked")
        setAvailable(tempcount)
        setBooked(tempBooked)
    }

    return (
        <View style={[styles.customerContainer, { flexDirection: 'row', alignItems: 'center', height: 54, justifyContent: 'flex-start' }]}>
            <Image source={ICONS.building} style={{ width: 40, height: 40, marginRight: 10 }} />
            <Text style={styles.customerName} >{reservationList.length}</Text>
            <Text style={styles.unitText} >Units</Text>
        </View>
    )
}


const Home = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { token, userDetail, isCustomer } = useSelector(state => state.user)

    useEffect(() => {
        let cid = isCustomer ? userDetail.CUSTOMERID : 0
        dispatch(getCustomerReceivable(token, cid));
        dispatch(getReservationList(token))
        dispatch(getCountryList())
        dispatch(getPropertyStats())
        dispatch(getSaleSummeryStats())
        return () => {

        }
    }, [token])




    const viewSOA = () => {
        let customerId = userDetail.CUSTOMERID
        let soaUrl = `http://tvh.flexion.ae:9092/api/reports/customer/soa_customer/${customerId}/true/33`;
        navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "SOA" })
    }


    return (
        <ImageBackground
            source={ICONS.bgImg}
            style={styles.container}>
            <SafeAreaView style={styles.main}>
                <ScrollView style={{ width: '100%' }} >
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <CustomerDetail />
                        {/* <UnitCount /> */}
                        <View style={{ height: 8 }} />
                        <StatsRow navigation={navigation} />
                        <View style={{ marginVertical: 20 }} >
                            {/* <BtnLIM
                                lable={"Pay now"}
                                size={"48%"}
                                onClick={() => { }}
                                icon={ICONS.card}
                            /> */}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    main: {
        width: '100%',
        alignItems: 'center'
    },
    customerContainer: {
        width: '90%',
        height: 70,
        borderWidth: 1,
        borderColor: '#CDA349',
        borderRadius: 15,
        justifyContent: 'center',
        paddingHorizontal: 12,
        marginTop: 12
    },
    hello: {
        color: '#204866',
        fontFamily: FONTS.Medium,
        fontSize: 16,
        marginTop: 8
    },
    customerName: {
        color: '#204866',
        fontFamily: FONTS.Bold,
        fontSize: 18,
    },
    unitText: {
        width: '75%',
        marginHorizontal: 12,
        color: '#204866',
        fontFamily: FONTS.Medium,
        fontSize: 15
    },
    statsContainer: {
        width: '48%',
        height: 92,
        borderWidth: 1,
        borderColor: '#CDA349',
        borderRadius: 15,
        justifyContent: 'center',
        paddingHorizontal: 12,
        marginTop: 12
    }
})