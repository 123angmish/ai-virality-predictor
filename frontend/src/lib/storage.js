/**
 * Storage Manager for AI Virality Predictor
 * Manages persistence for analyses, user session, video library, and preferences safely with SSR guards.
 */

const STORAGE_KEYS = {
  USER: 'virality_user',
  HISTORY: 'virality_history',
  LIBRARY: 'virality_library',
  PREFERENCES: 'virality_preferences',
  SAVED_REPORTS: 'virality_saved_reports'
};

const sanitizeForStorage = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  const clean = { ...obj };
  if (clean.videoMeta) {
    clean.videoMeta = { ...clean.videoMeta, blobUrl: null };
  }
  return clean;
};

export const getStoredUser = () => {
  try {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

export const setStoredUser = (user) => {
  try {
    if (typeof window === 'undefined') return;
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  } catch (e) {}
};

export const getStoredHistory = () => {
  try {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const addHistoryItem = (item) => {
  try {
    if (typeof window === 'undefined') return [];
    const cleanItem = sanitizeForStorage(item);
    const current = getStoredHistory();
    const formattedItem = {
      id: cleanItem.id || `analysis-${Date.now()}`,
      timestamp: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...cleanItem
    };
    const updated = [formattedItem, ...current.filter(i => i.id !== formattedItem.id)].slice(0, 15);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    setLatestAnalysis(formattedItem);
    return updated;
  } catch (e) {
    return [];
  }
};

export const clearStoredHistory = () => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  } catch (e) {}
};

export const getStoredLibrary = () => {
  try {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.LIBRARY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const addLibraryItem = (item) => {
  try {
    if (typeof window === 'undefined') return [];
    const cleanItem = sanitizeForStorage(item);
    const current = getStoredLibrary();
    const newItem = {
      id: cleanItem.id || `lib-${Date.now()}`,
      addedAt: new Date().toISOString(),
      tags: cleanItem.tags || ['Viral Candidate'],
      ...cleanItem
    };
    const updated = [newItem, ...current.filter(i => i.id !== newItem.id)];
    localStorage.setItem(STORAGE_KEYS.LIBRARY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};

export const setLatestAnalysis = (item) => {
  try {
    if (typeof window === 'undefined') return;
    const cleanItem = sanitizeForStorage(item);
    localStorage.setItem('latest_analysis_item', JSON.stringify(cleanItem));
  } catch (e) {}
};

export const getLatestAnalysis = () => {
  try {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem('latest_analysis_item');
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};
