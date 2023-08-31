import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
// import Header from "../../common/HeaderBS";
import { COLORS, FONTS, SCREENS, SCREEN_WIDTH, SCREEN_HEIGHT } from '../../../constants';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Item } from "./components/detailItem";
import { getReceiptList } from '../../../redux/property/property.action';
import { setLoader } from '../../../redux/loader/loader.action';
import { BackButton } from '../../../common/backButton';



export const ReceiptDetail = ({ navigation, route }) => {
    const propertyId = route.params.id
    const dispatch = useDispatch();
    const generalData = useSelector(state => state.property.generalData)
    const receiptList = useSelector(state => state.property.receiptList)
    const loader = useSelector(state => state.loader.loader)
    const [list, setList] = useState(receiptList)
    const [search, setSearch] = useState('');


    useEffect(() => {
        dispatch(setLoader(true))
        dispatch(getReceiptList(propertyId));
        return () => {

        }
    }, [propertyId])

    useEffect(() => {
        setList(receiptList)
        return () => {

        }
    }, [receiptList])


    const emputyComponent = () => (
        <Text style={{ color: '#000000', fontSize: 13, fontFamily: FONTS.Bold, alignSelf: 'center' }} >Empty Result</Text>
    )

    const getSearch = (item) => {
        setSearch(item)
        var unit_list = receiptList;
        const filteredUnites = unit_list
            ? unit_list.filter((filterUnit) => {
                return (
                    filterUnit.ID
                        .toString()
                        .includes(item) ||
                    filterUnit.MOD_OF_PAY
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    moment(filterUnit.CHEQUE_DATE).format('MM-DD-YYYY')
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.BANK
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.BRANCH
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.AMOUNT
                        .toString()
                        .includes(item) ||
                    filterUnit.NARRATION
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.CATEGORY
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.CHEQUE_NO && filterUnit.CHEQUE_NO
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.IS_CHEQUE_CANCELLED
                        .toLowerCase()
                        .includes(item.toLowerCase())            
                )
            })
            : [];
        setList(filteredUnites)

    }



    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading} >{generalData[0][0].UNIT_CODE}</Text>
            <Text style={styles.pp} >Receipt Detail</Text>
            <BackButton navigation={navigation} label="" />
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