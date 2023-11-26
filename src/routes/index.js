import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthRoutes } from "./AuthRoutes";
import { MainRoutes } from "./MainRoutes";
import Splash from "../modules/splash/Splash";

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Stack.Navigator initialRouteName={"Splash"}>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AuthRoutes"
        component={AuthRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MainRoutes"
        component={MainRoutes}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default App;
