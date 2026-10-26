import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PrototypeBanner from './PrototypeBanner';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export default function AdminLayout({ children, title }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Top Prototype / Mock Data Notice */}
      <PrototypeBanner />

      <div className="flex flex-1">
        {/* Admin Sidebar (Desktop & Mobile Drawer) */}
        <AdminSidebar 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />

        {/* Admin Main Content Wrapper */}
        <div className="flex-1 flex flex-col min-w-0">
          <AdminHeader 
            onMenuClick={() => setIsMobileMenuOpen(true)} 
            title={title}
          />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </div>
  );
}
