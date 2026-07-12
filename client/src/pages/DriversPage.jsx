import { useState } from 'react';
import DriverTable from '../components/driver/DriverTable';
import DriverFormModal from '../components/driver/DriverFormModal';
import { useDriversList, useCreateDriver, useUpdateDriver, useDeleteDriver } from '../hooks/useDrivers';
import '../styles/dashboard.css';

const PAGE_SIZE = 6;

export default function DriversPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [activeModal, setActiveModal] = useState(null); // { mode: 'create' | 'edit', driver? }

  const { data, isLoading, isError } = useDriversList({
    search: searchTerm,
    status: statusFilter,
    page,
    pageSize: PAGE_SIZE,
  });

  const createDriverMutation = useCreateDriver();
  const updateDriverMutation = useUpdateDriver();
  const deleteDriverMutation = useDeleteDriver();

  const activeMutation = activeModal?.mode === 'edit' ? updateDriverMutation : createDriverMutation;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(1);
  };

  const closeModal = () => {
    activeMutation.reset();
    setActiveModal(null);
  };

  const handleFormSubmit = (payload) => {
    if (activeModal?.mode === 'edit') {
      updateDriverMutation.mutate(
        { id: activeModal.driver.id, payload },
        { onSuccess: () => setActiveModal(null) }
      );
    } else {
      createDriverMutation.mutate(payload, { onSuccess: () => setActiveModal(null) });
    }
  };

  const handleDeleteRequest = (driver) => {
    const confirmed = window.confirm(`Remove ${driver.name} from the driver roster?`);
    if (confirmed) {
      deleteDriverMutation.mutate(driver.id);
    }
  };

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <h1>Drivers</h1>
          <p>Manage roster details, license status and vehicle assignments.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setActiveModal({ mode: 'create' })}>
          + Add driver
        </button>
      </div>

      <div className="surface-card">
        <div className="toolbar-row">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, license or vehicle"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <select className="filter-select" value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="on-leave">On leave</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <DriverTable
          drivers={data?.items ?? []}
          isLoading={isLoading}
          isError={isError}
          page={page}
          pageSize={PAGE_SIZE}
          totalCount={data?.total ?? 0}
          onPageChange={setPage}
          onEdit={(driver) => setActiveModal({ mode: 'edit', driver })}
          onDelete={handleDeleteRequest}
        />
      </div>

      {activeModal && (
        <DriverFormModal
          driver={activeModal.driver}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          isSubmitting={activeMutation.isPending}
          submitError={activeMutation.isError ? 'Something went wrong saving this driver.' : null}
        />
      )}
    </div>
  );
}