import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLock, FiAlertCircle } from 'react-icons/fi'
import './Admin.css'

const AdminLogin = () => {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        if (password === 'admin123') {
            // In a real app, you'd set a token/session here
            localStorage.setItem('admin_session', 'true') // Simple session simulation
            navigate('/admin/dashboard')
        } else {
            setError('Invalid Password')
            setTimeout(() => setError(''), 3000)
        }
    }

    return (
        <div className="admin-login-page">
            <div className="login-card fade-in">
                <div className="login-icon">
                    <FiLock />
                </div>
                <h2 className="mb-4">Manager Access</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                    />
                    {error && (
                        <div style={{ color: '#dc2626', marginBottom: '1rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <FiAlertCircle /> {error}
                        </div>
                    )}
                    <button type="submit" className="login-btn">
                        Access Dashboard
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin
