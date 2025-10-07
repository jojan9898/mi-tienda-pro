import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background text-text-primary">
      <Sidebar />
      <main className="flex-grow p-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;