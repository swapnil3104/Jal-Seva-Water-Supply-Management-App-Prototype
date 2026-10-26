/**
 * Water Supply Schedule Domain Mock Service
 * 
 * Handles schedule operations:
 * - Filtering by area, day of the week, status, and query
 * - Schedule creation with defaults and generated IDs
 * - Schedule updates and deletions
 */

import { generateScheduleId } from './idGenerator';

export const scheduleService = {
  /**
   * Filter and search schedules
   */
  listSchedules(schedules = [], { area, day, status, search } = {}) {
    if (!Array.isArray(schedules)) return [];

    return schedules.filter((s) => {
      if (area && area !== 'all' && s.area.toLowerCase() !== area.toLowerCase()) {
        return false;
      }
      if (day && day !== 'all' && s.day !== day) {
        return false;
      }
      if (status && status !== 'all' && s.status !== status) {
        return false;
      }
      if (search && search.trim()) {
        const query = search.trim().toLowerCase();
        const matchArea = s.area?.toLowerCase().includes(query);
        const matchZone = s.zone?.toLowerCase().includes(query);
        const matchTime = s.time?.toLowerCase().includes(query);
        const matchNote = s.note?.toLowerCase().includes(query);
        if (!matchArea && !matchZone && !matchTime && !matchNote) {
          return false;
        }
      }
      return true;
    });
  },

  /**
   * Find single schedule by ID
   */
  getScheduleById(schedules = [], id) {
    if (!id || !Array.isArray(schedules)) return null;
    return schedules.find((s) => s.id === id) || null;
  },

  /**
   * Create a new schedule entry
   */
  createSchedule(data = {}) {
    const id = generateScheduleId();
    return {
      id,
      area: data.area || 'वारजे माळवाडी (Warje)',
      zone: data.zone || 'प्रभाग क्र. १२',
      day: data.day || 'रोज (Daily)',
      time: data.time || 'सकाळी ०६:०० ते ०८:००',
      duration: data.duration || '२ तास',
      pressure: data.pressure || '४.० PSI',
      status: data.status || 'scheduled',
      statusLabel: data.statusLabel || (data.status === 'active' ? 'सुरू' : 'नियोजित'),
      note: data.note || 'प्रशासनाकडून प्रसिद्ध केलेले नमुना वेळापत्रक.',
      ...data,
      id, // ensure ID is not overwritten
    };
  },

  /**
   * Update an existing schedule in the list
   */
  updateScheduleInList(schedules = [], id, updates = {}) {
    if (!id || !Array.isArray(schedules)) return schedules;
    return schedules.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
  },

  /**
   * Delete a schedule from the list
   */
  deleteScheduleFromList(schedules = [], id) {
    if (!id || !Array.isArray(schedules)) return schedules;
    return schedules.filter((item) => item.id !== id);
  },
};
