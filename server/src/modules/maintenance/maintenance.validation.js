export const validateCreateMaintenanceLog = (data) => {
  const errors = [];

  if (!data.vehicle) {
    errors.push("Vehicle is required");
  }

  if (!data.type || data.type.trim() === "") {
    errors.push("Maintenance type is required");
  }

  if (data.cost === undefined || data.cost === null) {
    errors.push("Cost is required");
  } else if (data.cost < 0) {
    errors.push("Cost cannot be negative");
  }

  return errors;
};