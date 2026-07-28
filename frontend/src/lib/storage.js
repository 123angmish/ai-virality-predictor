/**
 * Storage Manager for AI Virality Predictor
 * Manages persistence for analyses, user session, video library, and preferences.
 */

const STORAGE_KEYS = {
  USER: 'virality_user',
  HISTORY: 'virality_history',
  LIBRARY: 'virality_library',
  PREFERENCES: 'virality_preferences',
  SAVED_REPORTS: 'virality_saved_reports'
};

export const getStoredUser = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

export const setStoredUser = (user) => {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  } catch (e) {}
};

export const getStoredHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const addHistoryItem = (item) => {
  try {
    const current = getStoredHistory();
    const formattedItem = {
      id: item.id || `analysis-${Date.now()}`,
      timestamp: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...item
    };
    const updated = [formattedItem, ...current.filter(i => i.id !== formattedItem.id)].slice(0, 30);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};

export const clearStoredHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  } catch (e) {}
};

export const getStoredLibrary = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LIBRARY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const addLibraryItem = (item) => {
  try {
    const current = getStoredLibrary();
    const newItem = {
      id: item.id || `lib-${Date.now()}`,
      addedAt: new Date().toISOString(),
      tags: item.tags || ['Viral Candidate'],
      ...item
    };
    const updated = [newItem, ...current.filter(i => i.id !== newItem.id)];
    localStorage.setItem(STORAGE_KEYS.LIBRARY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};
