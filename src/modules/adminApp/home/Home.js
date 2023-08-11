import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Platform } from "react-native";
import React, { useState, useEffect } from "react";
import { FONTS, ICONS } from "../../../constants";
import { StatsRow } from "../../../common/statsRow";
import { BtnLI } from "../../../common/btnLI";
import { BtnLIM } from "../../../common/btnLIM";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyStats, getCountList, getReservationList, getMonthlyStats } from "../../../redux/property/property.action";

const CustomerDetail = () => {
  const { userDetail } = useSelector((state) => state.user);
  return (
    <View style={styles.customerContainer}>
      <Text style={styles.hello}>Hello,</Text>
      <Text style={styles.customerName}>{userDetail && userDetail.FIRST_NAME + " " + userDetail.LAST_NAME}!</Text>
    </View>
  );
};

const UnitCount = ({ count, label, disabled, onClick }) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={() => onClick()} style={styles.unitContainer}>
      <Text style={styles.customerName}>{count}</Text>
      <Text style={styles.unitText}>{label}</Text>
      {disabled ? <View style={{ width: 20, height: 20 }} /> : <Image source={ICONS.nextArrow} style={{ width: 20, height: 20 }} resizeMode="contain" />}
    </TouchableOpacity>
  );
};

const Home = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { reservationList, totalUnitsCount } = useSelector((state) => state.property);
  const [available, setAvailable] = useState([]);

  useEffect(() => {
    dispatch(getReservationList(token));
    dispatch(getPropertyStats());
    dispatch(getCountList());
    dispatch(getMonthlyStats());
    return () => {};
  }, [token]);

  useEffect(() => {
    setAvailableUnits();
    return () => {};
  }, [totalUnitsCount, reservationList, token]);

  const setAvailableUnits = () => {
    let tempcount = totalUnitsCount.filter(({ STATUS }) => STATUS == "PRE_RESERVED" || STATUS == "AVAILABLE" || STATUS == "RELEASED");
    setAvailable(tempcount);
  };

  return (
    <ImageBackground source={ICONS.bgImg} style={styles.container}>
      <SafeAreaView style={styles.main}>
        {/* <Text>{token}</Text> */}
        <ScrollView style={{ width: "100%" }}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <CustomerDetail />
            <UnitCount count={totalUnitsCount.length} label="Total Properties" disabled={true} />
            {/* <UnitCount count={available.length} label="Total Available" disabled={false} onClick={() => navigation.navigate("DashboardListing", { label: "Total Available", list: available })} /> */}
            <UnitCount count={available.length} label="Total Available" disabled={false} onClick={() => navigation.navigate("TotalAvailable")} />
            <View style={{ height: 8 }} />
            <StatsRow navigation={navigation} />
            <View style={{ width: "90%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", marginTop: 12 }}>
              <BtnLI lable={`Create\nCustomer`} size={"48%"} onClick={() => navigation.navigate("Customer")} icon={ICONS.createC} />
              <BtnLI lable={"Receipt"} size={"48%"} onClick={() => navigation.navigate("ReceiptListing")} icon={ICONS.unit} />
              <BtnLI lable={`Broker\nCommission`} size={"48%"} onClick={() => navigation.navigate("CommissionList")} icon={ICONS.brokerCommisson} />
              <BtnLI lable={`Customer\nReceivable`} size={"48%"} onClick={() => navigation.navigate("CustomerReceivable")} icon={ICONS.generatePayLink} />
              <BtnLI lable={`Receivable\nBby Unit`} size={"48%"} onClick={() => navigation.navigate("ReceiveableByUnit")} icon={ICONS.generatePayLink} />
              <BtnLI lable={`Power BI`} size={"48%"} onClick={() => navigation.navigate("PowerBI")} icon={ICONS.createC} />
              <BtnLI lable={`Price Setup`} size={"48%"} onClick={() => navigation.navigate("PriceSetup")} icon={ICONS.createC} />
            </View>

            <View style={{ height: Platform.OS == "ios" ? 60 : 90 }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  main: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  customerContainer: {
    width: "90%",
    height: 70,
    // borderWidth: 1,
    // borderColor: '#CDA349',
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginTop: 12,
  },
  hello: {
    color: "#204866",
    fontFamily: FONTS.Medium,
    fontSize: 16,
    marginTop: 8,
  },
  unitContainer: {
    width: "90%",
    height: 70,
    borderWidth: 1,
    borderColor: "#CDA349",
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  hello: {
    color: "#204866",
    fontFamily: FONTS.Medium,
    fontSize: 16,
    marginTop: 8,
  },
  customerName: {
    color: "#204866",
    fontFamily: FONTS.Bold,
    fontSize: 24,
  },
  unitText: {
    width: "75%",
    marginHorizontal: 12,
    color: "#204866",
    fontFamily: FONTS.Medium,
    fontSize: 15,
  },
  statsContainer: {
    width: "48%",
    height: 72,
    borderWidth: 1,
    borderColor: "#CDA349",
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginTop: 12,
  },
  statsLabel: {
    color: "#204866",
    fontFamily: FONTS.Medium,
    fontSize: 14,
    marginTop: 8,
  },
  statsValue: {
    color: "#204866",
    fontFamily: FONTS.Bold,
    fontSize: 20,
  },
});
