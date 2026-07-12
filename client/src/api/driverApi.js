let drivers = [
  {
    id: "drv-001",
    name: "Ramesh Yadav",
    phone: "9876543210",
    licenseNumber: "MP09 20210043211",
    licenseExpiry: "2026-11-02",
    status: "active",
    assignedVehicle: "MP04 AB 1234",
    joinedOn: "2022-03-14",
  },
  {
    id: "drv-002",
    name: "Suresh Patil",
    phone: "9823456712",
    licenseNumber: "MH12 20190087654",
    licenseExpiry: "2026-08-19",
    status: "active",
    assignedVehicle: "MH12 CD 5566",
    joinedOn: "2021-07-01",
  },
  {
    id: "drv-003",
    name: "Anil Kumar",
    phone: "9911223344",
    licenseNumber: "DL08 20180012233",
    licenseExpiry: "2025-12-30",
    status: "on_leave",
    assignedVehicle: null,
    joinedOn: "2020-01-22",
  },
  {
    id: "drv-004",
    name: "Vikram Singh",
    phone: "9012345678",
    licenseNumber: "RJ14 20220099887",
    licenseExpiry: "2026-01-05",
    status: "inactive",
    assignedVehicle: null,
    joinedOn: "2023-05-11",
  },
];

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

export async function fetchDrivers() {
  await delay();
  return [...drivers];
}

export async function fetchDriverById(id) {
  await delay(250);
  const found = drivers.find((d) => d.id === id);
  if (!found) throw new Error("Driver not found");
  return found;
}

export async function createDriver(payload) {
  await delay();
  const newDriver = {
    id: `drv-${Date.now()}`,
    assignedVehicle: null,
    joinedOn: new Date().toISOString().slice(0, 10),
    ...payload,
  };
  drivers = [newDriver, ...drivers];
  return newDriver;
}

export async function updateDriver(id, payload) {
  await delay();
  drivers = drivers.map((d) => (d.id === id ? { ...d, ...payload } : d));
  return drivers.find((d) => d.id === id);
}

export async function deleteDriver(id) {
  await delay(300);
  drivers = drivers.filter((d) => d.id !== id);
  return { id };
}
