'use client';

import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../../components/layout/DashboardSidebar';
import DashboardHeader from '../../components/layout/DashboardHeader';
import CommandPalette from '../../components/analysis/CommandPalette';
import { 
  getStoredUser, 
  setStoredUser,
  getStoredTeamMembers,
  addTeamMember,
  removeTeamMember,
  getStoredTeamProjects,
  addTeamProject
} from '../../lib/storage';
import { 
  Users, 
  Plus, 
  Search, 
  Mail, 
  Shield, 
  FolderKanban, 
  Activity, 
  Flame, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  UserPlus, 
  X,
  Share2,
  Lock,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export default function TeamWorkspacePage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  
  const [activeTab, setActiveTab] = useState('members'); // 'members' | 'projects' | 'activity' | 'roles'
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'Virality Analyst' });
  const [inviteStatus, setInviteStatus] = useState(null);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectForm, setProjectForm] = useState({ title: '', platform: 'YouTube Shorts', owner: 'Alex Creator' });

  useEffect(() => {
    setCurrentUser(getStoredUser());
    setMembers(getStoredTeamMembers());
    setProjects(getStoredTeamProjects());
  }, []);

  const handleNavigate = (route) => {
    window.location.href = route;
  };

  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!inviteForm.email) return;
    
    const updated = addTeamMember({
      name: inviteForm.name || inviteForm.email.split('@')[0],
      email: inviteForm.email,
      role: inviteForm.role
    });
    setMembers(updated);
    setInviteStatus('Invitation sent successfully!');
    setTimeout(() => {
      setInviteStatus(null);
      setShowInviteModal(false);
      setInviteForm({ name: '', email: '', role: 'Virality Analyst' });
    }, 1200);
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!projectForm.title) return;

    const updated = addTeamProject(projectForm);
    setProjects(updated);
    setShowProjectModal(false);
    setProjectForm({ title: '', platform: 'YouTube Shorts', owner: currentUser?.name || 'Alex Creator' });
  };

  const handleRemoveMember = (id) => {
    if (confirm('Are you sure you want to remove this member from your team workspace?')) {
      const updated = removeTeamMember(id);
      setMembers(updated);
    }
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activityFeed = [
    { user: 'Sophia Chen', action: 'analyzed 3 TikTok videos in', project: 'TikTok Hook A/B Test Campaigns', time: '10 mins ago', icon: Flame, color: 'text-amber-500 bg-amber-50' },
    { user: 'Devin Miller', action: 'added 2 new video assets to', project: 'Q3 YouTube Shorts Virality Push', time: '1 hour ago', icon: Plus, color: 'text-brand-600 bg-brand-50' },
    { user: 'Alex Creator', action: 'invited Rohan Sharma to Team Workspace', project: '', time: '3 hours ago', icon: UserPlus, color: 'text-indigo-600 bg-indigo-50' },
    { user: 'Sophia Chen', action: 'exported Virality Diagnostic PDF for', project: 'Instagram Reels Micro-Influencers', time: ' Yesterday', icon: Share2, color: 'text-emerald-600 bg-emerald-50' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <DashboardSidebar
        activeRoute="/team"
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onLogout={() => { setStoredUser(null); window.location.href = '/'; }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          activeRouteTitle="Team Workspace"
          onOpenCmd={() => setIsCmdOpen(true)}
          currentUser={currentUser}
        />

        <main className="p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-6 animate-fade-in">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Studio Pro Tier &bull; 4 / 10 Active Seats</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Team Virality Workspace</h1>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  Collaborate with your creators, editors, and growth strategists. Shared video libraries, virality score benchmarking, and real-time audit feeds.
                </p>
              </div>

              <div className="flex items-center space-x-3 w-full md:w-auto">
                <button
                  onClick={() => setShowProjectModal(true)}
                  className="flex-1 md:flex-none px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all flex items-center justify-center space-x-2 backdrop-blur-md"
                >
                  <FolderKanban className="w-4 h-4 text-brand-300" />
                  <span>New Project</span>
                </button>
                
                <button
                  onClick={() => setShowInviteModal(true)}
                  className="flex-1 md:flex-none px-4 py-2.5 bg-gradient-to-r from-brand-500 to-indigo-600 hover:from-brand-600 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center space-x-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Invite Member</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                <div className="text-xs text-slate-400 font-semibold">Active Members</div>
                <div className="text-2xl font-black text-white mt-1 flex items-baseline space-x-1">
                  <span>{members.length}</span>
                  <span className="text-xs text-slate-400 font-normal">/ 10</span>
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                <div className="text-xs text-slate-400 font-semibold">Shared Projects</div>
                <div className="text-2xl font-black text-white mt-1">{projects.length}</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                <div className="text-xs text-slate-400 font-semibold">Team Avg Virality</div>
                <div className="text-2xl font-black text-emerald-400 mt-1 flex items-center space-x-1">
                  <Flame className="w-5 h-5 text-amber-400" />
                  <span>88.2</span>
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-sm">
                <div className="text-xs text-slate-400 font-semibold">Videos Scanned</div>
                <div className="text-2xl font-black text-brand-300 mt-1">44</div>
              </div>
            </div>
          </div>

          {/* Navigation & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex items-center space-x-1 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs overflow-x-auto">
              <button
                onClick={() => setActiveTab('members')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === 'members'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Team Members ({members.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <FolderKanban className="w-3.5 h-3.5" />
                <span>Shared Projects ({projects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('activity')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === 'activity'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Live Audit Feed</span>
              </button>

              <button
                onClick={() => setActiveTab('roles')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === 'roles'
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Roles & Permissions</span>
              </button>
            </div>

            {/* Search Input */}
            {(activeTab === 'members' || activeTab === 'projects') && (
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeTab}...`}
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-brand-500 bg-white"
                />
              </div>
            )}
          </div>

          {/* TAB 1: MEMBERS */}
          {activeTab === 'members' && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
              <div className="divide-y divide-slate-100">
                {filteredMembers.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 space-y-2">
                    <Users className="w-8 h-8 mx-auto text-slate-300" />
                    <p className="text-xs font-bold text-slate-600">No team members match your search.</p>
                  </div>
                ) : (
                  filteredMembers.map((member) => (
                    <div key={member.id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50 transition-all">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full ${member.color || 'bg-brand-600'} text-white font-black text-sm flex items-center justify-center shadow-xs flex-shrink-0`}>
                          {member.avatar || member.name[0]}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-sm font-extrabold text-slate-900 truncate">{member.name}</h3>
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                              member.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {member.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium truncate">{member.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="hidden md:block text-right">
                          <div className="text-xs font-extrabold text-slate-800">{member.role}</div>
                          <div className="text-[11px] text-slate-500 font-medium">{member.scans} analyses run</div>
                        </div>

                        {member.role !== 'Owner' ? (
                          <button
                            onClick={() => handleRemoveMember(member.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            title="Remove Member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        ) : (
                          <span className="text-[11px] font-extrabold text-slate-400 px-2 py-1 bg-slate-100 rounded-lg">Owner</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.length === 0 ? (
                <div className="col-span-full p-12 text-center text-slate-400 bg-white border border-slate-200 rounded-2xl">
                  <FolderKanban className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-xs font-bold text-slate-600 mt-2">No workspace projects found.</p>
                </div>
              ) : (
                filteredProjects.map((proj) => (
                  <div key={proj.id} className="bg-white border border-slate-200 hover:border-brand-300 rounded-2xl p-5 shadow-xs transition-all space-y-4 flex flex-col justify-between group">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold text-brand-600 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-lg">
                          {proj.platform}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">{proj.updated}</span>
                      </div>
                      <h3 className="text-sm font-black text-slate-900 group-hover:text-brand-600 transition-all leading-snug">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">Lead: <span className="font-bold text-slate-700">{proj.owner}</span></p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs">
                        <span className="font-extrabold text-slate-800">{proj.videoCount} Videos</span>
                        <span className="text-slate-300">&bull;</span>
                        <span className="font-black text-emerald-600 flex items-center space-x-1">
                          <Flame className="w-3.5 h-3.5 text-amber-500" />
                          <span>{proj.avgVirality}</span>
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-all" />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: AUDIT FEED */}
          {activeTab === 'activity' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-black text-slate-900">Recent Workspace Activity</h3>
              <div className="space-y-4">
                {activityFeed.map((act, idx) => {
                  const Icon = act.icon;
                  return (
                    <div key={idx} className="flex items-start space-x-3.5 p-3 rounded-xl hover:bg-slate-50 transition-all">
                      <div className={`p-2.5 rounded-xl ${act.color} flex-shrink-0 mt-0.5`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-slate-800 leading-relaxed font-medium">
                          <strong className="font-black text-slate-900">{act.user}</strong> {act.action}{' '}
                          {act.project && <strong className="font-bold text-brand-600">"{act.project}"</strong>}
                        </p>
                        <span className="text-[10px] text-slate-400 font-semibold">{act.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: ROLES MATRIX */}
          {activeTab === 'roles' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-sm font-black text-slate-900">Team Permissions Matrix</h3>
                <p className="text-xs text-slate-500 font-medium">Granular access controls for workspace security and asset protection.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-slate-50/50">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">Admin / Owner</h4>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Full workspace management</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Invite & remove team members</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Billing & subscription control</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-slate-50/50">
                  <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 font-bold flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">Virality Analyst</h4>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Run unlimited video scans</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Create & edit shared projects</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Export custom virality PDFs</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-2xl p-5 space-y-3 bg-slate-50/50">
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 font-bold flex items-center justify-center">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">Viewer / Guest</h4>
                  <ul className="space-y-2 text-xs text-slate-600 font-medium">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>View shared team reports</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Comment on video analyses</span>
                    </li>
                    <li className="flex items-center space-x-2 text-slate-400">
                      <X className="w-4 h-4 text-slate-300 flex-shrink-0" />
                      <span>Cannot initiate new scans</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL: INVITE MEMBER */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-scale-up border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-brand-100 text-brand-600">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Invite Team Member</h3>
                  <p className="text-xs text-slate-500 font-medium">Send an email invitation to join your workspace.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowInviteModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {inviteStatus ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-center text-xs font-bold flex items-center justify-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{inviteStatus}</span>
              </div>
            ) : (
              <form onSubmit={handleSendInvite} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={inviteForm.name}
                    onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                    placeholder="e.g. Sarah Connor"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                    placeholder="sarah@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">Workspace Role</label>
                  <select
                    value={inviteForm.role}
                    onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-brand-500 bg-white"
                  >
                    <option value="Virality Analyst">Virality Analyst (Can run scans & edit)</option>
                    <option value="Growth Lead">Growth Lead (Full editing & exports)</option>
                    <option value="Video Editor">Video Editor (Upload & view diagnostics)</option>
                    <option value="Viewer">Viewer (Read-only access)</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL: NEW PROJECT */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-scale-up border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-600">
                  <FolderKanban className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Create Shared Project</h3>
                  <p className="text-xs text-slate-500 font-medium">Group team video analyses by platform or campaign.</p>
                </div>
              </div>
              <button 
                onClick={() => setShowProjectModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Project Name *</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. Black Friday Reel Ads"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">Target Platform</label>
                <select
                  value={projectForm.platform}
                  onChange={(e) => setProjectForm({ ...projectForm, platform: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 outline-none focus:border-brand-500 bg-white"
                >
                  <option value="YouTube Shorts">YouTube Shorts</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Instagram Reels">Instagram Reels</option>
                  <option value="Cross-Platform">Cross-Platform</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
