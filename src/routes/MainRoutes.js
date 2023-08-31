import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Sidebar from '../modules/sidebar/Sidebar';
// import { Dashboard } from '../modules/home/Dashboard';
import CustomerTab from '../modules/customerApp/bottomTab/BottomTab';
import AdminTab from '../modules/adminApp/bottomTab/BottomTab';
import { useSelector } from 'react-redux';
// import {Darwer} from '../modules/sidebar/Darwer';
import PayNow from '../modules/customerApp/payNow/PayNow';
import PayWebview from '../modules/customerApp/payNow/PayWebview';
import ResetPassword from '../modules/profile/ResetPassword';


const Stack = createNativeStackNavigator();

export function MainRoutes() {
    const { isCustomer } = useSelector(state => state.user)
    return (
        <Stack.Navigator initialRouteName={isCustomer ? 'CustomerTab' : 'AdminTab'}>
            <Stack.Screen
                name="CustomerTab"
                component={CustomerTab}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="AdminTab"
                component={AdminTab}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="PayNow"
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
            <Stack.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}