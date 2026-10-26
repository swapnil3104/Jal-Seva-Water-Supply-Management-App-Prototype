/**
 * Public Water Notices Domain Mock Service
 * 
 * Handles advisory announcements and maintenance notifications:
 * - Filtering by area, priority (high, medium, normal), status
 * - Notice creation with formatted timestamps and generated IDs
 * - Notice updates and deletions
 */

import { generateNoticeId } from './idGenerator';

export const noticeService = {
  /**
   * Filter and search notices
   */
  listNotices(notices = [], { area, priority, status, search } = {}) {
    if (!Array.isArray(notices)) return [];

    return notices.filter((n) => {
      if (area && area !== 'all' && n.area !== area && n.area !== 'सर्व पुणे शहर (All Areas)') {
        return false;
      }
      if (priority && priority !== 'all' && n.priority !== priority) {
        return false;
      }
      if (status && status !== 'all' && n.status !== status) {
        return false;
      }
      if (search && search.trim()) {
        const query = search.trim().toLowerCase();
        const matchTitle = n.title?.toLowerCase().includes(query);
        const matchArea = n.area?.toLowerCase().includes(query);
        const matchDesc = n.description?.toLowerCase().includes(query);
        if (!matchTitle && !matchArea && !matchDesc) {
          return false;
        }
      }
      return true;
    });
  },

  /**
   * Get single notice by ID
   */
  getNoticeById(notices = [], id) {
    if (!id || !Array.isArray(notices)) return null;
    return notices.find((n) => n.id === id) || null;
  },

  /**
   * Create a new notice entry
   */
  createNotice(data = {}) {
    const id = generateNoticeId();
    const now = new Date();
    const dateFormatted = `${now.getDate()} ऑक्टोबर ${now.getFullYear()}`;

    return {
      id,
      title: data.title || 'महत्त्वाची सूचना (Notice)',
      area: data.area || 'सर्व पुणे शहर (All Areas)',
      date: data.date || dateFormatted,
      time: data.time || 'सकाळी व संध्याकाळी',
      priority: data.priority || 'normal',
      status: data.status || 'active',
      statusLabel: data.statusLabel || 'सक्रिय सूचना',
      description: data.description || '',
      ...data,
      id, // ensure ID is preserved
    };
  },

  /**
   * Update a notice in the list
   */
  updateNoticeInList(notices = [], id, updates = {}) {
    if (!id || !Array.isArray(notices)) return notices;
    return notices.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
  },

  /**
   * Delete a notice from the list
   */
  deleteNoticeFromList(notices = [], id) {
    if (!id || !Array.isArray(notices)) return notices;
    return notices.filter((item) => item.id !== id);
  },
};
