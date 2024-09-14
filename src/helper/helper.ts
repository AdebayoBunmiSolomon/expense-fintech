import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache/storage-key";
import { categoryType, expenseType } from "@src/types/types";

/**
 * @returns the amount or price in formatted way by adding comma
 */
export const formatAmount = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 *
 * @param length to determine string length
 * @returns the random ID to be generated based on the supplied length
 */
export const generateRandomId = (length = 10) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

export const getArrOfCategoryFromCache = async () => {
  const arrOfCategory = await AsyncStorage.getItem(storageKey.CATEGORY);
  const parsedArrOfCategory: categoryType = JSON.parse(arrOfCategory!);
  if (parsedArrOfCategory && parsedArrOfCategory.length > 0) {
    return parsedArrOfCategory;
  } else {
    return [];
  }
};

export const getArrOfExpenseFromCache = async () => {
  const arrOfExpense = await AsyncStorage.getItem(storageKey.EXPENSE);
  const parsedArrOfExpense: expenseType = JSON.parse(arrOfExpense!);
  if (parsedArrOfExpense && parsedArrOfExpense.length > 0) {
    return parsedArrOfExpense;
  } else {
    return [];
  }
};
