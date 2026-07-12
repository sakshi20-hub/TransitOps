import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createExpense,
  createFuelLog,
  deleteExpense,
  fetchExpenses,
  fetchFuelLogs,
} from "../api/fuelExpenseApi";

const FUEL_KEY = ["fuelLogs"];
const EXPENSE_KEY = ["expenses"];

export function useFuelExpense() {
  const queryClient = useQueryClient();

  const fuelQuery = useQuery({
    queryKey: FUEL_KEY,
    queryFn: fetchFuelLogs,
    staleTime: 30_000,
  });

  const expenseQuery = useQuery({
    queryKey: EXPENSE_KEY,
    queryFn: fetchExpenses,
    staleTime: 30_000,
  });

  const addFuelLog = useMutation({
    mutationFn: createFuelLog,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: FUEL_KEY }),
  });

  const addExpense = useMutation({
    mutationFn: createExpense,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: EXPENSE_KEY }),
  });

  const removeExpense = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: EXPENSE_KEY }),
  });

  return {
    fuelLogs: fuelQuery.data ?? [],
    expenses: expenseQuery.data ?? [],
    isLoading: fuelQuery.isLoading || expenseQuery.isLoading,
    isError: fuelQuery.isError || expenseQuery.isError,
    addFuelLog,
    addExpense,
    removeExpense,
  };
}
