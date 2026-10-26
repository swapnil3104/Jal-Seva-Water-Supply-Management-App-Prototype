import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrototypeBanner from '../components/layout/PrototypeBanner';
import Welcome from '../pages/Welcome';
import CitizenDashboard from '../pages/citizen/CitizenDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <PrototypeBanner />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/citizen" element={<CitizenDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}
