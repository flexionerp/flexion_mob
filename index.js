/**
 * @format
 */
import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { AppRegistry, LogBox } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

// import App from './src/modules/customerApp/bottomTab/BottomTab';

import App from "./src/routes";
import { name as appName } from "./app.json";
import { getPropertyStats } from "./src/redux/property/property.action";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPropertyStats());
    return () => {};
  }, []);

  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

const Root = () => {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Root);

// Happy Coding :)
