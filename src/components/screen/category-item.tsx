import { colors } from "@src/resources/colors";
import { moderateScale } from "@src/resources/scaling";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RegularText } from "../shared/text/regular-text";
import { Swipeable } from "react-native-gesture-handler";

type categoryItemProps = {
  category: string;
  renderRightActions: any;
};

export const CategoryItem: React.FC<categoryItemProps> = ({
  category,
  renderRightActions,
}) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.item}>
        <View
          style={{
            maxWidth: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <RegularText sizeSmall black>
            {category}
          </RegularText>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(15),
    marginBottom: moderateScale(10),
    backgroundColor: colors.lightGray,
    borderRadius: moderateScale(10),
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
  },
});
