import React, { useState } from 'react';
import { X, Sparkles, User, School, Mail, Target, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { StudentProfile } from '../types';
import { DEFAULT_DEMO_STUDENT } from '../utils/storage';

export const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

interface StudentAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (student: StudentProfile) => void;
}

export const StudentAuthModal: React.FC<StudentAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [targetPercentage, setTargetPercentage] = useState(95);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = (selectedEmail = 'jnvkoderma1@gmail.com', customName = 'CBSE 2027 Scholar') => {
    const student: StudentProfile = {
      id: `std-google-${Date.now()}`,
      name: customName || (selectedEmail.includes('jnv') ? 'JNV Scholar' : 'Class 10 Scholar'),
      email: selectedEmail,
      schoolName: 'Jawahar Navodaya Vidyalaya / CBSE Secondary',
      targetPercentage: 96,
      avatarSeed: selectedEmail,
      joinedDate: new Date().toISOString().split('T')[0],
      streakDays: 5,
      xpPoints: 650,
      quizAttempts: DEFAULT_DEMO_STUDENT.quizAttempts,
      bookmarkedQuestionIds: DEFAULT_DEMO_STUDENT.bookmarkedQuestionIds,
      bookmarkedNoteIds: DEFAULT_DEMO_STUDENT.bookmarkedNoteIds,
      completedPuzzles: ['chem-puz-chem-balance']
    };
    onLoginSuccess(student);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let cleanEmail = email.trim();
    if (!cleanEmail.includes('@')) {
      cleanEmail = `${cleanEmail}@gmail.com`;
    } else if (!cleanEmail.toLowerCase().endsWith('@gmail.com')) {
      setError('Please use a valid Google Gmail account ending with @gmail.com');
      return;
    }

    if (mode === 'login') {
      const student: StudentProfile = {
        ...DEFAULT_DEMO_STUDENT,
        name: name.trim() || 'Class 10 Aspirant',
        email: cleanEmail,
        targetPercentage: Number(targetPercentage) || 95
      };
      onLoginSuccess(student);
    } else {
      const newStudent: StudentProfile = {
        id: `std-${Date.now()}`,
        name: name.trim() || 'Class 10 Scholar',
        email: cleanEmail,
        schoolName: schoolName.trim() || 'CBSE Affiliated Senior Secondary School',
        targetPercentage: Number(targetPercentage) || 95,
        avatarSeed: name || 'Student',
        joinedDate: new Date().toISOString().split('T')[0],
        streakDays: 1,
        xpPoints: 100,
        quizAttempts: [],
        bookmarkedQuestionIds: [],
        bookmarkedNoteIds: [],
        completedPuzzles: []
      };
      onLoginSuccess(newStudent);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header gradient banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-indigo-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/15 text-white text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>CBSE Session 2026-27 Enrollment</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Sign in with Google / Gmail
          </h2>
          <p className="text-xs text-indigo-100/90 mt-1">
            Access unlimited Math & Science infinite quizzes, PDF notes, and board sample papers.
          </p>
        </div>

        {/* Primary Google Login Button */}
        <div className="p-6 pb-2 space-y-3">
          <button
            type="button"
            onClick={() => handleGoogleSignIn('jnvkoderma1@gmail.com', 'JNV Scholar')}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-3 border border-slate-200"
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-3 text-slate-500 font-medium">
                Or enter your Gmail details
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40">
          <button
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-colors cursor-pointer ${
              mode === 'login'
                ? 'border-indigo-500 text-indigo-400 bg-slate-900/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Gmail Sign In
          </button>
          <button
            onClick={() => {
              setMode('signup');
              setError(null);
            }}
            className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-colors cursor-pointer ${
              mode === 'signup'
                ? 'border-indigo-500 text-indigo-400 bg-slate-900/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            New Student Registration
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-3 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-3 space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-400" />
              Student Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder-slate-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-400" />
              Google Gmail Address
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder-slate-500 outline-none transition font-mono"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Must be an active @gmail.com account</p>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-indigo-400" />
                School Name
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="e.g. JNV / Delhi Public School / Kendriya Vidyalaya"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-white placeholder-slate-500 outline-none transition"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-indigo-400" />
                Target Board Percentage (2026-27)
              </span>
              <span className="text-indigo-400 font-bold">{targetPercentage}%</span>
            </label>
            <input
              type="range"
              min="75"
              max="100"
              step="1"
              value={targetPercentage}
              onChange={(e) => setTargetPercentage(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            <span>{mode === 'login' ? 'Sign In with Gmail' : 'Register with Gmail'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
