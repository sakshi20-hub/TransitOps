import { Search } from 'lucide-react'
import Select from '../common/Select'

function VehicleFilterBar({ search, onSearchChange, statusFilter, onStatusChange }) {
  return (
    <div className="filter-bar">
      <div className="form-group filter-search">
        <label>Search</label>
        <div className="input-wrap">
          <Search size={16} className="input-icon" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by number or driver"
            className="has-icon"
          />
        </div>
      </div>
      <Select
        label="Status"
        value={statusFilter}
        onChange={onStatusChange}
        options={[
          { value: 'all', label: 'All' },
          { value: 'Active', label: 'Active' },
          { value: 'Maintenance', label: 'Maintenance' },
          { value: 'Inactive', label: 'Inactive' }
        ]}
      />
    </div>
  )
}

export default VehicleFilterBar
