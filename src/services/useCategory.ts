import AsyncStorage from "@react-native-async-storage/async-storage";
import { storageKey } from "@src/cache/storage-key";
import { getArrOfCategoryFromCache } from "@src/helper/helper";
import { categoryType } from "@src/types/types";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useCategory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryData, setCategoryData] = useState<categoryType>([]);
  const [categoryDataLoading, setCategoryDataLoading] =
    useState<boolean>(false);

  const createCategory = async (id: string, category: string) => {
    setLoading(true);
    const categoryFrmCache = await getArrOfCategoryFromCache();
    try {
      const categoryExits = categoryFrmCache.some(
        (item) => item.category === category
      );
      if (categoryExits) {
        Alert.alert("Error", "Category exists already");
      } else {
        const updatedCategory = [
          ...categoryFrmCache,
          {
            id: id,
            category: category,
          },
        ];
        await AsyncStorage.setItem(
          storageKey.CATEGORY,
          JSON.stringify(updatedCategory)
        );
        Alert.alert("Success", "Category created successfully");
        setCategoryData(updatedCategory);
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    setLoading(true);
    const categoryData = await getArrOfCategoryFromCache();
    try {
      const categoryExist =
        categoryData && categoryData.some((items) => items.id === id);
      if (categoryExist) {
        const updatedCategoryData =
          categoryData && categoryData.filter((items) => items.id !== id);
        await AsyncStorage.setItem(
          storageKey.CATEGORY,
          JSON.stringify(updatedCategoryData)
        );
        setCategoryData(updatedCategoryData);
        Alert.alert("Success", "Category deleted successfully");
      } else {
        Alert.alert("Error", "Category doesn't exist");
      }
    } catch (err) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategory = async () => {
    setCategoryDataLoading(true);
    const categoryData = await getArrOfCategoryFromCache();
    try {
      if (categoryData && categoryData.length > 0) {
        setCategoryData(categoryData);
      }
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setCategoryDataLoading(false);
    }
  };

  useEffect(() => {
    loadCategory();
  }, []);

  return {
    createCategory,
    deleteCategory,
    loading,
    loadCategory,
    categoryData,
    categoryDataLoading,
  };
};
