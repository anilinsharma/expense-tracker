import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaCalendarAlt, FaUsers, FaUserCircle } from 'react-icons/fa';

const BottomNav = () => {
  const { pathname } = useLocation();

  const navItems = [
    { path: '/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/add-expense', icon: <FaPlusCircle />, label: 'Add' },
    { path: '/calendar', icon: <FaCalendarAlt />, label: 'Calendar' },
    { path: '/groups', icon: <FaUsers />, label: 'Groups' },
    { path: '/profile', icon: <FaUserCircle />, label: 'Profile' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        background: '#ffffff',
        borderTop: '1px solid #dcdde1',
        boxShadow: '0 -2px 6px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0.4rem 0',
        zIndex: 999,
      }}
    >
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: pathname === item.path ? '#0984e3' : '#636e72',
            textDecoration: 'none',
          }}
        >
          <div style={{ fontSize: '1.4rem' }}>{item.icon}</div>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;
