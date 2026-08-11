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

const DEFAULT_TEAM_MEMBERS = [
  { id: 'tm-1', name: 'Alex Creator', email: 'creator@virality.ai', role: 'Owner', status: 'Active', scans: 42, avatar: 'A', color: 'bg-brand-600' },
  { id: 'tm-2', name: 'Sophia Chen', email: 'sophia@virality.ai', role: 'Growth Lead', status: 'Active', scans: 28, avatar: 'S', color: 'bg-purple-600' },
  { id: 'tm-3', name: 'Devin Miller', email: 'devin@virality.ai', role: 'Video Editor', status: 'Active', scans: 19, avatar: 'D', color: 'bg-indigo-600' },
  { id: 'tm-4', name: 'Rohan Sharma', email: 'rohan@virality.ai', role: 'Virality Analyst', status: 'Pending', scans: 0, avatar: 'R', color: 'bg-amber-600' }
];

export const getStoredTeamMembers = () => {
  try {
    if (typeof window === 'undefined') return DEFAULT_TEAM_MEMBERS;
    const data = localStorage.getItem('virality_team_members');
    return data ? JSON.parse(data) : DEFAULT_TEAM_MEMBERS;
  } catch (e) {
    return DEFAULT_TEAM_MEMBERS;
  }
};

export const addTeamMember = (member) => {
  try {
    if (typeof window === 'undefined') return DEFAULT_TEAM_MEMBERS;
    const current = getStoredTeamMembers();
    const newMember = {
      id: `tm-${Date.now()}`,
      status: 'Pending',
      scans: 0,
      avatar: (member.name || member.email)[0].toUpperCase(),
      color: 'bg-brand-600',
      ...member
    };
    const updated = [newMember, ...current];
    localStorage.setItem('virality_team_members', JSON.stringify(updated));
    return updated;
  } catch (e) {
    return DEFAULT_TEAM_MEMBERS;
  }
};

export const removeTeamMember = (id) => {
  try {
    if (typeof window === 'undefined') return DEFAULT_TEAM_MEMBERS;
    const current = getStoredTeamMembers();
    const updated = current.filter(m => m.id !== id);
    localStorage.setItem('virality_team_members', JSON.stringify(updated));
    return updated;
  } catch (e) {
    return DEFAULT_TEAM_MEMBERS;
  }
};

const DEFAULT_PROJECTS = [
  { id: 'proj-1', title: 'Q3 YouTube Shorts Virality Push', platform: 'YouTube Shorts', videoCount: 14, avgVirality: 89.2, owner: 'Sophia Chen', updated: '2 hours ago' },
  { id: 'proj-2', title: 'TikTok Hook A/B Test Campaigns', platform: 'TikTok', videoCount: 22, avgVirality: 84.0, owner: 'Devin Miller', updated: '1 day ago' },
  { id: 'proj-3', title: 'Instagram Reels Micro-Influencers', platform: 'Instagram Reels', videoCount: 8, avgVirality: 91.5, owner: 'Alex Creator', updated: '3 days ago' }
];

export const getStoredTeamProjects = () => {
  try {
    if (typeof window === 'undefined') return DEFAULT_PROJECTS;
    const data = localStorage.getItem('virality_team_projects');
    return data ? JSON.parse(data) : DEFAULT_PROJECTS;
  } catch (e) {
    return DEFAULT_PROJECTS;
  }
};

export const addTeamProject = (project) => {
  try {
    if (typeof window === 'undefined') return DEFAULT_PROJECTS;
    const current = getStoredTeamProjects();
    const newProj = {
      id: `proj-${Date.now()}`,
      videoCount: 0,
      avgVirality: 85.0,
      updated: 'Just now',
      ...project
    };
    const updated = [newProj, ...current];
    localStorage.setItem('virality_team_projects', JSON.stringify(updated));
    return updated;
  } catch (e) {
    return DEFAULT_PROJECTS;
  }
};

