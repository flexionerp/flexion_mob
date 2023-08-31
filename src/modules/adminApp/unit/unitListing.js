import {
    StyleSheet, Text, View, SafeAreaView, ImageBackground,
    TouchableOpacity, FlatList, ActivityIndicator, Platform
} from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, ICONS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants'
import { useDispatch, useSelector } from 'react-redux';
import { getReservationList } from '../../../redux/property/property.action';
import { setLoader } from '../../../redux/loader/loader.action';
import SearchBar from '../../../common/searchBar'
import moment from 'moment';


const Item = ({ navigation, data }) => {
    const {
        UNIT_CODE, CUSTOMER_NAME, PRE_RESERVE_NO, AGENT_NAME,
        GROSS_AREA, UNIT_SPECS_NAME, SALE_VALUE, PRICE_VALUE,
        BOOKING_DATE, STATUS_NAME, AGEING
    } = data

    return (
        <View style={styles.itemContainer} >
            <ImageBackground
                source={ICONS.unitBG}
                style={styles.bgStyle}
                resizeMode="cover">
                <View style={styles.left}>
                    <View style={styles.top}>
                        <Text numberOfLines={1} style={styles.unitCode}>{UNIT_CODE}</Text>
                        <Text numberOfLines={2} style={styles.name}>{CUSTOMER_NAME}</Text>
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.area}>Booking Date - {moment(BOOKING_DATE).format('MM/DD/YYYY')}</Text>
                        <Text style={styles.area}>Status - {STATUS_NAME}</Text>
                        <Text style={styles.area}>Unit Dec - {UNIT_SPECS_NAME}</Text>
                        <Text style={styles.area}>Ageing - {AGEING}</Text>
                        <Text style={styles.area}>Res No. - {PRE_RESERVE_NO}</Text>
                        <Text style={styles.area}>Total Area - {GROSS_AREA} sqft</Text>
                    </View>
                    <View style={styles.bottom}>
                        
                    </View>
                </View>
                <View style={styles.right}>
                    <View />
                    <ImageBackground source={ICONS.progressBar} style={styles.progressBar}>
                        <Text style={styles.salePrice} >Sale Price{'\n'}<Text style={{ fontSize: SCREEN_WIDTH * 0.03 }}>{SALE_VALUE.trim()}</Text></Text>
                    </ImageBackground>
                    <View style={{ width: '100%', marginBottom: -5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10 }} >
                        <TouchableOpacity onPress={() => navigation.navigate("DetailDashbaord", { propertyData: data })} style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={styles.detail} >View Detail</Text>
                            <Icon name='arrow-right' size={12} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}


const UnitListing = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const reservationList = useSelector(state => state.property.reservationList)
    const loader = useSelector(state => state.loader.loader)
    const token = useSelector(state => state.user.token)
    const [list, setList] = useState(reservationList);
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(setLoader(true))
        dispatch(getReservationList(token))
        return () => {

        }
    }, [])

    useEffect(() => {
        setList(reservationList)
        return () => {

        }
    }, [reservationList])

    const emputyComponent = () => (
        <Text style={{ color: '#000000', fontSize: 13, fontFamily: FONTS.Bold, alignSelf: 'center' }} >Empty Result</Text>
    )


    const getSearch = (item) => {
        setSearch(item)
        var unit_list = reservationList;
        const filteredUnites = unit_list
            ? unit_list.filter((filterUnit) => {
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
                    filterUnit.SALE_VALUE
                        .toString()
                        .includes(item.toLowerCase())
                )
            })
            : [];
        setList(filteredUnites)

    }


    return (
        <ImageBackground
            source={ICONS.bgImg}
            style={styles.container}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.main}>
                <SearchBar value={search} getInputValue={getSearch.bind(this)} />
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
                                    <Item navigation={navigation} data={item} />
                                </View>
                            )}
                            keyExtractor={item => item.ID}
                            ListEmptyComponent={emputyComponent}
                        />
                }
            </SafeAreaView>
        </ImageBackground>
    )
}

export default UnitListing

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    main: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    itemContainer: {
        borderWidth: 1,
        borderColor: COLORS.borderColor,
        borderRadius: SCREEN_HEIGHT * 0.012,
        marginTop: 12,
        overflow: 'hidden'
    },
    bgStyle: {
        width: SCREEN_WIDTH * 0.90,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SCREEN_HEIGHT * 0.01,
        height: Platform.OS == 'ios' ? SCREEN_HEIGHT * 0.23 : SCREEN_HEIGHT * 0.33
    },
    left: {
        width: '53%',
        // backgroundColor:'red'
    },
    right: {
        width: '45%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        // backgroundColor: 'green'
    },
    top: {
        marginBottom: 12
    },
    center: {
        marginBottom: 12
    },
    bottom: {

    },
    unitCode: {
        color: COLORS.boldText,
        fontSize: SCREEN_WIDTH * 0.05,
        fontFamily: FONTS.Bold
    },
    name: {
        color: COLORS.boldText,
        fontSize: SCREEN_WIDTH * 0.037,
        fontFamily: FONTS.Medium
    },
    area: {
        color: COLORS.normalText,
        fontSize: SCREEN_WIDTH * 0.029,
        fontFamily: FONTS.Medium
    },
    btnStyle: {
        width: 107,
        height: 36,
        borderRadius: 11,
    },
    btnLable: {
        color: COLORS.normalText,
        fontSize: SCREEN_WIDTH * 0.029,
        fontFamily: FONTS.SemiBold,
        marginLeft: 5
    },
    btnImg: {
        width: 107,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: COLORS.secondry,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        shadowOpacity: 0.26,
    },
    progressBar: {
        width: 130,
        height: 130,
        justifyContent: 'center',
        alignItems: 'center'
    },
    salePrice: {
        color: COLORS.green,
        textAlign: 'center',
        fontSize: SCREEN_WIDTH * 0.02,
        fontFamily: FONTS.Medium
    },
    paid: {
        color: COLORS.boldText,
        textAlign: 'center',
        fontSize: SCREEN_WIDTH * 0.018,
        fontFamily: FONTS.Medium,
        marginTop: SCREEN_HEIGHT * 0.002
    },
    due: {
        color: "#962424",
        textAlign: 'center',
        fontSize: SCREEN_WIDTH * 0.018,
        fontFamily: FONTS.Medium,
        marginTop: SCREEN_HEIGHT * 0.002
    },
    detail: {
        color: COLORS.boldText,
        textAlign: 'center',
        fontSize: SCREEN_WIDTH * 0.026,
        fontFamily: FONTS.Medium,
        marginRight: 6
    }
})