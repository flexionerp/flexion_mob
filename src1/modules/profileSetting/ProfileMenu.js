import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { ICONS, CUSTOMWIDTH, COLORS, FONTS, SCREENS } from '../../constants'
import LinearGradient from 'react-native-linear-gradient';
import Header from "../../common/HeaderN";
import { RowItem } from './components/RowItem'
import { DeleteAccount } from './components/DeleteAccount'
import { RegularBtn } from '../../common/regularBtn'
import { useSelector, useDispatch } from 'react-redux'
import { setPropertyStats, setReservationList } from '../../redux/property/property.action';

export const MyAccount = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const userDetail = useSelector(state => state.user.userDetail)

    useEffect(() => {
        return () => {
        }
    }, [])

    const itemClick = () => {

    }

    const deleteClick = () => {
        dispatch(setReservationList([]));
        dispatch(setPropertyStats([]))
        navigation.navigate(SCREENS.DELETEACCOUNT)
    }


    return (
        <LinearGradient
            colors={['#E4EEFE', '#F9FCFF', '#FFFFFF']}
            style={styles.container}>
            <SafeAreaView style={styles.main}>
                <Header navigation={navigation} label={"My Account"} />
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{width: '90%', marginVertical: 25 }}>
                        <View style={{ marginHorizontal: 10 }} >
                            <Text style={{ color: COLORS.primary, fontSize: 17, fontFamily: FONTS.Bold }} >{userDetail != null ? userDetail.FIRST_NAME + " " + userDetail.LAST_NAME : 'null'}!</Text>
                            <Text style={{ color: COLORS.primary, fontSize: 14, opacity: 0.8, fontFamily: FONTS.Regular }}>{userDetail != null ? userDetail.EMAIL : 'null'}</Text>
                        </View>
                    </View>
                    <View style={styles.detailCard}>
                        <View style={{ width: '100%', marginVertical: 13 }}>
                            <RowItem label={"Surname"} value={userDetail.LOGIN_NAME} onClick={() => { itemClick() }} />
                            <RowItem label={"Name"} value={userDetail.FIRST_NAME + " " + userDetail.LAST_NAME} onClick={() => { itemClick() }} />
                            <RowItem label={"Email"} value={userDetail.EMAIL} onClick={() => { itemClick() }} />
                            <RowItem label={"Address"} value={userDetail.ADDRESS} onClick={() => { itemClick() }} />
                            <RowItem label={"Phone Number"} value={userDetail.MOBILE} onClick={() => { itemClick() }} />
                            {true && <DeleteAccount label={"Delete Account"} onClick={() => { deleteClick() }} />}
                        </View>
                        <View style={{ height: 15 }} />
                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <RegularBtn
                                label={"LOGOUT"}
                                size="90%"
                                bgColor={COLORS.primary}
                                onClick={() => navigation.navigate(SCREENS.LOGINSCREEN)}
                            />
                        </View>
                    </View>
                </View>
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
    },
    header: {
        width: '100%',
        height: 60,
        alignItems: 'center',
    },
    menuRow: {
        flexDirection: 'row',
        width: '90%',
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailCard: {
        width: '90%',
        backgroundColor: COLORS.cardColor,
        borderRadius: 5,
        marginTop: 20,
        paddingVertical: 12,
        alignItems: 'center'
    },
})