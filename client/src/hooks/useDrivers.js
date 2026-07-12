import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDriver,
  deleteDriver,
  fetchDrivers,
  updateDriver,
} from "../api/driverApi";

const DRIVERS_KEY = ["drivers"];

export function useDrivers() {
  const queryClient = useQueryClient();

  const driversQuery = useQuery({
    queryKey: DRIVERS_KEY,
    queryFn: fetchDrivers,
    staleTime: 30_000,
  });

  const addDriver = useMutation({
    mutationFn: createDriver,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: DRIVERS_KEY }),
  });

  const editDriver = useMutation({
    mutationFn: ({ id, payload }) => updateDriver(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: DRIVERS_KEY }),
  });

  const removeDriver = useMutation({
    mutationFn: deleteDriver,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: DRIVERS_KEY }),
  });

  return {
    drivers: driversQuery.data ?? [],
    isLoading: driversQuery.isLoading,
    isError: driversQuery.isError,
    error: driversQuery.error,
    refetch: driversQuery.refetch,
    addDriver,
    editDriver,
    removeDriver,
  };
}
