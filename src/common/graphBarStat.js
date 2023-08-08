import React, { useEffect, useState, } from 'react'
import {
    BarChart
} from "react-native-chart-kit";
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, View, ScrollView, Text, Image, ImageBackground } from 'react-native'
import { COLORS, FONTS, ICONS } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getWeeklyStats } from '../redux/property/property.action';
import moment from 'moment';


const colorsArray = [
    (opacity = 1) => `#041C5B`,
    (opacity = 1) => `#041C5B`,
    (opacity = 1) => `#041C5B`,
    (opacity = 1) => `#041C5B`,
    (opacity = 1) => `#041C5B`,
    (opacity = 1) => `#041C5B`,
    (opacity = 1) => `#041C5B`,
    (opacity = 1) => `#041C5B`,
    (opacity = 1) => `#041C5B`,
    (opacity = 1) => `#041C5B`,
    (opacity = 1) => `#041C5B`,
    (opacity = 1) => `#041C5B`,
];


export const GraphStats = ({ revenue }) => {
    const [label, setLabel] = useState([]);
    const [data, setData] = useState([]);
    const [colors, setColors] = useState([]);
    const dispatch = useDispatch();
    const weeklyStats = useSelector(state => state.property.weeklyStats)

    useEffect(() => {
        dispatch(getWeeklyStats())
        return () => {

        }
    }, [])

    useEffect(() => {
        let tempLabel = [];
        let temptotaldata = [];
        let tempColors = [];
        let i = 0
        weeklyStats.forEach((element, index) => {
            if (!tempLabel.includes(moment(element.STATUS_NAME).format('DD MMM'))) {
                tempLabel.push(moment(element.STATUS_NAME).format('DD MMM'));
                tempColors.push(colorsArray[i]);
                temptotaldata[i] = 0
                i++;
            }
            var index44 = tempLabel.indexOf(moment(element.STATUS_NAME).format('DD MMM'));
            temptotaldata[index44] = temptotaldata[index44] + element.SALEVALUE;
        });
        setLabel(tempLabel)
        setData(temptotaldata)
        setColors(tempColors)
        return () => {

        }
    }, [weeklyStats])


    return (
        <View style={{ marginTop: 16, }} >
            <ImageBackground
                source={ICONS.graphBG}
                style={styles.card}>
                <View style={styles.labelRow}>
                    <Text style={styles.request} >WEEKLY SALE SUMMERY</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Image source={ICONS.backios} style={{ width: 10, height: 18, marginRight: 20 }} />
                        <Image source={ICONS.next} style={{ width: 10, height: 18, }} />
                    </View>
                </View>
                <ScrollView
                    horizontal={true}
                >
                    <BarChart
                        style={{
                            marginVertical: 2,
                            borderRadius: 0,
                        }}
                        data={{
                            labels: label,
                            datasets: [
                                {
                                    data: data,
                                    colors: colors
                                }
                            ]
                        }}
                        width={500}
                        height={240}
                        showValuesOnTopOfBars={true}
                        showBarTops={false}
                        chartConfig={{
                            backgroundColor: "transparent",
                            backgroundGradientTo: "white",
                            backgroundGradientFromOpacity: 0,
                            backgroundGradientFrom: "white",
                            backgroundGradientToOpacity: 0,
                            barPercentage: 0.25,
                            barRadius: 0,
                            decimalPlaces: 0,
                            color: (opacity = 1) => `${COLORS.boldText}`,
                            labelColor: (opacity = 0.7) => `${COLORS.boldText}`,
                            propsForVerticalLabels: {
                                fontSize: 9,
                                color: '#a2a7b1'
                            },
                            propsForHorizontalLabels: {
                                fontSize: 8,
                            },
                            propsForBackgroundLines: {
                                strokeWidth: 1,
                                stroke: "rgba(223, 227,242,0.4)",
                            },
                            formatYLabel: (y) => Math.abs(y).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
                            formatTopBarValue: (y) => Math.abs(y).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
                        }}
                        verticalLabelRotation={0}
                        withCustomBarColorFromData={true}
                        flatColor={true}
                    />
                </ScrollView>
            </ImageBackground>
        </View>
    )
};


const styles = StyleSheet.create({

    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        padding: 5,
        borderRadius: 5,
        height: 300,
        marginLeft: '6%',
        marginRight: '6%',
        borderWidth: 1,
        borderColor: 'rgba(205, 163, 73, 1)'
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
        color: COLORS.boldText,
        fontSize: 17,
        fontFamily: FONTS.Bold
    }
});