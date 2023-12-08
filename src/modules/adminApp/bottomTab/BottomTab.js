import React from "react";
import { View, StyleSheet, Image, Text, ImageBackground, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS, FONTS, ICONS } from "../../../constants";
import Home from "../home/Home";
import PieChart from "../charts/PieChart";

import UnitListing from "../unit/unitListing";
import Construction from "../construction/ConstructionUpdate";
import { MyAccount } from "../../profileSetting/ProfileMenu";
import PreReservedForm from "../prereserveForm/PreReservedForm";
import UnitDetail from "../../customerApp/unitDetail/UnitDetail";
import { DashboardListing } from "../dashboardListing/DashboardListing";
import CreateCustomer from "../createCustomer/CreateCustomer";
import ReceiptListing from "../createReceipt/ReceiptListing";
import CreateReceipt from "../createReceipt/CreateReceipt";
import { CommissionList } from "../brokerCommission/CommissionList";
import CommissionDetail from "../brokerCommission/CommissionDetail";

// Detail Dashboard
import { DetailDashbaord } from "../../customerApp/detailDashboard/detailDashbaord";
import PaymentPlan from "../../customerApp/paymentPlan/PaymentPlan";
import AddPayment from "../../customerApp/addPayment/AddPayment";
import { StatementOfAccount } from "../../customerApp/pdfReader/StatementOfAccount ";
import { Customer } from "../../customerApp/customer/Customer";
import { CustomerDetail } from "../../customerApp/customer/CustomerDetail";
import { CustomerContacts } from "../../customerApp/customer/CustomerContacts";
import { OtherCharges } from "../../customerApp/otherCharges/OtherCharges";
import { BookingFromStatement } from "../../customerApp/pdfReader/BookingFromStatement";
import { PRA } from "../../customerApp/pra/PRA";
import { Receipt } from "../../customerApp/receipt/Receipt";
import { ReceiptDetail } from "../../customerApp/receipt/ReceiptDetail";
import { Notes } from "../../customerApp/notes/Notes";
import { TitleDeedReg } from "../../customerApp/titleDeedRegistration/TitleDeedReg";
import { History } from "../../customerApp/history/History";
import { Approval } from "../../customerApp/approval/Approval";
import { Attachment } from "../../customerApp/attachments/Attachment";
import ComposeEmail from "../../customerApp/ComposeEmail/ComposeEmail";
import GeneratePaymentLink from "../../customerApp/generatePaymentLink/GeneratePaymentLink";
import { OQoodReg } from "../../customerApp/OQoodRegistration/OQoodReg";
import PayNow from "../../customerApp/payNow/PayNow";
import { CustomerReceivable } from "../payment/CustomerReceivable";
import { ReceiveableByUnit } from "../payment/ReceiveableByUnit";
import { PriceSetup } from "../priceSetup/PriceSetup";
import { PriceDetail } from "../priceSetup/PriceDetail";
import { TotalAvailable } from "../totalAvailable/TotalAvailable";
import { TotalAvailableListings } from "../totalAvailable/TotalAvailableListings";
import { TotalLeadListings } from "../totalLead/TotalLeadListings";
import { TotalLeadDetails } from "../totalLead/TotalLeadDetails";
import { TotalLeadMainListings } from "../totalAvailable/TotalLeadMainListings";
import { LabelWise } from "../totalAvailable/LabelWise";
import { AgentWise } from "../totalAvailable/AgentWise";
import { LeadNotes } from "../leadNotes/Notes";
import ToggleSwitch from "../reminder/ToggleSwitch";
import { TimeLine } from "../totalAvailable/TimeLine";
import { Reminder } from "../reminder/Reminder";
import PowerBI from "../powerBI/PowerBI";
import { StatsListing } from "../propertyStatsListing/StatsListing";
import { MessagesBody } from "../messagesScreen/MessagesBody";
import { HomeInProgress } from "../homeInprogress/HomeInProgress";
import Attachments from "../totalLead/Attachments";
import { InboxMessagesScreen } from "../messagesScreen/InboxMessagesScreen";
import { SentMessagesScreen } from "../messagesScreen/SentMessagesScreen";
import { LeadStatusChange } from "../totalLead/LeadStatusChange";
import { ComposeMail } from "../messagesScreen/ComposeMail";
import { LeadAgentChange } from "../totalLead/LeadAgentChange";
import { LeadTagChange } from "../totalLead/LeadTagChange";
import { LeadClick } from "../totalLead/LeadClick";
import Graph from "../charts/Graph";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeRoutes() {
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
        name="HomeInProgress"
        component={HomeInProgress}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LeadClick"
        component={LeadClick}
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
      <Stack.Screen
        name="PreReservedForm"
        component={PreReservedForm}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MessagesBody"
        component={MessagesBody}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReceiptListing"
        component={ReceiptListing}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateReceipt"
        component={CreateReceipt}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CommissionList"
        component={CommissionList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CommissionDetail"
        component={CommissionDetail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Attachments"
        component={Attachments}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LeadAgentChange"
        component={LeadAgentChange}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CustomerReceivable"
        component={CustomerReceivable}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReceiveableByUnit"
        component={ReceiveableByUnit}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PowerBI"
        component={PowerBI}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PriceSetup"
        component={PriceSetup}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Reminder"
        component={Reminder}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TimeLine"
        component={TimeLine}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ToggleSwitch"
        component={ToggleSwitch}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TotalAvailable"
        component={TotalAvailable}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LeadStatusChange"
        component={LeadStatusChange}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SentMessagesScreen"
        component={SentMessagesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LabelWise"
        component={LabelWise}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AgentWise"
        component={AgentWise}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ComposeMail"
        component={ComposeMail}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TotalAvailableListings"
        component={TotalAvailableListings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TotalLeadListings"
        component={TotalLeadListings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TotalLeadDetails"
        component={TotalLeadDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TotalLeadMainListings"
        component={TotalLeadMainListings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LeadNotes"
        component={LeadNotes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="InboxMessagesScreen"
        component={InboxMessagesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LeadTagChange"
        component={LeadTagChange}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PriceDetail"
        component={PriceDetail}
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
    </Stack.Navigator>
  );
}

function UnitRoutes() {
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
      {/* <Stack.Screen
        name="Graph"
        component={Graph}
        options={{
          headerShown: false,
        }}
      /> */}
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
        name="UnitDetail"
        component={UnitDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function ChartRoutes() {
  return (
    <Stack.Navigator initialRouteName={"Chart"}>
      <Stack.Screen
        name="Chart"
        component={PieChart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Graph"
        component={Graph}
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
          marginBottom: Platform.OS == "ios" ? 20 : 10,
          marginTop: 1,
          marginLeft: "5%",
          shadowColor: "#00000080",
          elevation: 10,
          shadowOffset: { width: 1, height: 2 },
          shadowRadius: 4,
          shadowOpacity: 0.26,
        },
      }}
      initialRouteName={"Charts"}
    >
      <Tab.Screen
        name="Home"
        component={HomeRoutes}
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
        name="Charts"
        component={ChartRoutes}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBtnStyle}>
              {focused ? (
                <ImageBackground source={ICONS.tabBg} style={{ width: 52, height: 52, justifyContent: "center", alignItems: "center" }}>
                  <Image source={ICONS.charta} style={{ width: 30, height: 30 }} resizeMode={"contain"} />
                </ImageBackground>
              ) : (
                <Image source={ICONS.chart} style={{ width: 35, height: 35 }} resizeMode={"contain"} />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Unit"
        component={UnitRoutes}
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
        name="Customer"
        component={CreateCustomer}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabBtnStyle}>
              {focused ? (
                <ImageBackground source={ICONS.tabBg} style={{ width: 52, height: 52, justifyContent: "center", alignItems: "center" }}>
                  <Image source={ICONS.tab5a} style={{ width: 35, height: 35 }} resizeMode={"contain"} />
                </ImageBackground>
              ) : (
                <Image source={ICONS.tab5} style={{ width: 35, height: 35 }} resizeMode={"contain"} />
              )}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Construction"
        component={Construction}
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

// Happy Coding :)
