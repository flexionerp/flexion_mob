import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, CUSTOMWIDTH, FONTS, ICONS, SCREENS } from '../constants'
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyStats, getCountList, getReservationList, } from '../redux/property/property.action';


export const OtherStats = ({ navigation }) => {
    const dispatch = useDispatch();
    const { token, isCustomer } = useSelector(state => state.user)
    const { reservationList, totalUnitsCount } = useSelector(state => state.property)
    const [available, setAvailable] = useState([])
    const [booked, setBooked] = useState([]);


    useEffect(() => {
        dispatch(getReservationList(token))
        dispatch(getPropertyStats())
        dispatch(getCountList())
        return () => {
        }
    }, [token])

    useEffect(() => {
        setAvailableUnits()
        return () => {
        }
    }, [totalUnitsCount, reservationList, token])

    const setAvailableUnits = () => {
        let tempcount = totalUnitsCount.filter(({ STATUS }) => STATUS == "PRE_RESERVED" || STATUS == "AVAILABLE" || STATUS == "RELEASED")
        let tempBooked = reservationList.filter(({ STATUS_NAME }) => STATUS_NAME == "Booked")
        setAvailable(tempcount)
        setBooked(tempBooked)
    }


    return (
        <View style={{ width: '85%' }} >
            <View style={styles.container}>
                {booked.length > 199 && <TouchableOpacity disabled={true} onPress={() => navigation.navigate(SCREENS.STATSLISTING, { label: "Total Property", list: reservationList })} style={styles.left} >
                    <Image source={ICONS.propertyTotal} style={{ width: 45, height: 45 }} />
                    <View style={{ alignItems: 'center', marginLeft: 5 }} >
                        {booked.length < 200
                            ?
                            <Text Text style={styles.rightCount}>0</Text>
                            :
                            <Text style={styles.leftCount}>{totalUnitsCount.length}</Text>
                        }
                        <Text style={styles.leftLabel}>TOTAL PROPERTY</Text>
                    </View>
                </TouchableOpacity>
                }
                {available.length != 0 && !isCustomer && <TouchableOpacity disabled={isCustomer} onPress={() => navigation.navigate(SCREENS.DASHBOARDLISTING, { label: "Total Available", list: available })} style={styles.left} >
                        <Image source={ICONS.availableTotal} style={{ width: 45, height: 45 }} />
                        <View style={{ alignItems: 'center', marginLeft: 5 }} >
                            {
                                isCustomer
                                    ?
                                    <Text Text style={styles.rightCount}>0</Text>
                                    :
                                    <Text style={styles.rightCount}>{available.length}</Text>
                            }
                            <Text style={styles.leftLabel}>TOTAL AVAILABLE</Text>
                        </View>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 12
    },
    left: {
        width: CUSTOMWIDTH("41"),
        backgroundColor: COLORS.primary,
        height: 101,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
    },
    right: {
        width: CUSTOMWIDTH("41"),
        height: CUSTOMWIDTH("40"),
        justifyContent: 'space-between'
    },
    top: {
        width: '100%',
        backgroundColor: COLORS.lightBlue,
        height: "26%",
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom: {
        width: '100%',
        backgroundColor: COLORS.lightBlue,
        height: "32%",
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftCount: {
        color: COLORS.secondry,
        fontFamily: FONTS.Bold,
        fontSize: 28
    },
    leftLabel: {
        color: COLORS.secondry,
        fontFamily: FONTS.SemiBold,
        fontSize: 11,

    },
    rightCount: {
        color: COLORS.secondry,
        fontFamily: FONTS.Bold,
        fontSize: 28
    },
    rightLabel: {
        color: "#354052",
        fontFamily: FONTS.Bold,
        fontSize: 10,
        marginLeft: '10%'
    }
})