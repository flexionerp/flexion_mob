import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Platform, Alert, Button } from "react-native";
import messaging, { firebase } from "@react-native-firebase/messaging";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useFocusEffect } from "@react-navigation/native";
import { FONTS, ICONS, Url, SCREEN_WIDTH, COLORS, SCREENS } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { StatsRow } from "../../../common/statsRow";
import React, { useState, useEffect } from "react";
import { BtnLIM } from "../../../common/btnLIM";
import { BtnLI } from "../../../common/btnLI";
import notifee from "@notifee/react-native";
import axios from "axios";
import { BackButton } from "../../../common/backButton";
import Feather from "react-native-vector-icons/Feather";

import {
  getReservationList,
  getPropertyStats,
  getCollections,
  getMonthlyStats,
  getCancellationStats,
  getSaleSummeryStats,
  getCustomerReceivable,
  getSaleTowerAStats,
  getSaleTowerBStats,
  getDuesCount,
  getHomelist,
} from "../../../redux/property/property.action";

const PieChart = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const {
    reservationList,
    customerReceivableList,
    propertyStats,
    monthlyStats,
    cancelDataStats,
    saleSummeryStats,
    collections,
    saleSummeryTowerAStats,
    saleSummeryTowerBStats,
    totalDuesCount,
    totalUnitsCount,
    homeList,
  } = useSelector((state) => state.property);

  const { token, userDetail, isCustomer } = useSelector((state) => state.user);
  const [reserve, setReserve] = useState([]);
  const [preReserve, setPreResrve] = useState([]);
  const [booked, setBooked] = useState([]);
  const [sale, setSale] = useState(0);
  const [cancellation, setCancellation] = useState(0);
  const [saleSummery, setSaleSummery] = useState(0);
  const [saleCount, setSaleCount] = useState(0);
  const [saleSummeryA, setSaleSummeryA] = useState(0);
  const [saleSummeryB, setSaleSummeryB] = useState(0);
  const [collectionsCount, setCollectionsCount] = useState(0);
  const [dues, setDues] = useState(0);
  const [notReleased, setNotReleased] = useState([]);
  const [cancelllation, setCancelllation] = useState([]);
  const [available, setAvailable] = useState([]);

  useEffect(() => {
    let cid = isCustomer ? userDetail.CUSTOMERID : 0;
    dispatch(getCustomerReceivable(token, cid));
    dispatch(getReservationList(token));
    dispatch(getHomelist(token, userDetail.LOGIN_NAME));
    dispatch(getPropertyStats());
    dispatch(getMonthlyStats());
    dispatch(getCancellationStats());
    dispatch(getSaleSummeryStats());
    dispatch(getCollections());
    dispatch(getSaleTowerAStats());
    dispatch(getSaleTowerBStats());
    dispatch(getDuesCount(token));
    setCount();
    setCancelCount();
    setSaleSummeryCount();
    setCollectionCount();
    setSaleSummeryCountA();
    setSaleSummeryCountB();
    setDueCount();
    return () => {};
  }, []);

  useEffect(() => {
    setCount();
    setCancelCount();
    setSaleSummeryCount();
    setCollectionCount();
    setSaleSummeryCountA();
    setSaleSummeryCountB();
    setDueCount();
    return () => {};
  }, [monthlyStats, cancelDataStats, saleSummeryStats, collections, saleSummeryTowerAStats, saleSummeryTowerBStats, totalDuesCount]);

  useEffect(() => {
    setNotReleasedUnits();
    return () => {};
  }, [totalUnitsCount]);

  const setNotReleasedUnits = () => {
    let tempcount = totalUnitsCount.filter(({ STATUS }) => STATUS == "NOT RELEASED");
    setNotReleased(tempcount);
  };

  const setDueCount = () => {
    let tempdata = 0;
    totalDuesCount.forEach(({ TOTAL }) => {
      tempdata = tempdata + TOTAL;
    });
    setDues(tempdata.toFixed(2));
  };

  const setCount = () => {
    let tempdata = 0;
    monthlyStats.forEach((element) => {
      tempdata = tempdata + element.y;
    });
    setSale(tempdata);
  };

  const setCancelCount = () => {
    let tempdata = 0;
    cancelDataStats.forEach((element, index) => {
      if (element[`'ALL'`] == "ALL") {
        tempdata = tempdata + element.SALEVALUE;
      }
    });
    setCancellation(tempdata);
  };

  const setSaleSummeryCount = () => {
    let tempdata1 = 0;
    let tempdata2 = 0;
    saleSummeryStats.forEach((element) => {
      if (element.STATUS_NAME == "All") {
        tempdata1 = tempdata1 + element.SALEVALUE;
        tempdata2 = tempdata2 + element.COUNT;
      }
    });
    setSaleSummery(tempdata1);
    setSaleCount(tempdata2);
  };

  const setSaleSummeryCountA = () => {
    let tempdata = 0;
    saleSummeryTowerAStats.forEach((element) => {
      if (element.STATUS_NAME == "All") {
        tempdata = tempdata + element.SALEVALUE;
      }
    });
    setSaleSummeryA(tempdata);
  };
  const setSaleSummeryCountB = () => {
    let tempdata = 0;
    saleSummeryTowerBStats.forEach((element) => {
      if (element.STATUS_NAME == "All") {
        tempdata = tempdata + element.SALEVALUE;
      }
    });
    setSaleSummeryB(tempdata);
  };
  const setCollectionCount = () => {
    let tempdata = 0;
    collections.forEach((element) => {
      if (element.TYPE == "All") {
        tempdata = tempdata + element.AMOUNT;
      }
    });
    setCollectionsCount(tempdata);
  };

  useEffect(() => {
    setPreResrve([]);
    setReserve([]);
    setBooked([]);
    setCancelllation([]);
    reservationList.forEach((element) => {
      if (element.STATUS_NAME == "Pre-Reserved") {
        setPreResrve((pre) => [...pre, element]);
      }
      if (element.STATUS_NAME == "Reserved") {
        setReserve((pre) => [...pre, element]);
      }
      if (element.STATUS_NAME == "Booked") {
        setBooked((pre) => [...pre, element]);
      }
      if (element.STATUS_NAME == "Reservation cancellation in progress") {
        setCancelllation((pre) => [...pre, element]);
      }
    });
    return () => {};
  }, [reservationList]);

  useEffect(() => {
    setAvailableUnits();
    return () => {};
  }, [totalUnitsCount, reservationList, token]);

  const setAvailableUnits = () => {
    let tempcount = totalUnitsCount.filter(({ STATUS }) => STATUS == "PRE_RESERVED" || STATUS == "AVAILABLE" || STATUS == "RELEASED");
    setAvailable(tempcount);
    // console.log("Find Retail here", tempcount);
  };

  const calculateTotalSaleValue = () => {
    let totalSaleValue = 0;
    totalUnitsCount.forEach((unit) => {
      if (unit.PRICE_VALUE) {
        totalSaleValue += unit.PRICE_VALUE;
      }
    });
    return totalSaleValue.toFixed(2);
  };

  // const calculateTotalSaleValue = () => {
  //   let totalSaleValue = 0;
  //   totalUnitsCount.forEach((unit) => {
  //     // Assuming SALE_VALUE is a property of the unit object
  //     if (unit.PRICE_VALUE) {
  //       // Remove commas from SALE_VALUE and convert it to a number
  //       const saleValue = Number(unit.PRICE_VALUE.replace(/,/g, ""));
  //       totalSaleValue += saleValue;
  //     }
  //   });
  //   return totalSaleValue.toFixed(2);
  // };

  return (
    <ImageBackground source={ICONS.bgImg} style={styles.container}>
      <SafeAreaView style={styles.main}>
        <BackButton navigation={navigation} label="Charts" />
        <ScrollView style={{ width: "100%" }}>
          <View style={{ width: "100%", alignItems: "center" }}>
            {/* Sale */}
            <View style={{ width: "90%", justifyContent: "center", alignItems: "center" }}>
              <View style={{ marginTop: RFPercentage(2), flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.7), fontFamily: FONTS.SemiBold }}>Sale</Text>
                <Feather name="corner-right-down" style={{ top: RFPercentage(0.5), marginHorizontal: RFPercentage(0.6), fontSize: RFPercentage(2.8) }} color={"#06143b"} />
              </View>

              <View
                style={{
                  width: RFPercentage(27),
                  height: RFPercentage(27),
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#DCDCDC",
                  borderWidth: RFPercentage(0.4),
                  borderRadius: RFPercentage(30),
                  marginTop: RFPercentage(2),
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => navigation.navigate(SCREENS.GRAPH, { title: "Sale" })}
                  style={{
                    width: RFPercentage(25),
                    height: RFPercentage(25),
                    borderRadius: RFPercentage(100),
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: "#DCDCDC",
                  }}
                >
                  <Text style={{ marginTop: RFPercentage(6), color: COLORS.boldText, fontSize: RFPercentage(3), fontFamily: FONTS.Medium }}>
                    {saleCount && saleCount.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </Text>
                  <Text style={{ marginTop: RFPercentage(2), color: COLORS.boldText, fontSize: RFPercentage(2.5), fontFamily: FONTS.Medium }}>
                    {saleSummery &&
                      Math.abs(saleSummery)
                        .toFixed(1)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </Text>
                  <Text style={{ marginTop: RFPercentage(0), color: COLORS.boldText, fontSize: RFPercentage(2.5), fontFamily: FONTS.Medium }}>AED</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Collection */}
            <View style={{ width: "90%", justifyContent: "center", alignItems: "center" }}>
              <View style={{ marginTop: RFPercentage(3), flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.7), fontFamily: FONTS.SemiBold }}>Collection</Text>
                <Feather name="corner-right-down" style={{ top: RFPercentage(0.5), marginHorizontal: RFPercentage(0.6), fontSize: RFPercentage(2.8) }} color={"#06143b"} />
              </View>
              <View
                style={{
                  width: RFPercentage(27),
                  height: RFPercentage(27),
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#B0E0E6",
                  borderWidth: RFPercentage(0.5),
                  borderRadius: RFPercentage(30),
                  marginTop: RFPercentage(2),
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate(SCREENS.GRAPH, { title: "Collection" })}
                  activeOpacity={0.6}
                  style={{
                    width: RFPercentage(25),
                    height: RFPercentage(25),
                    borderRadius: RFPercentage(100),
                    justifyContent: "center",
                    alignItems: "center",

                    backgroundColor: "#B0E0E6",
                  }}
                >
                  <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.5), fontFamily: FONTS.Medium }}>
                    {collectionsCount &&
                      Math.abs(collectionsCount)
                        .toFixed(1)
                        .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </Text>
                  <Text style={{ marginTop: RFPercentage(0), color: COLORS.boldText, fontSize: RFPercentage(2.5), fontFamily: FONTS.Medium }}>AED</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Inventory */}
            <View style={{ width: "90%", justifyContent: "center", alignItems: "center" }}>
              <View style={{ marginTop: RFPercentage(3), flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.7), fontFamily: FONTS.SemiBold }}>Inventory</Text>
                <Feather name="corner-right-down" style={{ top: RFPercentage(0.5), marginHorizontal: RFPercentage(0.6), fontSize: RFPercentage(2.8) }} color={"#06143b"} />
              </View>
              <View
                style={{
                  width: RFPercentage(27),
                  height: RFPercentage(27),
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#B0C4DE",
                  borderWidth: RFPercentage(0.5),
                  borderRadius: RFPercentage(30),
                  marginTop: RFPercentage(2),
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate(SCREENS.GRAPH, { title: "Inventory" })}
                  activeOpacity={0.6}
                  style={{
                    width: RFPercentage(25),
                    height: RFPercentage(25),
                    borderRadius: RFPercentage(100),
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: "#B0C4DE",
                  }}
                >
                  <Text style={{ marginTop: RFPercentage(6), color: COLORS.boldText, fontSize: RFPercentage(3), fontFamily: FONTS.Medium }}>{totalUnitsCount.length}</Text>
                  <Text style={{ marginTop: RFPercentage(2), color: COLORS.boldText, fontSize: RFPercentage(2.5), fontFamily: FONTS.Medium }}>{calculateTotalSaleValue()}</Text>
                  <Text style={{ marginTop: RFPercentage(0), color: COLORS.boldText, fontSize: RFPercentage(2.5), fontFamily: FONTS.Medium }}>AED</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Dues */}
            <View style={{ width: "90%", justifyContent: "center", alignItems: "center" }}>
              <View style={{ marginTop: RFPercentage(3), flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.7), fontFamily: FONTS.SemiBold }}>Dues</Text>
                <Feather name="corner-right-down" style={{ top: RFPercentage(0.5), marginHorizontal: RFPercentage(0.6), fontSize: RFPercentage(2.8) }} color={"#06143b"} />
              </View>
              <View
                style={{
                  width: RFPercentage(27),
                  height: RFPercentage(27),
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#F0FFF0",
                  borderWidth: RFPercentage(0.5),
                  borderRadius: RFPercentage(30),
                  marginTop: RFPercentage(2),
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate(SCREENS.GRAPH, { title: "Dues" })}
                  activeOpacity={0.6}
                  style={{
                    width: RFPercentage(25),
                    height: RFPercentage(25),
                    borderRadius: RFPercentage(100),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F0FFF0",
                  }}
                >
                  {/* <Text style={{ marginTop: RFPercentage(6), color: COLORS.boldText, fontSize: RFPercentage(3), fontFamily: FONTS.Medium }}>999</Text> */}
                  <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.5), fontFamily: FONTS.Medium }}>
                    {Math.abs(dues)
                      .toFixed(1)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </Text>
                  <Text style={{ marginTop: RFPercentage(0), color: COLORS.boldText, fontSize: RFPercentage(2.5), fontFamily: FONTS.Medium }}>AED</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: RFPercentage(15) }} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default PieChart;

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
    fontSize: 23,
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
