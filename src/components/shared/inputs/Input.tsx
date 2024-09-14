import { DVW, font, layout } from "@src/resources/scaling";
import React from "react";
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RegularText } from "../text/regular-text";
import { colors } from "@src/resources/colors";
import { useInput } from "../hooks";
import { fontFamily } from "@src/resources/fonts/font-family";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type inputProps = {
  placeholder: string;
  label: string;
  searchInput?: boolean;
  dropDown?: boolean;
  onPressDropDown?: () => void;
  onSubmitEditing?: () => void;
  editable?: boolean;
  selectTextOnFocus?: boolean;
  passwordInput?: boolean;
  phoneNumberInput?: boolean;
  numberInput?: boolean;
  inputStyle?: StyleProp<ViewStyle> | any;
  error?: string;
  onChangeText?: (value: any) => void;
  value?: any;
};

export const Input: React.FC<inputProps> = ({
  placeholder,
  label,
  searchInput,
  dropDown,
  onPressDropDown,
  onSubmitEditing,
  editable,
  selectTextOnFocus,
  passwordInput,
  phoneNumberInput,
  numberInput,
  inputStyle,
  error,
  ...props
}) => {
  const { borderColor, onBlurInputFocus, onTextInputFocus, inputIconColor } =
    useInput();

  //get border color of input
  const getBorderColor = () => {
    if (error) {
      return colors.main;
    } else {
      return borderColor();
    }
  };

  //get icon color of icon
  const getIconColor = () => {
    if (error) {
      return colors.main;
    } else {
      return inputIconColor();
    }
  };

  return (
    <>
      <View style={styles.textMainContainer}>
        {label && (
          <View style={[styles.label]}>
            <RegularText sizeSmall>{label}</RegularText>
          </View>
        )}
        <View
          style={[
            styles.textContainer,
            {
              width: inputStyle ? inputStyle?.width : "100%",
              borderColor: getBorderColor(),
            },
          ]}>
          <TextInput
            placeholder={placeholder && placeholder}
            style={[
              styles.textInput,
              {
                color: colors.black,
                width: inputStyle?.width ? "75%" : "90%",
              },
            ]}
            placeholderTextColor={"darkgray"}
            keyboardType={
              numberInput || phoneNumberInput ? "number-pad" : "default"
            }
            {...props}
            onFocus={() => onTextInputFocus()}
            onBlur={() => onBlurInputFocus()}
            editable={dropDown ? false : editable}
            selectTextOnFocus={dropDown ? false : selectTextOnFocus}
          />
          {dropDown && (
            <TouchableOpacity onPress={onPressDropDown}>
              <MaterialIcons
                name='keyboard-arrow-down'
                color={getIconColor()}
                size={layout.size20}
              />
            </TouchableOpacity>
          )}
        </View>
        {error && (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <RegularText sizeSmall main>
              {error}
            </RegularText>
          </Animated.View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textMainContainer: {
    marginBottom: layout.size18,
    gap: layout.size4,
  },
  label: {
    marginBottom: layout.size2,
  },
  textContainer: {
    paddingVertical: Platform.OS === "android" ? layout.size6 : layout.size14,
    paddingHorizontal: layout.size10,
    borderWidth: DVW(0.3),
    borderRadius: layout.size10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    gap: layout.size10,
    backgroundColor: colors.lightGray,
  },
  textInput: {
    fontFamily: fontFamily.regular,
    fontSize: font.size12,
    paddingVertical: layout.size2,
  },
});
