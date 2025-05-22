import React from 'react';
import Navbar from '../components/Navbar';
import BottomNav from '../components/BottomNav';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f1f2f6',
        position: 'relative',
      }}
    >
      <Navbar />

      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '1rem',
          
          justifyContent: 'center',
          paddingBottom: '4rem', // space for bottom nav
        }}
      >
        {children}
      </main>

      <div style={{ display: 'block' }}>
        <BottomNav />
      </div>
    </div>
  );
};

export default MainLayout;
