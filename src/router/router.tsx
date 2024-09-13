import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "./types";
import { screenNames } from "@src/navigations";
import { AddExpense, ViewExpense } from "@src/screens";
import { CreateCategory } from "@src/screens/create-category";

const ScreenStack = createNativeStackNavigator<RootStackParamList>();
const headerOptions: NativeStackNavigationOptions = { headerShown: false };

export const Router = () => {
  return (
    <NavigationContainer>
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
