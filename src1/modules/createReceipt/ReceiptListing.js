import {
    StyleSheet, Text, View, SafeAreaView, FlatList,
    ActivityIndicator, TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from "../../common/HeaderBS";
import { COLORS, FONTS } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { Item } from "./components/Item";
import { getReceiptsList, getCustomersList } from '../../redux/property/property.action';
import moment from 'moment';



const ReceiptListing = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { receiptsList, reservationList } = useSelector(state => state.property)
    const { token } = useSelector(state => state.user)
    const { loader } = useSelector(state => state.loader)
    const [list, setList] = useState(receiptsList)
    const [search, setSearch] = useState('');
    const [booked, setBooked] = useState([]);

    useEffect(() => {
        dispatch(getReceiptsList(token));
        dispatch(getCustomersList())
        return () => {

        }
    }, [])

    useEffect(() => {
        setList(receiptsList)
        return () => {

        }
    }, [receiptsList])

    useEffect(() => {
        reservationList.forEach(element => {
            if (element.STATUS_NAME == "Booked") {
                setBooked(pre => [...pre, element])
            }
        });

        return () => {

        }
    }, [reservationList])


    const emputyComponent = () => (
        <Text style={{ color: '#000000', fontSize: 13, fontFamily: FONTS.Bold, alignSelf: 'center' }} >Empty Result</Text>
    )

    const getSearch = (item) => {
        setSearch(item)
        var unit_list = receiptsList;
        const filteredUnites = unit_list
            ? unit_list.filter((filterUnit) => {
                return (moment(filterUnit.RECEIPT_DATE).format('MM-DD-YYYY')
                    .toLowerCase()
                    .includes(item.toLowerCase()) ||
                    filterUnit.CUSTOMER && filterUnit.CUSTOMER
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.CNARRATION && filterUnit.CNARRATION
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.RECEIVED_FROM && filterUnit.RECEIVED_FROM
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.PRE_RESERVATION && filterUnit.PRE_RESERVATION
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.RECEIPT_NO
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
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} label="Receipt Listing" value={search} getInputValue={getSearch.bind(this)} />
            <View style={{ height: 3, width: '100%' }} />
            <View style={styles.btnsRow}>
                {
                    booked.length > 200 && <TouchableOpacity onPress={() => navigation.navigate("CreateReceipt")} style={styles.btnStyle} >
                        <Text style={styles.btnLabel}>Create Receipt</Text>
                    </TouchableOpacity>
                }

            </View>
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
                                <Item navigation={navigation} data={item} bookedCount={booked} />
                            </View>
                        )}
                        keyExtractor={item => item.ID}
                        ListEmptyComponent={emputyComponent}
                    />
            }
        </SafeAreaView>
    )
}

export default ReceiptListing

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.secondry,
        alignItems: 'center'
    },
    btnsRow: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    btnStyle: {
        width: '100%',
        height: 45,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnLabel: {
        color: COLORS.primary,
        fontSize: 14,
        fontFamily: FONTS.SemiBold,
        marginBottom: 2
    }
})