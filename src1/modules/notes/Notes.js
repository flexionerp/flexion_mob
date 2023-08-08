import {
    StyleSheet, Text, View, SafeAreaView, FlatList,
    TouchableOpacity, ActivityIndicator, KeyboardAvoidingView,
    Platform, ScrollView
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from "../../common/HeaderBSA";
import { COLORS, CUSTOMWIDTH, FONTS, Url } from '../../constants';
import Modal from "react-native-modal";
import { useDispatch, useSelector } from 'react-redux';
import { Item } from "./components/Item";
import { typeArray } from './components/types'
import { DropDownSingle } from '../../common/dropDownSingle';
import { CustomMultiInput } from '../../common/customMultiInput';
import { callGeneralApi } from '../../redux/property/property.action';
import axios from 'axios';



export const Notes = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const generalData = useSelector(state => state.property.generalData)
    const { orgID, token } = useSelector(state => state.user)
    const detail = route.params.detail
    const [list, setList] = useState([])
    const [search, setSearch] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [loader, setLoader] = useState(false)
    const [typeId, setTypeId] = useState(0)
    const [typeName, setTypeName] = useState(null)
    const [notes, setNotes] = useState('')


    useEffect(() => {
        setList(generalData[14])
        return () => {
        }
    }, [generalData]);

    const emputyComponent = () => (
        <Text style={{ color: '#000000', fontSize: 13, fontFamily: FONTS.Bold, alignSelf: 'center' }} >Empty Result</Text>
    );


    const getSearch = (item) => {
        setSearch(item)
        var unit_list = generalData[14];
        const filteredUnites = unit_list
            ? unit_list.filter((filterUnit) => {
                return (filterUnit.NOTE_TYPE_NAME
                    .toLowerCase()
                    .includes(item.toLowerCase()) ||
                    filterUnit.USER_NAME
                        .toLowerCase()
                        .includes(item.toLowerCase()) ||
                    filterUnit.NOTE
                        .toLowerCase()
                        .includes(item.toLowerCase())
                )
            })
            : [];
        setList(filteredUnites);
    };

    const getType = (name, id) => {
        setTypeName(name);
        setTypeId(id)
    };

    const apiCall = () => {
        if (typeId == 0) {
            alert("Please select note type")
        } else if (notes == '') {
            alert("Please enter your note")
        } else {
            setLoader(true)
            let headers = {
                'Content-Type': 'application/json'
            };

            axios.get(`${Url}insert_notes_api?note_type=${typeId}&notes=${notes}&hdr_id=${detail.ID}&org_id=${orgID}&user_id=${token}`,
                { headers: headers })
                .then(resp => {
                    let response = resp.data;
                    // console.log("apiCall: ", response)
                    alert(response.message)
                    dispatch(callGeneralApi(detail))
                    setIsModalVisible(false)
                    setLoader(false)
                    emputyField()
                })
                .catch(error => {
                    const err = error
                    if (err.response) {
                        console.log(err.response)
                    }
                    setLoader(false)

                });
        }

    }

    const emputyField = () => {
        setTypeId(0);
        setTypeName(null);
        setNotes('')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} label="Notes" value={search} getInputValue={getSearch.bind(this)} setType={() => setIsModalVisible(true)} />
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
            <Modal
                onBackButtonPress={() => setIsModalVisible(false)}
                onBackdropPress={() => setIsModalVisible(false)}
                animationIn="fadeIn"
                animationOut="fadeOut"
                backdropOpacity={0.4}
                animationInTiming={300}
                animationOutTiming={300}
                isVisible={isModalVisible}
                style={{ flex: 1, width: '100%', justifyContent: 'center', zIndex: 50, }}
            >
                <KeyboardAvoidingView
                    style={{ width: CUSTOMWIDTH('100'), alignItems: 'center' }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
                    enabled
                >
                    <ScrollView style={{ width: CUSTOMWIDTH('90'), }} contentContainerStyle={{ width: CUSTOMWIDTH('90') }}>
                        <View style={{ backgroundColor: COLORS.primary, width: '90%', zIndex: 15, borderRadius: 5, alignItems: 'center', paddingVertical: 12 }}>
                            <Text numberOfLines={1} style={{ fontSize: 22, color: '#FFFFFF', fontFamily: FONTS.Bold, marginVertical: 7 }}>
                                Add Note!
                            </Text>
                            <View style={{ width: '90%', marginTop: 12 }}>
                                <DropDownSingle
                                    name={typeName}
                                    data={typeArray}
                                    getValue={getType.bind(this)}
                                    label="Note Type"
                                />
                            </View>
                            <View style={{ width: '90%', marginTop: 18 }}>
                                <Text style={styles.labelStyle}>Enter notes</Text>
                                <CustomMultiInput
                                    placeholder='Enter your note'
                                    value={notes}
                                    getValue={setNotes.bind(this)}
                                    keyboardType={'email-address'}
                                />
                            </View>
                            <View style={{ width: '75%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>

                                <TouchableOpacity onPress={() => setIsModalVisible(false)} style={[styles.btnStyle, { marginRight: 5, width: 98 }]} >
                                    <Text style={styles.btnLabel}>Close</Text>
                                </TouchableOpacity>

                                {
                                    loader
                                        ?
                                        <ActivityIndicator size={"small"} color={COLORS.secondry} />
                                        :
                                        <TouchableOpacity onPress={apiCall} style={[styles.btnStyle, { marginRight: 5, width: 98, backgroundColor: COLORS.lightGreen }]} >
                                            <Text style={styles.btnLabel}>Save</Text>
                                        </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </ScrollView>

                </KeyboardAvoidingView>
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
    btnStyle: {
        width: 100,
        height: 26,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnLabel: {
        color: COLORS.primary,
        fontSize: 11,
        fontFamily: FONTS.SemiBold,
        marginBottom: 2
    },
    labelStyle: {
        width: '100%',
        color: COLORS.secondry,
        fontSize: CUSTOMWIDTH(4),
        fontFamily: FONTS.SemiBold,
        marginBottom: 6,
    },
})