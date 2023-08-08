import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { } from 'react'
import { COLORS, FONTS, ICONS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../../constants'
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';



export const Item = ({ navigation, data }) => {
    let { APPROVAL_TYPE, STATUS, COMMENTS, SUBMITTED_DT, ACTION_DT, APPROVER_NAME } = data

    return (
        <View style={styles.borderContainer} >
            <ImageBackground
                source={ICONS.unitBG}
                style={styles.container}
                resizeMode='cover'>
                <View style={styles.left}>
                    <View style={styles.top}>
                        <Text style={styles.unitCode}>{APPROVAL_TYPE}</Text>
                    </View>
                    <View style={styles.center}>
                        <Text style={styles.area}>Approval Name - {APPROVER_NAME}</Text>
                        <Text style={styles.area}>Submit Date - {moment(SUBMITTED_DT).format('DD-MMM-YYYY hh:mm:ss')}</Text>
                        <Text style={styles.area}>Status - {STATUS}</Text>
                        <Text style={styles.area}>Action Date - {moment(ACTION_DT).format('DD-MMM-YYYY hh:mm:ss')}</Text>
                        <Text style={styles.area}>Comments - {COMMENTS}</Text>
                    </View>
                </View>
                <View style={styles.right}>
                    <View />
                    <View />
                    <View />
                    {/* <View style={{ width: '100%', marginBottom: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 2 }} >
                        <TouchableOpacity onPress={() => { }} style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={styles.detail} >PPlan</Text>
                            <Icon name='arrow-right' size={12} />
                        </TouchableOpacity>
                    </View> */}
                </View>
            </ImageBackground>
        </View>
      
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
        height: SCREEN_HEIGHT * 0.15,
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