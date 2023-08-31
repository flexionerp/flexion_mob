import React, { useEffect, useState, } from 'react'
import {
    PieChart
} from "react-native-chart-kit";
import { StyleSheet, View, ScrollView, Text, Image, ActivityIndicator } from 'react-native'
import { FONTS, ICONS } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getBrokerStats } from '../redux/property/property.action';

const colorsArray = [
    `#243664`,
    `#5CC4AD`,
    `#C3DBFF`,
    `#bf504e`,
    `#59a7bb`,
    `#24bfaa`,
    `#4f81bc`,
    `#bf504e`,
    `#9bbb58`,
    `#24bfaa`,
    `#7e679b`,
    `#59a7bb`,
]


export const GraphBrokerStat = ({ }) => {
    const [data, setData] = useState([])
    const dispatch = useDispatch();
    const brokerDataStats = useSelector(state => state.property.brokerDataStats)

    useEffect(() => {
        dispatch(getBrokerStats())
        return () => {

        }
    }, [])

    useEffect(() => {
        let tempdata = [];
        brokerDataStats.forEach((element, index) => {
            tempdata.push(
                {
                    name: element.TYPE,
                    population: element.VALUE,
                    color: colorsArray[index],
                    legendFontColor: colorsArray[index],
                    legendFontSize: 12
                }
            )
        });
        setData(tempdata)
        return () => {

        }
    }, [brokerDataStats])


    return (
        <View style={{ marginTop: 16 }} >
            <View style={styles.card}>
                <View style={styles.labelRow}>
                    <Text style={styles.request} >BROKERS</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Image source={ICONS.backios} style={{ width: 10, height: 18, marginRight: 20 }} />
                        <Image source={ICONS.next} style={{ width: 10, height: 18, }} />
                    </View>
                </View>
                <PieChart
                    data={data}
                    width={wp('78')}
                    height={200}
                    chartConfig={{
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 1
                        },
                    }}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    absolute
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: "#ffffff",
        padding: 5,
        borderRadius: 10,
        height: 300,
        marginLeft: '6%',
        marginRight: '6%'
    },
    labelRow: {
        width: wp(84),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 15
    },

    request: {
        color: '#787389',
        fontSize: 17,
        fontFamily: FONTS.Bold
    }
})
