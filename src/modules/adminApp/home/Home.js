import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Platform, Alert, Button } from "react-native";
import React, { useState, useEffect } from "react";
import { FONTS, ICONS, Url } from "../../../constants";
import { StatsRow } from "../../../common/statsRow";
import { BtnLI } from "../../../common/btnLI";
import { BtnLIM } from "../../../common/btnLIM";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyStats, getCountList, getReservationList, getMonthlyStats } from "../../../redux/property/property.action";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { RFPercentage } from "react-native-responsive-fontsize";
import messaging, { firebase } from "@react-native-firebase/messaging";
import notifee from "@notifee/react-native";

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
      {disabled ? <View style={{ width: 20, height: 20 }} /> : <Image source={ICONS.nextArrow} style={{ width: 20, height: 20, position: "absolute", right: RFPercentage(2) }} resizeMode="contain" />}
    </TouchableOpacity>
  );
};

const Home = ({ navigation, route }) => {
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
        setDeviceToken(token); // Store the token in state
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
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived in Forground State!", JSON.stringify(remoteMessage));
      console.log("\n\n\n\n Message handled in the Forground State!", remoteMessage);
    });

    return unsubscribe;
  }, []);

  // Thisssssss
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("\n\n\n\n Message handled in the Background State!", remoteMessage);

    // You can add code here to display a local notification using Notifee
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      // Add other notification options as needed
    });
  });

  messaging().getInitialNotification(async (remoteMessage) => {
    console.log("\n\n\n\n Message handled in the Kill State!", remoteMessage);
  });

  // Function to send a test notification Thissss
  const sendTestNotification = async () => {
    try {
      // Get the FCM token
      const fcmToken = await firebase.messaging().getToken();
      console.log("\n\n\n\n\nFecthed FCM Token", fcmToken);

      if (fcmToken) {
        // Send FCM notification using the obtained token
        const response = await fetch("https://fcm.googleapis.com/fcm/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "key=AAAA7ujSLDg:APA91bFcIUpZb8Zpt89yfPE57i2rdhPSEBde57PpnPYSFJuA9ZZBEKXgaWS24IRjFU_mF1vbvblttaSWzn5aJOaDEZXq7ejXkdyNMTK3ek94au8xWkGoemoYo2V_Q4Fm5TKRcXf__El1",
          },
          body: JSON.stringify({
            to: fcmToken, // Use the obtained FCM token here
            notification: {
              title: "Test Notification",
              body: "This is a test notification from your app.",
            },
            data: {
              // You can add custom data here if needed
            },
          }),
        });

        if (response.status === 200) {
          console.log("Test notification sent successfully");

          // Display local notification using Notifee
          await notifee.displayNotification({
            title: "Flexion",
            body: "Your Ticket is Generated",
          });
        } else {
          console.error("Failed to send test notification");
        }
      } else {
        console.log("FCM token is null");
      }
    } catch (error) {
      console.error("Error sending test notification:", error);
    }
  };

  // Send device token to api
  const sendDeviceTokenToAPI = async () => {
    if (deviceToken) {
      try {
        // Replace 'user_id' with the actual user ID from your application
        const userId = 5231;
        const apiUrl = `http://tvh.flexion.ae:9091/mobile_device_id?user_id=${userId}&device_id=${deviceToken}`;

        const response = await axios.post(apiUrl);

        if (response.status === 200) {
          console.log("Device token sent successfully to the API");
        } else {
          console.error("Failed to send device token to the API");
        }
      } catch (error) {
        console.error("Error sending device token to the API:", error);
      }
    }
  };

  // Call the function to send the device token when the user logs in and comes to the Home screen
  // useEffect(() => {
  //   sendDeviceTokenToAPI();
  // }, [deviceToken]);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { reservationList, totalUnitsCount } = useSelector((state) => state.property);
  const [available, setAvailable] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiResponse, setApiResponse] = useState([]);

  const [totalLeadCount, setTotalLeadCount] = useState(0); // Initialize with 0

  const makeApiRequest = async () => {
    try {
      const response = await axios.get(`${Url}leads_list_api?userid=${token}`);
      // console.log("API Response is here lead:", response.data.data);

      const firstObject = response.data.data[0];
      const leadCount = firstObject ? firstObject.length : 0;
      console.log("Latest count", leadCount);

      // Set the total lead count in state
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

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    // Display a notification
    await notifee.displayNotification({
      title: "Flexion",
      body: "Your Ticket is Generated",
      android: {
        channelId,
        smallIcon: "name-of-a-small-icon", // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: "default",
        },
      },
    });
  }

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
