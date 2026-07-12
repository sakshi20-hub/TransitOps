import { useState } from "react";
import MaintenanceTable from "../components/maintenance/MaintenanceTable";
import MaintenanceFormModal from "../components/maintenance/MaintenanceFormModal";
import { useMaintenance } from "../hooks/useMaintenance";

export default function MaintenancePage() {
  const { records, isLoading, addRecord, editRecord, removeRecord } = useMaintenance();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  function openCreateModal() {
    setEditingRecord(null);
    setModalOpen(true);
  }

  function openEditModal(record) {
    setEditingRecord(record);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingRecord(null);
  }

  function handleSubmit(payload) {
    if (editingRecord) {
      editRecord.mutate({ id: editingRecord.id, payload }, { onSuccess: closeModal });
    } else {
      addRecord.mutate(payload, { onSuccess: closeModal });
    }
  }

  function handleDelete(id) {
    if (window.confirm("Delete this maintenance record?")) {
      removeRecord.mutate(id);
    }
  }

  const overdueCount = records.filter((r) => r.status === "overdue").length;

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <h2>Maintenance</h2>
          <p className="muted-text">
            {overdueCount > 0
              ? `${overdueCount} vehicle(s) overdue for service`
              : "All vehicles up to date"}
          </p>
        </div>
        <button className="btn btn--primary" onClick={openCreateModal}>
          + Schedule Service
        </button>
      </div>

      <MaintenanceTable
        records={records}
        isLoading={isLoading}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      <MaintenanceFormModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={editingRecord}
        isSaving={addRecord.isPending || editRecord.isPending}
      />
    </div>
  );
}
