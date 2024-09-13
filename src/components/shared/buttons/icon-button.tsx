import React from "react";
import {
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  Platform,
} from "react-native";
import { useButton } from "../hooks";
import { DVH, moderateScale } from "@src/resources/scaling";
import { RegularText } from "../text/regular-text";
import { MediumText } from "../text/medium-text";
import { LightText } from "../text/light-text";
import { BoldText } from "../text/bold-text";
import { colors } from "@src/resources/colors";
import { Loader } from "@src/common";

type iconButtonProps = {
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
  icon?: React.ReactNode;
  isLoading?: boolean;
};

export const IconButton: React.FC<iconButtonProps> = ({
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
  icon,
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
      ) : (
        <>
          {titleType === "bold" ? (
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
          {icon && icon}
        </>
      )}
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
