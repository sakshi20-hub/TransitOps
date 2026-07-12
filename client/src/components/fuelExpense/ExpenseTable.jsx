export default function ExpenseTable({ expenses, onDelete, isLoading }) {
  if (isLoading) {
    return <p className="empty-state">Loading expenses...</p>;
  }

  if (!expenses.length) {
    return <p className="empty-state">No expenses logged yet.</p>;
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Vehicle</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.id}>
              <td>
                <span className={`pill pill--${exp.category.toLowerCase()}`}>{exp.category}</span>
              </td>
              <td>{exp.vehicle}</td>
              <td>₹{exp.amount.toLocaleString("en-IN")}</td>
              <td>{exp.incurredOn}</td>
              <td className="muted-text">{exp.description || "—"}</td>
              <td className="table-actions">
                <button className="link-btn link-btn--danger" onClick={() => onDelete(exp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>Total</td>
            <td colSpan={4}>₹{total.toLocaleString("en-IN")}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
