import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  phone: "",
  licenseNumber: "",
  licenseExpiry: "",
  status: "active",
  assignedVehicle: "",
};

export default function DriverFormModal({ open, onClose, onSubmit, initialData, isSaving }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({ ...emptyForm, ...initialData });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [initialData, open]);

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!/^\d{10}$/.test(form.phone)) next.phone = "Enter a valid 10 digit number";
    if (!form.licenseNumber.trim()) next.licenseNumber = "License number is required";
    if (!form.licenseExpiry) next.licenseExpiry = "License expiry is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal__header">
          <h3>{initialData ? "Edit Driver" : "Add Driver"}</h3>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal__body">
          <label>
            Full Name
            <input name="name" value={form.name} onChange={handleChange} />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>

          <label>
            Phone
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="10 digit mobile" />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </label>

          <label>
            License Number
            <input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} />
            {errors.licenseNumber && <span className="field-error">{errors.licenseNumber}</span>}
          </label>

          <label>
            License Expiry
            <input
              type="date"
              name="licenseExpiry"
              value={form.licenseExpiry}
              onChange={handleChange}
            />
            {errors.licenseExpiry && <span className="field-error">{errors.licenseExpiry}</span>}
          </label>

          <label>
            Status
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="on_leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>

          <label>
            Assigned Vehicle
            <input
              name="assignedVehicle"
              value={form.assignedVehicle ?? ""}
              onChange={handleChange}
              placeholder="e.g. MP04 AB 1234"
            />
          </label>

          <div className="modal__footer">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Driver"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
