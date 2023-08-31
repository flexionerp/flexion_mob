import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from "../../common/HeaderB";
import { COLORS, FONTS, ICONS, Url } from '../../constants';
import { Item } from "./components/DetailItem";
import axios from 'axios';




export const CustomerDetail = ({ navigation, route }) => {
    const { CUSTOMER_ID, ORG_ID } = route.params
    const [detail, setDetail] = useState(null)
    const [loader, setLoader] = useState(true)


    useEffect(() => {

        getDetail();
        return () => {

        }
    }, [])

    const getDetail = () => {
        let headers = {
            'Content-Type': 'application/json'
        };

        axios.get(`${Url}get_reserve_all_customers_API?org_id=${ORG_ID}&cus_id=${CUSTOMER_ID}`,
            { headers: headers })
            .then(resp => {
                let response = resp.data;
                console.log(response[0])
                setDetail(response[0])
                setLoader(false)
            })
            .catch(error => {
                const err = error
                if (err.response) {
                    console.log("getDetail error", err.response)

                }
                setLoader(false)
            });
    }




    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} label="Customer Detail" />
            <View style={{ height: 3, width: '100%' }} />
            {
                loader
                    ?
                    < ActivityIndicator />
                    :
                    <View style={{ width: '100%', alignItems: 'center' }} >
                        <Item navigation={navigation} data={detail} />
                    </View>
            }
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