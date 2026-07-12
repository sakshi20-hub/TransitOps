import { ChevronDown } from 'lucide-react'

function Select({ label, value, onChange, options }) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <div className="select-wrap">
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown size={16} className="select-chevron" />
      </div>
    </div>
  )
}

export default Select
