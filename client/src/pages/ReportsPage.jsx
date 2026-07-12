import DriverKpiCards from "../components/dashboard/DriverKpiCards";
import ChartsPanel from "../components/dashboard/ChartsPanel";
import { useAnalytics } from "../hooks/useAnalytics";

export default function ReportsPage() {
  const {
    summary,
    tripsPerMonth,
    fuelSpendPerMonth,
    maintenanceCostByVehicle,
    driverUtilization,
    isLoading,
  } = useAnalytics();

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h2>Reports &amp; Analytics</h2>
          <p className="muted-text">Fleet performance at a glance</p>
        </div>
      </div>

      <DriverKpiCards summary={summary} isLoading={isLoading} />

      <ChartsPanel
        tripsPerMonth={tripsPerMonth}
        fuelSpendPerMonth={fuelSpendPerMonth}
        maintenanceCostByVehicle={maintenanceCostByVehicle}
        driverUtilization={driverUtilization}
        isLoading={isLoading}
      />
    </div>
  );
}
