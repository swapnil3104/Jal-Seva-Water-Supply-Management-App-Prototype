/**
 * Water Utility Bills Domain Mock Service
 * 
 * Handles mock bill queries and simulated prototype payments:
 * - Listing bills by citizen or payment status
 * - Simulating non-financial mock payments with safe receipt generation
 * - Explicitly protects against sensitive payment details or real external calls
 */

import { generateReceiptId } from './idGenerator';

export const billService = {
  /**
   * Filter bills by status
   */
  listBills(bills = [], { status, search } = {}) {
    if (!Array.isArray(bills)) return [];

    return bills.filter((b) => {
      if (status && status !== 'all' && b.status !== status) {
        return false;
      }
      if (search && search.trim()) {
        const query = search.trim().toLowerCase();
        const matchId = b.id?.toLowerCase().includes(query);
        const matchConsumer = b.consumerNumber?.toLowerCase().includes(query);
        const matchPeriod = b.period?.toLowerCase().includes(query);
        if (!matchId && !matchConsumer && !matchPeriod) {
          return false;
        }
      }
      return true;
    });
  },

  /**
   * Get single bill by ID
   */
  getBillById(bills = [], id) {
    if (!id || !Array.isArray(bills)) return null;
    return bills.find((b) => b.id === id) || null;
  },

  /**
   * Simulate demo payment for a bill
   */
  simulateBillPayment(bills = [], billId) {
    if (!billId || !Array.isArray(bills)) return { updatedBills: bills, receiptNumber: null };

    const receiptNumber = generateReceiptId();
    const now = new Date();
    const paidAt = `${now.getDate()} ऑक्टोबर ${now.getFullYear()}`;

    const updatedBills = bills.map((b) => {
      if (b.id === billId) {
        return {
          ...b,
          status: 'paid',
          receiptNumber,
          paidAt,
        };
      }
      return b;
    });

    return { updatedBills, receiptNumber };
  },
};
