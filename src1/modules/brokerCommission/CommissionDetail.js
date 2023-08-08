import { StyleSheet, Text, View, SafeAreaView, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from "../../common/HeaderBS";
import { COLORS, FONTS, Url, ICONS, CUSTOMWIDTH } from '../../constants';
import axios from 'axios';
import { Item } from './components/ItemDetail';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { insertGenearteCommission } from '../../redux/property/property.action';
import Modal from "react-native-modal";


let backupData = []

const CommissionDetail = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const { brokerId, cMonth } = route.params
    const [search, setSearch] = useState('');
    const [list, setList] = useState([])
    const [loader, setLoader] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        getDetail()
        return () => {

        }
    }, [brokerId])

    const getDetail = () => {
        setLoader(true)
        let headers = {
            'Content-Type': 'application/json'
        };
        axios.get(`${Url}view_commission_detail_api?broker_id=${brokerId}&cmonth=${cMonth}`,
            { headers: headers })
            .then(resp => {
                let response = resp.data;
                setList(response.data)
                backupData = response.data
                setLoader(false)

            })
            .catch(error => {
                const err = error
                if (err.response) {
                    console.log("getDetail error", err.response)
                }
                setLoader(false)
            });
    };

    const emputyComponent = () => (
        <Text style={{ color: '#000000', fontSize: 13, fontFamily: FONTS.Bold, alignSelf: 'center' }} >Empty Result</Text>
    )

    const getSearch = (item) => {
        setSearch(item)
        var unit_list = backupData;
        const filteredUnites = unit_list
            ? unit_list.filter((filterUnit) => {
                return (filterUnit.NAME
                    .toLowerCase()
                    .includes(item.toLowerCase()) ||
                    filterUnit.UNIT_CODE
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.CUSTOMER_NAME
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
                    filterUnit.CMONTHS && filterUnit.CMONTHS
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.COMMISSION_PER && filterUnit.COMMISSION_PER
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.COMM_MONTH && filterUnit.COMM_MONTH
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.COMMISSION_AMT && filterUnit.COMMISSION_AMT
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.PAYMONTH && filterUnit.PAYMONTH
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.SALE_VALUE && filterUnit.SALE_VALUE
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.PRE_RESERVE_NO && filterUnit.PRE_RESERVE_NO
                        .toString()
                        .includes(item.toLowerCase()) ||
                    filterUnit.CUSTOMER_ID && filterUnit.CUSTOMER_ID
                        .toString()
                        .includes(item.toLowerCase()) ||
                    moment(filterUnit.RESERVE_DATE).format('DD-MMM-YYYY')
                        .toString()
                        .includes(item.toLowerCase()) ||
                    moment(filterUnit.BOOKING_DATE).format('DD-MMM-YYYY')
                        .toString()
                        .includes(item.toLowerCase())
                )
            })
            : [];
        setList(filteredUnites);
    };

    const preReport = () => {
        let soaUrl = `http://tvh.flexion.ae:9092/api/Reports/customer/broker_comm_p/%7BPN_RESERVATION_HDR.IS_DELETED%7D=0/TRUE/33/0`;
        navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "Pre-Commission" })
    }
    const currentReport = () => {
        let soaUrl = `http://tvh.flexion.ae:9092/api/Reports/customer/broker_comm/%7BPN_RESERVATION_HDR.BROKER_ID%7D=${brokerId}%20%20AND%20%7BFM_BROKER_COMM_PAID.IS_CONFIRMED%7D%20=%200/TRUE/33/0`;
        navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "Current Month" })
    }
    const approveReport = () => {
        let soaUrl = `http://tvh.flexion.ae:9092/api/Reports/customer/broker_comm_monthly/%7BPN_RESERVATION_HDR.BROKER_ID%7D=${brokerId}/TRUE/33/0`;
        navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "Approve Comm." })
    }

    const sendApproval = () => {
        alert("Commission sent for approval")
    }

    const chooseFile = () => {
        if (true) {
            alert("Please select file first")
            return;
        }
    }

    const generateComm = () => {
        let record = {
            brokerid: brokerId
        }
        dispatch(insertGenearteCommission(record))
        getDetail()
    }



    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} label="Commission Detail" value={search} getInputValue={getSearch.bind(this)} />
            <View style={{ height: 3, width: '100%' }} />
            <View style={styles.btnsRow}>
                <TouchableOpacity onPress={preReport} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>Previous Comm. Report</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={currentReport} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>Current Month Comm. Report</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={approveReport} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>Approved Monthly Comm. Report</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.btnsRow}>
                <TouchableOpacity onPress={() => setIsModalVisible(true)} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>Upload Invoice</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={generateComm} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>Generate Comm.</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={sendApproval} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>Send for approval</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 4 }} />
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
            <Modal
                onBackButtonPress={() => setIsModalVisible(false)}
                onBackdropPress={() => setIsModalVisible(false)}
                animationIn="fadeIn"
                animationOut="fadeOut"
                backdropOpacity={0.4}
                animationInTiming={300}
                animationOutTiming={300}
                isVisible={isModalVisible}
                style={{ flex: 0.96, justifyContent: 'center', zIndex: 50, }}
            >
                <View style={{ width: CUSTOMWIDTH('100'), alignItems: 'center', }}>
                    <View style={{ width: CUSTOMWIDTH('90'), }}>
                        <View style={{ backgroundColor: COLORS.primary, width: CUSTOMWIDTH('80'), zIndex: 15, borderRadius: 5, alignItems: 'center', paddingVertical: 12 }}>
                            <TouchableOpacity style={{ width: '90%', height: 45, borderWidth: 1, borderColor: COLORS.secondry, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }} >
                                <Image source={ICONS.fileIcon} style={{ width: 30, height: 30, }} resizeMode="contain" />
                            </TouchableOpacity>

                            <Text numberOfLines={1} style={{ fontSize: 22, color: '#FFFFFF', fontFamily: FONTS.Bold, marginVertical: 7 }}>
                                Choose File!
                            </Text>
                            <Text style={{ fontSize: 16, color: '#FFFFFF', fontFamily: FONTS.Medium, width: '85%', alignSelf: 'center', textAlign: 'center' }}>
                                Please choose file for upload
                            </Text>
                            <View style={{ width: '75%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                                <TouchableOpacity onPress={() => setIsModalVisible(false)} style={[styles.btnStyle, { marginRight: 5, width: 98 }]} >
                                    <Text style={styles.btnLabel}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => chooseFile()} style={[styles.btnStyle, { marginRight: 5, width: 98, backgroundColor: COLORS.lightGreen }]} >
                                    <Text style={styles.btnLabel}>Upload</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default CommissionDetail

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
        width: '32%',
        height: 45,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnLabel: {
        color: COLORS.primary,
        fontSize: 11,
        fontFamily: FONTS.SemiBold,
        marginBottom: 2,
        textAlign: 'center'
    }
})