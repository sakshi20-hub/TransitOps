import { useState, useEffect } from 'react'
import { Plus, Save } from 'lucide-react'
import Modal from '../common/Modal'
import FormInput from '../common/FormInput'
import Select from '../common/Select'
import Button from '../common/Button'

const emptyForm = { number: '', driver: '', status: 'Active', location: '' }

function VehicleFormModal({ isOpen, onClose, onSave, editingVehicle }) {
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    if (editingVehicle) {
      setForm(editingVehicle)
    } else {
      setForm(emptyForm)
    }
  }, [editingVehicle, isOpen])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(form)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'}>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Vehicle Number"
          value={form.number}
          onChange={(v) => handleChange('number', v)}
          placeholder="MH12AB1234"
        />
        <FormInput
          label="Driver"
          value={form.driver}
          onChange={(v) => handleChange('driver', v)}
          placeholder="Driver name"
        />
        <Select
          label="Status"
          value={form.status}
          onChange={(v) => handleChange('status', v)}
          options={[
            { value: 'Active', label: 'Active' },
            { value: 'Maintenance', label: 'Maintenance' },
            { value: 'Inactive', label: 'Inactive' }
          ]}
        />
        <FormInput
          label="Location"
          value={form.location}
          onChange={(v) => handleChange('location', v)}
          placeholder="Current location"
        />
        <Button type="submit">
          {editingVehicle ? <Save size={16} /> : <Plus size={16} />}
          {editingVehicle ? 'Save Changes' : 'Add Vehicle'}
        </Button>
      </form>
    </Modal>
  )
}

export default VehicleFormModal
