import "../../styles/dashboard.css";

const ACTIONS_BY_STATUS = {
  scheduled: ["start", "cancel"],
  running: ["complete"],
  completed: [],
  cancelled: [],
};

export default function TripActionButtons({
  trip,
  onStart,
  onComplete,
  onCancel,
  isPending = false,
}) {
  const status = trip.status?.toLowerCase();

  const availableActions =
    ACTIONS_BY_STATUS[status] ?? [];

  if (availableActions.length === 0) {
    return (
      <span className="cell-secondary">
        No actions
      </span>
    );
  }

  return (
    <div className="action-btn-group">
      {availableActions.includes("start") && (
        <button
          type="button"
          className="btn btn-secondary"
          disabled={isPending}
          onClick={() => onStart?.(trip)}
        >
          Start
        </button>
      )}

      {availableActions.includes("complete") && (
        <button
          type="button"
          className="btn btn-primary"
          disabled={isPending}
          onClick={() => onComplete?.(trip)}
        >
        Complete
        </button>
      )}

      {availableActions.includes("cancel") && (
        <button
          type="button"
          className="btn btn-danger-ghost"
          disabled={isPending}
          onClick={() => onCancel?.(trip)}
        >
          Cancel
        </button>
      )}
    </div>
  );
}