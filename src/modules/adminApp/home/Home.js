import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Platform, Alert, Button } from "react-native";
import { getPropertyStats, getCountList, getReservationList, getMonthlyStats } from "../../../redux/property/property.action";
import messaging, { firebase } from "@react-native-firebase/messaging";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useFocusEffect } from "@react-navigation/native";
import { FONTS, ICONS, Url } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { StatsRow } from "../../../common/statsRow";
import React, { useState, useEffect } from "react";
import { BtnLIM } from "../../../common/btnLIM";
import { BtnLI } from "../../../common/btnLI";
import notifee from "@notifee/react-native";
import axios from "axios";

const CustomerDetail = () => {
  const userDetail = useSelector((state) => state.user.userDetail);

  return (
    <View style={styles.customerContainer}>
      <Text style={styles.hello}>Hello,</Text>
      <Text style={styles.customerName}>{userDetail && userDetail.FIRST_NAME + " " + userDetail.LAST_NAME}!</Text>
      {/* <Text>{userDetail.LOGIN_NAME}</Text> */}
    </View>
  );
};

const UnitCount = ({ count, label, disabled, onClick }) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={() => onClick()} style={styles.unitContainer}>
      <Text style={styles.customerName}>{count}</Text>
      <Text style={styles.unitText}>{label}</Text>
      {disabled ? <View style={{ width: 20, height: 20 }} /> : <Image source={ICONS.nextArrow} style={{ width: 20, height: 20, position: "absolute", right: RFPercentage(2) }} resizeMode="contain" />}
    </TouchableOpacity>
  );
};

