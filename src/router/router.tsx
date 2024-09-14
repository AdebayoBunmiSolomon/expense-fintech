import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { RootStackParamList } from "./types";
import { screenNames } from "@src/navigations";
import { AddExpense, ViewExpense } from "@src/screens";
import { CreateCategory } from "@src/screens/create-category";
import { StatusBar } from "expo-status-bar";

const ScreenStack = createNativeStackNavigator<RootStackParamList>();
const headerOptions: NativeStackNavigationOptions = { headerShown: false };

export const Router = () => {
  return (
    <NavigationContainer>
      <StatusBar style={"dark"} />
      <ScreenStack.Navigator screenOptions={headerOptions}>
        <ScreenStack.Screen
          name={screenNames.VIEW_EXPENSE}
          component={ViewExpense}
        />
        <ScreenStack.Screen
          name={screenNames.ADD_EXPENSE}
          component={AddExpense}
        />
        <ScreenStack.Screen
          name={screenNames.CREATE_CATEGORY}
          component={CreateCategory}
        />
      </ScreenStack.Navigator>
    </NavigationContainer>
  );
};
