import { Zap, ShieldCheck, MapPin } from 'lucide-react'
import LoginForm from '../components/auth/LoginForm'

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-panel-left">
        <div className="login-brand">
          <span className="login-brand-icon">
            <Zap size={22} />
          </span>
          <span className="login-brand-text">TransitOps</span>
        </div>

        <h2 className="login-panel-title">Run your fleet with confidence</h2>
        <p className="login-panel-subtitle">
          Track vehicles, manage drivers, and keep every trip on schedule from one dashboard.
        </p>

        <ul className="login-feature-list">
          <li>
            <MapPin size={16} />
            Live vehicle status across your fleet
          </li>
          <li>
            <ShieldCheck size={16} />
            Role-based access for admins, managers, and drivers
          </li>
        </ul>
      </div>

      <div className="login-panel-right">
        <div className="login-card">
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to your TransitOps account</p>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
