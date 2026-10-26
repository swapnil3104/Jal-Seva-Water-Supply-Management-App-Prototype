import React from 'react';
import { Outlet } from 'react-router-dom';
import PrototypeBanner from './PrototypeBanner';
import AppHeader from './AppHeader';
import CitizenBottomNav from './CitizenBottomNav';

export default function CitizenLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      {/* Top Prototype / Mock Data Notice */}
      <PrototypeBanner />

      {/* Citizen Sticky Header */}
      <AppHeader />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 pb-24 md:pb-10">
        {children || <Outlet />}
      </main>

      {/* Mobile Fixed Bottom Navigation */}
      <CitizenBottomNav />
    </div>
  );
}
