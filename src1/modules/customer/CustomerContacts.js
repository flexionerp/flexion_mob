import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from "../../common/HeaderBS";
import { COLORS, FONTS, ICONS, Url } from '../../constants';
import { Item } from "./components/ItemContact";
import axios from 'axios';

let backup = []

export const CustomerContacts = ({ navigation, route }) => {
    const CUSTOMER_ID = route.params.CUSTOMER_ID
    const [list, setList] = useState([])
    const [search, setSearch] = useState('');
    const [loader, setLoader] = useState(true);


    useEffect(() => {
        getContacts();
        return () => {

        }
    }, [CUSTOMER_ID])

    const getContacts = () => {
        let headers = {
            'Content-Type': 'application/json'
        };
        axios.get(`${Url}get_customer_contacts_by_cid_API?cus_id=${CUSTOMER_ID}`,
            { headers: headers })
            .then(resp => {
                let response = resp.data;
                backup = response
                setList(response)
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

    const emputyComponent = () => (
        <Text style={{ color: '#000000', fontSize: 13, fontFamily: FONTS.Bold, alignSelf: 'center' }} >Empty Result</Text>
    )
    const getSearch = (item) => {
        setSearch(item)
        var unit_list = backup
        const filteredUnites = unit_list
            ? unit_list.filter((filterUnit) => {
                return (filterUnit.CONTACT_TYPE
                    .toLowerCase()
                    .includes(item.toLowerCase()) ||
                    filterUnit.VALUE
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.IS_PRIMARY
                        .toString()
                        .includes(item)
                )
            })
            : [];
        setList(filteredUnites)

    }


    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} label="Customer Contacts" value={search} getInputValue={getSearch.bind(this)} />
            <View style={{ height: 3, width: '100%' }} />
            {
                loader
                    ?
                    <ActivityIndicator />
                    :
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