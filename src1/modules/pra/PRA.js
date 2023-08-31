import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from "../../common/HeaderBS";
import { COLORS, CUSTOMHEIGHT, CUSTOMWIDTH, FONTS } from '../../constants';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Item } from "./components/Item";
import Modal from "react-native-modal";


export const PRA = ({ navigation, route }) => {
    const { detail } = route.params
    const generalData = useSelector(state => state.property.generalData)
    let praData = generalData[18][0]
    const [list, setList] = useState([])
    const [search, setSearch] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [path, setPath] = useState(' ')


    useEffect(() => {
        setList(generalData[13])
        return () => {
        }
    }, [generalData]);

    const emputyComponent = () => (
        <Text style={{ color: '#000000', fontSize: 13, fontFamily: FONTS.Bold, alignSelf: 'center' }} >Empty Result</Text>
    );

    const onPRAClick = () => {
        let filename = praData.FILE_PATH;
        let extension = filename.split(".").pop();
        if (extension.toLowerCase() == 'pdf') {
            let soaUrl = `http://broker.fakhruddinproperties.com:8018${praData.FILE_PATH.replace(/ /g, '%20')}`;
            navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "Attachment" })
        } else {
            setPath(praData.FILE_PATH)
            setIsModalVisible(true)
        }
    }
    const onDownloadClick = () => {
        if (generalData[18].length > 0) {
            let filename = praData.FILE_PATH;
            let extension = filename.split(".").pop();
            if (extension.toLowerCase() == 'pdf') {
                let soaUrl = `http://broker.fakhruddinproperties.com:8018${praData.FILE_PATH.replace(/ /g, '%20')}`;
                navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "Attachment" })
            } else {
                setPath(praData.FILE_PATH)
                setIsModalVisible(true)
            }
        } else {
            let soaUrl = `http://tvh.flexion.ae:9092/api/Reports/customer/pra/${detail.PRE_RESERVE_NO}/true`;
            navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "PRA Document" })
        }
    }

    const getSearch = (item) => {
        setSearch(item)
        var unit_list = generalData[13];
        const filteredUnites = unit_list
            ? unit_list.filter((filterUnit) => {
                return (filterUnit.STATUS_NAME
                    .toLowerCase()
                    .includes(item.toLowerCase()) ||
                    filterUnit.LOGIN_NAME
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    moment(filterUnit.STATUS_CHANGE_DATE).format('MM/DD/YYYY hh:mm A')
                        .toLowerCase()
                        .includes(item.toLowerCase())
                )
            })
            : [];
        setList(filteredUnites);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} label="PRA" value={search} getInputValue={getSearch.bind(this)} />
            <View style={{ height: 3, width: '100%' }} />
            {
                generalData[18].length > 0
                    ?
                    <View style={styles.btnsRow}>
                        <TouchableOpacity onPress={onPRAClick} style={[styles.btnStyle, {}]} >
                            <Text style={styles.btnLabel}>View PRA Document</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <>
                        <View style={styles.btnsRow}>
                            <TouchableOpacity onPress={onDownloadClick} style={[styles.btnStyle, {}]} >
                                <Text style={styles.btnLabel}>Download PRA Document</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.btnsRow, { marginTop: 0 }]}>
                            <TouchableOpacity onPress={() => { }} style={[styles.btnStyle, {}]} >
                                <Text style={styles.btnLabel}>Upload PRA Document</Text>
                            </TouchableOpacity>
                        </View>
                    </>

            }
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
            <Modal
                onBackButtonPress={() => setIsModalVisible(false)}
                onBackdropPress={() => setIsModalVisible(false)}
                animationIn="fadeIn"
                animationOut="fadeOut"
                backdropOpacity={0.4}
                animationInTiming={300}
                animationOutTiming={300}
                isVisible={isModalVisible}
                style={{ flex: 1, width: CUSTOMWIDTH('100'), justifyContent: 'center', zIndex: 50, }}
            >
                <View style={{ width: CUSTOMWIDTH('100'), alignItems: 'center', }}>
                    <View style={{ width: CUSTOMWIDTH('100'), alignItems: '' }}>
                        <View style={{ backgroundColor: COLORS.primary, zIndex: 15, alignItems: 'center', }}>
                            <Image source={{ uri: `http://broker.fakhruddinproperties.com:8018${path.replace(/ /g, '%20')}` }} style={{ width: CUSTOMWIDTH(90), height: CUSTOMHEIGHT(60) }} resizeMode="cover" />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};


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
    btnsRow: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 12,
        alignSelf: 'center'
    },
    btnStyle: {
        width: '100%',
        height: 45,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 10,
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