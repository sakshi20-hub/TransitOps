function Table({ columns, data, renderActions }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
          {renderActions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 && (
          <tr>
            <td colSpan={columns.length + (renderActions ? 1 : 0)} className="empty-row">
              No records found
            </td>
          </tr>
        )}
        {data.map((row, i) => (
          <tr key={row.id || i}>
            {columns.map((col) => (
              <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
            ))}
            {renderActions && <td>{renderActions(row)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table

