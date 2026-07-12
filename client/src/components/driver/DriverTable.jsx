import LicenseStatusBadge from "./LicenseStatusBadge";
import "../../styles/dashboard.css";

const STATUS_CHIP_MAP = {
  active: {
    chipClass: "chip-success",
    label: "Active",
  },
  "on-leave": {
    chipClass: "chip-warning",
    label: "On leave",
  },
  suspended: {
    chipClass: "chip-danger",
    label: "Suspended",
  },
};

function getInitials(fullName = "") {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function DriverStatusChip({ status }) {
  const normalizedStatus = status
    ?.toLowerCase()
    .replace(" ", "-");

  const tone =
    STATUS_CHIP_MAP[normalizedStatus] ?? {
      chipClass: "chip-neutral",
      label: status || "Unknown",
    };

  return (
    <span className={`status-chip ${tone.chipClass}`}>
      {tone.label}
    </span>
  );
}

export default function DriverTable({
  drivers = [],
  isLoading,
  isError,
  page,
  pageSize,
  totalCount,
  onPageChange,
  onEdit,
  onDelete,
}) {
  const totalPages = Math.max(
    1,
    Math.ceil(totalCount / pageSize)
  );

  const rangeStart =
    totalCount === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const rangeEnd = Math.min(
    page * pageSize,
    totalCount
  );

  if (isLoading) {
    return (
      <div className="loading-row">
        Loading drivers…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="error-row">
        Could not load drivers. Try refreshing the page.
      </div>
    );
  }

  if (drivers.length === 0) {
    return (
      <div className="empty-state">
        No drivers match your search.
      </div>
    );
  }

  return (
    <>
      <table className="data-table">
        <thead>
          <tr>
            <th>Driver</th>
            <th>Phone</th>
            <th>License number</th>
            <th>License status</th>
            <th>Vehicle</th>
            <th>Status</th>
            <th aria-label="Actions" />
          </tr>
        </thead>

        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td>
                <div className="entity-name-cell">
                  <div className="entity-avatar">
                    {getInitials(driver.name)}
                  </div>

                  <span className="entity-name-primary">
                    {driver.name}
                  </span>
                </div>
              </td>

              <td className="cell-secondary">
                {driver.phone}
              </td>

              <td className="cell-secondary">
                {driver.licenseNumber}
              </td>

              <td>
                <LicenseStatusBadge
                  licenseExpiry={
                    driver.licenseExpiry
                  }
                />
              </td>

              <td>
                {driver.assignedVehicle ? (
                  driver.assignedVehicle
                ) : (
                  <span className="unassigned-text">
                    Unassigned
                  </span>
                )}
              </td>

              <td>
                <DriverStatusChip
                  status={driver.status}
                />
              </td>

              <td>
                <div className="action-btn-group">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => onEdit(driver)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger-ghost"
                    onClick={() =>
                      onDelete(driver.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-row">
        <span>
          Showing {rangeStart}-{rangeEnd} of{" "}
          {totalCount} drivers
        </span>

        <div className="pagination-controls">
          <button
            type="button"
            className="btn btn-secondary"
            disabled={page <= 1}
            onClick={() =>
              onPageChange(page - 1)
            }
          >
            Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            type="button"
            className="btn btn-secondary"
            disabled={page >= totalPages}
            onClick={() =>
              onPageChange(page + 1)
            }
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}