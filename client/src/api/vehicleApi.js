import axiosInstance from './axiosInstance'

// TODO: replace with real endpoints once backend is ready
// getVehicles -> axiosInstance.get('/vehicles')
// createVehicle -> axiosInstance.post('/vehicles', data)
// updateVehicle -> axiosInstance.put(`/vehicles/${id}`, data)
// deleteVehicle -> axiosInstance.delete(`/vehicles/${id}`)

let dummyVehicles = [
  { id: 'V001', number: 'MH12AB1234', driver: 'Ramesh Kumar', status: 'Active', location: 'Indore Depot' },
  { id: 'V002', number: 'MH12CD5678', driver: 'Suresh Patil', status: 'Maintenance', location: 'Service Center' },
  { id: 'V003', number: 'MH14EF9012', driver: 'Anita Sharma', status: 'Active', location: 'Bhopal Route' },
  { id: 'V004', number: 'MH12GH3456', driver: 'Unassigned', status: 'Inactive', location: 'Main Yard' }
]

export const getVehicles = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...dummyVehicles]), 400)
  })
}

export const createVehicle = (vehicle) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newVehicle = { ...vehicle, id: 'V' + String(dummyVehicles.length + 1).padStart(3, '0') }
      dummyVehicles.push(newVehicle)
      resolve(newVehicle)
    }, 400)
  })
}

export const updateVehicle = (id, updates) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dummyVehicles = dummyVehicles.map((v) => (v.id === id ? { ...v, ...updates } : v))
      resolve(dummyVehicles.find((v) => v.id === id))
    }, 400)
  })
}

export const deleteVehicle = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dummyVehicles = dummyVehicles.filter((v) => v.id !== id)
      resolve({ success: true })
    }, 400)
  })
}

