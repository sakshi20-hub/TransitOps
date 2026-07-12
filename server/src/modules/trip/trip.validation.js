export const validateCreateTrip = (data) => {
  const errors = [];

  if (!data.source || data.source.trim() === "") {
    errors.push("Source is required");
  }

  if (!data.destination || data.destination.trim() === "") {
    errors.push("Destination is required");
  }

  if (!data.vehicle) {
    errors.push("Vehicle is required");
  }

  if (!data.driver) {
    errors.push("Driver is required");
  }

  if (data.cargoWeight === undefined || data.cargoWeight === null) {
    errors.push("Cargo weight is required");
  } else if (data.cargoWeight < 0) {
    errors.push("Cargo weight cannot be negative");
  }

  if (data.plannedDistance === undefined || data.plannedDistance === null) {
    errors.push("Planned distance is required");
  } else if (data.plannedDistance < 0) {
    errors.push("Planned distance cannot be negative");
  }

  return errors;
};

export const validateCompleteTrip = (data) => {
  const errors = [];

  if (data.finalOdometer !== undefined && data.finalOdometer < 0) {
    errors.push("Final odometer cannot be negative");
  }

  if (data.fuelConsumed !== undefined && data.fuelConsumed < 0) {
    errors.push("Fuel consumed cannot be negative");
  }

  return errors;
};