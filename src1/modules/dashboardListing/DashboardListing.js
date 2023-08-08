
import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../common/Header'
import { Item } from './components/Item';
import { useSelector } from 'react-redux';
import { FONTS } from "../../constants";
import { BackButton } from '../../common/backButton';

export function DashboardListing({ navigation, route }) {
    let { label, list } = route.params
    const loader = useSelector(state => state.loader.loader)
    const [propertyList, setList] = useState(list);
    const [search, setSearch] = useState('');


    useEffect(() => {
        return () => {

        }
    }, [])



    const emputyComponent = () => (
        <Text style={{ color: '#000000', fontSize: 13, fontFamily: FONTS.Bold, alignSelf: 'center' }} >Empty Result</Text>
    )

    const getSearch = (item) => {
        setSearch(item)
        var unit_list = list;
        const filteredUnites = unit_list
            ? unit_list.filter((filterUnit) => {
                return (filterUnit.UNIT_CODE
                    .toLowerCase()
                    .includes(item.toLowerCase()) ||
                    filterUnit.UNIT_NAME
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.PROPERTY_CODE
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.STATUS
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.GROSS_AREA
                        .toString()
                        .includes(item)
                )
            })
            : [];
        setList(filteredUnites)

    }
    return (
        <LinearGradient
            colors={['#E4EEFE', '#F9FCFF', '#FFFFFF']}
            style={styles.container}>
            <SafeAreaView style={styles.main}>
                <Header navigation={navigation} label={label} value={search} getInputValue={getSearch.bind(this)} />
                <BackButton navigation={navigation} />
                <View style={{ height: 3, width: '100%' }} />
                {
                    loader
                        ?
                        <View style={{ flex: 1, alignItems: 'center', marginTop: 12 }}>
                            <ActivityIndicator size={"small"} color="#000000" />
                        </View>
                        :
                        <FlatList
                            style={{ width: '100%' }}
                            data={propertyList}
                            renderItem={({ item }) => (
                                <View style={{ width: '100%', alignItems: 'center' }} >
                                    <Item navigation={navigation} data={item} label={label} />
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
        alignItems: 'center'
    },
    main: {
        width: '100%',
        alignItems: 'center'
    }
})