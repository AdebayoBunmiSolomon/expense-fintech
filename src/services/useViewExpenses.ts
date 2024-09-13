import { expenseData } from "@src/constants/constants";
import { useEffect, useState } from "react";

export const useViewExpenses = () => {
  const [totalAmt, setTotalAmt] = useState<number>(0);
  const [data, setData] = useState<any[]>([]);
  const [expenseLoading, setExpenseLoading] = useState<boolean>(false);

  const getTotalAmt = () => {
    const totalAmtGotten =
      data && data?.reduce((acc, item) => acc + item.amount, 0);
    setTotalAmt(totalAmtGotten);
  };

  const deleteExpenseItem = (id: string) => {
    const updatedData = data && data.filter((items) => items.id !== id);
    setData(updatedData);
  };

  const loadExpenses = () => {
    setExpenseLoading(true);
    try {
      setExpenseLoading(true);
      setData(expenseData);
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setExpenseLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadExpenses();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return {
    getTotalAmt,
    totalAmt,
    deleteExpenseItem,
    data,
    expenseLoading,
  };
};
