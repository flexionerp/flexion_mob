import {
    StyleSheet, Text, View, ImageBackground, SafeAreaView,
    ScrollView, Image
} from 'react-native'
import React from 'react'
import { FONTS, ICONS } from '../../../constants'
import { BtnLI } from '../../../common/btnLI'
import { BtnLIM } from '../../../common/btnLIM'

const StatsItem = ({ label, value }) => {
    return (
        <View style={styles.statsContainer}>
            <Text style={styles.customerName} >{value}</Text>
            <Text style={styles.hello} >{label}</Text>
        </View>
    )
}


const CustomerDetail = () => {
    return (
        <View style={styles.customerContainer}>
            <Text style={styles.hello} >Hello,</Text>
            <Text style={styles.customerName} >Nasir Muhammad</Text>
        </View>
    )
}

const UnitCount = () => {
    return (
        <View style={[styles.customerContainer, { flexDirection: 'row', alignItems: 'center', height: 54 }]}>
            <Image source={ICONS.building} style={{ width: 40, height: 40, marginRight: 10 }} />
            <Text style={styles.customerName} >3</Text>
            <Text style={styles.unitText} >Units</Text>
        </View>
    )
}


const Home = () => {
    return (
        <ImageBackground
            source={ICONS.bgImg}
            style={styles.container}>
            <SafeAreaView style={styles.main}>
                <ScrollView style={{ width: '100%' }} >
                    <View style={{ width: '100%', alignItems: 'center' }} >
                        <CustomerDetail />
                        <UnitCount />
                        <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 12 }}>
                            <BtnLI
                                lable={"Unit Details"}
                                size={"48%"}
                                onClick={() => { }}
                                icon={ICONS.unit}
                            />
                            <BtnLI
                                lable={"SOA"}
                                size={"48%"}
                                onClick={() => { }}
                                icon={ICONS.soa}
                            />
                        </View>
                        <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <StatsItem label="Total" value="100,297,000.00" />
                            <StatsItem label="Invoiced Amount" value="432,434.00" />
                            <StatsItem label="Collected Amount" value="432,338.00" />
                            <StatsItem label="Outstanding" value="96.00" />
                        </View>
                        <View style={{ marginVertical: 20 }} >
                            <BtnLIM
                                lable={"Pay now"}
                                size={"48%"}
                                onClick={() => { }}
                                icon={ICONS.card}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    main: {
        width: '100%',
        alignItems: 'center'
    },
    customerContainer: {
        width: '90%',
        height: 70,
        borderWidth: 1,
        borderColor: '#CDA349',
        borderRadius: 15,
        justifyContent: 'center',
        paddingHorizontal: 12,
        marginTop: 12
    },
    hello: {
        color: '#204866',
        fontFamily: FONTS.Medium,
        fontSize: 16,
        marginTop: 8
    },
    customerName: {
        color: '#204866',
        fontFamily: FONTS.Bold,
        fontSize: 18,
    },
    unitText: {
        width: '75%',
        marginHorizontal: 12,
        color: '#204866',
        fontFamily: FONTS.Medium,
        fontSize: 15
    },
    statsContainer: {
        width: '48%',
        height: 92,
        borderWidth: 1,
        borderColor: '#CDA349',
        borderRadius: 15,
        justifyContent: 'center',
        paddingHorizontal: 12,
        marginTop: 12
    }
})