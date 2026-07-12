import Select from '../common/Select'

function FilterBar({ dateFilter, onDateChange, statusFilter, onStatusChange }) {
  return (
    <div className="filter-bar">
      <div className="form-group">
        <label>Date</label>
        <input type="date" value={dateFilter} onChange={(e) => onDateChange(e.target.value)} />
      </div>
      <Select
        label="Status"
        value={statusFilter}
        onChange={onStatusChange}
        options={[
          { value: 'all', label: 'All' },
          { value: 'active', label: 'Active' },
          { value: 'maintenance', label: 'Maintenance' },
          { value: 'inactive', label: 'Inactive' }
        ]}
      />
    </div>
  )
}

export default FilterBar

