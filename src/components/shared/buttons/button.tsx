import React from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { BoldText } from "../text/bold-text";
import { LightText } from "../text/light-text";
import { MediumText } from "../text/medium-text";
import { RegularText } from "../text/regular-text";
import { DVH, moderateScale } from "@src/resources/scaling";
import { useButton } from "../hooks";
import { colors } from "@src/resources/colors";
import { Loader } from "@src/common";

type buttonProps = {
  title: string;
  style?: ViewStyle;
  titleType: "regular" | "medium" | "light" | "bold";
  onPress: () => void;
  textBlack?: boolean;
  textWhite?: boolean;
  textMain?: boolean;
  textLightGray?: boolean;
  textDarkGray?: boolean;
  textCream?: boolean;
  textBlue?: boolean;
  bgBlack?: boolean;
  bgWhite?: boolean;
  bgMain?: boolean;
  bgLightGray?: boolean;
  bgDarkGray?: boolean;
  bgCream?: boolean;
  bgBlue?: boolean;
  isLoading?: boolean;
};

export const Button: React.FC<buttonProps> = ({
  title,
  style,
  titleType,
  onPress,
  textBlack,
  textWhite,
  textMain,
  textLightGray,
  textDarkGray,
  textCream,
  textBlue,
  bgBlack,
  bgWhite,
  bgMain,
  bgLightGray,
  bgDarkGray,
  bgCream,
  bgBlue,
  isLoading,
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
      ) : titleType === "bold" ? (
        <BoldText
          sizeBody
          black={textBlack && textBlack}
          white={textWhite && textWhite}
          main={textMain && textMain}
          lightGray={textLightGray && textLightGray}
          darkGray={textDarkGray && textDarkGray}
          blue={textBlue && textBlue}>
          {title ? title : "no-title"}
        </BoldText>
      ) : titleType === "light" ? (
        <LightText
          sizeBody
          black={textBlack && textBlack}
          white={textWhite && textWhite}
          main={textMain && textMain}
          lightGray={textLightGray && textLightGray}
          darkGray={textDarkGray && textDarkGray}
          blue={textBlue && textBlue}>
          {title ? title : "no-title"}
        </LightText>
      ) : titleType === "medium" ? (
        <MediumText
          sizeBody
          black={textBlack && textBlack}
          white={textWhite && textWhite}
          main={textMain && textMain}
          lightGray={textLightGray && textLightGray}
          darkGray={textDarkGray && textDarkGray}
          blue={textBlue && textBlue}>
          {title ? title : "no-title"}
        </MediumText>
      ) : titleType === "regular" ? (
        <RegularText
          sizeBody
          black={textBlack && textBlack}
          white={textWhite && textWhite}
          main={textMain && textMain}
          lightGray={textLightGray && textLightGray}
          darkGray={textDarkGray && textDarkGray}
          blue={textBlue && textBlue}>
          {title ? title : "no-title"}
        </RegularText>
      ) : undefined}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: moderateScale(10),
    width: "100%",
    paddingVertical: Platform.OS === "ios" ? DVH(2) : DVH(1.5),
    alignSelf: "center",
    borderRadius: moderateScale(10),
  },
});
