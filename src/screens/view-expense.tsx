import { AppContainer, Loader, ScreenHeader } from "@src/common";
import { screenNames } from "@src/navigations";
import { moderateScale, verticalScale } from "@src/resources/scaling";
import { RootStackScreenProps } from "@src/router/types";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { LightText } from "@src/components/shared/text/light-text";
import { SemiBoldText } from "@src/components/shared/text/semi-bold-text";
import { useViewExpenses } from "@src/services";
import { formatAmount } from "@src/helper/helper";
import { ExpenseItem } from "@src/components/screen/expense-item";
import { colors } from "@src/resources/colors";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { IconButton } from "@src/components/shared/buttons/icon-button";
import { useIsFocused } from "@react-navigation/native";
import { CategoryModal } from "@src/components/screen";
import { RegularText } from "@src/components/shared/text/regular-text";

export const ViewExpense = ({
  navigation,
}: RootStackScreenProps<screenNames.VIEW_EXPENSE>) => {
  const {
    getTotalAmt,
    totalAmt,
    deleteExpenseItem,
    data,
    expenseLoading,
    loadExpenses,
    filterExpenseByCategory,
  } = useViewExpenses();
  const isFocused = useIsFocused();
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    Alert.alert("Information!", "Please note that you swipe to delete item");
  }, []);

  //calculate total amount when data changes
  useEffect(() => {
    getTotalAmt();
  }, [isFocused]);

  //load expenses when screen is focused and data changes
  useEffect(() => {
    loadExpenses();
  }, [isFocused]);

  useEffect(() => {
    filterExpenseByCategory(selectedCategory);
  }, [selectedCategory]);

  const renderRightAction = (itemId: string) => {
    return (
      <TouchableOpacity
        style={styles.deleteIconBtn}
        onPress={async () => await deleteExpenseItem(itemId)}>
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
            {data && data.length > 0 ? (
              <>
                <View style={styles.titleContainer}>
                  <View style={styles.topTextContainer}>
                    <LightText sizeSmall>
                      {totalAmt > 0 ? "Total Amount:" : undefined}
                    </LightText>
                    <SemiBoldText sizeSmall blue>
                      {totalAmt > 0
                        ? `${formatAmount(totalAmt)}.00`
                        : "No Expenses created."}
                    </SemiBoldText>
                  </View>
                  <View>
                    <TouchableOpacity
                      style={styles.filterBtn}
                      onPress={() => setShowCategory(!showCategory)}>
                      <LightText sizeSmall blue>
                        filter
                      </LightText>
                      <Entypo
                        name='chevron-down'
                        size={moderateScale(20)}
                        color={colors.blue}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.categoryTitleContainer}>
                  {selectedCategory ? (
                    <View>
                      <RegularText>
                        {selectedCategory && selectedCategory} Expenses
                      </RegularText>
                    </View>
                  ) : null}
                  <TouchableOpacity
                    style={styles.filterBtn}
                    onPress={async () => {
                      setSelectedCategory("");
                      await loadExpenses();
                    }}>
                    <SemiBoldText sizeSmall blue>
                      refresh
                    </SemiBoldText>
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={data && data}
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
              </>
            ) : (
              <RegularText black sizeBody>
                No expenses created
              </RegularText>
            )}

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
      {showCategory && (
        <CategoryModal
          closeModal={() => setShowCategory(!showCategory)}
          selectedCategory={selectedCategory}
          setSelectedCategory={(value) => setSelectedCategory(value)}
        />
      )}
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(5),
  },
  categoryTitleContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: verticalScale(10),
    flexDirection: "row",
  },
});
