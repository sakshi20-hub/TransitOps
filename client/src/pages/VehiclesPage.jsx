import { useState, useMemo } from 'react'
import { Plus } from 'lucide-react'
import { useVehicles } from '../hooks/useVehicles'
import VehicleTable from '../components/vehicle/VehicleTable'
import VehicleFormModal from '../components/vehicle/VehicleFormModal'
import VehicleFilterBar from '../components/vehicle/VehicleFilterBar'
import Button from '../components/common/Button'
import Loader from '../components/common/Loader'

function VehiclesPage() {
  const { vehicles, loading, addVehicle, editVehicle, removeVehicle } = useVehicles()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesStatus = statusFilter === 'all' || v.status === statusFilter
      const matchesSearch =
        !search ||
        v.number.toLowerCase().includes(search.toLowerCase()) ||
        v.driver.toLowerCase().includes(search.toLowerCase())
      return matchesStatus && matchesSearch
    })
  }, [vehicles, search, statusFilter])

  const handleAddClick = () => {
    setEditingVehicle(null)
    setModalOpen(true)
  }

  const handleEditClick = (vehicle) => {
    setEditingVehicle(vehicle)
    setModalOpen(true)
  }

  const handleSave = (form) => {
    if (editingVehicle) {
      editVehicle(editingVehicle.id, form)
    } else {
      addVehicle(form)
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Vehicles</h1>
          <p className="page-subtitle">Manage your fleet's vehicles and their current status</p>
        </div>
        <Button onClick={handleAddClick}>
          <Plus size={16} />
          Add Vehicle
        </Button>
      </div>

      <VehicleFilterBar
        search={search}
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <div className="card table-card">
        {loading ? (
          <Loader />
        ) : (
          <div className="table-scroll">
            <VehicleTable vehicles={filteredVehicles} onEdit={handleEditClick} onDelete={removeVehicle} />
          </div>
        )}
      </div>

      <VehicleFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editingVehicle={editingVehicle}
      />
    </div>
  )
}

export default VehiclesPage
