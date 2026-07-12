const NETWORK_DELAY_MS = 500;

function delay(payload, ms = NETWORK_DELAY_MS) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(structuredClone(payload));
    }, ms);
  });
}


let fuelLogs = [
  {
    id: "fuel-2001",
    vehicle: "MH-12 AB 4521",
    driver: "Ajay Verma",
    date: "2026-07-08",
    mileage: 41250,
    liters: 38.5,
    costPerLiter: 96.2,
    totalCost: 3703.7,
  },
];


let expenseLogs = [
  {
    id: "exp-3001",
    vehicle: "MH-12 AB 4521",
    category: "Toll",
    date: "2026-07-06",
    amount: 340,
    description: "Mumbai-Pune expressway toll",
  },
];


function generateId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}


function validateFuel(payload) {
  if (!payload.vehicle?.trim()) {
    throw new Error("Vehicle is required");
  }

  if (!payload.liters || payload.liters <= 0) {
    throw new Error("Invalid fuel quantity");
  }

  if (!payload.costPerLiter || payload.costPerLiter <= 0) {
    throw new Error("Invalid fuel price");
  }
}


function validateExpense(payload) {
  if (!payload.vehicle?.trim()) {
    throw new Error("Vehicle is required");
  }

  if (!payload.category?.trim()) {
    throw new Error("Expense category required");
  }

  if (!payload.amount || payload.amount <= 0) {
    throw new Error("Invalid expense amount");
  }
}


// ---------- FUEL ----------


export async function getFuelLogs() {
  return delay(fuelLogs);
}


export async function createFuelLog(payload) {

  validateFuel(payload);

  const totalCost = Number(
    (payload.liters * payload.costPerLiter)
      .toFixed(2)
  );


  const newLog = {
    id: generateId("fuel"),
    ...payload,
    totalCost,
  };


  fuelLogs.unshift(newLog);

  return delay(newLog);
}


export async function updateFuelLog(id, payload) {

  const index = fuelLogs.findIndex(
    (log) => log.id === id
  );


  if(index === -1){
    throw new Error("Fuel log not found");
  }


  const updated = {
    ...fuelLogs[index],
    ...payload,
  };


  updated.totalCost = Number(
    (
      updated.liters *
      updated.costPerLiter
    ).toFixed(2)
  );


  fuelLogs[index] = updated;


  return delay(updated);
}


export async function deleteFuelLog(id){

  const exists = fuelLogs.some(
    (log)=>log.id===id
  );


  if(!exists){
    throw new Error("Fuel log not found");
  }


  fuelLogs = fuelLogs.filter(
    (log)=>log.id!==id
  );


  return delay({
    success:true
  });
}



// ---------- EXPENSE ----------


export async function getExpenseLogs(){
  return delay(expenseLogs);
}


export async function createExpenseLog(payload){

  validateExpense(payload);


  const newExpense = {
    id:generateId("exp"),
    ...payload
  };


  expenseLogs.unshift(newExpense);


  return delay(newExpense);
}


export async function updateExpenseLog(id,payload){

  const index = expenseLogs.findIndex(
    (item)=>item.id===id
  );


  if(index===-1){
    throw new Error("Expense not found");
  }


  expenseLogs[index]={
    ...expenseLogs[index],
    ...payload
  };


  return delay(expenseLogs[index]);
}


export async function deleteExpenseLog(id){

  const exists = expenseLogs.some(
    (item)=>item.id===id
  );


  if(!exists){
    throw new Error("Expense not found");
  }


  expenseLogs = expenseLogs.filter(
    (item)=>item.id!==id
  );


  return delay({
    success:true
  });
}



// ---------- SUMMARY ----------


export async function getFuelExpenseSummary(){

  const totalFuelCost =
    fuelLogs.reduce(
      (sum,item)=>sum+item.totalCost,
      0
    );


  const totalExpenseCost =
    expenseLogs.reduce(
      (sum,item)=>sum+item.amount,
      0
    );


  const totalLiters =
    fuelLogs.reduce(
      (sum,item)=>sum+item.liters,
      0
    );


  return delay({
    totalFuelCost:Number(
      totalFuelCost.toFixed(2)
    ),

    totalExpenseCost,

    totalLiters:Number(
      totalLiters.toFixed(1)
    ),

    combinedSpend:Number(
      (totalFuelCost+totalExpenseCost)
      .toFixed(2)
    )
  });
}