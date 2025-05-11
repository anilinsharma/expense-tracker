import React from 'react';
import Navbar from '../components/Navbar';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f1f2f6'
    }}>
      <Navbar />
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1rem',
        justifyContent: 'center'
      }}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
