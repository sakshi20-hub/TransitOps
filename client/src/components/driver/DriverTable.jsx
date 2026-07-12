import LicenseStatusBadge from "./LicenseStatusBadge";

const STATUS_LABELS = {
  active: "Active",
  on_leave: "On Leave",
  inactive: "Inactive",
};

export default function DriverTable({ drivers, onEdit, onDelete, isLoading }) {
  if (isLoading) {
    return <p className="empty-state">Loading drivers...</p>;
  }

  if (!drivers.length) {
    return <p className="empty-state">No drivers added yet.</p>;
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>License No.</th>
            <th>License Status</th>
            <th>Status</th>
            <th>Vehicle</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.name}</td>
              <td>{driver.phone}</td>
              <td>{driver.licenseNumber}</td>
              <td>
                <LicenseStatusBadge expiryDate={driver.licenseExpiry} />
              </td>
              <td>
                <span className={`pill pill--${driver.status}`}>
                  {STATUS_LABELS[driver.status] ?? driver.status}
                </span>
              </td>
              <td>{driver.assignedVehicle || "—"}</td>
              <td className="table-actions">
                <button className="link-btn" onClick={() => onEdit(driver)}>
                  Edit
                </button>
                <button className="link-btn link-btn--danger" onClick={() => onDelete(driver.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
