import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from "../../common/HeaderB";
import { COLORS, FONTS, ICONS, SCREENS } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { callGeneralApi } from '../../redux/property/property.action';
import { itemArray, itemArray1 } from './components/ItemArray';



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
        <TouchableOpacity onPress={onClick} style={[styles.itemStyle, odd ? styles.odd : styles.even]}>
            <View style={styles.imgContainer}>
                <Image source={icons} style={{ width: 60, height: 60 }} />
            </View>
            <Text style={styles.labelStyle} >{name}</Text>
        </TouchableOpacity>
    )
}

export function DetailDashbaord({ navigation, route }) {
    const detail = route.params.propertyData
    const { isCustomer } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [list, setList] = useState(isCustomer ? itemArray1 : itemArray)


    useEffect(() => {
        dispatch(callGeneralApi(detail))
        return () => {

        }
    }, [])



    return (
        <SafeAreaView style={styles.container} >
            <Header navigation={navigation} label={"Property Details"} />
            <View style={{ flex: 1, width: '100%', alignItems: 'center' }} >
                <ScrollView style={{ width: '100%', }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                    <View style={styles.listingConatiner}>
                        <View style={styles.dashboardContainer}>
                            {list.map((item, index) => {
                                return (
                                    <>
                                        <Item key={index} data={item} navigation={navigation} detail={detail} />
                                    </>
                                )
                            })}
                        </View>
                    </View>
                </ScrollView>
                <View style={{ height: 50 }} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.secondry
    },
    listingConatiner: {
        width: '85%',
        alignItems: 'center',
    },
    dashboardContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: '15%'
    },
    itemStyle: {
        width: '33.3%',
        height: 140,
        justifyContent: 'center',
        alignItems: 'center'
    },
    odd: {
        borderColor: '#707070',
        borderWidth: 0.5,
        borderTopWidth: 0
    },
    even: {
        borderBottomColor: '#707070',
        borderBottomWidth: 0.5,
    },
    imgContainer: {
        width: 90,
        height: 90,
        borderRadius: 50,
        backgroundColor: COLORS.lightBlue,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelStyle: {
        fontSize: 12,
        fontFamily: FONTS.Regular,
        color: COLORS.primary,
        marginTop: 8,
        textAlign: 'center'
    }
})