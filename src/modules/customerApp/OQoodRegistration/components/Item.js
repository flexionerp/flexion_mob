import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { COLORS, FONTS, ICONS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../constants'
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';


export const Item = ({ navigation, data }) => {
    let { OQOOD_REG_NO, REG_DATE, DESCRIPTION, AMOUNT } = data

    return (
        <View style={styles.borderContainer} >
            <ImageBackground
                source={ICONS.unitBG}
                style={styles.container}
                resizeMode='cover'>
                <View style={styles.left}>
                    <View style={styles.top}>
                        <Text style={styles.unitCode}>{OQOOD_REG_NO}</Text>
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.area}>Amount - {AMOUNT}</Text>
                        <Text style={styles.area}>Register Date - {moment(REG_DATE).format('DD-MMM-YYYY hh:mm:ss')}</Text>
                        <Text style={styles.area}>Description - {DESCRIPTION}</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <View />
                    <View />
                    <View />
                   
                </View>
            </ImageBackground>
        </View>
        // <View style={styles.container}>
        //     <View style={styles.dataRow}>
        //         <View style={[styles.left, { width: '100%' }]}>
        //             <Text style={styles.label} >Reg. No</Text>
        //             <Text style={styles.value} >{OQOOD_REG_NO}</Text>
        //         </View>
        //     </View>
        //     <View style={[styles.dataRow, { marginTop: 14 }]}>
        //         <View style={[styles.left, { width: '100%' }]}>
        //             <Text style={styles.label} >Reg. Date</Text>
        //             <Text style={styles.value} >{moment(REG_DATE).format("MM/DD/YYYY")}</Text>
        //         </View>
        //     </View>
        //     <View style={[styles.dataRow, { marginTop: 14 }]}>
        //         <View style={[styles.left, { width: '100%' }]}>
        //             <Text style={styles.label} >Amount</Text>
        //             <Text style={styles.value} >{AMOUNT && Math.abs(AMOUNT).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
        //         </View>
        //     </View>
        //     <View style={[styles.dataRow, { marginTop: 14 }]}>
        //         <View style={[styles.left, { width: '100%' }]}>
        //             <Text style={styles.label} >Description</Text>
        //             <Text style={styles.value} numberOfLines={2} >{DESCRIPTION}</Text>
        //         </View>
        //     </View>
        //     <View style={styles.btnsRow}>
        //         <TouchableOpacity onPress={() => { }} style={[styles.btnStyle, { marginRight: 5 }]} >
        //             <Text style={styles.btnLabel}>Preview</Text>
        //         </TouchableOpacity>
        //     </View>

        // </View>
    )
}

const styles = StyleSheet.create({
    borderContainer: {
        borderRadius: SCREEN_HEIGHT * 0.009,
        overflow: 'hidden',
        marginTop: 12,
        borderColor: COLORS.borderColor,
        borderWidth: 1
    },
    container: {
        width: SCREEN_WIDTH * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SCREEN_HEIGHT * 0.01,
        height: Platform.OS == 'ios' ? SCREEN_HEIGHT * 0.15 : SCREEN_HEIGHT * 0.2,
    },
    left: {
        width: '78%',
    },
    right: {
        width: '20%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    top: {
        marginBottom: 12
    },
    center: {
        marginBottom: 12
    },
    bottom: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    dataRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    detail: {
        color: COLORS.boldText,
        textAlign: 'center',
        fontSize: SCREEN_WIDTH * 0.026,
        fontFamily: FONTS.Medium,
        marginLeft: 6
    },
    btnStyle: {
        width: 100,
        height: 26,
        backgroundColor: COLORS.lightBlue,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4
    },
    btnLabel: {
        color: COLORS.primary,
        fontSize: 11,
        fontFamily: FONTS.SemiBold,
        marginBottom: 2
    }
})