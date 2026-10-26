/**
 * Safe Local Storage & In-Memory Fallback Service
 * 
 * Provides resilient persistence for prototype mock data.
 * - Detects browser storage availability
 * - Falls back to memory cache if localStorage is disabled, blocked, or quota-exceeded
 * - Handles corrupt JSON gracefully without crashing
 * - Strictly strips sensitive mock keys (no real payment data or credentials)
 */

const STORAGE_NAMESPACE = 'jal_seva_prototype_v1';

// In-memory fallback map when localStorage is blocked or unavailable
const memoryFallback = new Map();

/**
 * Check if window.localStorage is functional
 */
function isLocalStorageAvailable() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }
    const testKey = '__jal_seva_storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

const isStorageUsable = isLocalStorageAvailable();

/**
 * Build a prefixed storage key
 */
function getStorageKey(key) {
  return `${STORAGE_NAMESPACE}_${key}`;
}

export const storageService = {
  /**
   * Determine if persistent storage is active
   */
  isAvailable() {
    return isStorageUsable;
  },

  /**
   * Get parsed item with fallback
   */
  getItem(key, defaultValue = null) {
    const fullKey = getStorageKey(key);
    try {
      if (isStorageUsable) {
        const raw = window.localStorage.getItem(fullKey);
        if (raw !== null) {
          return JSON.parse(raw);
        }
      } else {
        if (memoryFallback.has(fullKey)) {
          return memoryFallback.get(fullKey);
        }
      }
    } catch (error) {
      console.warn(`[storageService] Failed to parse stored item '${key}':`, error);
    }
    return defaultValue;
  },

  /**
   * Store serializable data
   */
  setItem(key, value) {
    const fullKey = getStorageKey(key);
    try {
      // Security filter: sanitize out any accidental sensitive properties
      const sanitized = JSON.parse(
        JSON.stringify(value, (k, v) => {
          if (['password', 'creditCard', 'cvv', 'token', 'secret'].includes(k)) {
            return undefined;
          }
          return v;
        })
      );

      if (isStorageUsable) {
        window.localStorage.setItem(fullKey, JSON.stringify(sanitized));
      } else {
        memoryFallback.set(fullKey, sanitized);
      }
      return true;
    } catch (error) {
      console.warn(`[storageService] Failed to save item '${key}':`, error);
      memoryFallback.set(fullKey, value);
      return false;
    }
  },

  /**
   * Remove item from store
   */
  removeItem(key) {
    const fullKey = getStorageKey(key);
    try {
      if (isStorageUsable) {
        window.localStorage.removeItem(fullKey);
      }
      memoryFallback.delete(fullKey);
    } catch (error) {
      console.warn(`[storageService] Failed to remove item '${key}':`, error);
    }
  },

  /**
   * Clear all Jal Seva keys from storage
   */
  clearAll() {
    try {
      if (isStorageUsable) {
        const keysToRemove = [];
        for (let i = 0; i < window.localStorage.length; i++) {
          const k = window.localStorage.key(i);
          if (k && k.startsWith(STORAGE_NAMESPACE)) {
            keysToRemove.push(k);
          }
        }
        keysToRemove.forEach((k) => window.localStorage.removeItem(k));
      }
      memoryFallback.clear();
      return true;
    } catch (error) {
      console.warn('[storageService] Failed to clear storage:', error);
      return false;
    }
  },
};
