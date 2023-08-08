import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
// import Header from "../../../common/HeaderB";
import { COLORS, FONTS, ICONS, SCREENS, SCREEN_WIDTH } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { callGeneralApi } from '../../../redux/property/property.action';
import { itemArray, itemArray1 } from './components/ItemArray';
import Icon from 'react-native-vector-icons/Feather';


const Item = ({ data, navigation, detail }) => {
    const generalData = useSelector(state => state.property.generalData)
    let { name, icons, odd } = data


    const onClick = () => {
        switch (name) {
            case "Notes":
                navigation.navigate(name, { detail: detail });
                break;
            case "Receipt":
                navigation.navigate(name, { id: detail.ID });
                break;
            case "Booking Form":
                viewBookingFrom()
                break;
            case "SOA":
                viewSOA()
                break;
            case "SPA":
                navigation.navigate("GraphsListing");
                break;

            default:
                navigation.navigate(name, { detail: detail })
                break;
        }
    }

    const viewBookingFrom = () => {
        let soaUrl = `http://tvh.flexion.ae:9092/api/reports/Customer/BookingForm/${detail.PRE_RESERVE_NO}/true`;
        navigation.navigate("BookingFromStatement", { soaUrl: soaUrl })
    }

    const viewSOA = () => {
        let customerId = generalData[2][0].CUSTOMER_ID
        let soaUrl = `http://tvh.flexion.ae:9092/api/reports/customer/soa_UNIT/${customerId}/true/${detail.ORG_ID}/${detail.UNIT_ID}`;
        navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "SOA" })
    }

    return (
        <TouchableOpacity onPress={onClick} style={[styles.even]}>
            <View style={styles.imgContainer}>
                <Image source={icons} style={{ width: 40, height: 40 }} resizeMode="contain" />
                <Text style={styles.labelStyle} >{name}</Text>
            </View>
            <Icon name='arrow-right' size={22} color={COLORS.green} />
        </TouchableOpacity>
    )
}

export function DetailDashbaord({ navigation, route }) {
    const detail = route.params.propertyData
    const { isCustomer } = useSelector(state => state.user)
    const { generalData } = useSelector(state => state.property)
    const dispatch = useDispatch();
    const [list, setList] = useState(isCustomer ? itemArray1 : itemArray)


    useEffect(() => {
        dispatch(callGeneralApi(detail))
        return () => { }
    }, [])

    useEffect(() => {
        console.log("generalData[11]: ", generalData && generalData[11])
        return () => { }
    }, [generalData])


    return (
        <SafeAreaView style={styles.container} >
            <Text style={styles.heading} >{detail.UNIT_CODE}</Text>
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }} >
                <ScrollView style={{ width: '100%', }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                    <View style={styles.listingConatiner}>
                        <View style={styles.dashboardContainer}>
                            {list.map((item, index) => {
                                return (
                                    <>
                                        {
                                            item.name == 'Booking Form' && generalData[11].length > 0
                                                ?
                                                null
                                                :
                                                <Item key={index} data={item} navigation={navigation} detail={detail} />
                                        }
                                    </>
                                )
                            })}
                        </View>
                    </View>
                    <View style={{ height: Platform.OS == 'ios' ? 50 : 90 }} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#DFE3E6',
        alignItems: 'center'
    },
    heading: {
        width: '85%',
        color: COLORS.boldText,
        fontFamily: FONTS.SemiBold,
        fontSize: SCREEN_WIDTH * 0.05,
        marginBottom: 12
    },
    listingConatiner: {
        width: '85%',
        alignItems: 'center',
    },
    dashboardContainer: {
        width: '100%',
        alignItems: 'center',
        flexWrap: 'wrap',

    },
    itemStyle: {
        width: '33.3%',
        height: 140,
        justifyContent: 'center',
        alignItems: 'center'
    },
    even: {
        width: '100%',
        shadowColor: '#00000080',
        shadowOffset: { width: 4, height: 4 },
        elevation: 5,
        shadowRadius: 4,
        shadowOpacity: 0.26,
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        backgroundColor: COLORS.secondry,
        marginBottom: 12,
        borderRadius: 15,
        paddingHorizontal: '5%'
    },
    imgContainer: {
        width: '93%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    labelStyle: {
        width: '82%',
        fontSize: 18,
        fontFamily: FONTS.SemiBold,
        color: COLORS.green,
        marginLeft: '3%'
    }
})