import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache/storage-key";
import { getArrOfExpenseFromCache } from "@src/helper/helper";
import { expenseType } from "@src/types/types";
import { useState } from "react";
import { Alert } from "react-native";

export const useAddExpense = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<expenseType>([]);

  const addExpense = async (
    id: string,
    description: string,
    category: string,
    amount: number
  ) => {
    setLoading(true);
    const expenseFromCache = await getArrOfExpenseFromCache();

    try {
      const expenseExist =
        expenseFromCache &&
        expenseFromCache.some((items) => items.description === description);

      if (expenseExist) {
        Alert.alert("Error", "Expense already exists");
      } else {
        // Introduce a delay (e.g., 2 seconds)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const updatedExpense = [
          ...expenseFromCache,
          {
            id: id,
            description: description,
            category: category,
            amount: amount,
          },
        ];

        await AsyncStorage.setItem(
          storageKey.EXPENSE,
          JSON.stringify(updatedExpense)
        );

        setData(updatedExpense);
        Alert.alert("Success", "Expense created successfully");
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    addExpense,
    loading,
    data,
  };
};
