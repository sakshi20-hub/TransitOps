const NETWORK_DELAY_MS = 500;

const delay = (payload, ms = NETWORK_DELAY_MS) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(payload), ms)
  );

let maintenanceRecords = [
  {
    id: "mnt-1001",
    vehicle: "MH-12 AB 4521",
    serviceType: "Oil Change",
    date: "2026-07-18",
    cost: 2400,
    mechanic: "Ravi Kulkarni",
    status: "Upcoming",
    notes: "Synthetic oil replacement",
  },
];


const generateId = () =>
  `mnt-${Date.now()}`;


export function getMaintenanceRecords() {
  return delay([...maintenanceRecords]);
}


export function createMaintenanceRecord(payload) {

  const newRecord = {
    id: generateId(),
    status: "Upcoming",
    cost: Number(payload.cost),
    ...payload,
  };


  maintenanceRecords = [
    newRecord,
    ...maintenanceRecords
  ];

  return delay(newRecord);
}



export function updateMaintenanceRecord(id,payload){

  const exists = maintenanceRecords.find(
    item => item.id === id
  );


  if(!exists){
    return Promise.reject(
      new Error("Record not found")
    );
  }


  maintenanceRecords =
    maintenanceRecords.map(item =>
      item.id === id
      ? {...item,...payload}
      : item
    );


  return delay(
    maintenanceRecords.find(
      item=>item.id===id
    )
  );
}



export function deleteMaintenanceRecord(id){

  const exists = maintenanceRecords.some(
    item=>item.id===id
  );


  if(!exists){
    return Promise.reject(
      new Error("Record not found")
    );
  }


  maintenanceRecords =
    maintenanceRecords.filter(
      item=>item.id!==id
    );


  return delay({id});
}



export function getDistinctVehicles(){

 const vehicles=[
   ...new Set(
     maintenanceRecords.map(
       item=>item.vehicle
     )
   )
 ];

 return delay(vehicles);
}