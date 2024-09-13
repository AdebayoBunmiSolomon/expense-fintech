import { colors } from "@src/resources/colors";
import React from "react";
import { ViewStyle, TouchableOpacity, StyleSheet } from "react-native";
import { useButton } from "../hooks";
import { DVW, moderateScale } from "@src/resources/scaling";
import { MaterialIcons } from "@expo/vector-icons";
import { Loader } from "@src/common";

type circularIconButtonProps = {
  style?: ViewStyle;
  titleType: "regular" | "medium" | "light" | "bold";
  onPress: () => void;
  bgBlack?: boolean;
  bgWhite?: boolean;
  bgMain?: boolean;
  bgLightGray?: boolean;
  bgDarkGray?: boolean;
  bgCream?: boolean;
  bgBlue?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
};

export const CircularIconButton: React.FC<circularIconButtonProps> = ({
  isLoading,
  style,
  onPress,
  bgBlack,
  bgWhite,
  bgMain,
  bgLightGray,
  bgDarkGray,
  bgCream,
  bgBlue,
  icon,
}) => {
  const { btnBgColor } = useButton();
  const bgColor = btnBgColor(
    bgBlack,
    bgWhite,
    bgMain,
    bgLightGray,
    bgDarkGray,
    bgCream,
    bgBlue
  );
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: bgColor ? bgColor : style?.backgroundColor,
        },
      ]}>
      {isLoading ? (
        <Loader size='small' color={colors.white} />
      ) : icon ? (
        icon && icon
      ) : (
        <MaterialIcons
          name='error'
          size={moderateScale(20)}
          color={colors.white}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderWidth: DVW(0.3),
    borderRadius: 100,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
