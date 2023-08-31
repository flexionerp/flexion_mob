import {
    StyleSheet, Text, View, SafeAreaView, FlatList,
    ActivityIndicator, TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from "../../common/HeaderBS";
import { COLORS, FONTS } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { Item } from "./components/Item";
import { getCommissionList } from '../../redux/property/property.action';
import { setLoader } from '../../redux/loader/loader.action';

export const CommissionList = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { commisionList } = useSelector(state => state.property)
    const { token } = useSelector(state => state.user)
    const loader = useSelector(state => state.loader.loader)
    const [list, setList] = useState(commisionList)
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(setLoader(true))
        dispatch(getCommissionList(token));
        return () => {

        }
    }, [])

    useEffect(() => {
        setList(commisionList)
        return () => {

        }
    }, [commisionList])


    const emputyComponent = () => (
        <Text style={{ color: '#000000', fontSize: 13, fontFamily: FONTS.Bold, alignSelf: 'center' }} >Empty Result</Text>
    )

    const getSearch = (item) => {
        setSearch(item)
        var unit_list = commisionList;
        const filteredUnites = unit_list
            ? unit_list.filter((filterUnit) => {
                return (filterUnit.NAME
                    .toLowerCase()
                    .includes(item.toLowerCase()) ||
                    filterUnit.STATUS
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.BROKER_ID
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.IS_VERIFIED_BY && filterUnit.IS_VERIFIED_BY
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.IS_CONFIRMED_BY && filterUnit.IS_CONFIRMED_BY
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.CMONTH && filterUnit.CMONTH
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.APPROVAL_USER && filterUnit.APPROVAL_USER
                        .toString()
                        .includes(item.toLowerCase())
                )
            })
            : [];
        setList(filteredUnites);
    };

    const currentBroker = () => {
        let soaUrl = `http://tvh.flexion.ae:9092/api/Reports/customer/broker_comm/%7BPN_RESERVATION_HDR.IS_DELETED%7D=0%20AND%20%7BFM_BROKER_COMM_PAID.IS_CONFIRMED%7D%20=%200/TRUE/33/0`;
        navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "Current Broker" })
    }

    const progressBroker = () => {
        let soaUrl = `http://tvh.flexion.ae:9092/api/Reports/customer/broker_comm_p/%7BPN_RESERVATION_HDR.IS_DELETED%7D=0/TRUE/33/0`;
        navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "Progress Broker" })
    }

    const generalBroker = () => {
        let soaUrl = `http://tvh.flexion.ae:9092/api/Reports/customer/broker_comm/%7BPN_RESERVATION_HDR.IS_DELETED%7D=0%20AND%20%7BFM_BROKER_COMM_PAID.IS_CONFIRMED%7D%20=%200/TRUE/33/0`;
        navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "General Broker" })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} label="Commission" value={search} getInputValue={getSearch.bind(this)} />
            <View style={{ height: 3, width: '100%' }} />
            <View style={styles.btnsRow}>
                <TouchableOpacity onPress={currentBroker} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>Current Broker</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={progressBroker} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>Progress Broker</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={generalBroker} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>General Broker</Text>
                </TouchableOpacity>
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
        width: '31%',
        height: 35,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnLabel: {
        color: COLORS.primary,
        fontSize: 11,
        fontFamily: FONTS.SemiBold,
        marginBottom: 2
    }
})