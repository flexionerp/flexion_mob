import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from "../../common/HeaderB";
import { COLORS, CUSTOMWIDTH, FONTS, ICONS } from '../../constants';
import { useSelector } from 'react-redux';
import { Item } from "./components/Item";
import Modal from "react-native-modal";


export const Attachment = ({ navigation, route }) => {
    const { detail } = route.params
    const generalData = useSelector(state => state.property.generalData)
    const [list, setList] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)


    useEffect(() => {
        setList(generalData[11])
        return () => {

        }
    }, [generalData])

    const emputyComponent = () => (
        <Text style={{ color: '#000000', fontSize: 13, fontFamily: FONTS.Bold, alignSelf: 'center' }} >Empty Result</Text>
    )

    const onDownloadClick = () => {
        let soaUrl = `http://tvh.flexion.ae:9092/api/Reports/customer/pra/${detail.PRE_RESERVE_NO}/true`;
        navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "PRA Document" })
    }

    const chooseFile = () => {
        if (true) {
            alert("Please select file first")
            return;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} label="Attachment" />

            <TouchableOpacity onPress={() => setIsModalVisible(true)} style={[styles.btnStyle1, { marginRight: 5 }]} >
                <Text style={styles.btnLabel}>+ Attachment</Text>
            </TouchableOpacity>

            <View style={{ height: 3, width: '100%' }} />
            {
                generalData[18].length > 0
                    ?
                    <FlatList
                        style={{ width: '100%' }}
                        data={list}
                        renderItem={({ item }) => (
                            <View style={{ width: '100%', alignItems: 'center' }} >
                                <Item navigation={navigation} data={item} detail={detail} />
                            </View>
                        )}
                        keyExtractor={item => item.ID}
                        ListEmptyComponent={emputyComponent}
                    />
                    :
                    <View style={styles.btnsRow}>
                        <TouchableOpacity onPress={onDownloadClick} style={[styles.btnStyle, {}]} >
                            <Text style={styles.btnLabel}>Download PRA Document</Text>
                        </TouchableOpacity>
                    </View>
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: COLORS.secondry,
        alignItems: 'center'
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 1,
        backgroundColor: COLORS.primary,
        borderRadius: 6,
        paddingVertical: 15
    },
    btnStyle1: {
        width: '90%',
        height: 45,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    btnStyle: {
        width: '60%',
        height: 35,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 20,
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