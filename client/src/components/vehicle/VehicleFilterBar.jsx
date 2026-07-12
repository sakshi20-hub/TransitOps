import "./vehicle.css";

export default function VehicleFilterBar({ searchTerm, onSearchChange, statusFilter, onStatusChange }) {
  return (
    <div className="veh-table-toolbar">
      <input
        type="text"
        className="veh-search-input"
        placeholder="Search by reg. number, model, or driver"
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <select
        className="veh-status-select"
        value={statusFilter}
        onChange={(event) => onStatusChange(event.target.value)}
      >
        <option value="all">All statuses</option>
        <option value="Active">Active</option>
        <option value="Under Maintenance">Under Maintenance</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
  );
}