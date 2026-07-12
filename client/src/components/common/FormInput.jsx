import { Mail, Lock } from 'lucide-react'

const iconFor = (type) => {
  if (type === 'email') return Mail
  if (type === 'password') return Lock
  return null
}

function FormInput({ label, type = 'text', value, onChange, error, placeholder }) {
  const Icon = iconFor(type)

  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <div className={`input-wrap ${error ? 'input-wrap-error' : ''}`}>
        {Icon && <Icon size={16} className="input-icon" />}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={Icon ? 'has-icon' : ''}
        />
      </div>
      {error && <span className="error-text">{error}</span>}
    </div>
  )
}

export default FormInput
