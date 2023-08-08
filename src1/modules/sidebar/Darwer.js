import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { COLORS, ICONS } from '../../constants'
import Header from '../../common/HeaderB';
import { SettingItem } from '../../common/settingItem'




export function Darwer({ navigation, route }) {
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} label=" View Details" />
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }} contentContainerStyle={{ width: '100%', alignItems: 'center' }}>
                <SettingItem label={"CUSTOMER"} icon={ICONS.team} onClick={() => { }} />
                <SettingItem label={"PAYMENT PLAN"} icon={ICONS.money} onClick={() => { }} />
                <SettingItem label={"OTHER CHARGES"} icon={ICONS.bill} onClick={() => { }} />
                <SettingItem label={"PRA"} icon={ICONS.pra} onClick={() => { }} />
                <SettingItem label={"RECEIPT"} icon={ICONS.receipt1} onClick={() => { }} />
                <SettingItem label={"SOA"} icon={ICONS.receipt} onClick={() => { }} />
                <SettingItem label={"NOTES"} icon={ICONS.notes} onClick={() => { }} />
                <SettingItem label={"HISTORY"} icon={ICONS.history} onClick={() => { }} />
                <SettingItem label={"SPA"} icon={ICONS.spa} onClick={() => { }} />
                <SettingItem label={"BOOKING FORM"} icon={ICONS.bookingform} onClick={() => { }} />
                <View style={{ height: 30 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondry,
        alignItems: 'center'
    }
})