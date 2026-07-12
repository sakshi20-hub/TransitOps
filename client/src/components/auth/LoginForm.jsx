import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import FormInput from '../common/FormInput'
import Button from '../common/Button'

function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const newErrors = {}
    if (!email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email'

    if (!password) newErrors.password = 'Password is required'
    else if (password.length < 4) newErrors.password = 'Password must be at least 4 characters'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')
    if (!validate()) return

    setSubmitting(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setServerError(err.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <FormInput
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
        placeholder="admin@transitops.com"
      />
      <FormInput
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        error={errors.password}
        placeholder="••••••"
      />
      {serverError && <p className="error-text">{serverError}</p>}
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Logging in...' : 'Login'}
      </Button>
      <p className="login-hint">Tip: use "admin@..." or "manager@..." in the email to try different roles</p>
    </form>
  )
}

export default LoginForm

