import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  FileText,
  Flame,
  Award,
  Bell,
  Shield,
  User,
  LogOut,
  Menu,
  X,
  Puzzle,
  ChevronRight
} from 'lucide-react';
import { StudentProfile } from '../types';
import { GoogleIcon } from './StudentAuthModal';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  student: StudentProfile | null;
  isAdmin: boolean;
  onOpenStudentAuth: () => void;
  onOpenAdminAuth: () => void;
  onLogoutStudent: () => void;
  onLogoutAdmin: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  student,
  isAdmin,
  onOpenStudentAuth,
  onOpenAdminAuth,
  onLogoutStudent,
  onLogoutAdmin,
  onOpenNotifications,
  unreadCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'quiz', label: 'Infinite Quiz', icon: Sparkles, badge: 'Endless' },
    { id: 'papers', label: 'Sample Papers', icon: FileText, badge: '2026-27' },
    { id: 'notes', label: 'Notes & PDFs', icon: BookOpen },
    { id: 'puzzles', label: 'Edu Puzzles', icon: Puzzle, badge: 'XP' }
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 shadow-lg shadow-black/20">
      {/* Top Session Alert Ribbon */}
      <div className="bg-gradient-to-r from-indigo-900/90 via-violet-900/90 to-purple-900/90 border-b border-indigo-500/20 px-4 py-1 text-xs text-indigo-200 flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CBSE Class X (2026-27 Session) Official Pattern Portal</span>
          <span className="hidden md:inline text-indigo-300/70">| 50% Competency Questions Aligned</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="hidden sm:inline bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-400/30 text-indigo-300">
            Target 95%+ Board Readiness
          </span>
          <button
            onClick={onOpenNotifications}
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-amber-300 font-medium"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Latest Circulars</span>
            {unreadCount > 0 && (
              <span className="bg-rose-500 text-white rounded-full px-1.5 py-0.2 text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-amber-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-indigo-400 group-hover:text-amber-400 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
                  VidyaSetu<span className="text-amber-400">.X</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  2026-27
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-none">Class 10 CBSE Math & Science</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'text-white bg-indigo-600/20 border border-indigo-500/40 shadow-sm shadow-indigo-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        link.badge === 'Endless'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : link.badge === 'XP'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Stats, Student & Admin */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Gamification Stats */}
            {student && (
              <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-1.5">
                <div className="flex items-center gap-1 text-amber-400 text-xs font-semibold" title="Daily Practice Streak">
                  <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-bounce" />
                  <span>{student.streakDays || 1}d Streak</span>
                </div>
                <div className="w-px h-3.5 bg-slate-700" />
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-semibold" title="Total XP Earned">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>{student.xpPoints || 0} XP</span>
                </div>
              </div>
            )}

            {/* Student Auth / Profile */}
            {student ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-colors text-xs font-medium text-slate-200 cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold text-[11px]">
                    {student.name.charAt(0)}
                  </div>
                  <span className="max-w-[100px] truncate">{student.name}</span>
                </button>
                <button
                  onClick={onLogoutStudent}
                  title="Logout Student"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenStudentAuth}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold shadow-md shadow-white/10 transition-all cursor-pointer border border-slate-200"
              >
                <GoogleIcon />
                <span>Sign in with Google</span>
              </button>
            )}

            {/* Admin Portal Button */}
            {isAdmin ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'admin'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </button>
                <button
                  onClick={onLogoutAdmin}
                  title="Logout Admin"
                  className="p-1.5 rounded-lg text-amber-400/80 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminAuth}
                title="Admin Control Room (Password Protected)"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-amber-300 text-xs font-medium transition-colors cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden xl:inline">Admin</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenNotifications}
              className="p-2 text-slate-400 hover:text-white relative"
            >
              <Bell className="w-5 h-5 text-amber-400" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            {student ? (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold text-sm">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{student.name}</p>
                    <p className="text-xs text-slate-400">{student.xpPoints} XP • {student.streakDays}d Streak</p>
                  </div>
                </div>
                <button
                  onClick={onLogoutStudent}
                  className="text-xs text-rose-400 flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStudentAuth();
                }}
                className="w-full py-2.5 rounded-xl bg-white text-slate-900 font-bold text-sm flex items-center justify-center gap-2 shadow"
              >
                <GoogleIcon />
                <span>Sign in with Google</span>
              </button>
            )}
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/20 text-white border border-indigo-500/30'
                      : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-indigo-400" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
            {isAdmin ? (
              <button
                onClick={() => {
                  setActiveTab('admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" /> Admin Control Room
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminAuth();
                }}
                className="w-full py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 font-medium text-sm flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4 text-amber-400" /> Admin Access (Authorized Only)
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
