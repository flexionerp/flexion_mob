import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Platform, Alert, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { FONTS, ICONS } from "../../../constants";
import { StatsRow } from "../../../common/statsRow";
import { BtnLI } from "../../../common/btnLI";
import { BtnLIM } from "../../../common/btnLIM";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyStats, getCountList, getReservationList, getMonthlyStats } from "../../../redux/property/property.action";
import { useFocusEffect } from "@react-navigation/native";
// PushNotification Code starts from here
import messaging from "@react-native-firebase/messaging";
// Till here

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
  // Push Notification work
  useEffect(() => {
    getDeviceToken();
  }, []);
  const getDeviceToken = async () => {
    let token = await messaging().getToken();
    console.log("\n\n\n\n\nHere is the token", token);
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived in Forground State!", JSON.stringify(remoteMessage));
      console.log("\n\n\n\n Message handled in the Forground State!", remoteMessage);
    });

    return unsubscribe;
  }, []);

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("\n\n\n\n Message handled in the Background State!", remoteMessage);
  });

  messaging().getInitialNotification(async (remoteMessage) => {
    console.log("\n\n\n\n Message handled in the Kill State!", remoteMessage);
  });

  // Function to send a test notification
  // const sendTestNotification = async () => {
  //   try {
  //     const response = await fetch("https://fcm.googleapis.com/fcm/send", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "key=AAAA7ujSLDg:APA91bFcIUpZb8Zpt89yfPE57i2rdhPSEBde57PpnPYSFJuA9ZZBEKXgaWS24IRjFU_mF1vbvblttaSWzn5aJOaDEZXq7ejXkdyNMTK3ek94au8xWkGoemoYo2V_Q4Fm5TKRcXf__El1", // Replace with your server key
  //       },
  //       body: JSON.stringify({
  //         to: "e9m3-GkOTbGaexAgOx_Yh5:APA91bGQIqSpxDu44o3LcYcUQ-AhTA3p_zN1vOd6_zuQmtSXqC0c_CNePRDh7Kt4YniTjX6zzFhSCiUOi-UPH9LOYGh_4FSRCtiBai7V-n2KCH9cpf-Xi82le-mWSbFbCLGAHQFECG2E", // Replace with the device token you want to target
  //         notification: {
  //           title: "Test Notification",
  //           body: "This is a test notification from your app.",
  //         },
  //         data: {
  //           // You can add custom data here if needed
  //         },
  //       }),
  //     });

  //     if (response.status === 200) {
  //       console.log("Test notification sent successfully");
  //     } else {
  //       console.error("Failed to send test notification");
  //     }
  //   } catch (error) {
  //     console.error("Error sending test notification:", error);
  //   }
  // };

  // Till here
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { reservationList, totalUnitsCount } = useSelector((state) => state.property);
  const [available, setAvailable] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = () => {
    setIsRefreshing(true);

    // Dispatch your API calls here
    dispatch(getReservationList(token));
    dispatch(getPropertyStats());
    dispatch(getCountList());
    dispatch(getMonthlyStats());

    setIsRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.refreshing) {
        fetchData();
      }
    }, [route.params?.refreshing]),
  );

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
    // console.log("Find Retail here", tempcount);
  };

  return (
    <ImageBackground source={ICONS.bgImg} style={styles.container}>
      <SafeAreaView style={styles.main}>
        {/* {console.log("Total available List is this====================>>>>>>>>>>", available.length)} */}
        {/* <Text>{token}</Text> */}
        <ScrollView style={{ width: "100%" }}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <CustomerDetail />
            {/* <View style={{ marginTop: 20 }}>
              <Button title="Send Test Notification" onPress={sendTestNotification} />
            </View> */}
            <UnitCount count={totalUnitsCount.length} label="Total Properties" disabled={true} />
            {/* <UnitCount count={available.length} label="Total Available" disabled={false} onClick={() => navigation.navigate("DashboardListing", { label: "Total Available", list: available })} /> */}
            {/* <UnitCount count={available.length} label="Total Available" disabled={false} onClick={() => navigation.navigate("TotalAvailable")} /> */}
            <UnitCount
              count={available.length}
              label="Total Available"
              disabled={false}
              onClick={() => {
                navigation.navigate("TotalAvailable", { availableData: available });
              }}
            />
            <View style={{ height: 8 }} />
            <StatsRow navigation={navigation} refreshCallback={fetchData} />
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
