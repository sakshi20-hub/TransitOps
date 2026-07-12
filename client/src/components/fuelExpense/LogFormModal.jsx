import { useState } from "react";


const fuelDefaults = {
  vehicle: "",
  driverName: "",
  litres: "",
  pricePerLitre: "",
  odometer: "",
  filledAt: "",
  station: "",
};

const expenseDefaults = {
  category: "Toll",
  vehicle: "",
  amount: "",
  incurredOn: "",
  description: "",
};

export default function LogFormModal({ mode = "fuel", open, onClose, onSubmit, isSaving }) {
  const [form, setForm] = useState(mode === "fuel" ? fuelDefaults : expenseDefaults);

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (mode === "fuel") {
      onSubmit({
        ...form,
        litres: Number(form.litres) || 0,
        pricePerLitre: Number(form.pricePerLitre) || 0,
        odometer: Number(form.odometer) || 0,
      });
    } else {
      onSubmit({ ...form, amount: Number(form.amount) || 0 });
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal__header">
          <h3>{mode === "fuel" ? "Log Fuel Fill-up" : "Add Expense"}</h3>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal__body">
          {mode === "fuel" ? (
            <>
              <label>
                Vehicle
                <input name="vehicle" value={form.vehicle} onChange={handleChange} />
              </label>
              <label>
                Driver
                <input name="driverName" value={form.driverName} onChange={handleChange} />
              </label>
              <label>
                Litres
                <input type="number" min="0" step="0.1" name="litres" value={form.litres} onChange={handleChange} />
              </label>
              <label>
                Price / Litre (₹)
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  name="pricePerLitre"
                  value={form.pricePerLitre}
                  onChange={handleChange}
                />
              </label>
              <label>
                Odometer (km)
                <input type="number" min="0" name="odometer" value={form.odometer} onChange={handleChange} />
              </label>
              <label>
                Filled At
                <input type="datetime-local" name="filledAt" value={form.filledAt} onChange={handleChange} />
              </label>
              <label>
                Station
                <input name="station" value={form.station} onChange={handleChange} />
              </label>
            </>
          ) : (
            <>
              <label>
                Category
                <select name="category" value={form.category} onChange={handleChange}>
                  <option value="Toll">Toll</option>
                  <option value="Parking">Parking</option>
                  <option value="Fine">Fine</option>
                  <option value="Misc">Misc</option>
                </select>
              </label>
              <label>
                Vehicle
                <input name="vehicle" value={form.vehicle} onChange={handleChange} />
              </label>
              <label>
                Amount (₹)
                <input type="number" min="0" name="amount" value={form.amount} onChange={handleChange} />
              </label>
              <label>
                Incurred On
                <input type="date" name="incurredOn" value={form.incurredOn} onChange={handleChange} />
              </label>
              <label>
                Description
                <textarea rows={2} name="description" value={form.description} onChange={handleChange} />
              </label>
            </>
          )}

          <div className="modal__footer">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
