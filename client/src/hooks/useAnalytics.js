import { useQuery } from "@tanstack/react-query";
import {
  fetchDriverUtilization,
  fetchFleetSummary,
  fetchFuelSpendPerMonth,
  fetchMaintenanceCostByVehicle,
  fetchTripsPerMonth,
} from "../api/analyticsApi";

export function useAnalytics() {
  const summaryQuery = useQuery({
    queryKey: ["analytics", "summary"],
    queryFn: fetchFleetSummary,
  });

  const tripsPerMonthQuery = useQuery({
    queryKey: ["analytics", "tripsPerMonth"],
    queryFn: fetchTripsPerMonth,
  });

  const fuelSpendQuery = useQuery({
    queryKey: ["analytics", "fuelSpend"],
    queryFn: fetchFuelSpendPerMonth,
  });

  const maintenanceCostQuery = useQuery({
    queryKey: ["analytics", "maintenanceCost"],
    queryFn: fetchMaintenanceCostByVehicle,
  });

  const driverUtilizationQuery = useQuery({
    queryKey: ["analytics", "driverUtilization"],
    queryFn: fetchDriverUtilization,
  });

  return {
    summary: summaryQuery.data,
    tripsPerMonth: tripsPerMonthQuery.data ?? [],
    fuelSpendPerMonth: fuelSpendQuery.data ?? [],
    maintenanceCostByVehicle: maintenanceCostQuery.data ?? [],
    driverUtilization: driverUtilizationQuery.data ?? [],
    isLoading:
      summaryQuery.isLoading ||
      tripsPerMonthQuery.isLoading ||
      fuelSpendQuery.isLoading ||
      maintenanceCostQuery.isLoading ||
      driverUtilizationQuery.isLoading,
  };
}
