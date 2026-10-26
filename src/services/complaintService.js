/**
 * Complaint Domain Mock Service
 * 
 * Handles all complaint business logic:
 * - Listing with multi-criteria filtering
 * - Complaint retrieval
 * - Validation & ID generation on creation
 * - Status updating and timeline mutation
 */

import { generateComplaintId } from './idGenerator';

export const COMPLAINT_STATUS_LABELS = {
  submitted: 'नवीन (Submitted)',
  under_review: 'तपासणी सुरू (Review)',
  in_progress: 'प्रगतीत (In Progress)',
  resolved: 'निकाली (Resolved)',
};

export const complaintService = {
  /**
   * Filter and search complaints
   */
  listComplaints(complaints = [], { category, area, status, search } = {}) {
    if (!Array.isArray(complaints)) return [];

    return complaints.filter((item) => {
      // Category filter
      if (category && category !== 'all' && item.category !== category) {
        return false;
      }
      // Area filter
      if (area && area !== 'all' && item.area !== area) {
        return false;
      }
      // Status filter
      if (status && status !== 'all' && item.status !== status) {
        return false;
      }
      // Search term
      if (search && search.trim()) {
        const query = search.trim().toLowerCase();
        const matchId = item.id?.toLowerCase().includes(query);
        const matchArea = item.area?.toLowerCase().includes(query);
        const matchDesc = item.description?.toLowerCase().includes(query);
        const matchAddr = item.address?.toLowerCase().includes(query);
        const matchCat = item.category?.toLowerCase().includes(query);
        if (!matchId && !matchArea && !matchDesc && !matchAddr && !matchCat) {
          return false;
        }
      }
      return true;
    });
  },

  /**
   * Find a complaint by ID
   */
  getComplaintById(complaints = [], id) {
    if (!id || !Array.isArray(complaints)) return null;
    return complaints.find((c) => c.id === id) || null;
  },

  /**
   * Create a new complaint object with validated fields and initial timeline
   */
  createComplaint({ category, area, address, landmark, description, photoUrl = null }, defaultArea = 'वारजे माळवाडी (Warje)') {
    if (!category || !address || !description) {
      throw new Error('कृपया आवश्यक माहिती भरा (Category, Address, and Description are required).');
    }

    const id = generateComplaintId();
    const now = new Date();
    const dateFormatted = `${now.getDate()} ऑक्टोबर ${now.getFullYear()}, ${now.toLocaleTimeString('mr-IN', { hour: '2-digit', minute: '2-digit' })}`;

    return {
      id,
      category,
      area: area || defaultArea,
      address,
      landmark: landmark || '',
      description,
      photoUrl,
      date: dateFormatted,
      timestamp: Date.now(),
      status: 'submitted',
      statusLabel: COMPLAINT_STATUS_LABELS.submitted,
      adminNote: 'तक्रार नुकतीच नोंदवली असून प्रशासकीय कक्ष तपासणी सुरू आहे.',
      timeline: [
        {
          step: 'तक्रार यशस्वीरित्या नोंदवली',
          date: dateFormatted,
          done: true,
          current: true,
        },
        {
          step: 'अभियंत्यांची प्राथमिक तपासणी',
          date: 'प्रतीक्षेत (Pending)',
          pending: true,
        },
        {
          step: 'दुरुस्ती पथक रवाना',
          date: 'नियोजित',
          pending: true,
        },
        {
          step: 'समस्या निवारण',
          date: 'नियोजित',
          pending: true,
        },
      ],
    };
  },

  /**
   * Update complaint status and staff remarks
   */
  updateComplaintInList(complaints = [], id, { status, adminNote }) {
    if (!id || !Array.isArray(complaints)) return complaints;

    const now = new Date();
    const timeFormatted = `${now.getDate()} ऑक्टोबर, ${now.toLocaleTimeString('mr-IN', { hour: '2-digit', minute: '2-digit' })}`;

    return complaints.map((item) => {
      if (item.id !== id) return item;

      const updatedTimeline = item.timeline ? [...item.timeline] : [];

      if (status === 'in_progress') {
        updatedTimeline.forEach((step) => {
          if (step.step.includes('दुरुस्ती')) {
            step.done = true;
            step.current = true;
            step.pending = false;
            step.date = timeFormatted;
          }
        });
      } else if (status === 'resolved') {
        updatedTimeline.forEach((step) => {
          step.done = true;
          step.current = false;
          step.pending = false;
        });
        if (!updatedTimeline.some((t) => t.step.includes('निकाली') || t.step.includes('निवारण'))) {
          updatedTimeline.push({
            step: 'तक्रार यशस्वीरित्या निकाली काढली',
            date: timeFormatted,
            done: true,
          });
        }
      }

      return {
        ...item,
        status: status || item.status,
        statusLabel: COMPLAINT_STATUS_LABELS[status] || item.statusLabel,
        adminNote: adminNote !== undefined ? adminNote : item.adminNote,
        timeline: updatedTimeline,
      };
    });
  },
};
