import React from "react";
import { View, StyleSheet, Image, Text, ImageBackground } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS, FONTS, ICONS } from "../../../constants";
import Home from "../home/Home";
import UnitListing from "../unit/unitListing";
import { DetailDashbaord } from "../detailDashboard/detailDashbaord";
import PaymentPlan from "../paymentPlan/PaymentPlan";
import AddPayment from "../addPayment/AddPayment";
import Blogs from "../blogs/Blogs";
import ConstructionUpdate from "../construction/ConstructionUpdate";
import { StatementOfAccount } from "../pdfReader/StatementOfAccount ";
import { MyAccount } from "../../profileSetting/ProfileMenu";
import { GraphsListing } from "../graphs/GraphsListing";
import { Customer } from "../customer/Customer";
import { CustomerDetail } from "../customer/CustomerDetail";
import { CustomerContacts } from "../customer/CustomerContacts";
import { OtherCharges } from "../otherCharges/OtherCharges";
import { BookingFromStatement } from "../pdfReader/BookingFromStatement";
import { PRA } from "../pra/PRA";
import { Receipt } from "../receipt/Receipt";
import { ReceiptDetail } from "../receipt/ReceiptDetail";
import { Notes } from "../notes/Notes";
import { TitleDeedReg } from "../titleDeedRegistration/TitleDeedReg";
import { History } from "../history/History";
import { Approval } from "../approval/Approval";
import { Attachment } from "../attachments/Attachment";
import ComposeEmail from "../ComposeEmail/ComposeEmail";
import GeneratePaymentLink from "../generatePaymentLink/GeneratePaymentLink";
import { OQoodReg } from "../OQoodRegistration/OQoodReg";
import PayNow from "../payNow/PayNow";
import PayWebview from "../payNow/PayWebview";
import { SOA } from "../pdfReader/SOA";
import { DashboardListing } from "../../adminApp/dashboardListing/DashboardListing";
import { StatsListing } from "../../adminApp/propertyStatsListing/StatsListing";
import PayNowDashboard from "../payNow/PayNowDashboard";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function UnitStack() {
  return (
    <Stack.Navigator initialRouteName={"UnitListing"}>
      <Stack.Screen
        name="UnitListing"
        component={UnitListing}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailDashbaord"
        component={DetailDashbaord}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Payment Plan"
        component={PaymentPlan}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddPayment"
        component={AddPayment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StatementOfAccount"
        component={StatementOfAccount}
        options={{
          headerShown: false,
        }}
      />
      {/*  */}
      <Stack.Screen
        name="Customer Detail"
        component={Customer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerDetail"
        component={CustomerDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerContacts"
        component={CustomerContacts}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Other charges"
        component={OtherCharges}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookingFromStatement"
        component={BookingFromStatement}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PRA"
        component={PRA}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Receipt"
        component={Receipt}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ReceiptDetail"
        component={ReceiptDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Notes"
        component={Notes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Title Deed Reg"
        component={TitleDeedReg}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Approval"
        component={Approval}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Attachment"
        component={Attachment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Compose Email"
        component={ComposeEmail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Generate Payment Link"
        component={GeneratePaymentLink}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="OQOOD Reg"
        component={OQoodReg}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Pay Now"
        component={PayNow}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PayWebview"
        component={PayWebview}
        options={{
          headerShown: false,
        }}
      />

      {/*
            <Stack.Screen
                name="SOA"
                component={SOA}
                options={{
                    headerShown: false,
                }}
            />
            
            <Stack.Screen
                name="PayWebview"
                component={PayWebview}
                options={{
                    headerShown: false,
                }}
            /> */}
      {/*  */}
      <Stack.Screen
        name="GraphsListing"
        component={GraphsListing}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName={"HomeScreen"}>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DashboardListing"
        component={DashboardListing}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailDashbaord"
        component={DetailDashbaord}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StatsListing"
        component={StatsListing}
        options={{
          headerShown: false,
        }}
      />
      {/* from here */}
      <Stack.Screen
        name="Payment Plan"
        component={PaymentPlan}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddPayment"
        component={AddPayment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StatementOfAccount"
        component={StatementOfAccount}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Customer Detail"
        component={Customer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerDetail"
        component={CustomerDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerContacts"
        component={CustomerContacts}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Other charges"
        component={OtherCharges}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookingFromStatement"
        component={BookingFromStatement}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PRA"
        component={PRA}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Receipt"
        component={Receipt}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ReceiptDetail"
        component={ReceiptDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Notes"
        component={Notes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Title Deed Reg"
        component={TitleDeedReg}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Approval"
        component={Approval}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Attachment"
        component={Attachment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Compose Email"
        component={ComposeEmail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Generate Payment Link"
        component={GeneratePaymentLink}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="OQOOD Reg"
        component={OQoodReg}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Pay Now"
        component={PayNow}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PayNowDashboard"
        component={PayNowDashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PayWebview"
        component={PayWebview}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          width: "90%",
          borderRadius: 31,
          height: 70,
          backgroundColor: "#DFE3E6",
          borderTopWidth: 0,
          marginBottom: 20,
          marginTop: 1,
          marginLeft: "5%",
          shadowColor: "#00000080",
          elevation: 10,
          shadowOffset: { width: 1, height: 2 },
          shadowRadius: 4,
          shadowOpacity: 0.26,
        },
      }}
      initialRouteName={"Dashboard"}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBtnStyle}>
              {focused ? (
                <ImageBackground source={ICONS.tabBg} style={{ width: 52, height: 52, justifyContent: "center", alignItems: "center" }}>
                  <Image source={ICONS.tab1a} style={{ width: 35, height: 35 }} resizeMode={"contain"} />
                </ImageBackground>
              ) : (
                <Image source={ICONS.tab1} style={{ width: 35, height: 35 }} resizeMode={"contain"} />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Unit"
        component={UnitStack}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBtnStyle}>
              {focused ? (
                <ImageBackground source={ICONS.tabBg} style={{ width: 52, height: 52, justifyContent: "center", alignItems: "center" }}>
                  <Image source={ICONS.tab2a} style={{ width: 35, height: 35 }} resizeMode={"contain"} />
                </ImageBackground>
              ) : (
                <Image source={ICONS.tab2} style={{ width: 35, height: 35 }} resizeMode={"contain"} />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Blogs"
        component={Blogs}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBtnStyle}>
              {focused ? (
                <ImageBackground source={ICONS.tabBg} style={{ width: 52, height: 52, justifyContent: "center", alignItems: "center" }}>
                  <Image source={ICONS.tab3a} style={{ width: 25, height: 25 }} resizeMode={"contain"} />
                </ImageBackground>
              ) : (
                <Image source={ICONS.tab3} style={{ width: 35, height: 35 }} resizeMode={"contain"} />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Construction"
        component={ConstructionUpdate}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBtnStyle}>
              {focused ? (
                <ImageBackground source={ICONS.tabBg} style={{ width: 52, height: 52, justifyContent: "center", alignItems: "center" }}>
                  <Image source={ICONS.tab4a} style={{ width: 35, height: 35 }} resizeMode={"contain"} />
                </ImageBackground>
              ) : (
                <Image source={ICONS.tab4} style={{ width: 35, height: 35 }} resizeMode={"contain"} />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={MyAccount}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBtnStyle}>
              {focused ? (
                <ImageBackground source={ICONS.tabBg} style={{ width: 52, height: 52, justifyContent: "center", alignItems: "center" }}>
                  <Image source={ICONS.tab6a} style={{ width: 35, height: 35 }} resizeMode={"contain"} />
                </ImageBackground>
              ) : (
                <Image source={ICONS.tab6} style={{ width: 35, height: 35 }} resizeMode={"contain"} />
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000A2",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  tabBtnStyle: {
    justifyContent: "center",
    alignItems: "center",
    top: 10,
  },
  tabBtnStyleActive: {
    justifyContent: "center",
    alignItems: "center",
    top: 10,
  },
  labelStyle: {
    color: COLORS.secondry,
    fontFamily: FONTS.Bold,
    fontSize: 14,
    marginTop: 3,
  },
  labelStyleA: {
    color: "#C1B69A",
    fontFamily: FONTS.Bold,
    fontSize: 14,
    marginTop: 3,
  },
});
