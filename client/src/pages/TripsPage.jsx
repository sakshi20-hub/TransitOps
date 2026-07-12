import { useState } from "react";
import TripTable from "../components/trip/TripTable";
import TripCreateForm from "../components/trip/TripCreateForm";
import TripCompleteModal from "../components/trip/TripCompleteModal";
import { useTrips } from "../hooks/useTrips";
import { useDrivers } from "../hooks/useDrivers";

export default function TripsPage() {
  const { trips, isLoading, addTrip, changeTripStatus, finishTrip, cancelTrip } = useTrips();
  const { drivers } = useDrivers();
  const [tripToComplete, setTripToComplete] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function handleStart(id) {
    changeTripStatus.mutate({ id, status: "in_transit" });
  }

  function handleCancel(id) {
    if (window.confirm("Cancel this trip?")) {
      cancelTrip.mutate(id);
    }
  }

  function handleCompleteSubmit({ id, details }) {
    finishTrip.mutate({ id, details }, { onSuccess: () => setTripToComplete(null) });
  }

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h2>Trips</h2>
          <p className="muted-text">Schedule and track trips across the fleet</p>
        </div>
        <button className="btn btn--secondary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Hide Form" : "+ New Trip"}
        </button>
      </div>

      {showForm && (
        <div className="panel">
          <TripCreateForm
            drivers={drivers}
            onCreate={(payload) => addTrip.mutate(payload, { onSuccess: () => setShowForm(false) })}
            isSaving={addTrip.isPending}
          />
        </div>
      )}

      <TripTable
        trips={trips}
        isLoading={isLoading}
        onStart={handleStart}
        onComplete={setTripToComplete}
        onCancel={handleCancel}
      />

      {tripToComplete && (
        <TripCompleteModal
          trip={tripToComplete}
          onClose={() => setTripToComplete(null)}
          onSubmit={handleCompleteSubmit}
          isSaving={finishTrip.isPending}
        />
      )}
    </div>
  );
}
