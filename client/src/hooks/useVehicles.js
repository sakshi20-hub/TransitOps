import { useState, useEffect } from 'react'
import { getVehicles, createVehicle, updateVehicle, deleteVehicle } from '../api/vehicleApi'

export function useVehicles() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)

  const loadVehicles = () => {
    setLoading(true)
    getVehicles().then((data) => {
      setVehicles(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    loadVehicles()
  }, [])

  const addVehicle = async (vehicle) => {
    const created = await createVehicle(vehicle)
    setVehicles((prev) => [...prev, created])
  }

  const editVehicle = async (id, updates) => {
    const updated = await updateVehicle(id, updates)
    setVehicles((prev) => prev.map((v) => (v.id === id ? updated : v)))
  }

  const removeVehicle = async (id) => {
    await deleteVehicle(id)
    setVehicles((prev) => prev.filter((v) => v.id !== id))
  }

  return { vehicles, loading, addVehicle, editVehicle, removeVehicle, reload: loadVehicles }
}

