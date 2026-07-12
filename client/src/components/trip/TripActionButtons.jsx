// Renders the valid next-actions for a trip based on its current status.
// Keeping the state machine here so TripTable doesn't need to know the rules.

const NEXT_ACTIONS = {
  scheduled: ["start", "cancel"],
  in_transit: ["complete", "cancel"],
  completed: [],
  cancelled: [],
};

const ACTION_LABELS = {
  start: "Start Trip",
  complete: "Mark Complete",
  cancel: "Cancel",
};

export default function TripActionButtons({ trip, onStart, onComplete, onCancel }) {
  const actions = NEXT_ACTIONS[trip.status] ?? [];

  if (!actions.length) {
    return <span className="muted-text">No actions</span>;
  }

  function handleClick(action) {
    if (action === "start") onStart(trip.id);
    if (action === "complete") onComplete(trip);
    if (action === "cancel") onCancel(trip.id);
  }

  return (
    <div className="table-actions">
      {actions.map((action) => (
        <button
          key={action}
          className={action === "cancel" ? "link-btn link-btn--danger" : "link-btn"}
          onClick={() => handleClick(action)}
        >
          {ACTION_LABELS[action]}
        </button>
      ))}
    </div>
  );
}
