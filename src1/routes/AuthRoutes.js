import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../modules/profile/Login';
import { Signup } from '../modules/profile/Signup';
import { ForgotPassword } from '../modules/profile/ForgotPassword';


const Stack = createNativeStackNavigator();

export function AuthRoutes() {
    return (
        <Stack.Navigator
            initialRouteName={'LoginScreen'}>
            <Stack.Screen
                name="LoginScreen"
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SignupScreen"
                component={Signup}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}