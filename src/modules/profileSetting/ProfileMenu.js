import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { ICONS, CUSTOMWIDTH, COLORS, FONTS, SCREENS, SCREEN_WIDTH } from '../../constants'
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
        <SafeAreaView style={{ flex: 1, width: '100%' }} >
            <ImageBackground
                source={ICONS.bgImg}
                style={styles.container}>
                <View style={styles.main}>
                    <Text style={styles.headingStyle} >Profile</Text>
                    <View style={{ height: 12 }} />
                    <Image source={ICONS.userIcon} style={{ width: 81, height: 81 }} />
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Text style={{ color: COLORS.boldText, fontSize: 17, fontFamily: FONTS.Bold, width: '100%', marginVertical: 15 }} >{userDetail != null ? userDetail.FIRST_NAME + " " + userDetail.LAST_NAME : 'null'}!</Text>
                        <View style={styles.detailCard}>
                            <View style={{ width: '100%', }}>
                                <RowItem label={"Surname"} value={userDetail.LOGIN_NAME} onClick={() => { itemClick() }} />
                                <RowItem label={"Name"} value={userDetail.FIRST_NAME + " " + userDetail.LAST_NAME} onClick={() => { itemClick() }} />
                                <RowItem label={"Email"} value={userDetail.EMAIL} onClick={() => { itemClick() }} />
                                <RowItem label={"Address"} value={userDetail.ADDRESS} onClick={() => { itemClick() }} />
                                <RowItem label={"Phone Number"} value={userDetail.MOBILE} onClick={() => { itemClick() }} />
                            </View>
                            <View style={{ height: 15 }} />
                        </View>
                    </View>
                </View>
                <View style={{height:20}} />
                <View style={{ width: '85%', alignItems: 'center', position: 'absolute', bottom: Platform.OS=='ios' ? 70 : 90, flexDirection: 'row', justifyContent: 'space-between', flexWrap:'wrap' }}>
                    {/* <RegularBtn
                        label={"Reset Password"}
                        size="100%"
                        bgColor={COLORS.primary}
                        onClick={() => navigation.navigate("ResetPassword")}
                    />
                    <View style={{ height: 12, width:'100%' }} /> */}
                    <RegularBtn
                        label={"Reset Password"}
                        size="42%"
                        bgColor={COLORS.primary}
                        onClick={() => navigation.navigate("ResetPassword")}
                    />
                    <RegularBtn
                        label={"Logout"}
                        size="42%"
                        bgColor={COLORS.primary}
                        onClick={() => navigation.navigate(SCREENS.LOGINSCREEN)}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backfaceVisibility: 'visible'
    },
    main: {
        width: '90%',
        justifyContent: 'center',
        backfaceVisibility: 'visible'
    },
    detailCard: {
        width: '100%',
        backgroundColor: COLORS.cardColor,
        borderRadius: 5,
        alignItems: 'center',
        backfaceVisibility: 'visible'
    },
    headingStyle: {
        width: '90%',
        color: COLORS.boldText,
        fontSize: SCREEN_WIDTH * 0.044,
        fontFamily: FONTS.SemiBold,
    },
})