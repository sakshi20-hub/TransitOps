import { useState } from "react";
import "../../styles/dashboard.css";

const DRIVER_ROSTER = [
  { id: "drv-1001", name: "Rakesh Patil", vehicle: "MH12 AB 4021" },
  { id: "drv-1002", name: "Suman Verma", vehicle: "DL08 CD 7743" },
  { id: "drv-1004", name: "Priya Nair", vehicle: "KL07 EF 9982" },
  { id: "drv-1006", name: "Anjali Deshmukh", vehicle: "MH14 GH 3310" },
];

const EMPTY_TRIP_FORM = {
  driverId: "",
  origin: "",
  destination: "",
  distanceKm: "",
  startTime: "",
};

function resolveDriverMeta(driverId) {
  return DRIVER_ROSTER.find(
    (driver) => driver.id === driverId
  );
}

export default function TripCreateForm({
  onClose,
  onSubmit,
  isSubmitting,
}) {
  const [formValues, setFormValues] = useState({
    ...EMPTY_TRIP_FORM,
  });

  const [error, setError] = useState("");

  const updateField = (field) => (event) => {
    setFormValues((previous) => ({
      ...previous,
      [field]: event.target.value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formValues.driverId) {
      setError("Select a driver for this trip");
      return;
    }

    if (
      !formValues.origin.trim() ||
      !formValues.destination.trim()
    ) {
      setError("Enter both origin and destination");
      return;
    }

    if (!formValues.startTime) {
      setError("Choose a scheduled start time");
      return;
    }

    const distance = Number(formValues.distanceKm);

    if (
      formValues.distanceKm &&
      (!Number.isFinite(distance) || distance < 0)
    ) {
      setError("Enter a valid distance");
      return;
    }

    const driverMeta = resolveDriverMeta(
      formValues.driverId
    );

    if (!driverMeta) {
      setError("Selected driver is unavailable");
      return;
    }

    onSubmit({
      driverId: driverMeta.id,
      driverName: driverMeta.name,
      vehicle: driverMeta.vehicle,
      origin: formValues.origin.trim(),
      destination: formValues.destination.trim(),
      distanceKm: distance || 0,
      startTime: formValues.startTime,
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
          <h2>Schedule trip</h2>

          <button
            type="button"
            className="btn btn-icon-ghost"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div className="form-error-banner">
                {error}
              </div>
            )}

            <div className="form-field">
              <label htmlFor="trip-driver">
                Driver &amp; vehicle
              </label>

              <select
                id="trip-driver"
                value={formValues.driverId}
                onChange={updateField("driverId")}
              >
                <option value="">
                  Select a driver
                </option>

                {DRIVER_ROSTER.map((driver) => (
                  <option
                    key={driver.id}
                    value={driver.id}
                  >
                    {driver.name} — {driver.vehicle}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row-2">
              <div className="form-field">
                <label htmlFor="trip-origin">
                  Origin
                </label>

                <input
                  id="trip-origin"
                  type="text"
                  value={formValues.origin}
                  onChange={updateField("origin")}
                  placeholder="e.g. Pune Warehouse"
                />
              </div>

              <div className="form-field">
                <label htmlFor="trip-destination">
                  Destination
                </label>

                <input
                  id="trip-destination"
                  type="text"
                  value={formValues.destination}
                  onChange={updateField("destination")}
                  placeholder="e.g. Nashik Hub"
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-field">
                <label htmlFor="trip-distance">
                  Estimated distance (km)
                </label>

                <input
                  id="trip-distance"
                  type="number"
                  min="0"
                  value={formValues.distanceKm}
                  onChange={updateField("distanceKm")}
                />
              </div>

              <div className="form-field">
                <label htmlFor="trip-start">
                  Scheduled start
                </label>

                <input
                  id="trip-start"
                  type="datetime-local"
                  value={formValues.startTime}
                  onChange={updateField("startTime")}
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
                ? "Scheduling…"
                : "Schedule trip"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}