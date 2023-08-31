import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS, SCREEN_WIDTH } from '../../../constants';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Item } from "./components/Item";
import { BackButton } from '../../../common/backButton';


export const OQoodReg = ({ navigation, route }) => {

    const generalData = useSelector(state => state.property.generalData)
    const [list, setList] = useState([])
    const [search, setSearch] = useState('');


    useEffect(() => {
        setList(generalData[12])
        return () => {
        }
    }, [generalData]);

    const emputyComponent = () => (
        <Text style={{ color: '#000000', fontSize: 13, fontFamily: FONTS.Bold, alignSelf: 'center' }} >Empty Result</Text>
    );


    const getSearch = (item) => {
        setSearch(item)
        var unit_list = generalData[12];
        const filteredUnites = unit_list
            ? unit_list.filter((filterUnit) => {
                return (filterUnit.OQOOD_REG_NO
                    .toString()
                    .includes(item.toLowerCase()) ||
                    filterUnit.AMOUNT
                        .toString()
                        .includes(item.toLowerCase()) ||
                    moment(filterUnit.REG_DATE).format('MM/DD/YYYY')
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.DESCRIPTION
                        .toLowerCase()
                        .includes(item.toLowerCase())
                )
            })
            : [];
        setList(filteredUnites);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading} >{generalData[0][0].UNIT_CODE}</Text>
            <Text style={styles.pp} >OQood Reg</Text>
            <BackButton navigation={navigation} />
            <View style={{ height: 3, width: '100%' }} />
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
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.secondry,
        alignItems:'center'
    },
    heading: {
        width: '90%',
        color: COLORS.boldText,
        fontFamily: FONTS.SemiBold,
        fontSize: SCREEN_WIDTH * 0.05,
    },
    pp: {
        width: '90%',
        color: COLORS.boldText,
        fontFamily: FONTS.Medium,
        fontSize: SCREEN_WIDTH * 0.033,
        marginBottom: 4
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