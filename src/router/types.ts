import { type ParamListBase } from "@react-navigation/native";
import { type NativeStackScreenProps } from "@react-navigation/native-stack";

//auth screen stack navigation
export interface RootStackParamList extends ParamListBase {
  AddExpense: undefined;
  ViewExpense: undefined;
  CreateCategory: undefined;
}

export type RootStackScreenProps<ScreenName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, ScreenName>;
