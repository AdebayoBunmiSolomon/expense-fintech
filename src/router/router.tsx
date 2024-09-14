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
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { storageKey } from "@src/cache/storage-key";

const ScreenStack = createNativeStackNavigator<RootStackParamList>();
const headerOptions: NativeStackNavigationOptions = { headerShown: false };

export const Router = () => {
  // useEffect(() => {
  //   const deleteCache = async () => {
  //     await AsyncStorage.removeItem(storageKey.CATEGORY);
  //     await AsyncStorage.removeItem(storageKey.EXPENSE);
  //   };
  //   deleteCache();
  // });

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
