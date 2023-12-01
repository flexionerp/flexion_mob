import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, CUSTOMWIDTH, FONTS, ICONS, SCREENS } from "../constants";
import { useDispatch, useSelector } from "react-redux";
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
} from "../redux/property/property.action";
import { useFocusEffect } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";

export const StatsRow = ({ units, navigation, route, refreshCallback }) => {
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
  const [saleSummeryA, setSaleSummeryA] = useState(0);
  const [saleSummeryB, setSaleSummeryB] = useState(0);
  const [collectionsCount, setCollectionsCount] = useState(0);
  const [dues, setDues] = useState(0);
  const [notReleased, setNotReleased] = useState([]);
  const [cancelllation, setCancelllation] = useState([]);

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
    let tempdata = 0;
    saleSummeryStats.forEach((element) => {
      if (element.STATUS_NAME == "All") {
        tempdata = tempdata + element.SALEVALUE;
      }
    });
    setSaleSummery(tempdata);
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

  return (
    <View style={{ width: "90%" }}>
      <View style={styles.container}>
        {preReserve.length > 0 && (
          <TouchableOpacity
            disabled={preReserve.length == 0 ? true : false}
            onPress={() => navigation.navigate(SCREENS.STATSLISTING, { label: "Pre-Reserved", list: preReserve })}
            style={[styles.top]}
          >
            <Text style={styles.rightCount}>{preReserve.length}</Text>
            <Text style={styles.rightLabel}>TOTAL Pre-Reserved</Text>
          </TouchableOpacity>
        )}
        {notReleased.length > 0 && booked.length > 200 && (
          <TouchableOpacity
            disabled={booked.length < 200 ? true : false}
            onPress={() => navigation.navigate(SCREENS.DASHBOARDLISTING, { label: "Not Released", list: notReleased, refreshCallback, token })}
            style={[styles.top]}
          >
            {booked.length < 200 ? <Text style={styles.rightCount}>0</Text> : <Text style={styles.rightCount}>{notReleased.length}</Text>}
            <Text style={styles.rightLabel}>TOTAL Not-Released</Text>
            <Image source={ICONS.nextArrow} style={{ width: 20, height: 20, position: "absolute", right: RFPercentage(2) }} resizeMode="contain" />
          </TouchableOpacity>
        )}
        {reserve.length > 0 && (
          <TouchableOpacity disabled={reserve.length == 0 ? true : false} onPress={() => navigation.navigate(SCREENS.STATSLISTING, { label: "Reserved", list: reserve })} style={[styles.top]}>
            <Text style={styles.rightCount}>{reserve.length}</Text>
            <Text style={styles.rightLabel}>TOTAL Reserved</Text>
          </TouchableOpacity>
        )}
        {/* homeList.length > 0 */}
        {homeList.length > 0 && (
          <TouchableOpacity disabled={homeList.length == 0 ? true : false} onPress={() => navigation.navigate("HomeInProgress")} style={styles.top}>
            <Text style={styles.rightCount}>{homeList.length}</Text>
            <Text style={styles.rightLabel}>TOTAL Approval{"\n"}In-Progress</Text>
          </TouchableOpacity>
        )}
        {booked.length > 0 && (
          <TouchableOpacity onPress={() => navigation.navigate(SCREENS.STATSLISTING, { label: "Booked", list: booked })} style={[styles.top]}>
            <Text style={styles.rightCount}>{booked.length}</Text>
            <Text style={styles.rightLabel}>TOTAL Booked</Text>
            <Image source={ICONS.nextArrow} style={{ width: 20, height: 20, position: "absolute", right: RFPercentage(2) }} resizeMode="contain" />
          </TouchableOpacity>
        )}
        {booked.length > 0 && !isCustomer && (
          <TouchableOpacity disabled={isCustomer} onPress={() => navigation.navigate(SCREENS.STATSLISTING, { label: "Cancellation", list: cancelllation })} style={[styles.top]}>
            <>{isCustomer ? <Text style={styles.rightCount}>0</Text> : <Text style={styles.rightCount}>{cancelllation.length}</Text>}</>
            <Text style={styles.rightLabel}>TOTAL Cancellation{"\n"}In-Progress</Text>
            <Image source={ICONS.nextArrow} style={{ width: 17, height: 17, position: "absolute", right: RFPercentage(2), top: RFPercentage(2.2) }} resizeMode="contain" />
          </TouchableOpacity>
        )}
      </View>
      {!isCustomer ? (
        booked.length > 200 && (
          <View style={styles.container2nd}>
            <Text style={{ color: COLORS.boldText, fontSize: 17, width: CUSTOMWIDTH(85), marginVertical: 12, fontFamily: FONTS.SemiBold }}>SALES & PURCHASE</Text>
            <TouchableOpacity disabled={true} onPress={() => navigation.navigate("TotalSales", { data: saleSummeryStats })} style={styles.card}>
              <View style={styles.bottomGrediant}>
                <Text style={[styles.rightCount, { width: "50%" }]}>
                  {saleSummery &&
                    Math.abs(saleSummery)
                      .toFixed(1)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </Text>
                <Text style={styles.labelStyle}>TOTAL Sale</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity disabled={true} onPress={() => navigation.navigate("TotalSales", { data: saleSummeryStats })} style={styles.card}>
              <View style={styles.bottomGrediant}>
                <Text style={[styles.rightCount, { width: "50%" }]}>
                  {Math.abs(dues)
                    .toFixed(1)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </Text>
                <Text style={styles.labelStyle}>TOTAL Dues</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity disabled={true} onPress={() => navigation.navigate("TotalSales", { data: saleSummeryTowerAStats })} style={styles.card}>
              <View style={styles.bottomGrediant}>
                <Text style={[styles.rightCount, { width: "50%" }]}>
                  {saleSummeryA &&
                    Math.abs(saleSummeryA)
                      .toFixed(1)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </Text>
                <Text style={styles.labelStyle}>Total Sale - Tower A</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity disabled={true} onPress={() => navigation.navigate("TotalSales", { data: saleSummeryTowerBStats })} style={styles.card}>
              <View style={styles.bottomGrediant}>
                <Text style={[styles.rightCount, { width: "50%" }]}>
                  {saleSummeryB &&
                    Math.abs(saleSummeryB)
                      .toFixed(1)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </Text>
                <Text style={styles.labelStyle}>Total Sale - Tower B</Text>
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate("SaleSummery", { data: monthlyStats })} style={styles.card} >
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#E6F0FF', '#F2F7FF', '#FFFFFF']} style={styles.bottomGrediant} >
                                <Image source={ICONS.summary} style={{ width: 38, height: 38 }} />
                                <Text style={styles.labelStyle}>Sale Summery</Text>
                                <Text style={[styles.rightCount, { textAlign: 'right', width: '35%' }]}>{sale && Math.abs(sale).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                            </LinearGradient>
                        </TouchableOpacity> */}
            <TouchableOpacity disabled={true} onPress={() => navigation.navigate("SaleCancellation", { data: cancelDataStats })} style={styles.card}>
              <View style={styles.bottomGrediant}>
                <Text style={[styles.rightCount, { width: "50%" }]}>
                  {cancellation &&
                    Math.abs(cancellation)
                      .toFixed(1)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </Text>
                <Text style={styles.labelStyle}>Sale Cancellation</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity disabled={true} onPress={() => navigation.navigate("TotalCollections", { data: collections })} style={styles.card}>
              <View style={styles.bottomGrediant}>
                <Text style={[styles.rightCount, { width: "50%" }]}>
                  {collectionsCount &&
                    Math.abs(collectionsCount)
                      .toFixed(1)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                </Text>
                <Text style={styles.labelStyle}>TOTAL Collection</Text>
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity onPress={() => navigation.navigate("Graph")} style={styles.card} >
                                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#E6F0FF', '#F2F7FF', '#FFFFFF']} style={styles.bottomGrediant} >
                                    <Image source={ICONS.inreserved} style={{ width: 38, height: 38 }} />
                                    <Text style={[styles.labelStyle, { width: '75%' }]}>TOTAL Dues</Text>
                                    <Image source={ICONS.next} style={{ width: 18, height: 18 }} resizeMode={"contain"} />
                                </LinearGradient>
                            </TouchableOpacity> */}

            {/* <TouchableOpacity onPress={() => navigation.navigate("Graph")} style={styles.card} >
                                <View style={styles.bottomGrediant} >
                                    <Text style={[styles.rightCount, { width: '90%' }]}>View Graph</Text>
                                    <Image source={ICONS.nextArrow} style={{ width: 18, height: 18 }} resizeMode={"contain"} />
                                </View>
                            </TouchableOpacity> */}
          </View>
        )
      ) : (
        <View style={styles.container2nd}>
          <Text style={{ color: COLORS.boldText, fontSize: 17, width: CUSTOMWIDTH(85), marginVertical: 12, fontFamily: FONTS.SemiBold }}>PAYMENTS DETAIL</Text>
          <TouchableOpacity disabled={true} onPress={() => navigation.navigate("TotalSales", { data: saleSummeryStats })} style={styles.card}>
            <View style={styles.bottomGrediant}>
              <Text style={[styles.rightCount, { width: "50%" }]}>
                {customerReceivableList[0] &&
                  Math.abs(customerReceivableList[0].RESERVE_SALES)
                    .toFixed(1)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </Text>
              <Text style={styles.labelStyle}>Book Sales</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity disabled={true} onPress={() => navigation.navigate("SaleCancellation", { data: cancelDataStats })} style={styles.card}>
            <View style={styles.bottomGrediant}>
              <Text style={[styles.rightCount, { width: "50%" }]}>
                {customerReceivableList[0] &&
                  Math.abs(customerReceivableList[0].INVOICED_AMOUNT)
                    .toFixed(1)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </Text>
              <Text style={styles.labelStyle}>Invoiced Amount</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity disabled={true} onPress={() => navigation.navigate("SaleCancellation", { data: cancelDataStats })} style={styles.card}>
            <View style={styles.bottomGrediant}>
              <Text style={[styles.rightCount, { width: "50%" }]}>
                {customerReceivableList[0] &&
                  Math.abs(customerReceivableList[0].COLLECTED_AMOUNT)
                    .toFixed(1)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </Text>
              <Text style={styles.labelStyle}>Collected Amount</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity disabled={true} onPress={() => navigation.navigate("TotalCollections", { data: collections })} style={styles.card}>
            <View style={styles.bottomGrediant}>
              <Text style={[styles.rightCount, { width: "50%" }]}>
                {customerReceivableList[0] &&
                  Math.abs(customerReceivableList[0].OUTSTANDING_AMOUNT)
                    .toFixed(1)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </Text>
              <Text style={styles.labelStyle}>Outstanding Amount</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity disabled={true} onPress={() => navigation.navigate("TotalCollections", { data: collections })} style={styles.card}>
            <View style={styles.bottomGrediant}>
              <Text style={[styles.rightCount, { width: "50%" }]}>
                {customerReceivableList[0] &&
                  Math.abs(customerReceivableList[0].UNDEPOSITED_CHQ)
                    .toFixed(1)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </Text>
              <Text style={styles.labelStyle}>Undeposited Chq</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity disabled={true} onPress={() => navigation.navigate("TotalCollections", { data: collections })} style={styles.card}>
            <View style={styles.bottomGrediant}>
              <Text style={[styles.rightCount, { width: "50%" }]}>
                {customerReceivableList[0] &&
                  Math.abs(customerReceivableList[0].NETOUTSTANDING)
                    .toFixed(1)
                    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </Text>
              <Text style={styles.labelStyle}>Netoutstanding</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    flexWrap: "wrap",
  },

  container2nd: {
    width: "100%",
    marginBottom: 12,
  },
  right: {
    width: CUSTOMWIDTH("90"),
  },
  top: {
    width: "48%",
    height: 72,
    borderWidth: 1,
    borderColor: "#CDA349",
    borderRadius: 15,
    justifyContent: "center",
    paddingHorizontal: 12,
    marginTop: 12,
  },
  bottom: {
    width: "48%",
    backgroundColor: COLORS.lightBlue,
    height: 70,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
  },
  bottomGrediant: {
    width: "100%",
    height: 70,
    borderWidth: 1,
    borderColor: "#CDA349",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  card: {
    marginVertical: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
  },
  leftCount: {
    color: COLORS.secondry,
    fontFamily: FONTS.Bold,
    fontSize: 50,
  },
  leftLabel: {
    color: COLORS.secondry,
    fontFamily: FONTS.SemiBold,
    fontSize: 14,
  },
  labelStyle: {
    width: "46%",
    color: "#000000",
    fontFamily: FONTS.Regular,
    fontSize: 12,
    marginHorizontal: 12,
  },
  rightCount: {
    color: "#204866",
    fontFamily: FONTS.Bold,
    fontSize: 20,
  },
  rightLabel: {
    color: "#204866",
    fontFamily: FONTS.Medium,
    fontSize: 14,
    marginTop: 4,
  },
});
