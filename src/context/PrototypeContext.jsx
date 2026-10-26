import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  INITIAL_CITIZEN,
  INITIAL_SCHEDULES,
  INITIAL_COMPLAINTS,
  INITIAL_BILLS,
  INITIAL_TANKER_REQUESTS,
  INITIAL_NOTICES,
} from '../data/mockData';
import {
  storageService,
  complaintService,
  scheduleService,
  noticeService,
  tankerService,
  billService,
} from '../services';

const PrototypeContext = createContext(null);

export function PrototypeProvider({ children }) {
  // 1. Citizen Profile State
  const [citizen, setCitizen] = useState(() =>
    storageService.getItem('citizen', INITIAL_CITIZEN)
  );

  // 2. Water Schedules State
  const [schedules, setSchedules] = useState(() =>
    storageService.getItem('schedules', INITIAL_SCHEDULES)
  );

  // 3. Citizen Complaints State
  const [complaints, setComplaints] = useState(() =>
    storageService.getItem('complaints', INITIAL_COMPLAINTS)
  );

  // 4. Utility Bills State
  const [bills, setBills] = useState(() =>
    storageService.getItem('bills', INITIAL_BILLS)
  );

  // 5. Tanker Requests State
  const [tankerRequests, setTankerRequests] = useState(() =>
    storageService.getItem('tankerRequests', INITIAL_TANKER_REQUESTS)
  );

  // 6. Public Notices State
  const [notices, setNotices] = useState(() =>
    storageService.getItem('notices', INITIAL_NOTICES)
  );

  // 7. App Shell & Experience Controls (Start Loading Splash & Services Hub)
  const [splashVisible, setSplashVisible] = useState(true);
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);

  const showSplashScreen = useCallback(() => {
    setSplashVisible(true);
  }, []);

  const hideSplashScreen = useCallback(() => {
    setSplashVisible(false);
  }, []);

  const openServicesModal = useCallback(() => {
    setIsServicesModalOpen(true);
  }, []);

  const closeServicesModal = useCallback(() => {
    setIsServicesModalOpen(false);
  }, []);

  // Sync state mutations safely to persistent storage
  useEffect(() => {
    storageService.setItem('citizen', citizen);
  }, [citizen]);

  useEffect(() => {
    storageService.setItem('schedules', schedules);
  }, [schedules]);

  useEffect(() => {
    storageService.setItem('complaints', complaints);
  }, [complaints]);

  useEffect(() => {
    storageService.setItem('bills', bills);
  }, [bills]);

  useEffect(() => {
    storageService.setItem('tankerRequests', tankerRequests);
  }, [tankerRequests]);

  useEffect(() => {
    storageService.setItem('notices', notices);
  }, [notices]);

  // --- Complaint Operations (Delegated to complaintService) ---
  const createComplaint = useCallback(
    (complaintData) => {
      const newComplaint = complaintService.createComplaint(complaintData, citizen.area);
      setComplaints((prev) => [newComplaint, ...prev]);
      return newComplaint;
    },
    [citizen.area]
  );

  const updateComplaint = useCallback((id, updates) => {
    setComplaints((prev) =>
      complaintService.updateComplaintInList(prev, id, updates)
    );
  }, []);

  const getComplaintById = useCallback(
    (id) => complaintService.getComplaintById(complaints, id),
    [complaints]
  );

  // --- Tanker Operations (Delegated to tankerService) ---
  const createTankerRequest = useCallback(
    (tankerData) => {
      const newRequest = tankerService.createTankerRequest(tankerData, citizen);
      setTankerRequests((prev) => [newRequest, ...prev]);
      return newRequest;
    },
    [citizen]
  );

  const updateTankerRequest = useCallback((id, updates) => {
    setTankerRequests((prev) =>
      tankerService.updateTankerRequestInList(prev, id, updates)
    );
  }, []);

  // --- Bill Operations (Delegated to billService) ---
  const payBill = useCallback((billId) => {
    let receiptNumber = null;
    setBills((prev) => {
      const result = billService.simulateBillPayment(prev, billId);
      receiptNumber = result.receiptNumber;
      return result.updatedBills;
    });
    return receiptNumber;
  }, []);

  // --- Schedule Operations (Delegated to scheduleService) ---
  const getSchedulesByAreaAndDay = useCallback(
    (area, day) => {
      return scheduleService.listSchedules(schedules, { area, day });
    },
    [schedules]
  );

  const createSchedule = useCallback((newScheduleData) => {
    const newSchedule = scheduleService.createSchedule(newScheduleData);
    setSchedules((prev) => [newSchedule, ...prev]);
    return newSchedule;
  }, []);

  const updateSchedule = useCallback((id, updates) => {
    setSchedules((prev) =>
      scheduleService.updateScheduleInList(prev, id, updates)
    );
  }, []);

  const deleteSchedule = useCallback((id) => {
    setSchedules((prev) =>
      scheduleService.deleteScheduleFromList(prev, id)
    );
  }, []);

  // --- Notice Operations (Delegated to noticeService) ---
  const createNotice = useCallback((newNoticeData) => {
    const newNotice = noticeService.createNotice(newNoticeData);
    setNotices((prev) => [newNotice, ...prev]);
    return newNotice;
  }, []);

  const updateNotice = useCallback((id, updates) => {
    setNotices((prev) =>
      noticeService.updateNoticeInList(prev, id, updates)
    );
  }, []);

  const deleteNotice = useCallback((id) => {
    setNotices((prev) =>
      noticeService.deleteNoticeFromList(prev, id)
    );
  }, []);

  // --- Reset All Demo Prototype Data ---
  const resetDemoData = useCallback(() => {
    setCitizen(INITIAL_CITIZEN);
    setSchedules(INITIAL_SCHEDULES);
    setComplaints(INITIAL_COMPLAINTS);
    setBills(INITIAL_BILLS);
    setTankerRequests(INITIAL_TANKER_REQUESTS);
    setNotices(INITIAL_NOTICES);
    storageService.clearAll();
  }, []);

  const value = useMemo(
    () => ({
      // State
      citizen,
      setCitizen,
      schedules,
      setSchedules,
      complaints,
      setComplaints,
      bills,
      setBills,
      tankerRequests,
      setTankerRequests,
      notices,
      setNotices,
      // Metadata & storage flags
      isPersistenceActive: storageService.isAvailable(),
      // Complaint API
      createComplaint,
      updateComplaint,
      getComplaintById,
      // Tanker API
      createTankerRequest,
      updateTankerRequest,
      // Bill API
      payBill,
      // Schedule API
      getSchedulesByAreaAndDay,
      createSchedule,
      updateSchedule,
      deleteSchedule,
      // Notice API
      createNotice,
      updateNotice,
      deleteNotice,
      // App Shell & Splash Controls
      splashVisible,
      showSplashScreen,
      hideSplashScreen,
      isServicesModalOpen,
      openServicesModal,
      closeServicesModal,
      // Global reset
      resetDemoData,
      // Expose underlying services for advanced query/search
      services: {
        storage: storageService,
        complaints: complaintService,
        schedules: scheduleService,
        notices: noticeService,
        tankers: tankerService,
        bills: billService,
      },
    }),
    [
      citizen,
      schedules,
      complaints,
      bills,
      tankerRequests,
      notices,
      splashVisible,
      showSplashScreen,
      hideSplashScreen,
      isServicesModalOpen,
      openServicesModal,
      closeServicesModal,
      createComplaint,
      updateComplaint,
      getComplaintById,
      createTankerRequest,
      updateTankerRequest,
      payBill,
      getSchedulesByAreaAndDay,
      createSchedule,
      updateSchedule,
      deleteSchedule,
      createNotice,
      updateNotice,
      deleteNotice,
      resetDemoData,
    ]
  );

  return (
    <PrototypeContext.Provider value={value}>
      {children}
    </PrototypeContext.Provider>
  );
}

export function usePrototype() {
  const context = useContext(PrototypeContext);
  if (!context) {
    throw new Error('usePrototype must be used within a PrototypeProvider');
  }
  return context;
}
