import React from 'react';
import { StyleSheet, View, Image, Platform } from 'react-native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabBarAdvancedButton } from '../components';
import { IS_IPHONE_X } from '../utils';
import { COLORS, FONTS, ICONS } from "../../constants";
import { Dashboard } from "../../modules/home/Dashboard";
import { SaleCancellation } from "../../modules/home/SaleCancellation";
import { SaleSummery } from "../../modules/home/SaleSummery";
import { TotalCollections } from "../../modules/home/TotalCollections";
import { TotalSales } from "../../modules/home/TotalSales";
import { Dashboard2 } from "../../modules/home/Dashboard2";
import { PropertyList } from "../../modules/property/PropertyList";
import { PropertyDetail } from "../../modules/property/propertyDetail";
import { DetailDashbaord } from "../../modules/detailDashboard/DetailDashbaord";
import { PaymentPlan } from "../../modules/paymentPlan/PaymentPlan";
import { Customer } from "../../modules/customer/Customer";
import { CustomerDetail } from "../../modules/customer/CustomerDetail";
import { CustomerContacts } from "../../modules/customer/CustomerContacts";
import { OtherCharges } from "../../modules/otherCharges/OtherCharges";
import { Receipt } from "../../modules/receipt/Receipt";
import { ReceiptDetail } from "../../modules/receipt/ReceiptDetail";
import { TitleDeedReg } from "../../modules/titleDeedRegistration/TitleDeedReg";
import { OQoodReg } from "../../modules/OQoodRegistration/OQoodReg";
import { Notes } from "../../modules/notes/Notes";
import { PRA } from "../../modules/pra/PRA";
import { SOA } from "../../modules/pdfReader/SOA";
import { StatementOfAccount } from "../../modules/pdfReader/StatementOfAccount ";
import { BookingFromStatement } from "../../modules/pdfReader/BookingFromStatement";
import { StatsListing } from "../../modules/propertyStatsListing/StatsListing";
import { History } from "../../modules/history/History";
import { Approval } from "../../modules/approval/Approval";
import { Attachment } from "../../modules/attachments/Attachment";
import CreateReceipt from "../../modules/createReceipt/CreateReceipt";
import ReceiptListing from "../../modules/createReceipt/ReceiptListing";
import CreateCustomer from "../../modules/createCustomer/CreateCustomer";
import PowerBI from "../../modules/powerBI/PowerBI";

import { MyAccount } from "../../modules/profileSetting/ProfileMenu";
import { DeleteAccountScreen } from '../../modules/profileSetting/DeleteAccount';

import { Payment } from '../../modules/payment/Payment';
import { CustomerReceivable } from '../../modules/payment/CustomerReceivable';
import { ReceiveableByUnit } from '../../modules/payment/ReceiveableByUnit';
import { CommissionList } from '../../modules/brokerCommission/CommissionList';
import CommissionDetail from '../../modules/brokerCommission/CommissionDetail';
import CreatePayment from '../../modules/createReceipt/CreatePayment';
import { Home } from '../../modules/home/Home';
import { DashboardListing } from '../../modules/dashboardListing/DashboardListing';
import ComposeEmail from '../../modules/ComposeEmail/ComposeEmail';
import GeneratePaymentLink from '../../modules/generatePaymentLink/GeneratePaymentLink';
import PreReservedForm from '../../modules/dashboardListing/PreReservedForm';
import PayNow from '../../modules/payNow/PayNow';
import PayWebview from '../../modules/payNow/PayWebview';



