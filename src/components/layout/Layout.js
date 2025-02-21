import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <main 
        className={`
          transition-all duration-300 pt-16
          ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}
        `}
      >
        <div className="px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;