export const validateFuelLog = (data) => {
  const errors = [];

  if (!data.vehicle) {
    errors.push("Vehicle is required");
  }

  if (data.liters === undefined || data.liters === null) {
    errors.push("Liters is required");
  } else if (data.liters < 0) {
    errors.push("Liters cannot be negative");
  }

  if (data.cost === undefined || data.cost === null) {
    errors.push("Cost is required");
  } else if (data.cost < 0) {
    errors.push("Cost cannot be negative");
  }

  return errors;
};

export const validateExpense = (data) => {
  const errors = [];

  if (!data.vehicle) {
    errors.push("Vehicle is required");
  }

  if (!data.type || data.type.trim() === "") {
    errors.push("Expense type is required");
  }

  if (data.amount === undefined || data.amount === null) {
    errors.push("Amount is required");
  } else if (data.amount < 0) {
    errors.push("Amount cannot be negative");
  }

  return errors;
};