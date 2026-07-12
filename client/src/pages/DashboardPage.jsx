import { useState } from 'react'
import KpiCardGroup from '../components/dashboard/KpiCardGroup'
import FilterBar from '../components/dashboard/FilterBar'
import FleetOverview from '../components/dashboard/FleetOverview'
import Table from '../components/common/Table'
import StatusBadge from '../components/common/StatusBadge'

// dummy data until backend/reports API is ready
const kpis = [
  { label: 'Total Vehicles', value: 24 },
  { label: 'Active Vehicles', value: 19 },
  { label: 'Total Trips', value: 342 },
  { label: 'Revenue (ROI)', value: '₹4.8L' }
]

// dummy status breakdown for the fleet overview panel (presentational only)
const fleetStatus = { active: 19, maintenance: 3, inactive: 2 }

const recentActivity = [
  { id: 1, vehicle: 'MH12AB1234', driver: 'Ramesh Kumar', event: 'Trip completed', status: 'Active' },
  { id: 2, vehicle: 'MH12CD5678', driver: 'Suresh Patil', event: 'Sent for service', status: 'Maintenance' },
  { id: 3, vehicle: 'MH14EF9012', driver: 'Anita Sharma', event: 'Trip started', status: 'Active' },
  { id: 4, vehicle: 'MH12GH3456', driver: 'Unassigned', event: 'Marked inactive', status: 'Inactive' }
]

const activityColumns = [
  { key: 'vehicle', label: 'Vehicle' },
  { key: 'driver', label: 'Driver' },
  { key: 'event', label: 'Event' },
  { key: 'status', label: 'Status', render: (row) => <StatusBadge status={row.status} /> }
]

function DashboardPage() {
  const [dateFilter, setDateFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Overview of your fleet's performance today</p>
        </div>
      </div>

      <KpiCardGroup kpis={kpis} />

      <FilterBar
        dateFilter={dateFilter}
        onDateChange={setDateFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <div className="dashboard-grid">
        <div className="card activity-card">
          <h2 className="card-title">Recent Activity</h2>
          <div className="table-scroll">
            <Table columns={activityColumns} data={recentActivity} />
          </div>
        </div>

        <FleetOverview
          active={fleetStatus.active}
          maintenance={fleetStatus.maintenance}
          inactive={fleetStatus.inactive}
        />
      </div>
    </div>
  )
}

export default DashboardPage
