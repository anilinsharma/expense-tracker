import { Link, useNavigate, useLocation } from 'react-router-dom';
 // 👈 import useNavigate
import { useAuth } from '../context/AuthContext';
const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  const linkStyle = (path: string) => ({
    color: isActive(path) ? '#74b9ff' : 'white',
    textDecoration: isActive(path) ? 'underline' : 'none',
    fontWeight: isActive(path) ? 'bold' : 'normal',
  });

  return (
    <nav style={{
      backgroundColor: '#2d3436',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      <div style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold' }}>
        💸 Expense Tracker
      </div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <Link to="/dashboard" style={linkStyle('/dashboard')}>Dashboard</Link>
        <Link to="/add-expense" style={linkStyle('/add-expense')}>Add Expense</Link>
        <Link to="/calendar" style={linkStyle('/calendar')}>Calendar</Link>
        <Link to="/groups" style={linkStyle('/groups')}>Groups</Link>
        <button onClick={handleLogout} style={{
          backgroundColor: '#e17055',
          color: 'white',
          border: 'none',
          padding: '0.4rem 0.8rem',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
