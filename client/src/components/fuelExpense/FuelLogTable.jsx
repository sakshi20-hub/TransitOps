function formatDateTime(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function FuelLogTable({ logs, isLoading }) {
  if (isLoading) {
    return <p className="empty-state">Loading fuel logs...</p>;
  }

  if (!logs.length) {
    return <p className="empty-state">No fuel logs recorded yet.</p>;
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Driver</th>
            <th>Litres</th>
            <th>Rate</th>
            <th>Total</th>
            <th>Odometer</th>
            <th>Filled At</th>
            <th>Station</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.vehicle}</td>
              <td>{log.driverName}</td>
              <td>{log.litres} L</td>
              <td>₹{log.pricePerLitre}</td>
              <td>₹{(log.litres * log.pricePerLitre).toFixed(2)}</td>
              <td>{log.odometer.toLocaleString("en-IN")} km</td>
              <td>{formatDateTime(log.filledAt)}</td>
              <td>{log.station}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
