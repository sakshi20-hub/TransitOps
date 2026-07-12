import { useEffect, useState } from "react";

const emptyForm = {
  vehicle: "",
  type: "",
  status: "scheduled",
  scheduledDate: "",
  cost: "",
  vendor: "",
  notes: "",
};

export default function MaintenanceFormModal({ open, onClose, onSubmit, initialData, isSaving }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initialData ? { ...emptyForm, ...initialData } : emptyForm);
    setErrors({});
  }, [initialData, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const next = {};
    if (!form.vehicle.trim()) next.vehicle = "Vehicle is required";
    if (!form.type.trim()) next.type = "Service type is required";
    if (!form.scheduledDate) next.scheduledDate = "Date is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ ...form, cost: Number(form.cost) || 0 });
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal__header">
          <h3>{initialData ? "Edit Maintenance Record" : "Schedule Maintenance"}</h3>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal__body">
          <label>
            Vehicle
            <input name="vehicle" value={form.vehicle} onChange={handleChange} placeholder="e.g. MP04 AB 1234" />
            {errors.vehicle && <span className="field-error">{errors.vehicle}</span>}
          </label>

          <label>
            Service Type
            <input name="type" value={form.type} onChange={handleChange} placeholder="e.g. Oil Change" />
            {errors.type && <span className="field-error">{errors.type}</span>}
          </label>

          <label>
            Status
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="scheduled">Scheduled</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </label>

          <label>
            Scheduled Date
            <input type="date" name="scheduledDate" value={form.scheduledDate} onChange={handleChange} />
            {errors.scheduledDate && <span className="field-error">{errors.scheduledDate}</span>}
          </label>

          <label>
            Estimated Cost (₹)
            <input type="number" min="0" name="cost" value={form.cost} onChange={handleChange} />
          </label>

          <label>
            Vendor
            <input name="vendor" value={form.vendor} onChange={handleChange} />
          </label>

          <label>
            Notes
            <textarea rows={2} name="notes" value={form.notes} onChange={handleChange} />
          </label>

          <div className="modal__footer">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
