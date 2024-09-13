import { useState } from "react";

export const useAddExpense = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addExpense = async () => {
    setLoading(true);
    try {
    } catch (err: any) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    addExpense,
  };
};
