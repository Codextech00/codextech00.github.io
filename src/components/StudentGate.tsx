import React from 'react';
import {
  GraduationCap,
  Sparkles,
  Shield,
  ArrowRight,
  BookOpen,
  FileText,
  Puzzle,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { GoogleIcon } from './StudentAuthModal';

interface StudentGateProps {
  onOpenStudentLogin: () => void;
  onOpenAdminLogin: () => void;
}

export const StudentGate: React.FC<StudentGateProps> = ({
  onOpenStudentLogin,
  onOpenAdminLogin
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-12">
      {/* Hero Welcome with CBSE 2026-27 Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 p-8 md:p-14 text-center overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>CBSE Class X Academic Session 2026-27</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            VidyaSetu<span className="text-amber-400">.X</span> Board Portal
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Exclusively formulated for the 2026–27 CBSE Board Examination. Access requires authentication via your Google / Gmail account or Admin credentials.
          </p>

          {/* Authentication Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenStudentLogin}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-2xl shadow-white/10 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-3 border border-slate-200"
            >
              <GoogleIcon />
              <span>Continue with Google / Gmail</span>
              <ArrowRight className="w-4 h-4 text-slate-600" />
            </button>

            <button
              onClick={onOpenStudentLogin}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Registration</span>
            </button>

            <button
              onClick={onOpenAdminLogin}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Admin Portal</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-2 pt-1 font-medium">
            <Lock className="w-3.5 h-3.5 text-indigo-400" />
            <span>Student login required with Google / Gmail account to access portal resources</span>
          </p>
        </div>
      </div>

      {/* Feature Showcase */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-white">What Unlocks After Student Login</h2>
          <p className="text-xs text-slate-400">
            Aligned with the CBSE 2026-27 Blueprint and 50% Competency-based examination pattern.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Card 1 */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3 relative group hover:border-indigo-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Infinite Math & Science Quiz</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Algorithmic dynamic question generator with endless variations for Ohm's law, lens formula, AP sequences, quadratic equations, and genetics.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Competency / HOTS question filter</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant NCERT marking step solutions</span>
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3 relative group hover:border-violet-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Sample Papers & Question Bank</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full official-format papers for Science (086), Math Standard (041), and Math Basic (241) across all 5 sections including Case-Based studies.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Section A to Section E breakdown</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Downloadable & printable PDF view</span>
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3 relative group hover:border-emerald-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">High-Yield Notes & Edu Puzzles</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Formula booklets, chemical reactions cheat sheets, printable chapter summaries, and interactive equation balancer labs.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chemical Stoichiometry lab</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>CrossMath algebra puzzle grid</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
