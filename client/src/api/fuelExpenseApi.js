// Dummy fuel + expense API - two separate collections since a "fuel log" and a
// general "expense" line item don't map 1:1 in the real schema either

let fuelLogs = [
  {
    id: "fuel-701",
    vehicle: "MP04 AB 1234",
    driverName: "Ramesh Yadav",
    litres: 62.5,
    pricePerLitre: 96.4,
    odometer: 84213,
    filledAt: "2026-07-10T08:15:00",
    station: "IOCL Hoshangabad Rd",
  },
  {
    id: "fuel-702",
    vehicle: "MH12 CD 5566",
    driverName: "Suresh Patil",
    litres: 80,
    pricePerLitre: 94.1,
    odometer: 132044,
    filledAt: "2026-07-09T18:40:00",
    station: "HP Petrol Pump, Dewas Naka",
  },
  {
    id: "fuel-703",
    vehicle: "MP04 AB 1234",
    driverName: "Ramesh Yadav",
    litres: 55,
    pricePerLitre: 96.8,
    odometer: 83610,
    filledAt: "2026-07-05T07:05:00",
    station: "IOCL Hoshangabad Rd",
  },
];

let expenses = [
  {
    id: "exp-801",
    category: "Toll",
    vehicle: "MP04 AB 1234",
    amount: 640,
    incurredOn: "2026-07-10",
    description: "Bhopal-Indore toll plazas",
  },
  {
    id: "exp-802",
    category: "Parking",
    vehicle: "MH12 CD 5566",
    amount: 150,
    incurredOn: "2026-07-09",
    description: "Overnight parking, Dewas Naka",
  },
  {
    id: "exp-803",
    category: "Fine",
    vehicle: "MP07 XY 9081",
    amount: 1000,
    incurredOn: "2026-07-06",
    description: "Overspeed challan",
  },
];

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

export async function fetchFuelLogs() {
  await delay();
  return [...fuelLogs];
}

export async function createFuelLog(payload) {
  await delay();
  const log = { id: `fuel-${Date.now()}`, ...payload };
  fuelLogs = [log, ...fuelLogs];
  return log;
}

export async function fetchExpenses() {
  await delay();
  return [...expenses];
}

export async function createExpense(payload) {
  await delay();
  const expense = { id: `exp-${Date.now()}`, ...payload };
  expenses = [expense, ...expenses];
  return expense;
}

export async function deleteExpense(id) {
  await delay(300);
  expenses = expenses.filter((e) => e.id !== id);
  return { id };
}
