import { AppContainer, Loader, ScreenHeader } from "@src/common";
import { categoryFormType } from "@src/forms/types";
import { screenNames } from "@src/navigations";
import { RootStackScreenProps } from "@src/router/types";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categorySchema } from "@src/forms/schema";
import { Input } from "@src/components/shared/inputs/Input";
import { IconButton } from "@src/components/shared/buttons/icon-button";
import { colors } from "@src/resources/colors";
import { generateRandomId } from "@src/helper/helper";
import { useCategory } from "@src/services";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { CategoryItem } from "@src/components/screen/category-item";
import { moderateScale, verticalScale } from "@src/resources/scaling";
import { MaterialIcons } from "@expo/vector-icons";
import { LightText } from "@src/components/shared/text/light-text";
import { SemiBoldText } from "@src/components/shared/text/semi-bold-text";

export const CreateCategory = ({
  navigation,
}: RootStackScreenProps<screenNames.CREATE_CATEGORY>) => {
  const {
    createCategory,
    deleteCategory,
    loading,
    categoryDataLoading,
    categoryData,
  } = useCategory();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<categoryFormType>({
    mode: "onChange",
    resolver: yupResolver(categorySchema),
  });

  //create an Id for the first category that needs to be added on first mount
  useEffect(() => {
    setValue("id", generateRandomId(5));
  }, [categoryData]);

  useEffect(() => {
    setValue("category", "");
  }, [categoryData, categoryDataLoading, loading]);

  const onSubmit = async (data: categoryFormType) => {
    await createCategory(data.id, data.category.trim().toLowerCase());
  };

  const renderRightAction = (itemId: string) => {
    return (
      <TouchableOpacity
        style={styles.deleteIconBtn}
        onPress={() => {
          deleteCategory(itemId);
        }}>
        <MaterialIcons
          name='delete'
          color={colors.white}
          size={moderateScale(20)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <AppContainer>
      <ScreenHeader
        title='Category'
        bckBtnOnPress={() => {
          navigation.goBack();
        }}
      />

      <Controller
        control={control}
        render={({ field }) => (
          <Input
            label='Category'
            placeholder='enter category'
            onChangeText={(value) => {
              field.onChange(value);
            }}
            error={errors?.category?.message}
            value={field.value}
          />
        )}
        name='category'
        defaultValue=''
      />
      <IconButton
        title='create'
        titleType='regular'
        textWhite
        style={{
          backgroundColor: colors.blue,
        }}
        onPress={handleSubmit(onSubmit)}
        isLoading={loading}
      />
      <View style={styles.topTextContainer}>
        <LightText sizeSmall>
          {categoryData && categoryData.length > 0 ? "Categories:" : undefined}
        </LightText>
        <SemiBoldText sizeSmall blue>
          {categoryData && categoryData.length > 0
            ? `${categoryData.length}`
            : "No Category created."}
        </SemiBoldText>
      </View>
      {categoryDataLoading ? (
        <Loader size='small' color={colors.blue} />
      ) : (
        <FlatList
          contentContainerStyle={{
            paddingBottom: verticalScale(20),
          }}
          data={categoryData}
          keyExtractor={(items, index) =>
            items.id.toString() + index.toString()
          }
          renderItem={({ item, index }) => (
            <View key={index}>
              <CategoryItem
                category={item.category}
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
      )}
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  deleteIconBtn: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(15),
    marginBottom: moderateScale(8),
    borderRadius: moderateScale(10),
    backgroundColor: colors.main,
    justifyContent: "center",
  },
  topTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
    paddingVertical: verticalScale(10),
  },
});
