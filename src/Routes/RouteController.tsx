import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { registerRootComponent } from "expo";
import Colors from "../Styles/Colors";

import HomeController from "../Screens/Home/HomeController";
import DetailController from "../Screens/Detail/DetailController";
import MyInfoController from "../Screens/MyInfo/MyInfoController";
import MyPositionController from "../Screens/MyPosition/MyPositionController";
import LoginController from "../Screens/Login/LoginController";

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store/store";

import { useAppSelector } from "../store/hooks";
import { Provider } from "react-redux";
import { useManageNotification } from "../Services/Notification/ManageNotification";
import * as Updates from "expo-updates";
import LoadingUpdateController from "../Screens/LoadingUpdate/LoadingUpdateController";

export type RootStackParamList = {
  Home: undefined;
  Details: { itemID: number; info: string };
  MyInfo: undefined;
  MyPosition: undefined;
};

export type RootDrawerParamList = {
  Main: undefined;
  MyInfoDrawer: undefined;
  MyPositionDrawer: undefined;
};

let screenOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: Colors.HeaderBackgroundColor,
  },
  headerTintColor: Colors.HeaderTintColor,
  headerLayoutPreset: "center",
};

export const StackHome = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeController}
        options={screenOptions}
      />
      <Stack.Screen
        name="Details"
        component={DetailController}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};
const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

export function RouteController() {
  const userInfo = useAppSelector((state) => state.login.user);
  useManageNotification();

  const [hasUpdate, setHasUpdate] = useState(false);

  useEffect(() => {
    async function updateApp() {
      //*
      const { isAvailable } = await Updates.checkForUpdateAsync();
      if (isAvailable) {
        setHasUpdate(true);
      }
      /*/

      setTimeout(() => {
        console.log("AQUI Set Timeout");

        setHasUpdate(true);
      }, 2000);
      //*/
    }
    updateApp();
  }, []);

  const StackMyInfo = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MyInfo"
          component={MyInfoController}
          options={{ ...screenOptions, title: "Minhas Informações" }}
        />
      </Stack.Navigator>
    );
  };

  const StackMyPosition = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MyPosition"
          component={MyPositionController}
          options={{ ...screenOptions, title: "Minha Posição" }}
        />
      </Stack.Navigator>
    );
  };

  if (hasUpdate) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MyPosition"
            component={LoadingUpdateController}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (userInfo && userInfo.token !== "") {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Main">
          <Drawer.Screen
            name="Main"
            component={StackHome}
            options={{ drawerLabel: "Main", headerShown: false }}
          />
          <Drawer.Screen
            name="MyInfoDrawer"
            component={StackMyInfo}
            options={{ drawerLabel: "Minha Informação", headerShown: false }}
          />
          <Drawer.Screen
            name="MyPositionDrawer"
            component={StackMyPosition}
            options={{ drawerLabel: "Minha Posição", headerShown: false }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="MyPosition"
            component={LoginController}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const RouteControllerManagement = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouteController />
      </PersistGate>
    </Provider>
  );
};

export default registerRootComponent(RouteControllerManagement);
