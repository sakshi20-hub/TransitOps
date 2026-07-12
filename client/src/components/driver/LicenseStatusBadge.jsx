import styles from "./LicenseStatusBadge.module.css";

function getLicenseStatus(licenseExpiry) {
  if (!licenseExpiry) {
    return {
      label: "No Date",
      type: "expired",
    };
  }

  const today = new Date();
  const expiry = new Date(licenseExpiry);

  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const daysLeft = Math.ceil(
    (expiry - today) / (1000 * 60 * 60 * 24)
  );

  if (daysLeft < 0) {
    return {
      label: "Expired",
      type: "expired",
    };
  }

  if (daysLeft <= 30) {
    return {
      label: `${daysLeft} days left`,
      type: "warning",
    };
  }

  return {
    label: "Valid",
    type: "valid",
  };
}

function LicenseStatusBadge({ licenseExpiry }) {
  const status = getLicenseStatus(licenseExpiry);

  return (
    <span
      className={`${styles.badge} ${styles[status.type]}`}
    >
      {status.label}
    </span>
  );
}

export default LicenseStatusBadge;