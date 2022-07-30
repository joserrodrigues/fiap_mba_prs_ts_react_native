import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { registerRootComponent } from "expo";
import Colors from "../Styles/Colors";

import HomeController from "../Screens/Home/HomeController";
import DetailController from "../Screens/Detail/DetailController";
import MyInfoController from "../Screens/MyInfo/MyInfoController";
import MyPositionController from "../Screens/MyPosition/MyPositionController";

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

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

function RouteController() {

  let screenOptions = {
    headerShown: true,
    headerStyle: {
      backgroundColor: Colors.HeaderBackgroundColor,
    },
    headerTintColor: Colors.HeaderTintColor,
    headerLayoutPreset: "center",
  };

  const StackHome = () => {
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

}

export default registerRootComponent(RouteController);
