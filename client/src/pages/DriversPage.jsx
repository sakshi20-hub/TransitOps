import { useState } from "react";
import DriverTable from "../components/driver/DriverTable";
import DriverFormModal from "../components/driver/DriverFormModal";
import { useDrivers } from "../hooks/useDrivers";

export default function DriversPage() {
  const { drivers, isLoading, addDriver, editDriver, removeDriver } = useDrivers();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);

  function openCreateModal() {
    setEditingDriver(null);
    setModalOpen(true);
  }

  function openEditModal(driver) {
    setEditingDriver(driver);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingDriver(null);
  }

  function handleSubmit(payload) {
    if (editingDriver) {
      editDriver.mutate(
        { id: editingDriver.id, payload },
        { onSuccess: closeModal }
      );
    } else {
      addDriver.mutate(payload, { onSuccess: closeModal });
    }
  }

  function handleDelete(id) {
    if (window.confirm("Remove this driver? This can't be undone.")) {
      removeDriver.mutate(id);
    }
  }

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h2>Drivers</h2>
          <p className="muted-text">Manage driver profiles and license status</p>
        </div>
        <button className="btn btn--primary" onClick={openCreateModal}>
          + Add Driver
        </button>
      </div>

      <DriverTable
        drivers={drivers}
        isLoading={isLoading}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <DriverFormModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={editingDriver}
        isSaving={addDriver.isPending || editDriver.isPending}
      />
    </div>
  );
}
