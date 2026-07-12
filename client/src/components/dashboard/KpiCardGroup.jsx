import { Truck, Activity, Repeat, IndianRupee, TrendingUp, TrendingDown } from 'lucide-react'

// presentational-only lookup: maps a kpi label to an icon + a dummy trend.
// none of this touches the actual kpi data passed in from the page.
const meta = {
  'Total Vehicles': { icon: Truck, trend: 4, direction: 'up' },
  'Active Vehicles': { icon: Activity, trend: 2, direction: 'up' },
  'Total Trips': { icon: Repeat, trend: 12, direction: 'up' },
  'Revenue (ROI)': { icon: IndianRupee, trend: 3, direction: 'down' }
}

function KpiCardGroup({ kpis }) {
  return (
    <div className="kpi-group">
      {kpis.map((kpi) => {
        const info = meta[kpi.label] || { icon: Activity, trend: 0, direction: 'up' }
        const Icon = info.icon
        const TrendIcon = info.direction === 'up' ? TrendingUp : TrendingDown

        return (
          <div className="kpi-card" key={kpi.label}>
            <div className="kpi-card-top">
              <span className="kpi-icon">
                <Icon size={18} />
              </span>
              <span className={`kpi-trend kpi-trend-${info.direction}`}>
                <TrendIcon size={13} />
                {info.trend}%
              </span>
            </div>
            <div className="kpi-value">{kpi.value}</div>
            <div className="kpi-label">{kpi.label}</div>
          </div>
        )
      })}
    </div>
  )
}

export default KpiCardGroup
