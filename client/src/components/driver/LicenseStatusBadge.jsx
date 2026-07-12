// Small helper to flag licenses that are close to expiry or already expired.
// Kept separate from DriverTable since it's reused in the driver form preview too.

function getExpiryState(expiryDate) {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) return { label: "Expired", tone: "danger" };
  if (daysLeft <= 60) return { label: `Expires in ${daysLeft}d`, tone: "warning" };
  return { label: "Valid", tone: "success" };
}

export default function LicenseStatusBadge({ expiryDate }) {
  if (!expiryDate) return <span className="badge badge--muted">Unknown</span>;

  const { label, tone } = getExpiryState(expiryDate);

  return <span className={`badge badge--${tone}`}>{label}</span>;
}
