import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMaintenanceRecord,
  deleteMaintenanceRecord,
  fetchMaintenanceRecords,
  updateMaintenanceRecord,
} from "../api/maintenanceApi";

const MAINTENANCE_KEY = ["maintenance"];

export function useMaintenance() {
  const queryClient = useQueryClient();

  const recordsQuery = useQuery({
    queryKey: MAINTENANCE_KEY,
    queryFn: fetchMaintenanceRecords,
    staleTime: 30_000,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: MAINTENANCE_KEY });

  const addRecord = useMutation({
    mutationFn: createMaintenanceRecord,
    onSuccess: invalidate,
  });

  const editRecord = useMutation({
    mutationFn: ({ id, payload }) => updateMaintenanceRecord(id, payload),
    onSuccess: invalidate,
  });

  const removeRecord = useMutation({
    mutationFn: deleteMaintenanceRecord,
    onSuccess: invalidate,
  });

  return {
    records: recordsQuery.data ?? [],
    isLoading: recordsQuery.isLoading,
    isError: recordsQuery.isError,
    error: recordsQuery.error,
    addRecord,
    editRecord,
    removeRecord,
  };
}
