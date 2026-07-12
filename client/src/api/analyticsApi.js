// Dummy analytics API - pre-aggregated so the charts panel can just render it

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

const tripsPerMonth = [
  { month: "Feb", trips: 34 },
  { month: "Mar", trips: 41 },
  { month: "Apr", trips: 38 },
  { month: "May", trips: 52 },
  { month: "Jun", trips: 47 },
  { month: "Jul", trips: 29 },
];

const fuelSpendPerMonth = [
  { month: "Feb", amount: 62000 },
  { month: "Mar", amount: 71500 },
  { month: "Apr", amount: 68300 },
  { month: "May", amount: 79800 },
  { month: "Jun", amount: 74200 },
  { month: "Jul", amount: 41000 },
];

const maintenanceCostByVehicle = [
  { vehicle: "MP04 AB 1234", cost: 21400 },
  { vehicle: "MH12 CD 5566", cost: 18900 },
  { vehicle: "MP07 XY 9081", cost: 9600 },
];

const driverUtilization = [
  { driverName: "Ramesh Yadav", tripsCompleted: 18, kmDriven: 4210 },
  { driverName: "Suresh Patil", tripsCompleted: 14, kmDriven: 5330 },
  { driverName: "Anil Kumar", tripsCompleted: 6, kmDriven: 1180 },
];

export async function fetchFleetSummary() {
  await delay();
  return {
    totalDrivers: 4,
    activeDrivers: 2,
    totalVehicles: 4,
    tripsThisMonth: 29,
    fuelSpendThisMonth: 41000,
    maintenanceDue: 2,
  };
}

export async function fetchTripsPerMonth() {
  await delay(300);
  return tripsPerMonth;
}

export async function fetchFuelSpendPerMonth() {
  await delay(300);
  return fuelSpendPerMonth;
}

export async function fetchMaintenanceCostByVehicle() {
  await delay(300);
  return maintenanceCostByVehicle;
}

export async function fetchDriverUtilization() {
  await delay(300);
  return driverUtilization;
}
