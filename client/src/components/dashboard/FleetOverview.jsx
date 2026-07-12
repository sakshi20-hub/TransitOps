function FleetOverview({ active, maintenance, inactive }) {
  const total = active + maintenance + inactive || 1
  const pct = (n) => Math.round((n / total) * 100)

  return (
    <div className="card fleet-overview">
      <h2 className="card-title">Fleet Overview</h2>

      <div className="fleet-bar">
        <div className="fleet-bar-active" style={{ width: `${pct(active)}%` }} />
        <div className="fleet-bar-maintenance" style={{ width: `${pct(maintenance)}%` }} />
        <div className="fleet-bar-inactive" style={{ width: `${pct(inactive)}%` }} />
      </div>

      <div className="fleet-legend">
        <div className="fleet-legend-item">
          <span className="legend-dot legend-active" />
          Active <strong>{active}</strong>
        </div>
        <div className="fleet-legend-item">
          <span className="legend-dot legend-maintenance" />
          Maintenance <strong>{maintenance}</strong>
        </div>
        <div className="fleet-legend-item">
          <span className="legend-dot legend-inactive" />
          Inactive <strong>{inactive}</strong>
        </div>
      </div>
    </div>
  )
}

export default FleetOverview
