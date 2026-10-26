/**
 * Centralized Demo ID Generation Service
 * 
 * Provides deterministic, clean ID formats for mock prototype entities.
 * Clearly prefixes each entity to avoid collisions in prototype state.
 */

export function generateComplaintId() {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `JS-${year}-${randomNum}`;
}

export function generateTankerRequestId() {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `TNK-${year}-${randomNum}`;
}

export function generateScheduleId() {
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `SCH-${randomNum}`;
}

export function generateNoticeId() {
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `NOT-${randomNum}`;
}

export function generateReceiptId() {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `RCP-${year}-${randomNum}`;
}
