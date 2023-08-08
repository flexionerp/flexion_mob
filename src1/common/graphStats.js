import React, { useEffect, useState } from 'react'
import {
    LineChart,
    PieChart
} from "react-native-chart-kit";
import { StyleSheet, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

const data = [
    {
        name: "Booked",
        population: 1000,
        color: "#243664",
        legendFontColor: "#787389",
        legendFontSize: 12
    },
    {
        name: "Reserved",
        population: 400,
        color: "#C3DBFF",
        legendFontColor: "#787389",
        legendFontSize: 12
    },
    {
        name: `Pre Reserved`,
        population: 600,
        color: "#8BD7BB",
        legendFontColor: "#787389",
        legendFontSize: 12
    },
];


export const GraphStats = ({ revenue }) => {


    return (
        <View style={styles.card}>
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
    )
}


const styles = StyleSheet.create({

    card: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    }
})
