function StatusBadge({ status }) {
  const cls = status.toLowerCase().replace(' ', '-')
  return (
    <span className={`badge badge-${cls}`}>
      <span className="badge-dot" />
      {status}
    </span>
  )
}

export default StatusBadge


