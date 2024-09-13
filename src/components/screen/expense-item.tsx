import React from "react";
import { StyleSheet, View } from "react-native";
import { RegularText } from "../shared/text/regular-text";
import { formatAmount } from "@src/helper/helper";
import { moderateScale } from "@src/resources/scaling";
import { colors } from "@src/resources/colors";
import { Swipeable } from "react-native-gesture-handler";

type expenseItemProps = {
  description: string;
  amount: number;
  renderRightActions: any;
};

export const ExpenseItem: React.FC<expenseItemProps> = ({
  description,
  amount,
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
            {description} -{" "}
          </RegularText>
          <RegularText sizeSmall blue>
            {formatAmount(amount)}
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
