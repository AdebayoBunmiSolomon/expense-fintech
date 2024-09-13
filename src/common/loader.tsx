import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

type loaderProps = {
  color: string;
  size: "small" | "large";
};

export const Loader: React.FC<loaderProps> = ({ color, size }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
