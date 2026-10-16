import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Award,
  Flame,
  Target,
  TrendingUp,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Printer,
  ChevronRight,
  Brain,
  Zap,
  BookmarkCheck
} from 'lucide-react';
import { StudentProfile } from '../types';

interface StudentDashboardProps {
  student: StudentProfile | null;
  onOpenStudentAuth: () => void;
  onNavigateTab: (tab: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  onOpenStudentAuth,
  onNavigateTab
}) => {
  const [showCertificate, setShowCertificate] = useState(false);

  // If student not logged in:
  if (!student) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mx-auto shadow-xl">
          <GraduationCap className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Student Portal • Session 2026-27
          </span>
          <h1 className="text-3xl font-extrabold text-white">
            Welcome to VidyaSetu Class 10 Dashboard
          </h1>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            Please log in with your student credentials or use 1-click Demo Student access to track your board performance, solve infinite quizzes, and unlock your 2026-27 readiness report.
          </p>
        </div>
        <div className="pt-4">
          <button
            onClick={onOpenStudentAuth}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition cursor-pointer inline-flex items-center gap-2"
          >
            <span>Log In as Student (Instant Access)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Calculate stats
  const attempts = student.quizAttempts || [];
  const totalQuestions = attempts.reduce((acc, curr) => acc + (curr.totalQuestions || 1), 0);
  const totalCorrect = attempts.reduce((acc, curr) => acc + (curr.correctAnswers || 0), 0);
  const overallAccuracy =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 85;

  const scienceAttempts = attempts.filter((a) => a.subject === 'Science');
  const mathAttempts = attempts.filter((a) => a.subject === 'Mathematics');

  const scienceAcc =
    scienceAttempts.length > 0
      ? Math.round(
          (scienceAttempts.reduce((acc, c) => acc + c.correctAnswers, 0) /
            scienceAttempts.reduce((acc, c) => acc + c.totalQuestions, 0)) *
            100
        )
      : 88;

  const mathAcc =
    mathAttempts.length > 0
      ? Math.round(
          (mathAttempts.reduce((acc, c) => acc + c.correctAnswers, 0) /
            mathAttempts.reduce((acc, c) => acc + c.totalQuestions, 0)) *
            100
        )
      : 82;

  const estimatedBoardScore = Math.min(
    99,
    Math.round(overallAccuracy * 0.7 + (student.targetPercentage || 95) * 0.3)
  );

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Student Welcome Card */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/30 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-amber-500 p-0.5 shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white font-extrabold text-2xl">
                {student.name.charAt(0)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{student.name}</h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active Scholar
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{student.schoolName}</p>
              <div className="flex items-center gap-3 text-xs text-indigo-300 mt-2">
                <span>Class 10 CBSE (2026-27)</span>
                <span>•</span>
                <span>Target: {student.targetPercentage}%</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCertificate(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-semibold shadow-md transition cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Board Readiness Certificate</span>
            </button>
            <button
              onClick={() => onNavigateTab('quiz')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Launch Infinite Quiz</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Estimated Board Score */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Predicted Board Score</span>
            <Target className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-white">
              {estimatedBoardScore}%
            </span>
            <span className="text-xs text-emerald-400 font-bold">On Track</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-500 h-1.5 rounded-full"
              style={{ width: `${estimatedBoardScore}%` }}
            />
          </div>
        </div>

        {/* Daily Streak */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Daily Practice Streak</span>
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-amber-400">
              {student.streakDays || 1} Days
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Consecutive days active</p>
        </div>

        {/* XP Points */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Scholar XP Points</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-emerald-400">
              {student.xpPoints || 0} XP
            </span>
          </div>
          <p className="text-[11px] text-slate-500">Tier: CBSE Master Scholar</p>
        </div>

        {/* Overall Accuracy */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Overall Accuracy</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-cyan-300">
              {overallAccuracy}%
            </span>
            <span className="text-xs text-slate-400">({totalCorrect}/{totalQuestions || 20})</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-cyan-400 h-1.5 rounded-full"
              style={{ width: `${overallAccuracy}%` }}
            />
          </div>
        </div>
      </div>

      {/* Subject Performance Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Science Performance */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                Sc
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Class 10 Science (086)</h3>
                <p className="text-xs text-slate-400">Physics, Chemistry, Biology</p>
              </div>
            </div>
            <span className="text-emerald-400 font-extrabold text-lg">{scienceAcc}%</span>
          </div>

          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-emerald-500 h-2 rounded-full"
              style={{ width: `${scienceAcc}%` }}
            />
          </div>

          <div className="text-xs text-slate-300 space-y-1.5 pt-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Chemical Reactions & Equations</span>
              <span className="text-emerald-400 font-semibold">92% Mastery</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Electricity & Circuits</span>
              <span className="text-amber-400 font-semibold">78% (Need Practice)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Life Processes (Nutrition/Respiration)</span>
              <span className="text-emerald-400 font-semibold">88% Mastery</span>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('quiz')}
            className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-emerald-300 font-semibold transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Practice Science Numericals & Reactions</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mathematics Performance */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                Ma
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Class 10 Mathematics (041/241)</h3>
                <p className="text-xs text-slate-400">Standard & Basic Tracks</p>
              </div>
            </div>
            <span className="text-indigo-300 font-extrabold text-lg">{mathAcc}%</span>
          </div>

          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-indigo-500 h-2 rounded-full"
              style={{ width: `${mathAcc}%` }}
            />
          </div>

          <div className="text-xs text-slate-300 space-y-1.5 pt-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Quadratic Equations & Roots</span>
              <span className="text-emerald-400 font-semibold">88% Mastery</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Introduction to Trigonometry</span>
              <span className="text-indigo-300 font-semibold">84% Mastery</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Triangles (BPT / Similarity)</span>
              <span className="text-amber-400 font-semibold">75% (Practice Theorems)</span>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('quiz')}
            className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-indigo-300 font-semibold transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Practice Math Problems & Geometry</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Recent Quiz Attempts Log */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-400" />
          <span>Recent Test Activity & Step Scores</span>
        </h3>

        {attempts.length > 0 ? (
          <div className="divide-y divide-slate-800 overflow-x-auto">
            {attempts.slice(0, 5).map((att) => (
              <div
                key={att.id}
                className="py-3 flex items-center justify-between text-xs text-slate-300 min-w-[500px]"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      att.subject === 'Science'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-indigo-500/20 text-indigo-300'
                    }`}
                  >
                    {att.subject}
                  </span>
                  <span className="font-medium text-white">{att.chapter}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-slate-400">{att.timestamp}</span>
                  <span className="font-bold text-emerald-400">
                    {att.correctAnswers}/{att.totalQuestions} ({att.scorePercentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500">No quizzes attempted yet. Launch a quiz to see live logs.</p>
        )}
      </div>

      {/* Printable Board Readiness Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-3xl p-8 shadow-2xl border-4 border-amber-500 space-y-6">
            <div className="flex justify-between items-start no-print">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Official CBSE 2026-27 Progress Report
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handlePrintCertificate}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Certificate Body */}
            <div className="text-center space-y-4 border-2 border-indigo-900 p-8 rounded-2xl bg-amber-50/20">
              <div className="inline-block p-2 rounded-full bg-indigo-900 text-amber-300 mb-1">
                <GraduationCap className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-wider text-indigo-950">
                CBSE Class X Board Readiness Certificate
              </h2>
              <p className="text-xs text-slate-600 uppercase tracking-widest font-semibold">
                Session 2026 – 2027
              </p>

              <div className="py-4 space-y-2">
                <p className="text-sm text-slate-700">This is to certify that</p>
                <p className="text-2xl font-black text-indigo-900 underline decoration-amber-400 underline-offset-8">
                  {student.name}
                </p>
                <p className="text-xs text-slate-600 pt-2">
                  of <span className="font-semibold">{student.schoolName}</span>
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 py-4 bg-white rounded-xl border border-indigo-100 p-4">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Predicted Score</span>
                  <span className="text-xl font-extrabold text-indigo-900">{estimatedBoardScore}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Earned XP</span>
                  <span className="text-xl font-extrabold text-emerald-600">{student.xpPoints} XP</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Streak Days</span>
                  <span className="text-xl font-extrabold text-amber-600">{student.streakDays} Days</span>
                </div>
              </div>

              <div className="pt-6 flex justify-between items-center text-xs text-slate-500 border-t border-slate-200">
                <span>Date: {new Date().toLocaleDateString()}</span>
                <span className="font-semibold text-indigo-950">VidyaSetu CBSE Portal</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
