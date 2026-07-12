import { useEffect, useState } from "react";
import "../../styles/dashboard.css";

const PHONE_PATTERN = /^\+?[0-9\s-]{8,15}$/;

const EMPTY_FORM = {
  name: "",
  phone: "",
  licenseNumber: "",
  licenseExpiry: "",
  status: "active",
  assignedVehicle: "",
};

function buildInitialForm(driver) {
  if (!driver) {
    return { ...EMPTY_FORM };
  }

  return {
    name: driver.name ?? "",
    phone: driver.phone ?? "",
    licenseNumber: driver.licenseNumber ?? "",
    licenseExpiry: driver.licenseExpiry ?? "",
    status: driver.status ?? "active",
    assignedVehicle: driver.assignedVehicle ?? "",
  };
}

function validateForm(values) {
  const errors = {};

  if (values.name.trim().length < 3) {
    errors.name = "Enter the driver's full name";
  }

  if (!PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number";
  }

  if (values.licenseNumber.trim().length < 6) {
    errors.licenseNumber = "License number looks too short";
  }

  if (!values.licenseExpiry) {
    errors.licenseExpiry = "Select a license expiry date";
  }

  return errors;
}

export default function DriverFormModal({
  driver,
  onClose,
  onSubmit,
  isSubmitting,
  submitError,
}) {
  const [formValues, setFormValues] = useState(() =>
    buildInitialForm(driver)
  );

  const [fieldErrors, setFieldErrors] = useState({});

  const isEditMode = Boolean(driver);

  useEffect(() => {
    setFormValues(buildInitialForm(driver));
    setFieldErrors({});
  }, [driver]);

  const updateField = (field) => (event) => {
    const value = event.target.value;

    setFormValues((previous) => ({
      ...previous,
      [field]: value,
    }));

    setFieldErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = validateForm(formValues);

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    onSubmit({
      id: driver?.id,
      ...formValues,
      name: formValues.name.trim(),
      phone: formValues.phone.trim(),
      licenseNumber: formValues.licenseNumber
        .trim()
        .toUpperCase(),
      assignedVehicle:
        formValues.assignedVehicle.trim() || null,
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
          <h2>
            {isEditMode ? "Edit driver" : "Add driver"}
          </h2>

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
            {submitError && (
              <div className="form-error-banner">
                {submitError}
              </div>
            )}

            <div className="form-field">
              <label htmlFor="driver-name">
                Full name
              </label>

              <input
                id="driver-name"
                type="text"
                value={formValues.name}
                onChange={updateField("name")}
                className={
                  fieldErrors.name
                    ? "has-error"
                    : ""
                }
                placeholder="e.g. Rakesh Patil"
              />

              {fieldErrors.name && (
                <div className="field-error">
                  {fieldErrors.name}
                </div>
              )}
            </div>

            <div className="form-row-2">
              <div className="form-field">
                <label htmlFor="driver-phone">
                  Phone
                </label>

                <input
                  id="driver-phone"
                  type="text"
                  value={formValues.phone}
                  onChange={updateField("phone")}
                  className={
                    fieldErrors.phone
                      ? "has-error"
                      : ""
                  }
                  placeholder="+91 98200 11234"
                />

                {fieldErrors.phone && (
                  <div className="field-error">
                    {fieldErrors.phone}
                  </div>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="driver-status">
                  Status
                </label>

                <select
                  id="driver-status"
                  value={formValues.status}
                  onChange={updateField("status")}
                >
                  <option value="active">
                    Active
                  </option>

                  <option value="on-leave">
                    On leave
                  </option>

                  <option value="suspended">
                    Suspended
                  </option>
                </select>
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-field">
                <label htmlFor="driver-license">
                  License number
                </label>

                <input
                  id="driver-license"
                  type="text"
                  value={formValues.licenseNumber}
                  onChange={updateField(
                    "licenseNumber"
                  )}
                  className={
                    fieldErrors.licenseNumber
                      ? "has-error"
                      : ""
                  }
                  placeholder="MH12-2020-0045231"
                />

                {fieldErrors.licenseNumber && (
                  <div className="field-error">
                    {fieldErrors.licenseNumber}
                  </div>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="driver-expiry">
                  License expiry
                </label>

                <input
                  id="driver-expiry"
                  type="date"
                  value={formValues.licenseExpiry}
                  onChange={updateField(
                    "licenseExpiry"
                  )}
                  className={
                    fieldErrors.licenseExpiry
                      ? "has-error"
                      : ""
                  }
                />

                {fieldErrors.licenseExpiry && (
                  <div className="field-error">
                    {fieldErrors.licenseExpiry}
                  </div>
                )}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="driver-vehicle">
                Assigned vehicle (optional)
              </label>

              <input
                id="driver-vehicle"
                type="text"
                value={formValues.assignedVehicle}
                onChange={updateField(
                  "assignedVehicle"
                )}
                placeholder="e.g. MH12 AB 4021"
              />
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
                ? "Saving…"
                : isEditMode
                ? "Save changes"
                : "Add driver"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}