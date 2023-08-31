import { StyleSheet, Image, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { StackBarStats } from '../../../common/stackBarStats'
import { StackBarBStats } from '../../../common/stackBarBStats'
import { StackBarSaleAStats } from '../../../common/stackBarSaleAStats'
import { StackBarSaleBStats } from '../../../common/stackBarSaleBStats'
import { GraphStats } from '../../../common/graphBarStat'
import { GraphBarMonthlyStat } from '../../../common/graphBarMonthlyStat'
import { GraphBarSaleStat } from '../../../common/graphBarSaleStat'
import { GraphCancellationStat } from '../../../common/graphCancellationStat'
import { GraphBrokerStat } from '../../../common/graphBrokerStat'
import { GraphCustmerStats } from '../../../common/graphCustmerStats'
import { useSelector } from 'react-redux';
import { ICONS } from '../../../constants';



export function GraphsListing({ navigation, route }) {
    const [booked, setBooked] = useState([]);
    const {
        reservationList,
    } = useSelector(state => state.property)
    const { isCustomer } = useSelector(state => state.user)

    useEffect(() => {
        reservationList.forEach(element => {
            if (element.STATUS_NAME == "Booked") {
                setBooked(pre => [...pre, element])
            }
        });

        return () => {

        }
    }, [reservationList])


    return (
        <LinearGradient
            colors={['#E4EEFE', '#F9FCFF', '#FFFFFF']}
            style={styles.container}>
            <SafeAreaView style={styles.main}>
                <View style={{ width: '90%', marginVertical: 10 }}>
                    {/* <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={ICONS.backios} style={{ width: 18, height: 18}} resizeMode={"contain"} />
                    </TouchableOpacity> */}
                </View>

                <ScrollView style={{ width: '100%' }} >
                    {
                        true && <View style={{ width: '100%', alignItems: 'center' }} >
                            <GraphStats />
                            <StackBarStats />
                            <StackBarBStats />
                            <GraphBarMonthlyStat />
                            <StackBarSaleAStats />
                            <StackBarSaleBStats />
                            <GraphBarSaleStat />
                            <GraphCancellationStat />
                            {/* <GraphBarCollectionsStat /> */}
                            {/* <GraphBrokerStat />
                            <GraphCustmerStats /> */}
                            {/* <BookingRequestSection /> */}
                            <View style={{ height: 130 }} />
                        </View>
                    }
                </ScrollView>
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
    }
})