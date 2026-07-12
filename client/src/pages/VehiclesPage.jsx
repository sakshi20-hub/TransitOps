import { useMemo, useState } from "react";
import VehicleTable from "../components/vehicle/VehicleTable";
import VehicleFormModal from "../components/vehicle/VehicleFormModal";
import {
  useCreateVehicle,
  useDeleteVehicle,
  useUpdateVehicle,
  useVehicles,
} from "../hooks/useVehicles";
import "./page.css";

export default function VehiclesPage() {
  const { data: vehicles = [], isLoading, isError } = useVehicles();

  const createMutation = useCreateVehicle();
  const updateMutation = useUpdateVehicle();
  const deleteMutation = useDeleteVehicle();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  const summary = useMemo(() => {
    const active = vehicles.filter((vehicle) => vehicle.status === "Active");
    const underMaintenance = vehicles.filter((vehicle) => vehicle.status === "Under Maintenance");
    const unassigned = vehicles.filter((vehicle) => !vehicle.assignedDriver);
    return {
      total: vehicles.length,
      activeCount: active.length,
      underMaintenanceCount: underMaintenance.length,
      unassignedCount: unassigned.length,
    };
  }, [vehicles]);

  const openCreateModal = () => {
    setEditingVehicle(null);
    setIsModalOpen(true);
  };

  const openEditModal = (vehicle) => {
    setEditingVehicle(vehicle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingVehicle(null);
  };

  const handleSubmit = (values) => {
    if (editingVehicle) {
      updateMutation.mutate({ id: editingVehicle.id, payload: values }, { onSuccess: closeModal });
    } else {
      createMutation.mutate(values, { onSuccess: closeModal });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this vehicle from the fleet?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Vehicles</h1>
          <p className="page-subtitle">Manage your fleet of vehicles and driver assignments</p>
        </div>
        <button type="button" className="page-primary-btn" onClick={openCreateModal}>
          + Add Vehicle
        </button>
      </div>

      <div className="page-kpi-row">
        <div className="page-kpi-card">
          <span className="page-kpi-label">Total Vehicles</span>
          <span className="page-kpi-value">{summary.total}</span>
        </div>
        <div className="page-kpi-card">
          <span className="page-kpi-label">Active</span>
          <span className="page-kpi-value">{summary.activeCount}</span>
        </div>
        <div className="page-kpi-card">
          <span className="page-kpi-label">Under Maintenance</span>
          <span className="page-kpi-value">{summary.underMaintenanceCount}</span>
        </div>
        <div className="page-kpi-card">
          <span className="page-kpi-label">Unassigned</span>
          <span className="page-kpi-value">{summary.unassignedCount}</span>
        </div>
      </div>

      {isLoading && <div className="page-state-message">Loading vehicles...</div>}
      {isError && <div className="page-state-message page-state-error">Failed to load vehicles.</div>}

      {!isLoading && !isError && (
        <VehicleTable
          vehicles={vehicles}
          onEdit={openEditModal}
          onDelete={handleDelete}
          isDeleting={deleteMutation.isPending}
        />
      )}

      {isModalOpen && (
        <VehicleFormModal
          initialVehicle={editingVehicle}
          onClose={closeModal}
          onSubmit={handleSubmit}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      )}
    </div>
  );
}