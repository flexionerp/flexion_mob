import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../common/searchBar'
import { useDispatch, useSelector } from 'react-redux';
import { getHomelist } from '../../../redux/property/property.action';
import { setLoader } from '../../../redux/loader/loader.action';
import { FONTS } from "../../../constants";
import moment from 'moment';
import { HomeItem } from '../../../common/homeItem';

export const HomeInProgress = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { homeList } = useSelector(state => state.property)
    const { loader } = useSelector(state => state.loader)
    const { token, userDetail } = useSelector(state => state.user)
    const [list, setList] = useState();
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(setLoader(true))
        dispatch(getHomelist(token, userDetail.LOGIN_NAME))
        return () => {

        }
    }, [])

    useEffect(() => {
        setList(homeList)
        return () => {

        }
    }, [homeList])


    const emputyComponent = () => (
        <Text style={{ color: '#000000', fontSize: 13, fontFamily: FONTS.Bold, alignSelf: 'center' }} >Empty Result</Text>
    )

    const getSearch = (item) => {
        setSearch(item)
        const filteredUnites = homeList
            ? homeList.filter((filterUnit) => {
                return (filterUnit.CUSTOMER_NAME && filterUnit.CUSTOMER_NAME
                    .toLowerCase()
                    .includes(item.toLowerCase()) ||
                    filterUnit.NATIONALITY && filterUnit.NATIONALITY
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.UNIT_CODE
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.BROKER_NAME && filterUnit.BROKER_NAME
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.AGENT_NAME
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.STATUS_NAME
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.UNIT_SPECS_NAME
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.SALE_VALUE.trim()
                        .toString()
                        .includes(item) ||
                    filterUnit.PRE_RESERVE_NO
                        .toString()
                        .includes(item) ||
                    filterUnit.ID
                        .toString()
                        .includes(item) ||
                    filterUnit.GROSS_AREA
                        .toString()
                        .includes(item) ||
                    filterUnit.UNIT_ID
                        .toString()
                        .includes(item) ||
                    moment(filterUnit.PRE_RESERVE_DATE).format('MM-DD-YYYY')
                        .toString()
                        .includes(item) ||
                    moment(filterUnit.RESERVE_DATE).format('MM-DD-YYYY')
                        .toString()
                        .includes(item) ||
                    filterUnit.SALE_VALUE
                        .toString()
                        .includes(item.toLowerCase())

                )
            })
            : [];
        setList(filteredUnites)
        // ID, RESERVATION_ID, STATUS, PRE_RESERVATION_ID, REMARKS, UNIT_CODE,
        //     ORG_NAME, CUSTOMER_NAME, LOCATION_NAME, RECEIVED, INVOICES, DUE,
        //     COMMISSION_AMT, TOTAL_BOOKING, SALE_VALUE, COMMISSION_PER
    }

    return (
        <LinearGradient
            colors={['#E4EEFE', '#F9FCFF', '#FFFFFF']}
            style={styles.container}>
            <SafeAreaView style={styles.main}>
                <Header navigation={navigation} label="Home" value={search} getInputValue={getSearch.bind(this)} />
                <View style={{ height: 3, width: '100%' }} />
                {
                    loader
                        ?
                        <View style={{ flex: 1, alignItems: 'center', marginTop: 12 }}>
                            <ActivityIndicator size={"small"} color="#000000" />
                        </View>
                        :
                        <FlatList
                            contentContainerStyle={{ width: '100%' }}
                            style={{ width: '100%', }}
                            data={list}
                            renderItem={({ item }) => (
                                <View style={{ width: '100%', alignItems: 'center' }} >
                                    <HomeItem navigation={navigation} data={item} />
                                </View>
                            )}
                            keyExtractor={item => item.ID}
                            ListEmptyComponent={emputyComponent}
                        />
                }
            </SafeAreaView>
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingBottom: 140
    },
    main: {
        width: '100%',
        alignItems: 'center'
    }

})