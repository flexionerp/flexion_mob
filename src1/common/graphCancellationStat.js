import React, { useEffect, useState, } from 'react'
import {
    BarChart
} from "react-native-chart-kit";
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native'
import { COLORS, FONTS, ICONS } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getCancellationStats } from '../redux/property/property.action';
import _ from 'underscore'

const colorsArray = [
    (opacity = 1) => `#8BD7BB`,
    (opacity = 1) => `#243664`,
    (opacity = 1) => `#8BD7BB`,
    (opacity = 1) => `#243664`,
    (opacity = 1) => `#8BD7BB`,
    (opacity = 1) => `#243664`,
    (opacity = 1) => `#8BD7BB`,
    (opacity = 1) => `#243664`,
    (opacity = 1) => `#8BD7BB`,
    (opacity = 1) => `#243664`,
    (opacity = 1) => `#8BD7BB`,
    (opacity = 1) => `#243664`,
];

export const GraphCancellationStat = ({ }) => {
    const [label, setLabel] = useState([]);
    const [data, setData] = useState([]);
    const [colors, setColors] = useState([]);
    const dispatch = useDispatch();
    const cancelDataStats = useSelector(state => state.property.cancelDataStats)

    useEffect(() => {
        dispatch(getCancellationStats())
        return () => {

        }
    }, [])

    useEffect(() => {
        testGrouping();
        // let tempLabel = [];
        // let tempdata = [];
        // let tempColors = [];
        // // const grouped = _.groupBy(cancelDataStats, element => element[`'ALL'`]);
        // // console.log(grouped["MONTHLY"]);

        // cancelDataStats.forEach((element, index) => {
        //     tempLabel.push(element[`'ALL'`]);
        //     tempdata.push(element.SALEVALUE == null ? 0 : element.SALEVALUE);
        //     tempColors.push(colorsArray[index]);
        // });
        // setLabel(tempLabel)
        // setData(tempdata)
        // setColors(tempColors)
        return () => {

        }
    }, [cancelDataStats])

    const testGrouping = () => {
        let groupdData = cancelDataStats.reduce((agg, curr) => {
            let found = agg.find((x) => x[`'ALL'`] === curr[`'ALL'`]);
            if (found) {
                found.SALEVALUES.push(curr.SALEVALUE);
            }
            else {
                agg.push({
                    "'ALL'": curr[`'ALL'`],
                    SALEVALUES: [curr.SALEVALUE]
                });
            }
            return agg;
        }, []);
        let tempLabel = [];
        let tempdata = [];
        let tempColors = [];
        groupdData.forEach((element, index) => {
            tempLabel.push(element[`'ALL'`]);
            tempdata.push(element.SALEVALUES.reduce((a, b) => a + b, 0));
            tempColors.push(colorsArray[index]);
        });
        setLabel(tempLabel)
        setData(tempdata)
        setColors(tempColors)
    }


    return (
        <View style={{ marginTop: 16 }} >
            <View style={styles.card}>
                <View style={styles.labelRow}>
                    <Text style={styles.request} >CANCELLATIONS</Text>
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
                        width={wp(90)}
                        height={240}
                        showValuesOnTopOfBars={true}
                        showBarTops={false}

                        chartConfig={{
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: "#ffffff",
                            backgroundGradientTo: "#ffffff",
                            barPercentage: 0.15,
                            barRadius: 3,
                            decimalPlaces: 0,
                            color: (opacity = 1) => `#787389`,
                            labelColor: (opacity = 0.7) => `#787389`,
                            propsForVerticalLabels: {
                                fontSize: 9,
                                color: '#a2a7b1'
                            },
                            propsForHorizontalLabels: {
                                fontSize: 7.5,
                            },
                            propsForBackgroundLines: {
                                strokeWidth: 1,
                                stroke: "rgba(223, 227,242,0.9)",
                            },
                            formatYLabel: (y) => Math.abs(y).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
                            formatTopBarValue: (y) => Math.abs(y).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
                        }}
                        verticalLabelRotation={0}
                        withCustomBarColorFromData={true}
                        flatColor={true}

                    />
                </ScrollView>
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
        backgroundColor: COLORS.secondry,
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