const BottomBar = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function PropertyStack() {
  return (
    <Stack.Navigator
      initialRouteName={'PropertyList'}>
      <Stack.Screen
        name="PropertyList"
        component={PropertyList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PropertyDetail"
        component={PropertyDetail}
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
        name="Customer"
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
        name="Title Deed Reg"
        component={TitleDeedReg}
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
        name="Notes"
        component={Notes}
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
        name="SOA"
        component={SOA}
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
        name="BookingFromStatement"
        component={BookingFromStatement}
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
    </Stack.Navigator>
  );
}

function DashboardStack() {

  return (
    <Stack.Navigator
      initialRouteName={'Dashboard'}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Graph"
        component={Dashboard2}
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
        name="SaleCancellation"
        component={SaleCancellation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SaleSummery"
        component={SaleSummery}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TotalCollections"
        component={TotalCollections}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TotalSales"
        component={TotalSales}
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
        name="PropertyDetail"
        component={PropertyDetail}
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
        name="Customer"
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
        name="Title Deed Reg"
        component={TitleDeedReg}
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
        name="Notes"
        component={Notes}
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
        name="SOA"
        component={SOA}
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
        name="BookingFromStatement"
        component={BookingFromStatement}
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
        name="PreReservedForm"
        component={PreReservedForm}
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
    </Stack.Navigator>
  )
}

function AccountStack() {

  return (
    <Stack.Navigator
      initialRouteName={'MyAccount'}>
      <Stack.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccountScreen}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}

function FinanceStack() {

  return (
    <Stack.Navigator
      initialRouteName={'Payment'}>
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={`Customer\nReceivable`}
        component={CustomerReceivable}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={`Broker\nCommission`}
        component={CommissionList}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={`Receiveable\nby Unit`}
        component={ReceiveableByUnit}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={`StatementOfAccount`}
        component={StatementOfAccount}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={`Create\nCustomer`}
        component={CreateCustomer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"CreateReceipt"}
        component={CreateReceipt}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={`Receipt\n  `}
        component={ReceiptListing}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={`Power BI`}
        component={PowerBI}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreatePayment"
        component={CreatePayment}
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
        name="ReceiptDetail"
        component={ReceiptDetail}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}

type Props = {
  barColor: string;
};

export const TabBar: React.FC<Props> = ({ barColor }) => (
  <BottomBar.Navigator
    tabBar={(props) => (
      <View style={styles.navigatorContainer}>
        <BottomTabBar
          {...props}
        />
        {IS_IPHONE_X && (
          <View style={[styles.xFillLine, {
            backgroundColor: barColor
          }]} />
        )}
      </View>
    )}
    screenOptions={{

      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: '#A3A1A1',
      tabBarLabelStyle: {
        fontFamily: FONTS.Bold
      },
      tabBarStyle: {
        backgroundColor: barColor,
      },
      style: styles.navigator,
      showIcon: true,
      tabBarItemStyle: {
        marginBottom: 1
      }
    }}
    initialRouteName="DASHBOARD"
  >
    <BottomBar.Screen
      name="Home"
      component={Home}
      options={{
        headerShown: false,
        unmountOnBlur: true,
        tabBarIcon: ({ color }) => (
          <Image
            source={ICONS.contactus}
            style={{ width: 24, height: 24 }}
            resizeMode={'contain'}
          />
        )
      }}
    />
    <BottomBar.Screen
      name="Sale"
      component={FinanceStack}
      options={{
        unmountOnBlur: true,
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Image
            source={ICONS.payment}
            style={{ width: 24, height: 24 }}
            resizeMode={'contain'}
          />
        )
      }}
    />
    <BottomBar.Screen
      name="DASHBOARD"
      component={DashboardStack}
      options={{
        headerShown: false,
        unmountOnBlur: true,
        tabBarButton: (props) => (
          <TabBarAdvancedButton
            bgColor={barColor}
            {...props}
          />
        )
      }}
    />
    <BottomBar.Screen
      name="Property"
      component={PropertyStack}
      options={{
        headerShown: false,
        unmountOnBlur: true,
        tabBarIcon: ({ color }) => (
          <Image
            source={ICONS.property}
            style={{ width: 24, height: 24 }}
            resizeMode={'contain'}
          />
        )
      }}
    />
    <BottomBar.Screen
      name="Profile"
      component={AccountStack}
      options={{
        headerShown: false,
        unmountOnBlur: true,
        tabBarIcon: ({ color }) => (
          <Image
            source={ICONS.profile}
            style={{ width: 24, height: 24 }}
            resizeMode={'contain'}
          />
        )
      }}
    />
  </BottomBar.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  navigator: {
    borderTopWidth: 0,
    backgroundColor: 'transparent',
    elevation: 30
  },
  xFillLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: Platform.OS == "android" ? 34 : 25,
  }
});
