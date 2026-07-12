import { useEffect, useState } from "react";
import "../../styles/dashboard.css";

function getInitialDistance(trip) {
  return trip?.distanceKm ? String(trip.distanceKm) : "";
}

export default function TripCompleteModal({
  trip,
  onClose,
  onConfirm,
  isSubmitting,
}) {
  const [distanceKm, setDistanceKm] = useState(
    getInitialDistance(trip)
  );
  const [fuelUsedLtr, setFuelUsedLtr] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setDistanceKm(getInitialDistance(trip));
    setFuelUsedLtr("");
    setError("");
  }, [trip]);

  const handleDistanceChange = (event) => {
    setDistanceKm(event.target.value);
    setError("");
  };

  const handleFuelChange = (event) => {
    setFuelUsedLtr(event.target.value);
    setError("");
  };

  const handleConfirm = (event) => {
    event.preventDefault();

    const parsedDistance = Number(distanceKm);
    const parsedFuel = Number(fuelUsedLtr);

    if (
      !Number.isFinite(parsedDistance) ||
      parsedDistance <= 0
    ) {
      setError("Enter a valid trip distance");
      return;
    }

    if (
      !Number.isFinite(parsedFuel) ||
      parsedFuel <= 0
    ) {
      setError("Enter fuel consumed for this trip");
      return;
    }

    onConfirm({
      id: trip.id,
      distanceKm: parsedDistance,
      fuelUsedLtr: parsedFuel,
    });
  };

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="modal-panel"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <div className="modal-header">
          <h2>Complete trip</h2>

          <button
            type="button"
            className="btn btn-icon-ghost"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleConfirm}>
          <div className="modal-body">
            {error && (
              <div className="form-error-banner">
                {error}
              </div>
            )}

            <p className="cell-secondary trip-summary">
              {trip.origin} → {trip.destination} ·{" "}
              {trip.vehicle}
            </p>

            <div className="form-row-2">
              <div className="form-field">
                <label htmlFor="complete-distance">
                  Distance covered (km)
                </label>

                <input
                  id="complete-distance"
                  type="number"
                  min="0"
                  value={distanceKm}
                  onChange={handleDistanceChange}
                />
              </div>

              <div className="form-field">
                <label htmlFor="complete-fuel">
                  Fuel used (liters)
                </label>

                <input
                  id="complete-fuel"
                  type="number"
                  min="0"
                  step="0.1"
                  value={fuelUsedLtr}
                  onChange={handleFuelChange}
                  placeholder="e.g. 24.5"
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Completing…"
                : "Mark completed"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}