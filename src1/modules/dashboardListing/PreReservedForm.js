import { StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, CUSTOMWIDTH, FONTS, } from '../../constants'
import Header from '../../common/HeaderB'
import { DropDownSingle } from '../../common/dropDownColoredSingle'
import { CustomInput } from '../../common/customInput'
import { RegularBtn } from '../../common/regularBtn'
import { useSelector, useDispatch } from 'react-redux'
import { getCustomersList, getBrokerList, insertPreReservation } from "../../redux/property/property.action";
import { setLoader } from '../../redux/loader/loader.action'
import moment from 'moment'

const PreReservedForm = ({ navigation, route }) => {
    const { unit_id } = route.params
    const dispatch = useDispatch();
    const { customersList, unitDetail, paymentPlan, agent, broker } = useSelector(state => state.property)
    const { loader } = useSelector(state => state.loader)
    const { token } = useSelector(state => state.user)
    const [customer, setCustomer] = useState(null)
    const [customerId, setCustomerId] = useState(null)
    const [payPlan, setPaymentPlan] = useState(null)
    const [payPlanId, setPaymentPlanId] = useState(null)
    const [agentName, setAgentName] = useState(null)
    const [agentId, setAgentId] = useState(null)
    const [brokerName, setBrokerName] = useState(null)
    const [brokerId, setBrokerId] = useState(null)
    const [reserveDate, setReserveDate] = useState(new Date());
    const [percent, setPercent] = useState(100);
    const [price, setPrice] = useState(0);
    const [saleValue, setSaleValue] = useState(0);

    useEffect(() => {
        dispatch(getCustomersList())
        let data = {
            unit_id: unit_id,
            USER_INFO_ID: token
        }
        dispatch(getBrokerList(data))
        return () => {

        }
    }, [])
    useEffect(() => {

        if (unitDetail) {
            let ptype = unitDetail.PRICE_TYPE.replace(/\s/g, '')
            let result = calSaleValue(ptype)
            setPrice(result.actual_price)
            setSaleValue(result.sale_val)
        }
        return () => {

        }
    }, [unitDetail])

    const getCustomer = (value, id) => {
        setCustomer(value)
        setCustomerId(id)
    }

    const getPaymentPlan = (value, id) => {
        setPaymentPlan(value)
        setPaymentPlanId(id)
    }

    const getBroker = (value, id) => {
        setBrokerName(value)
        setBrokerId(id)
    }

    const getAgent = (value, id) => {
        setAgentName(value)
        setAgentId(id)
    }

    const apiHit = () => {
        if (customerId == null) {
            alert("Please select customer");
            return;
        }
        if (payPlan == null) {
            alert("Please select payment plan");
            return;
        }
        if (parseInt(percent) < 1 || parseInt(percent) > 100) {
            alert("Customer percentage should be within 1 to 100");
            return;
        }
        let ptype = unitDetail.PRICE_TYPE.replace(/\s/g, '')
        let result = calSaleValue(ptype)
        let data = {
            pre_res_dt: reserveDate,
            sale_val: result.sale_val,
            unit_id: unitDetail.UNIT_ID,
            price: ptype == "SQFT" ? unitDetail.PRICE_VALUE : result.actual_price,
            payment_plan: payPlanId,
            agent: agentId,
            broker: brokerId,
            USER_INFO_ID: token,
            Per: percent,
            Customer_ID: customerId,
            PROPERTY_ID: unitDetail.PROPERTY_ID,
            UNIT_SPECS_ID: unitDetail.UNIT_SPECS_ID,
            PRICE_TYPE: unitDetail.PRICE_TYPE
        }
        dispatch(setLoader(true))
        dispatch(insertPreReservation(data, navigation))
    }

    const calSaleValue = (ptype) => {
        let sale_val = 0
        let actual_price = 0
        if (ptype == "SQFT") {
            sale_val = (unitDetail.GROSS_AREA * unitDetail.PRICE_VALUE).toFixed(2)
        } else if (ptype == "LUMPSUM") {
            sale_val = unitDetail.PRICE_VALUE
            actual_price = (unitDetail.PRICE_VALUE / unitDetail.GROSS_AREA).toFixed(2)
        }
        let data = {
            sale_val: sale_val,
            actual_price: actual_price
        }
        return data;
    }



    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} label="Pre-Reserved" />
            {
                loader
                    ?
                    <ActivityIndicator color={COLORS.primary} size="small" />
                    :
                    <View style={{ flex: 1, width: '100%', alignItems: 'center' }} >
                        <ScrollView style={{ width: '100%' }} contentContainerStyle={{ width: '100%', alignItems: 'center' }} >
                            <View style={styles.bottom}>
                                <View style={{ height: 20 }} />
                                <View style={{ width: '100%', marginBottom: 16 }}>
                                    <Text style={styles.labelStyle}>Pre Reservation Date</Text>
                                    <View style={styles.dateStyle}>
                                        <Text style={styles.valueStyle} >{moment(reserveDate).format('DD MMM, YYYY')}</Text>
                                    </View>
                                </View>

                                <View style={{ width: '100%', marginBottom: 16 }}>
                                    <Text style={styles.labelStyle}>Unit Code</Text>
                                    <View style={styles.dateStyle}>
                                        <Text style={styles.valueStyle} >{unitDetail && unitDetail.UNIT_CODE.toString()}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', marginBottom: 16 }}>
                                    <Text style={styles.labelStyle}>Area</Text>
                                    <View style={styles.dateStyle}>
                                        <Text style={styles.valueStyle} >{unitDetail && unitDetail.GROSS_AREA.toString()}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', marginBottom: 16 }}>
                                    <Text style={styles.labelStyle}>Price Type</Text>
                                    <View style={styles.dateStyle}>
                                        <Text style={styles.valueStyle} >{unitDetail && unitDetail.PRICE_TYPE}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', marginBottom: 16 }}>
                                    <Text style={styles.labelStyle}>Price</Text>
                                    <View style={styles.dateStyle}>
                                        <Text style={styles.valueStyle} >{price}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', marginBottom: 16 }}>
                                    <Text style={styles.labelStyle}>Sale Price</Text>
                                    <View style={styles.dateStyle}>
                                        <Text style={styles.valueStyle} >{saleValue}</Text>
                                    </View>
                                </View>

                                <View style={{ width: '100%', marginBottom: 16 }}>
                                    <DropDownSingle
                                        name={customer}
                                        data={customersList}
                                        getValue={getCustomer.bind(this)}
                                        label="Customer"
                                    />
                                </View>
                                <View style={{ width: '100%', marginBottom: 16 }}>
                                    <DropDownSingle
                                        name={payPlan}
                                        data={paymentPlan}
                                        getValue={getPaymentPlan.bind(this)}
                                        label="Payment Plan"
                                    />
                                </View>
                                <View style={{ width: '100%', marginBottom: 16 }}>
                                    <DropDownSingle
                                        name={brokerName}
                                        data={broker}
                                        getValue={getBroker.bind(this)}
                                        label="Broker"
                                    />
                                </View>
                                <View style={{ width: '100%', marginBottom: 16 }}>
                                    <DropDownSingle
                                        name={agentName}
                                        data={agent}
                                        getValue={getAgent.bind(this)}
                                        label="Agent"
                                    />
                                </View>
                                <CustomInput
                                    label="Customer Percentage"
                                    placeholder='Enter Percentage'
                                    value={percent.toString()}
                                    getValue={setPercent.bind(this)}
                                    keyboardType={'number-pad'}
                                />
                            </View>
                            <View style={{ height: 20 }} />

                            {
                                loader
                                    ?
                                    <ActivityIndicator color={COLORS.primary} size="small" />
                                    :
                                    <RegularBtn
                                        label={"Save + Next"}
                                        size={'90%'}
                                        bgColor={COLORS.primary}
                                        onClick={() => apiHit()}
                                    />
                            }

                            <View style={{ height: 80 }} />
                        </ScrollView>
                    </View>
            }
        </SafeAreaView>
    )
}

export default PreReservedForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondry,
        alignItems: 'center'
    },
    bottom: {
        width: '90%',
        alignItems: 'center'
    },
    labelStyle: {
        width: '100%',
        color: COLORS.primary,
        fontSize: CUSTOMWIDTH('4'),
        fontFamily: FONTS.SemiBold,
        marginBottom: 6,
    },
    dateStyle: {
        width: "100%",
        height: 45,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: COLORS.primary,
        borderRadius: 4,
        justifyContent: 'center'
    },
    valueStyle: {
        color: COLORS.primary,
        fontSize: 12,
        fontFamily: FONTS.Regular
    }
})