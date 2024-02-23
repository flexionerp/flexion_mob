import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Platform, Alert, Button } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FONTS, ICONS, Url, SCREEN_WIDTH, COLORS, SCREENS } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

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
    let tempcount = totalUnitsCount.filter(({ STATUS }) => STATUS == "AVAILABLE");
    setAvailable(tempcount);
    // console.log("Find Retail here", tempcount);
  };

  const [inventoryData, setInventoryData] = useState([]);
  const [availableInventoryData, setAvailableInventoryData] = useState([]);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get(`${Url}get_inventory?tower=all&unit=all&APIKey=216bb413-8022-416e-83cf-aad38748d724`);
        setInventoryData(response.data);

        const availableData = response.data.filter((item) => item.UNIT_STATUS === "Available");
        setAvailableInventoryData(availableData);

        // console.log("Inventory Data:", response.data); // Log the response for debugging
        // console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nAvailable Inventory Data:", availableData); // Log available inventory data for debugging
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchInventoryData();
  }, []);

  const calculateTotalSaleValue = () => {
    let totalSaleValue = 0;

    availableInventoryData.forEach((unit) => {
      if (unit.SALE_VALUE && typeof unit.SALE_VALUE === "number") {
        totalSaleValue += unit.SALE_VALUE;
      } else if (unit.SALE_VALUE && typeof unit.SALE_VALUE === "string") {
        const saleValue = Number(unit.SALE_VALUE.replace(/,/g, ""));
        if (!isNaN(saleValue)) {
          totalSaleValue += saleValue;
        }
      }
    });

    return (
      totalSaleValue &&
      Math.abs(totalSaleValue)
        .toFixed(1)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
    );
  };

  const [totalLeadCount, setTotalLeadCount] = useState(0);

  const makeApiRequest = async () => {
    try {
      const response = await axios.get(`${Url}leads_list_api?userid=${token}`);

      const filteredData = response.data.data[0].filter((item) => !["JUNK", "LOST", "DEAL"].includes(item.LEAD_STATUS));

      const firstObject = filteredData;
      const leadCount = firstObject ? filteredData.length : 0;
      console.log("Latest count", leadCount);

      setTotalLeadCount(leadCount);

      // setApiResponse(filteredData);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    makeApiRequest();
  }, []);

  // Dues
  const [dues2, setDues2] = useState(0);

  useEffect(() => {
    fetch(`${Url}get_due_list_api?property=all&customer=all&unit=all&document=all&APIKey=216bb413-8022-416e-83cf-aad38748d724`)
      .then((response) => response.json())
      .then((data) => {
        const totalBalance = data.reduce((sum, item) => sum + parseFloat(item.INV_BALANCE), 0);

        setDues2(totalBalance);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Tickets
  const [totalTickets, setTotalTickets] = useState(0);

  useEffect(() => {
    fetch("http://tvh.flexion.ae:9095/get_ticket_list_api?dt=days&ts=1&assign=all&source=all&APIKey=216bb413-8022-416e-83cf-aad38748d724")
      .then((response) => response.json())
      .then((data) => {
        const totalTicketsSum = data.reduce((sum, item) => sum + parseFloat(item.TOTAL_TICKETS), 0);

        setTotalTickets(totalTicketsSum);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Cancellations stats
  const [cancellationCount, setCancellationCount] = useState(0);
  const [totalSaleValue, setTotalSaleValue] = useState(0);

  useEffect(() => {
    fetch(`${Url}get_reservation_grid_api?user_info_id=${token}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          const cancellationResponses = data.data.filter((response) => response.STATUS_NAME === "Reservation cancellation in progress");

          const count = cancellationResponses.length;
          const sum = cancellationResponses.reduce((total, item) => total + parseFloat(item.SALE_VALUE.replace(/[^0-9.-]+/g, "")), 0);

          setCancellationCount(count);
          setTotalSaleValue(sum);
        } else {
          console.error("Invalid API response:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Sale API
  const [saleSummery2, setSaleSummary2] = useState(null);
  const [totalSales, setTotalSales] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://tvh.flexion.ae:9095/get_sales_data_by_date_api?date_type=days&unit_type=all&USER_INFO_ID=5231&building_type=all&agent_type=all&APIKey=216bb413-8022-416e-83cf-aad38748d724",
        );
        const data = await response.json();

        const targetDateEntry = data.find((entry) => entry.REPORT_DATE === "2040-12-30T20:00:00.000Z");

        if (targetDateEntry) {
          setSaleSummary2(targetDateEntry.TOTAL_SALE_VALUE);
          setTotalSales(targetDateEntry.TOTAL_SALES);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetch function
    fetchData();
  }, []);

  return (
    <ImageBackground source={ICONS.bgImg} style={styles.container}>
      <SafeAreaView style={styles.main}>
        <View style={{ width: "90%", justifyContent: "flex-start", alignItems: "center", alignSelf: "center", flexDirection: "row" }}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Home")} style={{}}>
            <Ionicons name="chevron-back" style={{ fontSize: RFPercentage(3.2), marginRight: 5 }} color={"#06143b"} />
          </TouchableOpacity>
          <Text style={{ color: COLORS.boldText, fontSize: SCREEN_WIDTH * 0.043, fontFamily: FONTS.SemiBold, marginLeft: 8 }}>Home</Text>
        </View>
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
                  <Text style={{ marginTop: RFPercentage(6), color: COLORS.boldText, fontSize: RFPercentage(3), fontFamily: FONTS.Medium }}>{totalSales}</Text>
                  <Text style={{ marginTop: RFPercentage(2), color: COLORS.boldText, fontSize: RFPercentage(2.5), fontFamily: FONTS.Medium }}>
                    {saleSummery2 !== null &&
                      Math.abs(saleSummery2)
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
                  <Text style={{ marginTop: RFPercentage(6), color: COLORS.boldText, fontSize: RFPercentage(3), fontFamily: FONTS.Medium }}>{availableInventoryData.length}</Text>
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
                    {Math.abs(dues2)
                      .toFixed(1)
                      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </Text>
                  <Text style={{ marginTop: RFPercentage(0), color: COLORS.boldText, fontSize: RFPercentage(2.5), fontFamily: FONTS.Medium }}>AED</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Under Cancellations */}
            <View style={{ width: "90%", justifyContent: "center", alignItems: "center" }}>
              <View style={{ marginTop: RFPercentage(3), flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.7), fontFamily: FONTS.SemiBold }}>Cancellations</Text>
                <Feather name="corner-right-down" style={{ top: RFPercentage(0.5), marginHorizontal: RFPercentage(0.6), fontSize: RFPercentage(2.8) }} color={"#06143b"} />
              </View>
              <View
                style={{
                  width: RFPercentage(27),
                  height: RFPercentage(27),
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#f0ffff",
                  borderWidth: RFPercentage(0.5),
                  borderRadius: RFPercentage(30),
                  marginTop: RFPercentage(2),
                }}
              >
                <TouchableOpacity
                  // onPress={() => navigation.navigate(SCREENS.GRAPH, { title: "Cancellations" })}
                  activeOpacity={0.6}
                  style={{
                    width: RFPercentage(25),
                    height: RFPercentage(25),
                    borderRadius: RFPercentage(100),
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: "#f0ffff",
                  }}
                >
                  <Text style={{ marginTop: RFPercentage(6), color: COLORS.boldText, fontSize: RFPercentage(3), fontFamily: FONTS.Medium }}>{cancellationCount}</Text>
                  <Text style={{ marginTop: RFPercentage(1), color: COLORS.boldText, fontSize: RFPercentage(2.5), fontFamily: FONTS.Medium }}>
                    {totalSaleValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                  </Text>
                  <Text style={{ marginTop: RFPercentage(0), color: COLORS.boldText, fontSize: RFPercentage(2.5), fontFamily: FONTS.Medium }}>AED</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Leads */}
            <View style={{ width: "90%", justifyContent: "center", alignItems: "center" }}>
              <View style={{ marginTop: RFPercentage(3), flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.7), fontFamily: FONTS.SemiBold }}>Leads</Text>
                <Feather name="corner-right-down" style={{ top: RFPercentage(0.5), marginHorizontal: RFPercentage(0.6), fontSize: RFPercentage(2.8) }} color={"#06143b"} />
              </View>
              <View
                style={{
                  width: RFPercentage(27),
                  height: RFPercentage(27),
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#b0e0e6",
                  borderWidth: RFPercentage(0.5),
                  borderRadius: RFPercentage(30),
                  marginTop: RFPercentage(2),
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate(SCREENS.GRAPH, { title: "Lead" })}
                  activeOpacity={0.6}
                  style={{
                    width: RFPercentage(25),
                    height: RFPercentage(25),
                    borderRadius: RFPercentage(100),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#b0e0e6",
                  }}
                >
                  {/* <Text style={{ marginTop: RFPercentage(6), color: COLORS.boldText, fontSize: RFPercentage(3), fontFamily: FONTS.Medium }}>999</Text> */}
                  <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.9), fontFamily: FONTS.Medium }}>{totalLeadCount}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Tickets */}
            <View style={{ width: "90%", justifyContent: "center", alignItems: "center" }}>
              <View style={{ marginTop: RFPercentage(3), flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.7), fontFamily: FONTS.SemiBold }}>Tickets</Text>
                <Feather name="corner-right-down" style={{ top: RFPercentage(0.5), marginHorizontal: RFPercentage(0.6), fontSize: RFPercentage(2.8) }} color={"#06143b"} />
              </View>
              <View
                style={{
                  width: RFPercentage(27),
                  height: RFPercentage(27),
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: "#B3CCFF",
                  borderWidth: RFPercentage(0.5),
                  borderRadius: RFPercentage(30),
                  marginTop: RFPercentage(2),
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate(SCREENS.GRAPH, { title: "Ticket" })}
                  activeOpacity={0.6}
                  style={{
                    width: RFPercentage(25),
                    height: RFPercentage(25),
                    borderRadius: RFPercentage(100),
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#B3CCFF",
                  }}
                >
                  <Text style={{ color: COLORS.boldText, fontSize: RFPercentage(2.8), fontFamily: FONTS.Medium }}>{totalTickets}</Text>
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
