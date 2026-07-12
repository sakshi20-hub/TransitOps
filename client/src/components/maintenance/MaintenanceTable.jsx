const STATUS_LABELS = {
  scheduled: "Scheduled",
  in_progress: "In Progress",
  completed: "Completed",
  overdue: "Overdue",
};

function formatCurrency(amount) {
  if (!amount) return "—";
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function MaintenanceTable({ records, onEdit, onDelete, isLoading }) {
  if (isLoading) {
    return <p className="empty-state">Loading maintenance records...</p>;
  }

  if (!records.length) {
    return <p className="empty-state">No maintenance records found.</p>;
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Type</th>
            <th>Scheduled</th>
            <th>Vendor</th>
            <th>Cost</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {records.map((rec) => (
            <tr key={rec.id} className={rec.status === "overdue" ? "row--flagged" : ""}>
              <td>{rec.vehicle}</td>
              <td>{rec.type}</td>
              <td>{rec.scheduledDate}</td>
              <td>{rec.vendor || "—"}</td>
              <td>{formatCurrency(rec.cost)}</td>
              <td>
                <span className={`pill pill--${rec.status}`}>
                  {STATUS_LABELS[rec.status] ?? rec.status}
                </span>
              </td>
              <td className="table-actions">
                <button className="link-btn" onClick={() => onEdit(rec)}>
                  Edit
                </button>
                <button className="link-btn link-btn--danger" onClick={() => onDelete(rec.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
