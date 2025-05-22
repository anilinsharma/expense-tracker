import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav
      style={{
        backgroundColor: '#2d3436',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
        💸 Expense Tracker
      </div>

      <button
        onClick={handleLogout}
        style={{
          backgroundColor: '#e17055',
          color: 'white',
          border: 'none',
          padding: '0.4rem 0.8rem',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 500,
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
