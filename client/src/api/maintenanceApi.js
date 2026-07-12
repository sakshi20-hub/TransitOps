// Dummy maintenance API

let records = [
  {
    id: "mnt-501",
    vehicle: "MP04 AB 1234",
    type: "Oil Change",
    status: "completed",
    scheduledDate: "2026-06-20",
    completedDate: "2026-06-20",
    cost: 2400,
    vendor: "Shree Auto Care",
    notes: "Synthetic oil, filter replaced",
  },
  {
    id: "mnt-502",
    vehicle: "MH12 CD 5566",
    type: "Tyre Replacement",
    status: "scheduled",
    scheduledDate: "2026-07-18",
    completedDate: null,
    cost: 18000,
    vendor: "MRF Service Point",
    notes: "All 4 tyres, rear axle wear reported",
  },
  {
    id: "mnt-503",
    vehicle: "MP07 XY 9081",
    type: "Brake Inspection",
    status: "overdue",
    scheduledDate: "2026-07-01",
    completedDate: null,
    cost: 0,
    vendor: "Bhopal Motor Works",
    notes: "Driver flagged soft brake pedal",
  },
  {
    id: "mnt-504",
    vehicle: "MP04 AB 1234",
    type: "General Service",
    status: "in_progress",
    scheduledDate: "2026-07-11",
    completedDate: null,
    cost: 5200,
    vendor: "Shree Auto Care",
    notes: "",
  },
];

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

export async function fetchMaintenanceRecords() {
  await delay();
  return [...records];
}

export async function createMaintenanceRecord(payload) {
  await delay();
  const record = {
    id: `mnt-${Date.now()}`,
    status: "scheduled",
    completedDate: null,
    ...payload,
  };
  records = [record, ...records];
  return record;
}

export async function updateMaintenanceRecord(id, payload) {
  await delay();
  records = records.map((r) => (r.id === id ? { ...r, ...payload } : r));
  return records.find((r) => r.id === id);
}

export async function deleteMaintenanceRecord(id) {
  await delay(300);
  records = records.filter((r) => r.id !== id);
  return { id };
}
