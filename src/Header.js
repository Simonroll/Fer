import React from 'react';

function Header({ title }) {
  return (
    <div style={{ backgroundColor: '#333', color: '#fff', padding: '20px 0' }}>
      <h2>{title}</h2>
    </div>
  );
}

export default Header;