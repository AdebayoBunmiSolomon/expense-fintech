import { layout, moderateScale } from "@src/resources/scaling";
import React from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";

type appContainerProps = {
  children: React.ReactNode;
};

export const AppContainer: React.FC<appContainerProps> = ({ children }) => {
  return <View style={styles.container}>{children && children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Platform.OS === "ios" ? "95%" : "96%",
    height: "100%",
    alignSelf: "center",
    paddingTop:
      Platform.OS === "android" ? StatusBar.currentHeight : layout.size50,
  },
});
