function BarChart({ title, data, valueKey, labelKey, formatValue = (v) => v }) {
  const max = Math.max(...data.map((d) => d[valueKey]), 1);

  return (
    <div className="chart-card">
      <h4>{title}</h4>
      <div className="bar-chart">
        {data.map((item) => (
          <div className="bar-chart__row" key={item[labelKey]}>
            <span className="bar-chart__label">{item[labelKey]}</span>
            <div className="bar-chart__track">
              <div
                className="bar-chart__fill"
                style={{ width: `${(item[valueKey] / max) * 100}%` }}
              />
            </div>
            <span className="bar-chart__value">{formatValue(item[valueKey])}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ChartsPanel({
  tripsPerMonth,
  fuelSpendPerMonth,
  maintenanceCostByVehicle,
  driverUtilization,
  isLoading,
}) {
  if (isLoading) {
    return <p className="empty-state">Crunching numbers...</p>;
  }

  return (
    <div className="charts-grid">
      <BarChart title="Trips per Month" data={tripsPerMonth} valueKey="trips" labelKey="month" />

      <BarChart
        title="Fuel Spend per Month"
        data={fuelSpendPerMonth}
        valueKey="amount"
        labelKey="month"
        formatValue={(v) => `₹${v.toLocaleString("en-IN")}`}
      />

      <BarChart
        title="Maintenance Cost by Vehicle"
        data={maintenanceCostByVehicle}
        valueKey="cost"
        labelKey="vehicle"
        formatValue={(v) => `₹${v.toLocaleString("en-IN")}`}
      />

      <BarChart
        title="Driver Utilization (km driven)"
        data={driverUtilization}
        valueKey="kmDriven"
        labelKey="driverName"
        formatValue={(v) => `${v.toLocaleString("en-IN")} km`}
      />
    </div>
  );
}
