import { useState } from "react";
import * as Fonts from "expo-font";
import {
  FiraCode_300Light,
  FiraCode_400Regular,
  FiraCode_500Medium,
  FiraCode_600SemiBold,
  FiraCode_700Bold,
} from "@expo-google-fonts/fira-code";

export const useFontLoading = () => {
  const [isLoadingFontComplete, setIsLoadingFontComplete] =
    useState<boolean>(true);
  /**
   * @returns boolean value true or false to determine if fonts is done loading or not
   */
  const loadResourcesAndDataAsync = async () => {
    try {
      await Fonts.loadAsync({
        "fira-code-light": FiraCode_300Light,
        "fira-code-regular": FiraCode_400Regular,
        "fira-code-medium": FiraCode_500Medium,
        "fira-code-semi-bold": FiraCode_600SemiBold,
        "fira-code-bold": FiraCode_700Bold,
      });
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoadingFontComplete(false);
    }
  };

  return {
    loadResourcesAndDataAsync,
    isLoadingFontComplete,
  };
};
