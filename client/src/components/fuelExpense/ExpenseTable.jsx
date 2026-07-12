import "../../styles/dashboard.css";

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ExpenseTable({
  expenses = [],
  onDelete,
  isLoading,
}) {
  if (isLoading) {
    return <p className="empty-state">Loading expenses...</p>;
  }

  if (expenses.length === 0) {
    return <p className="empty-state">No expenses logged yet.</p>;
  }

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

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
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>
                <span
                  className={`pill pill--${
                    expense.category?.toLowerCase() || "default"
                  }`}
                >
                  {expense.category || "Other"}
                </span>
              </td>

              <td>{expense.vehicle || "—"}</td>

              <td>
                ₹
                {Number(expense.amount || 0).toLocaleString(
                  "en-IN"
                )}
              </td>

              <td>{formatDate(expense.date || expense.incurredOn)}</td>

              <td className="muted-text">
                {expense.description || "—"}
              </td>

              <td className="table-actions">
                <button
                  type="button"
                  className="link-btn link-btn--danger"
                  onClick={() => onDelete(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan="2">
              <strong>Total</strong>
            </td>
            <td colSpan="4">
              <strong>
                ₹{total.toLocaleString("en-IN")}
              </strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}