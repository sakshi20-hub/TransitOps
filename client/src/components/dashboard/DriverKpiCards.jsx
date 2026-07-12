function Card({ label, value, hint }) {
  return (
    <div className="kpi-card">
      <span className="kpi-card__label">{label}</span>
      <span className="kpi-card__value">{value}</span>
      {hint && <span className="kpi-card__hint">{hint}</span>}
    </div>
  );
}

export default function DriverKpiCards({ summary, isLoading }) {
  if (isLoading || !summary) {
    return <div className="kpi-grid kpi-grid--loading">Loading fleet summary...</div>;
  }

  return (
    <div className="kpi-grid">
      <Card label="Total Drivers" value={summary.totalDrivers} hint={`${summary.activeDrivers} active`} />
      <Card label="Total Vehicles" value={summary.totalVehicles} />
      <Card label="Trips This Month" value={summary.tripsThisMonth} />
      <Card
        label="Fuel Spend"
        value={`₹${summary.fuelSpendThisMonth.toLocaleString("en-IN")}`}
        hint="this month"
      />
      <Card label="Maintenance Due" value={summary.maintenanceDue} hint="vehicles" />
    </div>
  );
}
