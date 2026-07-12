let trips = [
  {
    id: "trp-101",
    origin: "Bhopal",
    destination: "Indore",
    driverId: "drv-001",
    driverName: "Ramesh Yadav",
    vehicle: "MP04 AB 1234",
    status: "in_transit",
    scheduledAt: "2026-07-12T06:30:00",
    completedAt: null,
    distanceKm: 195,
    cargo: "Textile rolls",
  },
  {
    id: "trp-102",
    origin: "Indore",
    destination: "Nagpur",
    driverId: "drv-002",
    driverName: "Suresh Patil",
    vehicle: "MH12 CD 5566",
    status: "scheduled",
    scheduledAt: "2026-07-13T09:00:00",
    completedAt: null,
    distanceKm: 420,
    cargo: "Auto parts",
  },
  {
    id: "trp-103",
    origin: "Bhopal",
    destination: "Jabalpur",
    driverId: "drv-001",
    driverName: "Ramesh Yadav",
    vehicle: "MP04 AB 1234",
    status: "completed",
    scheduledAt: "2026-07-09T05:00:00",
    completedAt: "2026-07-09T12:40:00",
    distanceKm: 310,
    cargo: "FMCG cartons",
  },
  {
    id: "trp-104",
    origin: "Gwalior",
    destination: "Agra",
    driverId: "drv-003",
    driverName: "Anil Kumar",
    vehicle: "MP07 XY 9081",
    status: "cancelled",
    scheduledAt: "2026-07-08T07:15:00",
    completedAt: null,
    distanceKm: 120,
    cargo: "Machine parts",
  },
];

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

export async function fetchTrips() {
  await delay();
  return [...trips];
}

export async function createTrip(payload) {
  await delay();
  const trip = {
    id: `trp-${Date.now()}`,
    status: "scheduled",
    completedAt: null,
    ...payload,
  };
  trips = [trip, ...trips];
  return trip;
}

export async function updateTripStatus(id, status) {
  await delay(300);
  trips = trips.map((t) => (t.id === id ? { ...t, status } : t));
  return trips.find((t) => t.id === id);
}

export async function completeTrip(id, { completedAt, notes, actualDistanceKm }) {
  await delay();
  trips = trips.map((t) =>
    t.id === id
      ? {
          ...t,
          status: "completed",
          completedAt,
          notes,
          distanceKm: actualDistanceKm ?? t.distanceKm,
        }
      : t
  );
  return trips.find((t) => t.id === id);
}

export async function cancelTrip(id) {
  return updateTripStatus(id, "cancelled");
}
