import { StyleSheet, Text, View, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, CUSTOMWIDTH, FONTS } from "../../../constants";
import { DropDownSingle } from "../../../common/dropDownColoredSingle";
import { CustomInput } from "../../../common/customInput";
import { useSelector, useDispatch } from "react-redux";
import { getCustomersList, getBrokerList, insertPreReservation } from "../../../redux/property/property.action";
import { setLoader } from "../../../redux/loader/loader.action";
import moment from "moment";
import { BackButton } from "../../../common/backButton";
import Icon from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
// import CheckBox from "@react-native-community/checkbox";
// import CheckBox from "react-native-check-box";

const PreReservedForm = ({ navigation, route }) => {
  const { unit_id } = route.params;
  const dispatch = useDispatch();
  const { customersList, unitDetail, paymentPlan, agent, broker } = useSelector((state) => state.property);
  const { loader } = useSelector((state) => state.loader);
  const { token } = useSelector((state) => state.user);
  const [payPlan, setPaymentPlan] = useState(null);
  const [payPlanId, setPaymentPlanId] = useState(null);
  const [agentName, setAgentName] = useState(null);
  const [agentId, setAgentId] = useState(null);
  const [brokerName, setBrokerName] = useState(null);
  const [brokerId, setBrokerId] = useState(null);
  const [reserveDate, setReserveDate] = useState(new Date());
  const [price, setPrice] = useState(0);
  const [saleValue, setSaleValue] = useState(0);

  //New Code
  const [percent, setPercent] = useState(100); // Initial value of percent state
  const [addCustomerClicked, setAddCustomerClicked] = useState(false);

  const [customerId, setCustomerId] = useState(null);

  const [customer, setCustomer] = useState(null);

  const [customerData, setCustomerData] = useState([{ name: "", percentage: 100 }]);

  const [primaryCustomerIndex, setPrimaryCustomerIndex] = useState(0);

  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectedPercentages, setSelectedPercentages] = useState([]);

  // const handleButtonPress = () => {
  //   if (customerData.length >= 2) {
  //     // Display an alert if maximum customer limit is reached
  //     alert("Cannot Add More Than Two Customers.");
  //   } else {
  //     setLoader(true);

  //     setTimeout(() => {
  //       const numCustomers = customerData.length;
  //       const newPercent = percent / (numCustomers + 1); // +1 for the new customer

  //       const updatedData = customerData.map((customer) => ({
  //         ...customer,
  //         percentage: newPercent,
  //       }));

  //       const newData = [...updatedData, { name: "", percentage: newPercent }];

  //       setCustomerData(newData);
  //       setAddCustomerClicked(true);

  //       setLoader(false);
  //     }, 1000);
  //   }
  // };

  const handleButtonPress = () => {
    if (customerData.length >= 2) {
      // Display an alert if maximum customer limit is reached
      alert("Cannot Add More Than Two Customers.");
    } else {
      setLoader(true);

      setTimeout(() => {
        const numCustomers = customerData.length;
        const newPercent = percent / (numCustomers + 1); // +1 for the new customer

        const updatedData = customerData.map((customer) => ({
          ...customer,
          percentage: newPercent,
        }));

        const newCustomerId = null; // Modify this with the actual customer ID if available

        const newData = [...updatedData, { name: "", percentage: newPercent, customerId: newCustomerId }];

        setCustomerData(newData);
        setAddCustomerClicked(true);

        const newCustomerIDs = newData.map((customer) => customer.customerId);
        setSelectedCustomers(newCustomerIDs);

        setLoader(false);
      }, 1000);
    }
  };

  const handleCustomInputChange = (index, value) => {
    const newData = [...customerData];
    const totalPercentage = newData.reduce((total, customer, i) => (i !== index ? total + customer.percentage : total), 0);
    const changedValue = parseFloat(value) || 0;
    newData[index].percentage = changedValue;

    const numCustomers = newData.length - 1; // Excluding the changed customer
    const remainingPercentage = 100 - changedValue;
    const equalPercentage = remainingPercentage / numCustomers;

    newData.forEach((customer, i) => {
      if (i !== index) {
        customer.percentage = equalPercentage;
      }
    });

    setCustomerData(newData);
  };

  // const handleCustomerChange = (index, value) => {
  //   const newData = [...customerData];
  //   newData[index].name = value;
  //   setCustomerData(newData);

  //   const updatedSelectedCustomers = [...selectedCustomers];
  //   updatedSelectedCustomers[index] = value;
  //   setSelectedCustomers(updatedSelectedCustomers);
  // };

  const handleCustomerChange = (index, value, customerId) => {
    const newData = [...customerData];
    newData[index].name = value;
    newData[index].customerId = customerId; // Store the customer ID
    setCustomerData(newData);

    const updatedSelectedCustomers = [...selectedCustomers];
    updatedSelectedCustomers[index] = customerId; // Store the customer ID
    setSelectedCustomers(updatedSelectedCustomers);
  };

  const handlePercentageChange = (index, value) => {
    const newValue = parseFloat(value) || 0;

    if (newValue < 1 || newValue > 100) {
      alert("Customer percentage should be within 1 to 100");
      return;
    }

    const newCustomerData = customerData.map((customer, i) => {
      if (i === index) {
        return { ...customer, percentage: newValue };
      } else {
        return customer;
      }
    });

    setCustomerData(newCustomerData);
  };
  const handleRemoveCustomer = (index) => {
    const newData = [...customerData];
    newData.splice(index, 1); // Remove the customer at the specified index

    // Update percentage values for the remaining customers
    const numCustomers = newData.length;
    const equalPercentage = 100 / numCustomers;

    newData.forEach((customer) => {
      customer.percentage = equalPercentage;
    });

    setCustomerData(newData);
  };

  const handlePrimaryCustomerToggle = (index) => {
    setPrimaryCustomerIndex(index);
  };

  // Till Here

  useEffect(() => {
    dispatch(getCustomersList());
    let data = {
      unit_id: unit_id,
      USER_INFO_ID: token,
    };
    dispatch(getBrokerList(data));
    return () => {};
  }, []);
  useEffect(() => {
    if (unitDetail && unitDetail.PRICE_TYPE) {
      let ptype = unitDetail.PRICE_TYPE.replace(/\s/g, "");
      let result = calSaleValue(ptype);
      setPrice(result.actual_price);
      setSaleValue(result.sale_val);
    }
    return () => {};
  }, [unitDetail]);

  const getCustomer = (value, id) => {
    setCustomer(value);
    setCustomerId(id);
  };

  const getPaymentPlan = (value, id) => {
    setPaymentPlan(value);
    setPaymentPlanId(id);
  };

  const getBroker = (value, id) => {
    setBrokerName(value);
    setBrokerId(id);
  };

  const getAgent = (value, id) => {
    setAgentName(value);
    setAgentId(id);
  };

  const apiHit = () => {
    const ptype = unitDetail.PRICE_TYPE.replace(/\s/g, "");
    const result = calSaleValue(ptype);
    // if (customerId == null) {
    //   alert("Please select a customer");
    //   return;
    // }
    // if (payPlan == null) {
    //   alert("Please select a payment plan");
    //   return;
    // }

    // Calculate the selected percentages and customer IDs
    const selectedPercentages = customerData.map((customer) => customer.percentage);
    const selectedCustomerIDs = selectedCustomers.slice(0, 2); // Use the first two selected customers

    if (selectedPercentages.length === 1) {
      // Only one customer, set values for the first customer
      let data = {
        pre_res_dt: reserveDate,
        sale_val: result.sale_val,
        unit_id: unitDetail.UNIT_ID,
        price: ptype == "SQFT" ? unitDetail.PRICE_VALUE : result.actual_price,
        payment_plan: payPlanId,
        agent: agentId,
        broker: brokerId,
        USER_INFO_ID: token,
        PROPERTY_ID: unitDetail.PROPERTY_ID,
        UNIT_SPECS_ID: unitDetail.UNIT_SPECS_ID,
        PRICE_TYPE: unitDetail.PRICE_TYPE,
        Per: selectedPercentages[0],
        Customer_ID: selectedCustomerIDs[0], // Use the first selected customer ID
        Customer_ID1: null,
        Per1: null,
        Customer_ID2: null,
        Per2: null,
      };
      dispatch(setLoader(true));
      dispatch(insertPreReservation(data, navigation));
    } else if (selectedPercentages.length >= 2) {
      // More than one customer, set values for the first two customers
      let data = {
        pre_res_dt: reserveDate,
        sale_val: result.sale_val,
        unit_id: unitDetail.UNIT_ID,
        price: ptype == "SQFT" ? unitDetail.PRICE_VALUE : result.actual_price,
        payment_plan: payPlanId,
        agent: agentId,
        broker: brokerId,
        USER_INFO_ID: token,
        PROPERTY_ID: unitDetail.PROPERTY_ID,
        UNIT_SPECS_ID: unitDetail.UNIT_SPECS_ID,
        PRICE_TYPE: unitDetail.PRICE_TYPE,
        Per: null,
        Customer_ID: null,
        Customer_ID1: selectedCustomerIDs[0], // Use the first selected customer ID
        Per1: selectedPercentages[0],
        Customer_ID2: selectedCustomerIDs[1], // Use the second selected customer ID
        Per2: selectedPercentages[1],
      };
      console.log("Here is the data apiHit", data);
      dispatch(setLoader(true));
      dispatch(insertPreReservation(data, navigation));
    }
  };

  const calSaleValue = (ptype) => {
    let sale_val = 0;
    let actual_price = 0;
    if (ptype == "SQFT") {
      sale_val = (unitDetail.GROSS_AREA * unitDetail.PRICE_VALUE).toFixed(2);
    } else if (ptype == "LUMPSUM") {
      sale_val = unitDetail.PRICE_VALUE;
      actual_price = (unitDetail.PRICE_VALUE / unitDetail.GROSS_AREA).toFixed(2);
    }
    let data = {
      sale_val: sale_val,
      actual_price: actual_price,
    };
    return data;
  };

  // const apiHit = () => {
  //   const ptype = unitDetail.PRICE_TYPE.replace(/\s/g, "");
  //   const result = calSaleValue(ptype);

  //   const data = {
  //     pre_res_dt: reserveDate,
  //     sale_val: result.sale_val,
  //     unit_id: unitDetail.UNIT_ID,
  //     price: ptype === "SQFT" ? unitDetail.PRICE_VALUE : result.actual_price,
  //     payment_plan: payPlanId,
  //     agent: agentId,
  //     broker: brokerId,
  //     USER_INFO_ID: token,
  //     PROPERTY_ID: unitDetail.PROPERTY_ID,
  //     UNIT_SPECS_ID: unitDetail.UNIT_SPECS_ID,
  //     PRICE_TYPE: unitDetail.PRICE_TYPE,
  //     Per: percent,
  //   };

  //   for (let index = 0; index < selectedCustomers.length; index++) {
  //     const customerId = selectedCustomers[index];
  //     const customerPercentage = selectedPercentages[index];

  //     if (customerId == null) {
  //       alert("Please select customer");
  //       return;
  //     }
  //     if (parseInt(customerPercentage) < 1 || parseInt(customerPercentage) > 100) {
  //       alert("Customer percentage should be within 1 to 100");
  //       return;
  //     }

  //     if (index === primaryCustomerIndex) {
  //       data.PrimaryCustomerOneSelected = 1;
  //       data.PrimaryCustomerTwoSelected = 0;
  //     } else if (index === primaryCustomerIndex + 1) {
  //       data.PrimaryCustomerOneSelected = 0;
  //       data.PrimaryCustomerTwoSelected = 1;
  //     }

  //     if (index === 0) {
  //       data.Customer_ID = customerId;
  //       data.Per = customerPercentage;
  //     } else {
  //       data[`Customer_ID${index + 1}`] = customerId;
  //       data[`Per${index + 1}`] = customerPercentage;
  //     }
  //   }

  //   console.log("Here is the data apiHit", data);
  //   dispatch(setLoader(true));
  //   dispatch(insertPreReservation(data, navigation));

  // };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton navigation={navigation} label="Pre-Reservation" />
      {loader ? (
        <ActivityIndicator color={COLORS.primary} size="small" />
      ) : (
        <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
          <ScrollView style={{ width: "100%" }} contentContainerStyle={{ width: "100%", alignItems: "center" }}>
            <View style={styles.bottom}>
              <View style={{ height: 20 }} />
              <View style={{ width: "100%", marginBottom: 16 }}>
                <View style={styles.dateStyle}>
                  <Text style={styles.valueStyle}>{moment(reserveDate).format("DD MMM, YYYY")}</Text>
                </View>
              </View>

              <View style={{ width: "100%", marginBottom: 16 }}>
                <View style={styles.dateStyle}>
                  <Text style={styles.valueStyle}>{unitDetail && unitDetail.UNIT_CODE.toString()}</Text>
                </View>
              </View>
              <View style={{ width: "100%", marginBottom: 16 }}>
                <View style={styles.dateStyle}>
                  <Text style={styles.valueStyle}>{unitDetail && unitDetail.GROSS_AREA.toString()}</Text>
                </View>
              </View>
              <View style={{ width: "100%", marginBottom: 16 }}>
                <View style={styles.dateStyle}>
                  <Text style={styles.valueStyle}>{unitDetail && unitDetail.PRICE_TYPE}</Text>
                </View>
              </View>
              <View style={{ width: "100%", marginBottom: 16 }}>
                <View style={styles.dateStyle}>
                  <Text style={styles.valueStyle}>{price}</Text>
                </View>
              </View>
              <View style={{ width: "100%", marginBottom: 16 }}>
                <View style={styles.dateStyle}>
                  <Text style={styles.valueStyle}>{saleValue}</Text>
                </View>
              </View>
              <View style={{ width: "100%", marginBottom: 16 }}>
                <DropDownSingle name={payPlan} data={paymentPlan} getValue={getPaymentPlan.bind(this)} label="Payment Plan" />
              </View>
              <View style={{ width: "100%", marginBottom: 16 }}>
                <DropDownSingle name={brokerName} data={broker} getValue={getBroker.bind(this)} label="Broker" />
              </View>
              <View style={{ width: "100%", marginBottom: 16 }}>
                <DropDownSingle name={agentName} data={agent} getValue={getAgent.bind(this)} label="Agent" />
              </View>

              {/* <View style={{ marginBottom: 16, width: "100%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <View style={{ width: "70%" }}>
                  <DropDownSingle name={customer} data={customersList} getValue={getCustomer.bind(this)} label="Customer" />
                </View>
                <View style={{ width: "27%", position: "absolute", right: 0, top: 0 }}>
                  <CustomInput
                    width={"100%"}
                    marginFalse={true}
                    label="Customer Percentage"
                    placeholder="Enter Percentage"
                    value={percent.toString()}
                    getValue={setPercent.bind(this)}
                    keyboardType={"number-pad"}
                  />
                </View>
              </View> */}

              {/* {customerData.map((customer, index) => (
                <View key={index} style={{ marginBottom: 16, width: "100%", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                  <View style={{ width: "70%" }}>
                    <DropDownSingle name={customer.name || "Select Customer"} data={customersList} getValue={(value) => handleCustomerChange(index, value)} label="Customer" />
                  </View>
                  <View style={{ width: "27%", position: "absolute", right: 0, top: 0 }}>
                    <CustomInput
                      width={"100%"}
                      marginFalse={true}
                      label="Customer Percentage"
                      placeholder="Enter Percentage"
                      value={customer.percentage.toString() || "100"}
                      onChangeText={(value) => handlePercentageChange(index, value)}
                      keyboardType={"number-pad"}
                      getValue={(value) => handleCustomInputChange(index, value)}
                    />
                  </View>
                </View>
              ))} */}
              {/* {customerData.map((customer, index) => (
                <View
                  key={index}
                  style={{
                    marginBottom: 16,
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <View style={{ width: customerData.length > 1 ? "60%" : "70%" }}>
                    <DropDownSingle name={customer.name || "Select Customer"} data={customersList} getValue={(value) => handleCustomerChange(index, value)} label="Customer" />
                  </View>
                  <View
                    style={{
                      width: customerData.length > 1 ? "25%" : "28%",
                      marginLeft: 8,
                    }}
                  >
                    <CustomInput
                      width={"100%"}
                      marginFalse={true}
                      label="Customer Percentage"
                      placeholder="Enter Percentage"
                      value={customer.percentage.toString() || "100"}
                      onChangeText={(value) => handlePercentageChange(index, value)}
                      keyboardType={"number-pad"}
                      getValue={(value) => handleCustomInputChange(index, value)}
                    />
                  </View>
                  {customerData.length > 1 && (
                    <TouchableOpacity style={{ position: "absolute", right: 0 }} onPress={() => handleRemoveCustomer(index)}>
                      <Entypo name="circle-with-cross" size={20} color="black" />
                    </TouchableOpacity>
                  )}
                </View>
              ))} */}

              {customerData.map((customer, index) => (
                <View
                  key={index}
                  style={{
                    marginBottom: 16,
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    alignSelf: "center",
                  }}
                >
                  <View style={{ width: customerData.length > 1 ? "58%" : "70%" }}>
                    <DropDownSingle name={customer.name || "Select Customer"} data={customersList} getValue={(value, customerId) => handleCustomerChange(index, value, customerId)} label="Customer" />
                  </View>
                  <View
                    style={{
                      width: customerData.length > 1 ? "24%" : "28%",
                      marginLeft: 8,
                      position: customerData.length > 1 ? "absolute" : null,
                      right: customerData.length > 1 ? 55 : null,
                      top: customerData.length > 1 ? 0.1 : null,
                    }}
                  >
                    <CustomInput
                      width={"100%"}
                      marginFalse={true}
                      label="Customer Percentage"
                      placeholder="Enter Percentage"
                      value={customer.percentage.toString() || "100"}
                      onChangeText={(value) => handlePercentageChange(index, value)}
                      keyboardType={"number-pad"}
                      getValue={(value) => handleCustomInputChange(index, value)}
                    />
                  </View>
                  {customerData.length > 1 && (
                    <View style={{ flexDirection: "row", alignItems: "center", position: "absolute", right: 0, top: 15 }}>
                      {customerData.length === 2 && (
                        <TouchableOpacity onPress={() => handlePrimaryCustomerToggle(index)} style={{ flexDirection: "row", marginRight: 8 }}>
                          <View
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 10,
                              borderWidth: 2,
                              borderColor: primaryCustomerIndex === index ? COLORS.borderColor : "black",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {primaryCustomerIndex === index && (
                              <View
                                style={{
                                  width: 12,
                                  height: 12,
                                  borderRadius: 6,
                                  backgroundColor: COLORS.borderColor,
                                }}
                              />
                            )}
                          </View>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity onPress={() => handleRemoveCustomer(index)}>
                        <Entypo name="circle-with-cross" size={20} color="black" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
              {customerData.length > 1 ? <Text style={[styles.btnText, { alignSelf: "flex-start" }]}>Kindly Check atleast one Primary Customer </Text> : null}
              {/* {customerData.length > 1 ? <Text style={[styles.btnLabel, { alignSelf: "flex-start" }]}>Kindly Check the Primary Customer {primaryCustomerIndex}</Text> : null} */}
            </View>

            <View style={{ height: 10 }} />
            {loader ? (
              <ActivityIndicator color={COLORS.primary} size="small" />
            ) : (
              <TouchableOpacity onPress={handleButtonPress} style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: "90%" }}>
                <Text style={styles.btnLabel}>Add Customer</Text>
                <Icon name="plus" size={14} />
              </TouchableOpacity>
            )}
            {console.log(
              "selectedPercentages",
              customerData.map((customer) => customer.percentage),
            )}

            {console.log("selectedCustomers", selectedCustomers)}

            <View style={{ height: 20 }} />
            {loader ? (
              <ActivityIndicator color={COLORS.primary} size="small" />
            ) : (
              <TouchableOpacity onPress={() => apiHit()} style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.btnLabel}>Submit</Text>
                <Icon name="arrow-right" size={14} />
              </TouchableOpacity>
            )}
            <View style={{ height: 80 }} />
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PreReservedForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondry,
    alignItems: "center",
  },
  bottom: {
    width: "90%",
    alignItems: "center",
  },
  labelStyle: {
    width: "100%",
    color: COLORS.primary,
    fontSize: CUSTOMWIDTH("4"),
    fontFamily: FONTS.SemiBold,
    marginBottom: 6,
  },
  dateStyle: {
    width: "100%",
    height: 50,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    borderRadius: 15,
    justifyContent: "center",
  },
  valueStyle: {
    color: "#9CBBD2",
    fontSize: 12,
    fontFamily: FONTS.Regular,
  },
  btnLabel: {
    color: COLORS.boldText,
    fontSize: 14,
    fontFamily: FONTS.SemiBold,
    marginRight: 6,
  },
  btnText: {
    width: "90%",
    color: "#9CBBD2",
    fontFamily: FONTS.Regular,
    fontSize: 14,
  },
});