const Home = ({ navigation, route }) => {
  const userDetail = useSelector((state) => state.user.userDetail);

  // Push Notification work
  async function registerAppWithFCM() {
    await messaging().registerDeviceForRemoteMessages();
  }
  useEffect(() => {
    registerAppWithFCM();
  }, []);

  // IOS Permissions Thissssss
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  }
  useEffect(() => {
    requestUserPermission();
  }, []);

  // Android Permissions
  async function requestNotificationPermission() {
    await notifee.requestPermission();
  }

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const [deviceToken, setDeviceToken] = useState(null);

  const getDeviceToken = async () => {
    try {
      const token = await firebase.messaging().getToken();
      if (token) {
        console.log("FCM token:", token);
        setDeviceToken(token);
      } else {
        console.log("FCM token is null");
      }
    } catch (error) {
      console.error("\n\n\n\n\n\n\n\nError while getting FCM token:", error);
    }
  };

  useEffect(() => {
    getDeviceToken();
  }, []);

  // // Forground
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived in Forground State!", JSON.stringify(remoteMessage));
      // console.log("\n\n\n\n Message handled in the Forground State!", remoteMessage.data.action);
      const leadId = remoteMessage.data && remoteMessage.data.leadId;
      console.log("\n\n\n\n\n\n\n\nLeadID Via Notification", leadId);
      if (leadId) {
        navigation.navigate("LeadClick", { leadId: leadId });
      } else {
        console.log("Unhandled action:", leadId);
      }
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
      });
    });

    return unsubscribe;
  }, []);

  // messaging().onMessage(async (remoteMessage) => {
  //   console.log("\n\n\n\n Message handled in the Background State!", remoteMessage);
  // });

  // Background
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("\n\n\n\n Message handled in the Background State!", remoteMessage);

    const leadId = remoteMessage.data && remoteMessage.data.leadId;
    console.log("\n\n\n\n\n\n\n\nLeadID Via Notification", leadId);
    if (leadId) {
      navigation.navigate("LeadClick", { leadId: leadId });
    } else {
      console.log("Unhandled action:", leadId);
    }

    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
    });
  });

  // messaging().getInitialNotification(async (remoteMessage) => {
  //   console.log("\n\n\n\n Message handled in the Kill State!", remoteMessage);
  //   const action = remoteMessage.data && remoteMessage.data.action;

  //   if (action === "48HoursNoAction") {
  //     // Use navigation.replace or navigation.reset here
  //     navigation.replace("TotalLeadMainListings", { hours: true });
  //   } else if (action === "30MinsNoAction") {
  //     navigation.replace("TotalLeadMainListings", { noAction: true });
  //   } else if (action === "noAction") {
  //     navigation.replace("TotalLeadMainListings", { category: "ASSIGNED" });
  //   } else {
  //     console.log("Unhandled action:", action);
  //   }

  //   // await notifee.displayNotification({
  //   //   title: remoteMessage.notification.title,
  //   //   body: remoteMessage.notification.body,
  //   // });
  // });

  // kill Mode
  useEffect(() => {
    const handleKillStateNotification = async (remoteMessage) => {
      console.log("\n\n\n\n Message handled in the Kill State!", remoteMessage);
      const leadId = remoteMessage.data && remoteMessage.data.leadId;
      console.log("\n\n\n\n\n\n\n\nLeadID Via Notification", leadId);
      if (leadId) {
        navigation.navigate("LeadClick", { leadId: leadId });
      } else {
        console.log("Unhandled action:", leadId);
      }

      // Uncomment the following lines if you want to display the notification
      // await notifee.displayNotification({
      //   title: remoteMessage.notification.title,
      //   body: remoteMessage.notification.body,
      // });
    };

    const unsubscribeKillState = messaging().onNotificationOpenedApp(handleKillStateNotification);

    // Check if the app was opened from a terminated state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          handleKillStateNotification(remoteMessage);
        }
      });

    return () => {
      unsubscribeKillState();
    };
  }, [navigation]);

  // Function to send a test notification Thissss
  // const sendTestNotification = async () => {
  //   try {
  //     // Get the FCM token
  //     const fcmToken = await firebase.messaging().getToken();
  //     console.log("\n\n\n\n\nFecthed FCM Token", fcmToken);

  //     if (fcmToken) {
  //       const response = await fetch("https://fcm.googleapis.com/fcm/send", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "key=AAAA7ujSLDg:APA91bFcIUpZb8Zpt89yfPE57i2rdhPSEBde57PpnPYSFJuA9ZZBEKXgaWS24IRjFU_mF1vbvblttaSWzn5aJOaDEZXq7ejXkdyNMTK3ek94au8xWkGoemoYo2V_Q4Fm5TKRcXf__El1",
  //         },
  //         body: JSON.stringify({
  //           to: fcmToken,
  //           notification: {
  //             title: "Test Notification",
  //             body: "This is a test notification from your app.",
  //           },
  //           data: {
  //             action: "30MinsNoAction",
  //           },
  //         }),
  //       });

  //       if (response.status === 200) {
  //         console.log("Test notification sent successfully");

  //         await notifee.displayNotification({
  //           title: "Flexion",
  //           body: "Your Ticket is Generated",
  //         });
  //       } else {
  //         console.error("Failed to send test notification");
  //       }
  //     } else {
  //       console.log("FCM token is null");
  //     }
  //   } catch (error) {
  //     console.error("Error sending test notification:", error);
  //   }
  // };

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { reservationList, totalUnitsCount } = useSelector((state) => state.property);
  const [available, setAvailable] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiResponse, setApiResponse] = useState([]);

  const [totalLeadCount, setTotalLeadCount] = useState(0);

  const makeApiRequest = async () => {
    try {
      const response = await axios.get(`${Url}leads_list_api?userid=${token}`);
      // console.log("API Response is here lead:", response.data.data);

      const firstObject = response.data.data[0];
      const leadCount = firstObject ? firstObject.length : 0;
      console.log("Latest count", leadCount);

      setTotalLeadCount(leadCount);

      setApiResponse(response.data.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  useEffect(() => {
    makeApiRequest();
  }, []);

  const fetchData = () => {
    setIsRefreshing(true);

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

  // send token api
  const [apiResponse2, setApiResponse2] = useState([]);

  const makeApiRequest2 = async () => {
    try {
      const platform = Platform.OS.toLowerCase();

      const response = await axios.get(
        `${Url}get_mobile_device_id_api?user_id=${token}&fcm_token=${deviceToken}&user_name=${userDetail.LOGIN_NAME}&app_type=FLEXION&app_platform=${platform}&status=offline&is_active=1`,
      );
      setApiResponse2(response.data);

      // Handle the API response data as needed
      console.log("\n\n\n\n\n\n\n\n\n\nToken Sent Successfully!", response.data);
    } catch (error) {
      console.error("\n\n\n\n\n\n\n\n\n\n\nAPI Error/////:", error);
    }
  };

  useEffect(() => {
    makeApiRequest2();
  }, [deviceToken]);

  // async function onDisplayNotification() {
  //   await notifee.requestPermission();

  //   const channelId = await notifee.createChannel({
  //     id: "default",
  //     name: "Default Channel",
  //   });

  //   await notifee.displayNotification({
  //     title: "Flexion",
  //     body: "Your Ticket is Generated",
  //     android: {
  //       channelId,
  //       smallIcon: "name-of-a-small-icon", // optional, defaults to 'ic_launcher'.
  //       // pressAction is needed if you want the notification to open the app when pressed
  //       pressAction: {
  //         id: "default",
  //       },
  //     },
  //   });
  // }

  return (
    <ImageBackground source={ICONS.bgImg} style={styles.container}>
      <SafeAreaView style={styles.main}>
        <ScrollView style={{ width: "100%" }}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <CustomerDetail />
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
            <UnitCount
              count={totalLeadCount}
              label="Total Leads"
              disabled={false}
              onClick={() => {
                navigation.navigate("TotalLeadListings");
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
