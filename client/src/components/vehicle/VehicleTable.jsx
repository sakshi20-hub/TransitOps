import { Pencil, Trash2 } from 'lucide-react'
import Table from '../common/Table'
import StatusBadge from '../common/StatusBadge'
import Button from '../common/Button'

function VehicleTable({ vehicles, onEdit, onDelete }) {
  const columns = [
    { key: 'id', label: 'Vehicle ID' },
    { key: 'number', label: 'Number' },
    { key: 'driver', label: 'Driver' },
    { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { key: 'location', label: 'Location' }
  ]

  return (
    <Table
      columns={columns}
      data={vehicles}
      renderActions={(row) => (
        <div className="table-actions">
          <Button variant="secondary" onClick={() => onEdit(row)}>
            <Pencil size={14} />
            Edit
          </Button>
          <Button variant="danger" onClick={() => onDelete(row.id)}>
            <Trash2 size={14} />
            Delete
          </Button>
        </div>
      )}
    />
  )
}

export default VehicleTable
