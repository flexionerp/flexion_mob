import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Sidebar from '../modules/sidebar/Sidebar';
// import { Dashboard } from '../modules/home/Dashboard';
import bottomTab from '../modules/customerApp/bottomTab/BottomTab';
// import {Darwer} from '../modules/sidebar/Darwer';


const Stack = createNativeStackNavigator();

export function MainRoutes() {
    return (
        <Stack.Navigator
            initialRouteName={'bottomTab'}>
            <Stack.Screen
                name="bottomTab"
                component={bottomTab}
                options={{
                    headerShown: false,
                }}
            />
            {/* <Stack.Screen
                name="Darwer"
                component={Darwer}
                options={{
                    headerShown: false,
                }}
            /> */}
            
        </Stack.Navigator>
    );
}