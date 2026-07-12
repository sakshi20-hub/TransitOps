export {}

// -------------------- Roles --------------------
export const ROLES = Object.freeze({
  FLEET_MANAGER: 'FLEET_MANAGER',
  DRIVER: 'DRIVER',
  SAFETY_OFFICER: 'SAFETY_OFFICER',
  FINANCIAL_ANALYST: 'FINANCIAL_ANALYST',
});

export const ROLE_VALUES = Object.values(ROLES);

// -------------------- Vehicle Status --------------------
export const VEHICLE_STATUS = Object.freeze({
  AVAILABLE: 'AVAILABLE',
  ON_TRIP: 'ON_TRIP',
  IN_SHOP: 'IN_SHOP',
  RETIRED: 'RETIRED',
});

export const VEHICLE_STATUS_VALUES = Object.values(VEHICLE_STATUS);

// -------------------- Driver Status --------------------
export const DRIVER_STATUS = Object.freeze({
  AVAILABLE: 'AVAILABLE',
  ON_TRIP: 'ON_TRIP',
  OFF_DUTY: 'OFF_DUTY',
  SUSPENDED: 'SUSPENDED',
});

export const DRIVER_STATUS_VALUES = Object.values(DRIVER_STATUS);

// -------------------- Trip Status --------------------
export const TRIP_STATUS = Object.freeze({
  DRAFT: 'DRAFT',
  DISPATCHED: 'DISPATCHED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
});

export const TRIP_STATUS_VALUES = Object.values(TRIP_STATUS);

// -------------------- Maintenance Status --------------------
export const MAINTENANCE_STATUS = Object.freeze({
  ACTIVE: 'ACTIVE',
  CLOSED: 'CLOSED',
});

export const MAINTENANCE_STATUS_VALUES = Object.values(MAINTENANCE_STATUS);

// -------------------- Expense Types --------------------
export const EXPENSE_TYPE = Object.freeze({
  TOLL: 'TOLL',
  MAINTENANCE: 'MAINTENANCE',
  OTHER: 'OTHER',
});

export const EXPENSE_TYPE_VALUES = Object.values(EXPENSE_TYPE);

// -------------------- HTTP Status Codes --------------------
export const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
});

// -------------------- API --------------------
export const API_PREFIX = '/api';