import { useState } from "react";

export default function TripCompleteModal({ trip, onClose, onSubmit, isSaving }) {
  const [actualDistanceKm, setActualDistanceKm] = useState(trip?.distanceKm ?? "");
  const [notes, setNotes] = useState("");

  if (!trip) return null;

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      id: trip.id,
      details: {
        completedAt: new Date().toISOString(),
        actualDistanceKm: Number(actualDistanceKm) || trip.distanceKm,
        notes,
      },
    });
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal__header">
          <h3>Complete Trip — {trip.id}</h3>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal__body">
          <p className="muted-text">
            {trip.origin} → {trip.destination} · {trip.driverName}
          </p>

          <label>
            Actual Distance (km)
            <input
              type="number"
              min="0"
              value={actualDistanceKm}
              onChange={(e) => setActualDistanceKm(e.target.value)}
            />
          </label>

          <label>
            Notes
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any delays, damages, deviations..."
            />
          </label>

          <div className="modal__footer">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={isSaving}>
              {isSaving ? "Saving..." : "Confirm Completion"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
