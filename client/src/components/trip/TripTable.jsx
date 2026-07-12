import TripActionButtons from "./TripActionButtons";
import "../../styles/dashboard.css";

const STATUS_CHIP_MAP = {
  scheduled: "chip-neutral",
  running: "chip-warning",
  completed: "chip-success",
  cancelled: "chip-danger",
};

function formatDateTime(value) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusClass(status) {
  return (
    STATUS_CHIP_MAP[status?.toLowerCase()] ??
    "chip-neutral"
  );
}

export default function TripTable({
  trips = [],
  isLoading,
  isError,
  busyTripId,
  onStart,
  onComplete,
  onCancel,
}) {
  if (isLoading) {
    return (
      <div className="loading-row">
        Loading trips…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-row">
        Could not load trips right now.
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="empty-state">
        No trips match this filter.
      </div>
    );
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Route</th>
          <th>Driver</th>
          <th>Vehicle</th>
          <th>Distance</th>
          <th>Start</th>
          <th>End</th>
          <th>Fuel used</th>
          <th>Status</th>
          <th aria-label="Actions" />
        </tr>
      </thead>

      <tbody>
        {trips.map((trip) => (
          <tr key={trip.id}>
            <td>
              <div className="timeline-cell">
                <span className="timeline-primary">
                  {trip.origin}
                </span>

                <span className="timeline-secondary">
                  → {trip.destination}
                </span>
              </div>
            </td>

            <td>
              {trip.driverName || "Unassigned"}
            </td>

            <td className="cell-secondary">
              {trip.vehicle || "—"}
            </td>

            <td>
              {trip.distanceKm
                ? `${trip.distanceKm} km`
                : "—"}
            </td>

            <td className="cell-secondary">
              {formatDateTime(trip.startTime)}
            </td>

            <td className="cell-secondary">
              {formatDateTime(trip.endTime)}
            </td>

            <td className="cell-secondary">
              {trip.fuelUsedLtr !== null &&
              trip.fuelUsedLtr !== undefined
                ? `${trip.fuelUsedLtr} L`
                : "—"}
            </td>

            <td>
              <span
                className={`status-chip ${getStatusClass(
                  trip.status
                )}`}
              >
                {trip.status}
              </span>
            </td>

            <td>
              <TripActionButtons
                trip={trip}
                onStart={onStart}
                onComplete={onComplete}
                onCancel={onCancel}
                isBusy={busyTripId === trip.id}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}