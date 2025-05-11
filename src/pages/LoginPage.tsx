import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#dfe6e9',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ marginBottom: '1rem', color: '#2d3436' }}>Welcome Back 👋</h2>
        <p style={{ marginBottom: '2rem', color: '#636e72' }}>Login to continue tracking your expenses.</p>
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        <button onClick={handleLogin} style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: '#0984e3',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          🔐 Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
