import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { COLORS, CUSTOMHEIGHT, CUSTOMWIDTH, FONTS, } from '../../../constants'
import Modal from "react-native-modal";
import { useSelector } from 'react-redux';


export const Item = ({ navigation, data, detail }) => {
    const generalData = useSelector(state => state.property.generalData)
    let praData = generalData[18][0]
    let { FILE_NAME, FILE_PATH } = data
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [path, setPath] = useState(' ')


    const onClick = () => {
        let filename = FILE_NAME;
        let extension = filename.split(".").pop();
        if (extension.toLowerCase() == 'pdf') {
            let soaUrl = `http://broker.fakhruddinproperties.com:8018${FILE_PATH.replace(/ /g, '%20')}`;
            navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "Attachment" })
        } else {
            setPath(FILE_PATH)
            setIsModalVisible(true)
        }
    }

    const onPRAClick = () => {
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

    // const onPRAClick = () => {
    //     let filename = praData.FILE_PATH;
    //     let extension = filename.split(".").pop();
    //     if (extension.toLowerCase() == 'pdf') {
    //         let soaUrl = `http://broker.fakhruddinproperties.com:8018${praData.FILE_PATH.replace(/ /g, '%20') }`;
    //         navigation.navigate("StatementOfAccount", { soaUrl: soaUrl, label: "Attachment" })
    //     } else {
    //         setPath(praData.FILE_PATH)
    //         setIsModalVisible(true)
    //     }
    // }

    return (
        <View style={styles.container}>
            <View style={styles.btnsRow}>
                <TouchableOpacity onPress={onClick} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>View Booking Form</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.btnsRow}>
                <TouchableOpacity onPress={onPRAClick} style={[styles.btnStyle, { marginRight: 5 }]} >
                    <Text style={styles.btnLabel}>View PRA Document</Text>
                </TouchableOpacity>
            </View>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
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