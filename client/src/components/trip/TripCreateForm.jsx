import { useState } from "react";

const initialState = {
  origin: "",
  destination: "",
  driverId: "",
  driverName: "",
  vehicle: "",
  scheduledAt: "",
  distanceKm: "",
  cargo: "",
};

// drivers is passed in from TripsPage so the dropdown reflects real driver data
// instead of duplicating driver fetch logic inside this form
export default function TripCreateForm({ drivers = [], onCreate, isSaving }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "driverId") {
      const selected = drivers.find((d) => d.id === value);
      setForm((prev) => ({
        ...prev,
        driverId: value,
        driverName: selected?.name ?? "",
        vehicle: selected?.assignedVehicle ?? prev.vehicle,
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const next = {};
    if (!form.origin.trim()) next.origin = "Required";
    if (!form.destination.trim()) next.destination = "Required";
    if (!form.driverId) next.driverId = "Select a driver";
    if (!form.scheduledAt) next.scheduledAt = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    onCreate({
      ...form,
      distanceKm: Number(form.distanceKm) || 0,
    });
    setForm(initialState);
  }

  return (
    <form onSubmit={handleSubmit} className="inline-form">
      <div className="inline-form__grid">
        <label>
          Origin
          <input name="origin" value={form.origin} onChange={handleChange} />
          {errors.origin && <span className="field-error">{errors.origin}</span>}
        </label>

        <label>
          Destination
          <input name="destination" value={form.destination} onChange={handleChange} />
          {errors.destination && <span className="field-error">{errors.destination}</span>}
        </label>

        <label>
          Driver
          <select name="driverId" value={form.driverId} onChange={handleChange}>
            <option value="">Select driver</option>
            {drivers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          {errors.driverId && <span className="field-error">{errors.driverId}</span>}
        </label>

        <label>
          Vehicle
          <input name="vehicle" value={form.vehicle} onChange={handleChange} />
        </label>

        <label>
          Scheduled At
          <input
            type="datetime-local"
            name="scheduledAt"
            value={form.scheduledAt}
            onChange={handleChange}
          />
          {errors.scheduledAt && <span className="field-error">{errors.scheduledAt}</span>}
        </label>

        <label>
          Distance (km)
          <input type="number" min="0" name="distanceKm" value={form.distanceKm} onChange={handleChange} />
        </label>

        <label>
          Cargo
          <input name="cargo" value={form.cargo} onChange={handleChange} />
        </label>
      </div>

      <button type="submit" className="btn btn--primary" disabled={isSaving}>
        {isSaving ? "Scheduling..." : "Schedule Trip"}
      </button>
    </form>
  );
}
