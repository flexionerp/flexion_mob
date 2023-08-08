import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from "../../common/HeaderBS";
import { COLORS, FONTS } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { Item } from "./components/Item";
import { getCustomerReceivable } from '../../redux/property/property.action';
import { setLoader } from '../../redux/loader/loader.action';



export const CustomerReceivable = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const customerReceivableList = useSelector(state => state.property.customerReceivableList)
    const {token, userDetail, isCustomer} = useSelector(state => state.user)
    const loader = useSelector(state => state.loader.loader)
    const [list, setList] = useState(customerReceivableList)
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(setLoader(true))
        let cid = isCustomer ? userDetail.CUSTOMERID : 0
        dispatch(getCustomerReceivable(token, cid));
        return () => {

        }
    }, [])

    useEffect(() => {
        setList(customerReceivableList)
        return () => {

        }
    }, [customerReceivableList])


    const emputyComponent = () => (
        <Text style={{ color: '#000000', fontSize: 13, fontFamily: FONTS.Bold, alignSelf: 'center' }} >Empty Result</Text>
    )

    const getSearch = (item) => {
        setSearch(item)
        var unit_list = customerReceivableList;
        const filteredUnites = unit_list
            ? unit_list.filter((filterUnit) => {
                return (filterUnit.CUSTOMERNAME
                    .toLowerCase()
                    .includes(item.toLowerCase()) ||
                    filterUnit.CUSTOMER_ID
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.NATIONALITY
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.UNITS
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.RESERVE_SALES
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.PRE_RESERVE_SALES
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.INVOICED_AMOUNT && filterUnit.INVOICED_AMOUNT
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.COLLECTED_AMOUNT && filterUnit.COLLECTED_AMOUNT
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.OUTSTANDING_AMOUNT && filterUnit.OUTSTANDING_AMOUNT
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.UNDEPOSITED_CHQ && filterUnit.UNDEPOSITED_CHQ
                        .toString()
                        .includes(item.toLowerCase())
                )
            })
            : [];
        setList(filteredUnites);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} label="Cus. Receivable" value={search} getInputValue={getSearch.bind(this)} />
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
                                <Item navigation={navigation} data={item} />
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