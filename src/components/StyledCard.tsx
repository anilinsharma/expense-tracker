import React from 'react';

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const StyledCard = ({ children, style }: Props) => (
  <div style={{
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    width: '100%',
    ...style
  }}>
    {children}
  </div>
);

export default StyledCard;
