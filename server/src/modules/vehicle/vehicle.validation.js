const VALID_STATUSES = ["Available", "On Trip", "In Shop", "Retired"];

export const validateCreateVehicle = (data) => {
  const errors = [];

  if (!data.registrationNumber || data.registrationNumber.trim() === "") {
    errors.push("Registration number is required");
  }

  if (!data.name || data.name.trim() === "") {
    errors.push("Vehicle name is required");
  }

  if (!data.type || data.type.trim() === "") {
    errors.push("Vehicle type is required");
  }

  if (data.maxLoadCapacity === undefined || data.maxLoadCapacity === null) {
    errors.push("Maximum load capacity is required");
  } else if (data.maxLoadCapacity < 0) {
    errors.push("Maximum load capacity cannot be negative");
  }

  if (data.acquisitionCost === undefined || data.acquisitionCost === null) {
    errors.push("Acquisition cost is required");
  } else if (data.acquisitionCost < 0) {
    errors.push("Acquisition cost cannot be negative");
  }

  if (data.status && !VALID_STATUSES.includes(data.status)) {
    errors.push(`Status must be one of: ${VALID_STATUSES.join(", ")}`);
  }

  if (data.odometer !== undefined && data.odometer < 0) {
    errors.push("Odometer cannot be negative");
  }

  return errors;
};

export const validateUpdateVehicle = (data) => {
  const errors = [];

  if (data.maxLoadCapacity !== undefined && data.maxLoadCapacity < 0) {
    errors.push("Maximum load capacity cannot be negative");
  }

  if (data.acquisitionCost !== undefined && data.acquisitionCost < 0) {
    errors.push("Acquisition cost cannot be negative");
  }

  if (data.odometer !== undefined && data.odometer < 0) {
    errors.push("Odometer cannot be negative");
  }

  if (data.status && !VALID_STATUSES.includes(data.status)) {
    errors.push(`Status must be one of: ${VALID_STATUSES.join(", ")}`);
  }

  return errors;
};