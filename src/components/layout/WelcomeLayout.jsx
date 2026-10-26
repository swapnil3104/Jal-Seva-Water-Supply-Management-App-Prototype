import React from 'react';
import { Outlet } from 'react-router-dom';
import PrototypeBanner from './PrototypeBanner';

export default function WelcomeLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <PrototypeBanner />
      <main className="flex-1 flex flex-col justify-center">
        {children || <Outlet />}
      </main>
    </div>
  );
}
