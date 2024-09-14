import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache/storage-key";
import { getArrOfExpenseFromCache } from "@src/helper/helper";
import { expenseType } from "@src/types/types";
import { useState } from "react";
import { Alert } from "react-native";

export const useViewExpenses = () => {
  const [totalAmt, setTotalAmt] = useState<number>(0);
  const [data, setData] = useState<expenseType>([]);
  const [expenseLoading, setExpenseLoading] = useState<boolean>(false);

  const getTotalAmt = async () => {
    const expenseData = await getArrOfExpenseFromCache();
    const totalAmtGotten =
      expenseData && expenseData?.reduce((acc, item) => acc + item.amount, 0);
    setTotalAmt(totalAmtGotten);
  };

  const deleteExpenseItem = async (id: string) => {
    const expenseData = await getArrOfExpenseFromCache();
    const updatedData =
      expenseData && expenseData.filter((items) => items.id !== id);
    await AsyncStorage.setItem(storageKey.EXPENSE, JSON.stringify(updatedData));
    setData(updatedData);
    const totalAmtGotten =
      updatedData && updatedData?.reduce((acc, item) => acc + item.amount, 0);
    setTotalAmt(totalAmtGotten);
  };

  const filterExpenseByCategory = async (category: string) => {
    const expenseData = await getArrOfExpenseFromCache();
    const updatedData =
      expenseData && expenseData.filter((item) => item.category !== category);
    setData(updatedData);
    const totalAmtGotten =
      updatedData && updatedData?.reduce((acc, item) => acc + item.amount, 0);
    setTotalAmt(totalAmtGotten);
  };

  const loadExpenses = async () => {
    setExpenseLoading(true);
    const expenseData = await getArrOfExpenseFromCache();
    try {
      if (expenseData && expenseData.length > 0) {
        // Introduce a delay (e.g., 2 seconds)
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setData(expenseData);
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setExpenseLoading(false);
      Alert.alert("Success", "Expense loaded successfully");
    }
  };

  return {
    getTotalAmt,
    totalAmt,
    deleteExpenseItem,
    data,
    expenseLoading,
    loadExpenses,
    filterExpenseByCategory,
  };
};
