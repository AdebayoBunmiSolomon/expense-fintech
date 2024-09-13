import { colors } from "@src/resources/colors";

export const useButton = () => {
  const btnBgColor = (
    bgBlack?: boolean,
    bgWhite?: boolean,
    bgMain?: boolean,
    bgLightGray?: boolean,
    bgDarkGray?: boolean,
    bgCream?: boolean,
    bgBlue?: boolean
  ) => {
    if (bgBlack) {
      return colors.black;
    } else if (bgWhite) {
      return colors.white;
    } else if (bgMain) {
      return colors.main;
    } else if (bgLightGray) {
      return colors.lightGray;
    } else if (bgDarkGray) {
      return colors.lightGray;
    } else if (bgCream) {
      return undefined;
    } else if (bgBlue) {
      return colors.blue;
    }
  };
  return {
    btnBgColor,
  };
};
