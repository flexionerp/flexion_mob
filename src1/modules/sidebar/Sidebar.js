import React, { } from 'react';
import { Text, Image, View, TouchableOpacity, Platform, StatusBar } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, } from '@react-navigation/drawer';


import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { COLORS, ICONS } from '../../constants';
import { Dashboard } from "../home/Dashboard";


function CustomDrawerContent(props) {

    return (
        <DrawerContentScrollView {...props} style={{ borderRadius: 0, marginTop: Platform.OS === 'android' ? -StatusBar.currentHeight : 0 }}>
            <View style={{ width: wp('80'), alignItems: 'flex-end', backgroundColor: COLORS.primary, marginTop: -5, paddingTop: 5 }}>
                <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
                    <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center', marginTop: -6 }}>
                        <Image style={{ width: 13, height: 13, marginBottom: 10 }} source={ICONS.back} resizeMode={'stretch'} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ width: wp('100'), alignSelf: 'center', paddingBottom: 10, alignItems: 'center', backgroundColor: COLORS.primary }}>

                <Image
                    source={ICONS.userIcon}
                    style={{ width: 60, height: 60, alignSelf: 'center', borderRadius: 50 }}
                />
                <View style={{ marginBottom: 5 }}>
                    <Text style={{ fontSize: 16, color: '#FFF', width: wp('65'), textAlign: 'center' }}>King</Text>
                    <Text style={{ fontSize: 12, color: '#FFF', width: wp('65'), textAlign: 'center' }}>Chohan</Text>
                </View>
            </View>
            <View style={{ height: 25 }} />

            <TouchableOpacity onPress={() => props.navigation.navigate('Main_Home')} style={{ marginStart: 30 }}>
                <View style={{ flexDirection: 'row', width: wp('68'), alignSelf: 'center', height: 45, marginBottom: 8 }}>
                    <Image source={ICONS.userIcon} style={{ width: 20, height: 20, marginTop: 0 }} resizeMode={'stretch'} />

                    <View style={{ marginLeft: 13, }}>
                        <Text style={{ color: '#272755', fontSize: 16 }}>Home</Text>
                        <Divider style={{ width: wp('65'), height: 1.25, backgroundColor: '#F1F3F8', marginTop: 15, }} />
                    </View>
                </View>
            </TouchableOpacity>


            <View style={{ flexDirection: 'row', alignItems: 'center', width: wp('100'), justifyContent: 'flex-start', marginTop: 50, marginStart: wp('10') }}>
                <Image source={ICONS.logoFlx} style={{ width: 140, height: 100 }} resizeMode={'contain'} />
                <Text style={{ fontSize: 10, marginTop: 15, marginLeft: -20 }} >v2.5.2</Text>
            </View>
        </DrawerContentScrollView>
    );
}



const Drawer = createDrawerNavigator();

export default function App() {
    return (

        <Drawer.Navigator
            drawerStyle={{
                backgroundColor: '#FFFFFF',
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5
            }}
            drawerContentOptions={{
                activeTintColor: '#2B88B2',
                inactiveTintColor: '#272755',
                itemStyle: { height: 40, justifyContent: 'center', marginTop: 0, },
                labelStyle: { fontSize: 13, marginLeft: -20 }
            }}
            drawerContent={props => <CustomDrawerContent {...props} />}

            initialRouteName="Dashboard">
            <Drawer.Screen
                name="Dashboard"
                component={Dashboard}
                options={{
                    drawerLabel: 'Dashboard', drawerIcon: () => <Image source={ICONS.user} style={{ width: 18, height: 18 }} resizeMode={'stretch'} />
                }}
            />

        </Drawer.Navigator>
    );
}












