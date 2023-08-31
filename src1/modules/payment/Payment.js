import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from "../../common/HeaderN";
import { COLORS, FONTS, ICONS } from '../../constants';
import { useSelector } from 'react-redux';

const itemArray = [
    {
        name: `Create\nCustomer`,
        icons: ICONS.people,
        odd: false
    },
    {
        name: `Receipt\n  `,
        icons: ICONS.money,
        odd: true
    },
    {
        name: 'Broker\nCommission',
        icons: ICONS.availableTotal,
        odd: false
    },
    {
        name: 'Customer\nReceivable',
        icons: ICONS.receipt1,
        odd: false
    },
    {
        name: 'Receiveable\nby Unit',
        icons: ICONS.customer,
        odd: true
    },
    {
        name: 'Power BI',
        icons: ICONS.powerBi,
        odd: false
    },
]
const itemArrayC = [
    {
        name: `Receiveable\nby Unit`,
        icons: ICONS.customer,
        odd: false
    },
    {
        name: `Receipt\n  `,
        icons: ICONS.money,
        odd: true
    },
    {
        name: 'Broker\nCommission',
        icons: ICONS.availableTotal,
        odd: false
    },
]

const Item = ({ data, navigation, }) => {
    let { name, icons, odd } = data

    const onClick = () => {
        switch (name) {
            case "Receipt":
                navigation.navigate(name);
                break;
            case "Booking Form":
                viewBookingFrom()
                break;
            case "SOA":
                viewSOA()
                break;

            default:
                navigation.navigate(name)
                break;
        }
    }

    const viewBookingFrom = () => {

    }

    const viewSOA = () => {

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

export function Payment({ navigation, route }) {
    const { isCustomer } = useSelector(state => state.user)
    const [booked, setBooked] = useState([]);
    const {
        reservationList,
    } = useSelector(state => state.property)

    useEffect(() => {
        reservationList.forEach(element => {
            if (element.STATUS_NAME == "Booked") {
                setBooked(pre => [...pre, element])
            }
        });

        return () => {

        }
    }, [reservationList])


    return (
        <SafeAreaView>
            <Header navigation={navigation} label={"Sale"} />
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                <View style={styles.listingConatiner}>
                    {!isCustomer && <View style={styles.dashboardContainer}>
                        {(!isCustomer && booked.length > 200 ? itemArray : itemArrayC).map((item, index) => {
                            return (
                                <Item key={index} data={item} navigation={navigation} />
                            )
                        })}
                    </View>
                    }
                </View>
            </ScrollView>
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