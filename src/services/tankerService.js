/**
 * Tanker Request Domain Mock Service
 * 
 * Handles emergency and scheduled tanker operations:
 * - Listing with area and status filters
 * - Single request lookup
 * - Creation with defaults and validation
 * - Dispatch and status updates from the admin control room
 */

import { generateTankerRequestId } from './idGenerator';

export const TANKER_STATUS_LABELS = {
  submitted: 'मागणी दाखल (Submitted)',
  under_review: 'तपासणी सुरू (Review)',
  dispatched: 'टँकर रवाना (Dispatched)',
  delivered: 'पाणी वाटप पूर्ण (Delivered)',
};

export const tankerService = {
  /**
   * Filter and search tanker requests
   */
  listTankerRequests(requests = [], { area, status, search } = {}) {
    if (!Array.isArray(requests)) return [];

    return requests.filter((item) => {
      if (area && area !== 'all' && item.area !== area) {
        return false;
      }
      if (status && status !== 'all' && item.status !== status) {
        return false;
      }
      if (search && search.trim()) {
        const query = search.trim().toLowerCase();
        const matchId = item.id?.toLowerCase().includes(query);
        const matchArea = item.area?.toLowerCase().includes(query);
        const matchReason = item.reason?.toLowerCase().includes(query);
        const matchDriver = item.driverName?.toLowerCase().includes(query);
        if (!matchId && !matchArea && !matchReason && !matchDriver) {
          return false;
        }
      }
      return true;
    });
  },

  /**
   * Get single tanker request by ID
   */
  getTankerRequestById(requests = [], id) {
    if (!id || !Array.isArray(requests)) return null;
    return requests.find((r) => r.id === id) || null;
  },

  /**
   * Create a new tanker request
   */
  createTankerRequest({ area, address, reason, capacity, preferredTime, notes }, citizen = {}) {
    if (!area || !address || !reason) {
      throw new Error('कृपया परिसर, पत्ता आणि कारण नोंदवा (Area, address and reason are required).');
    }

    const id = generateTankerRequestId();
    const now = new Date();
    const dateFormatted = `${now.getDate()} ऑक्टोबर ${now.getFullYear()}`;

    return {
      id,
      citizenName: citizen.marathiName || 'नागरिक',
      area,
      address,
      reason,
      capacity: capacity || '५,००० लिटर (मिनी टँकर)',
      preferredTime: preferredTime || 'लवकरात लवकर',
      notes: notes || '',
      date: dateFormatted,
      status: 'submitted',
      statusLabel: TANKER_STATUS_LABELS.submitted,
      driverName: 'वाटप प्रतीक्षेत (Pending)',
      estimatedArrival: 'प्रशासकीय मंजुरीनंतर कळवले जाईल',
    };
  },

  /**
   * Update a tanker request in the list
   */
  updateTankerRequestInList(requests = [], id, updates = {}) {
    if (!id || !Array.isArray(requests)) return requests;

    return requests.map((item) => {
      if (item.id !== id) return item;

      const nextStatus = updates.status || item.status;
      const nextStatusLabel = TANKER_STATUS_LABELS[nextStatus] || updates.statusLabel || item.statusLabel;

      return {
        ...item,
        ...updates,
        status: nextStatus,
        statusLabel: nextStatusLabel,
      };
    });
  },
};
