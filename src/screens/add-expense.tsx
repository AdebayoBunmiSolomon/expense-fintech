import { yupResolver } from "@hookform/resolvers/yup";
import { AppContainer, ScreenHeader } from "@src/common";
import { CategoryModal } from "@src/components/screen";
import { IconButton } from "@src/components/shared/buttons/icon-button";
import { Input } from "@src/components/shared/inputs/Input";
import { expenseSchema } from "@src/forms/schema";
import { expenseFormType } from "@src/forms/types";
import { generateRandomId } from "@src/helper/helper";
import { screenNames } from "@src/navigations";
import { colors } from "@src/resources/colors";
import { RootStackScreenProps } from "@src/router/types";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export const AddExpense = ({
  navigation,
}: RootStackScreenProps<screenNames.ADD_EXPENSE>) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<expenseFormType>({
    mode: "onChange",
    resolver: yupResolver(expenseSchema),
  });
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  //create an Id for the first expense that needs to be added on first mount
  useEffect(() => {
    setValue("id", generateRandomId(5));
  }, []);

  useEffect(() => {
    setValue("category", selectedCategory);
    clearErrors("category");
  }, [selectedCategory]);

  const onSubmit = async (data: expenseFormType) => {
    console.log(data);
  };
  return (
    <>
      <AppContainer>
        <ScreenHeader
          title='Add Expense'
          bckBtnOnPress={() => navigation.goBack()}
        />
        <Controller
          control={control}
          render={({ field }) => (
            <Input
              label='Description'
              placeholder='description'
              onChangeText={(value) => {
                field.onChange(value);
              }}
              error={errors?.description?.message}
            />
          )}
          name='description'
          defaultValue=''
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
              value={field.value}
              error={errors?.category?.message}
              dropDown
              onPressDropDown={() => {
                setShowCategory(true);
              }}
            />
          )}
          name='category'
          defaultValue=''
        />

        <Controller
          control={control}
          render={({ field }) => (
            <Input
              label='Amount'
              placeholder='enter amount'
              onChangeText={(value) => {
                field.onChange(value);
              }}
              error={errors?.amount?.message}
              numberInput
            />
          )}
          name='amount'
          defaultValue={0}
        />
        <IconButton
          title='create'
          titleType='regular'
          textWhite
          style={{
            backgroundColor: colors.main,
          }}
          onPress={handleSubmit(onSubmit)}
        />
      </AppContainer>
      {showCategory && (
        <CategoryModal
          closeModal={() => setShowCategory(!showCategory)}
          setSelectedCategory={(value) => setSelectedCategory(value)}
          selectedCategory={selectedCategory}
        />
      )}
    </>
  );
};
