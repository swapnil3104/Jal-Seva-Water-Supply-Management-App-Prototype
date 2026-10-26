import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import WelcomeLayout from '../components/layout/WelcomeLayout';
import CitizenLayout from '../components/layout/CitizenLayout';
import AdminLayout from '../components/layout/AdminLayout';

// App Experience Shell Components
import SplashScreen from '../components/common/SplashScreen';
import ServicesModal from '../components/common/ServicesModal';
import AppLoopController from '../components/common/AppLoopController';
import { usePrototype } from '../context/PrototypeContext';

// Pages - Welcome
import Welcome from '../pages/Welcome';

// Pages - Citizen
import CitizenDashboard from '../pages/citizen/CitizenDashboard';
import WaterSchedule from '../pages/citizen/WaterSchedule';
import MyComplaints from '../pages/citizen/MyComplaints';
import NewComplaint from '../pages/citizen/NewComplaint';
import ComplaintDetail from '../pages/citizen/ComplaintDetail';
import Bills from '../pages/citizen/Bills';
import TankerRequest from '../pages/citizen/TankerRequest';
import Notices from '../pages/citizen/Notices';
import Profile from '../pages/citizen/Profile';

// Pages - Admin
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminComplaints from '../pages/admin/AdminComplaints';
import AdminComplaintDetail from '../pages/admin/AdminComplaintDetail';
import AdminTankerRequests from '../pages/admin/AdminTankerRequests';
import AdminSchedules from '../pages/admin/AdminSchedules';
import AdminNotices from '../pages/admin/AdminNotices';

export default function App() {
  const { 
    splashVisible, 
    hideSplashScreen, 
    isServicesModalOpen, 
    closeServicesModal 
  } = usePrototype();

  return (
    <>
      {/* 1. App Start Loading Screen (Splash Screen) */}
      <SplashScreen 
        isVisible={splashVisible} 
        onClose={hideSplashScreen} 
      />

      {/* 2. All Features Directory & Action Sheet */}
      <ServicesModal 
        isOpen={isServicesModalOpen} 
        onClose={closeServicesModal} 
      />

      {/* 3. Floating App Loop Controller (Seamless Mode & Screen Switcher) */}
      <AppLoopController />

      {/* 4. Application Routes */}
      <Routes>
        {/* Welcome / Demo Landing Route */}
        <Route
          path="/"
          element={
            <WelcomeLayout>
              <Welcome />
            </WelcomeLayout>
          }
        />

        {/* Citizen Experience Routes */}
        <Route element={<CitizenLayout />}>
          <Route path="/citizen" element={<CitizenDashboard />} />
          <Route path="/schedule" element={<WaterSchedule />} />
          <Route path="/complaints" element={<MyComplaints />} />
          <Route path="/complaints/new" element={<NewComplaint />} />
          <Route path="/complaints/:id" element={<ComplaintDetail />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/tanker-request" element={<TankerRequest />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Admin Demo Experience Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/complaints" element={<AdminComplaints />} />
          <Route path="/admin/complaints/:id" element={<AdminComplaintDetail />} />
          <Route path="/admin/tanker-requests" element={<AdminTankerRequests />} />
          <Route path="/admin/schedules" element={<AdminSchedules />} />
          <Route path="/admin/notices" element={<AdminNotices />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
