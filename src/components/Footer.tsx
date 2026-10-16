import React, { useState, useEffect } from 'react';
import { GraduationCap, Heart, Clock, Shield, Sparkles, BookOpen, ExternalLink, Github } from 'lucide-react';

interface FooterProps {
  onOpenAdminAuth: () => void;
  onNavigateTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdminAuth, onNavigateTab }) => {
  // Exam countdown to Feb 15, 2027
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number }>({
    days: 0,
    hours: 0,
    minutes: 0
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const examDate = new Date('2027-02-15T09:00:00');
      const now = new Date();
      const diff = examDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        setTimeLeft({ days, hours, minutes });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950 text-slate-400 no-print">
      {/* Exam Countdown Strip */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-900/40 py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-indigo-300 font-medium">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>CBSE Class 10 Board Exam 2027 Countdown:</span>
          </div>
          <div className="flex items-center gap-2 font-mono font-bold text-white">
            <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700 text-amber-400">
              {timeLeft.days} Days
            </span>
            <span>:</span>
            <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700 text-indigo-300">
              {timeLeft.hours} Hrs
            </span>
            <span>:</span>
            <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700 text-indigo-300">
              {timeLeft.minutes} Mins
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
        {/* Brand */}
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2 font-black text-white text-base">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span>VidyaSetu<span className="text-amber-400">.X</span></span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Dedicated academic portal engineered for CBSE Class 10 (2026-27 Session) with 50% competency-based questions, infinite quizzes, and real-time step marking keys.
          </p>
          <div className="pt-1">
            <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              GitHub Ready • Production Grade
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Academic Portals</h4>
          <ul className="space-y-1.5">
            <li>
              <button
                onClick={() => onNavigateTab('quiz')}
                className="hover:text-white transition cursor-pointer"
              >
                Infinite Math & Science Quiz
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('papers')}
                className="hover:text-white transition cursor-pointer"
              >
                Sample Question Papers (086/041/241)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('notes')}
                className="hover:text-white transition cursor-pointer"
              >
                Science & Math Revision PDFs
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('puzzles')}
                className="hover:text-white transition cursor-pointer"
              >
                Educational Science Labs & Puzzles
              </button>
            </li>
          </ul>
        </div>

        {/* Subject Chapters */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">2026-27 Syllabus</h4>
          <ul className="space-y-1.5 text-slate-400">
            <li>Chemical Reactions & Equations</li>
            <li>Electricity & Magnetic Effects</li>
            <li>Life Processes & Control</li>
            <li>Quadratic Equations & AP</li>
            <li>Trigonometry & Geometry</li>
          </ul>
        </div>

        {/* Administration */}
        <div className="space-y-2.5">
          <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Control & Privacy</h4>
          <p className="text-slate-400 leading-relaxed">
            All portal content is modifiable via the password-protected administrative center.
          </p>
          <button
            onClick={onOpenAdminAuth}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-amber-300 hover:text-white transition cursor-pointer"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Admin Control Room</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
        <p>© 2026-2027 VidyaSetu X. Aligned with CBSE secondary curriculum guidelines.</p>
        <p className="flex items-center gap-1">
          Crafted for Class 10 Champions with dedication
        </p>
      </div>
    </footer>
  );
};
