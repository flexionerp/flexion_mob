import React, { } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS, FONTS, ICONS } from '../../../constants';
import Home from '../home/Home';





const Tab = createBottomTabNavigator();


export default function App() {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    position: 'absolute',
                    width: '90%',
                    borderRadius: 31,
                    height: 70,
                    backgroundColor: "#DFE3E6",
                    borderTopWidth: 0,
                    marginBottom: 20,
                    marginTop: 1,
                    marginLeft: '5%',
                    shadowColor: '#00000080',
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
                component={Home}
                options={{
                    unmountOnBlur: true,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabBtnStyle}>
                            <Image
                                source={focused ? ICONS.tab1a : ICONS.tab1}
                                style={{ width: 35, height: 35 }}
                                resizeMode={'contain'}
                            />
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name="BunchKeysStack"
                component={Home}
                options={{
                    unmountOnBlur: true,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabBtnStyle}>
                            <Image
                                source={focused ? ICONS.tab2a : ICONS.tab2}
                                style={{ width: 35, height: 35, }}
                                resizeMode={'contain'}
                            />
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name="SettingTabStack"
                component={Home}
                options={{
                    unmountOnBlur: true,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabBtnStyle}>
                            <Image
                                source={focused ? ICONS.tab3a : ICONS.tab3}
                                style={{ width: 35, height: 35, }}
                                resizeMode={'contain'}
                            />
                        </View>
                    )
                }}
            />

            <Tab.Screen
                name="LogBookStack"
                component={Home}
                options={{
                    unmountOnBlur: true,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabBtnStyle}>
                            <Image
                                source={focused ? ICONS.tab4a : ICONS.tab4}
                                style={{ width: 35, height: 35, }}
                                resizeMode={'contain'}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Home}
                options={{
                    unmountOnBlur: true,
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.tabBtnStyle}>
                            <Image
                                source={focused ? ICONS.tab5a : ICONS.tab5}
                                style={{ width: 35, height: 35, }}
                                resizeMode={'contain'}
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000000A2',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    tabBtnStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 10
    },
    tabBtnStyleActive: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 10
    },
    labelStyle: {
        color: COLORS.secondry,
        fontFamily: FONTS.Bold,
        fontSize: 14,
        marginTop: 3
    },
    labelStyleA: {
        color: "#C1B69A",
        fontFamily: FONTS.Bold,
        fontSize: 14,
        marginTop: 3

    }
});
