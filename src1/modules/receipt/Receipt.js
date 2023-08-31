import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from "../../common/HeaderBS";
import { COLORS, FONTS } from '../../constants';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Item } from "./components/Item";



export const Receipt = ({ navigation, route }) => {
    const generalData = useSelector(state => state.property.generalData)
    const [list, setList] = useState([])
    const [search, setSearch] = useState('');


    useEffect(() => {
        setList(generalData[9])
        return () => {
        }
    }, [generalData]);


    const emputyComponent = () => (
        <Text style={{ color: '#000000', fontSize: 13, fontFamily: FONTS.Bold, alignSelf: 'center' }} >Empty Result</Text>
    )
    
    const getSearch = (item) => {
        setSearch(item)
        var unit_list = generalData[9];
        const filteredUnites = unit_list
            ? unit_list.filter((filterUnit) => {
                return (moment(filterUnit.RECEIPT_DATE).format('MM/DD/YYYY')
                    .toLowerCase()
                    .includes(item.toLowerCase()) ||
                    filterUnit.CUSTOMER
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.CNARRATION
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.RECEIVED_FROM
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.PRE_RESERVATION
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.ID
                        .toString()
                        .includes(item) ||
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
            <Header navigation={navigation} label="Receipt" value={search} getInputValue={getSearch.bind(this)} />
            <View style={{ height: 3, width: '100%' }} />
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
            <View style={{ height: 70 }} />
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