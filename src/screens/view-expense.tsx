import { AppContainer, Loader, ScreenHeader } from "@src/common";
import { screenNames } from "@src/navigations";
import { moderateScale, verticalScale } from "@src/resources/scaling";
import { RootStackScreenProps } from "@src/router/types";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { LightText } from "@src/components/shared/text/light-text";
import { SemiBoldText } from "@src/components/shared/text/semi-bold-text";
import { useViewExpenses } from "@src/services";
import { formatAmount } from "@src/helper/helper";
import { ExpenseItem } from "@src/components/screen/expense-item";
import { colors } from "@src/resources/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { IconButton } from "@src/components/shared/buttons/icon-button";

export const ViewExpense = ({
  navigation,
}: RootStackScreenProps<screenNames.VIEW_EXPENSE>) => {
  const { getTotalAmt, totalAmt, deleteExpenseItem, data, expenseLoading } =
    useViewExpenses();

  useEffect(() => {
    getTotalAmt();
  }, [data]);

  const renderRightAction = (itemId: string) => {
    return (
      <TouchableOpacity
        style={styles.deleteIconBtn}
        onPress={() => deleteExpenseItem(itemId)}>
        <MaterialIcons
          name='delete'
          color={colors.white}
          size={moderateScale(20)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <AppContainer>
        <ScreenHeader
          title='View Expenses'
          bckBtnOnPress={() => {
            if (navigation) {
              navigation.goBack();
            }
          }}
        />
        {expenseLoading ? (
          <Loader size='small' color={colors.blue} />
        ) : (
          <>
            <View style={styles.topTextContainer}>
              <LightText sizeSmall>
                {totalAmt > 0 ? "Total Expense Amount" : undefined}
              </LightText>
              <SemiBoldText sizeSmall blue>
                {totalAmt > 0
                  ? `${formatAmount(totalAmt)}.00`
                  : "No Expenses created."}
              </SemiBoldText>
            </View>
            <FlatList
              data={data}
              keyExtractor={(items, index) =>
                items.id.toString() + index.toString()
              }
              renderItem={({ item, index }) => (
                <View key={index}>
                  <ExpenseItem
                    description={item.description}
                    amount={item.amount}
                    renderRightActions={() => renderRightAction(item.id)}
                  />
                </View>
              )}
              showsVerticalScrollIndicator={false}
              maxToRenderPerBatch={2}
              initialNumToRender={2}
              windowSize={2}
              updateCellsBatchingPeriod={100}
            />
            <View style={styles.btnContainer}>
              <IconButton
                title='New category'
                titleType='regular'
                textWhite
                style={{
                  backgroundColor: colors.blue,
                }}
                onPress={() => {
                  navigation.navigate(screenNames.CREATE_CATEGORY);
                }}
              />
              <IconButton
                title='New expense'
                titleType='regular'
                textWhite
                style={{
                  backgroundColor: colors.main,
                }}
                onPress={() => {
                  navigation.navigate(screenNames.ADD_EXPENSE);
                }}
              />
            </View>
          </>
        )}
      </AppContainer>
    </>
  );
};

const styles = StyleSheet.create({
  topTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
    paddingVertical: verticalScale(10),
  },
  deleteIconBtn: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(15),
    marginBottom: moderateScale(8),
    borderRadius: moderateScale(10),
    backgroundColor: colors.main,
    justifyContent: "center",
  },
  btnContainer: {
    gap: moderateScale(10),
    marginBottom: verticalScale(20),
  },
});
