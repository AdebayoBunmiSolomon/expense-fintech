import { Loader } from "@src/common";
import { BoldText } from "@src/components/shared/text/bold-text";
import { colors } from "@src/resources/colors";
import { DVH, DVW, verticalScale } from "@src/resources/scaling";
import React from "react";
import { View, StyleSheet } from "react-native";

export const AppLoader = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <BoldText sizeLarge main>
            Expense
          </BoldText>
          <BoldText sizeLarge blue>
            Application
          </BoldText>
        </View>
      </View>
      <View style={styles.loaderContainer}>
        <Loader color={colors.main} size='large' />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: DVW(15),
    height: DVH(7.5),
  },
  loaderContainer: {
    flex: 0.1,
    justifyContent: "flex-end",
    bottom: verticalScale(50),
  },
});
