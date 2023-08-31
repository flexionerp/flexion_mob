import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from "../../common/HeaderBS";
import { COLORS, FONTS } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { Item } from "./components/ItemUnit";
import { getReceivablebyUnit } from '../../redux/property/property.action';
import moment from 'moment';
import { setLoader } from '../../redux/loader/loader.action';


export const ReceiveableByUnit = ({ navigation, route }) => {

    const dispatch = useDispatch();

    const { token } = useSelector(state => state.user)
    const { receivablebyUnit } = useSelector(state => state.property)
    const loader = useSelector(state => state.loader.loader)
    const [list, setList] = useState(receivablebyUnit)
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(setLoader(true))
        dispatch(getReceivablebyUnit(token));
        return () => {
        }
    }, [])

    useEffect(() => {
        setList(receivablebyUnit)
        return () => {

        }
    }, [receivablebyUnit])


    const emputyComponent = () => (
        <Text style={{ color: '#000000', fontSize: 13, fontFamily: FONTS.Bold, alignSelf: 'center' }} >Empty Result</Text>
    )

    const getSearch = (item) => {
        setSearch(item)
        var unit_list = receivablebyUnit;
        const filteredUnites = unit_list
            ? unit_list.filter((filterUnit) => {
                return (filterUnit.CUSTOMER_NAME
                    .toLowerCase()
                    .includes(item.toLowerCase()) ||
                    filterUnit.PRE_RESERVE_NO
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.SALE_VALUE.trim()
                        .toString()
                        .includes(item.toLowerCase()) ||
                    moment(filterUnit.PRE_RESERVE_DATE).format("DD-MMM-YYYY")
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    moment(filterUnit.RESERVE_DATE).format("DD-MMM-YYYY")
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.SALES_STATUS
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.AGEING
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.UNIT_CODE
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.UNIT_SPECS_NAME
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.GROSS_AREA
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.CUSTOMER_NAME
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.AGENT_NAME
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.NATIONALITY
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.BROKER_NAME && filterUnit.BROKER_NAME
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.OUTSTANDING
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.CR_AMT
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.PDCAMT
                        .toString()
                        .includes(item.toLowerCase())
                )
            })
            : [];
        setList(filteredUnites);
    };



    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} label="Rec. By Unit" value={search} getInputValue={getSearch.bind(this)} />
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
                                <Item data={item} />
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