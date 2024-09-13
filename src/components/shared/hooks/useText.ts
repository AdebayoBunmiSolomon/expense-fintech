import { txtColors } from "@src/resources/colors";
import { font } from "@src/resources/scaling";

export const useText = () => {
  /**
   * @return text size based on selected font size
   */
  const textSize = (
    sizeSmall?: boolean,
    sizeBody?: boolean,
    sizeMedium?: boolean,
    sizeLarge?: boolean,
    sizeXtraLarge?: boolean
  ) => {
    if (sizeSmall) {
      return font.size14;
    } else if (sizeBody) {
      return font.size16;
    } else if (sizeMedium) {
      return font.size20;
    } else if (sizeLarge) {
      return font.size22;
    } else if (sizeXtraLarge) {
      return font.size26;
    }
  };

  /**
   * @return text color based on selected font color
   */
  const textColor = (
    black?: boolean,
    white?: boolean,
    main?: boolean,
    lightGray?: boolean,
    darkGray?: boolean,
    blue?: boolean,
    gray?: boolean
  ) => {
    if (black) {
      return txtColors.black;
    } else if (white) {
      return txtColors.white;
    } else if (main) {
      return txtColors.main;
    } else if (lightGray) {
      return txtColors.lightGray;
    } else if (darkGray) {
      return txtColors.darkGray;
    } else if (blue) {
      return txtColors.blue;
    } else if (gray) {
      return txtColors.gray;
    }
  };

  return {
    textSize,
    textColor,
  };
};
