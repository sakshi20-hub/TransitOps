import TripActionButtons from "./TripActionButtons";

const STATUS_LABELS = {
  scheduled: "Scheduled",
  in_transit: "In Transit",
  completed: "Completed",
  cancelled: "Cancelled",
};

function formatDateTime(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TripTable({ trips, isLoading, onStart, onComplete, onCancel }) {
  if (isLoading) {
    return <p className="empty-state">Loading trips...</p>;
  }

  if (!trips.length) {
    return <p className="empty-state">No trips scheduled yet.</p>;
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Route</th>
            <th>Driver</th>
            <th>Vehicle</th>
            <th>Scheduled</th>
            <th>Distance</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>
                {trip.origin} → {trip.destination}
              </td>
              <td>{trip.driverName}</td>
              <td>{trip.vehicle}</td>
              <td>{formatDateTime(trip.scheduledAt)}</td>
              <td>{trip.distanceKm} km</td>
              <td>
                <span className={`pill pill--${trip.status}`}>
                  {STATUS_LABELS[trip.status] ?? trip.status}
                </span>
              </td>
              <td>
                <TripActionButtons
                  trip={trip}
                  onStart={onStart}
                  onComplete={onComplete}
                  onCancel={onCancel}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
