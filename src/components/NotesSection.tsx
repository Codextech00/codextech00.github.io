import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  Printer,
  Search,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  X,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { ChapterNote, SubjectType, StudentProfile } from '../types';
import { StorageService } from '../utils/storage';

interface NotesSectionProps {
  notes: ChapterNote[];
  student: StudentProfile | null;
  onOpenStudentAuth: () => void;
  isAdmin: boolean;
  onOpenAdmin: () => void;
}

export const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  student,
  onOpenStudentAuth,
  isAdmin,
  onOpenAdmin
}) => {
  const [selectedSubject, setSelectedSubject] = useState<'All' | SubjectType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNoteModal, setActiveNoteModal] = useState<ChapterNote | null>(null);

  const filteredNotes = notes.filter((n) => {
    const matchesSubject = selectedSubject === 'All' || n.subject === selectedSubject;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.highYieldPoints.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSubject && matchesSearch;
  });

  const handlePrintNote = () => {
    window.print();
  };

  const handleDownloadPDF = (note: ChapterNote) => {
    // Generate a downloadable text/markdown file representation of the PDF
    const content = `=====================================================
CBSE CLASS 10 (2026-27 SESSION) OFFICIAL REVISION NOTE
SUBJECT: ${note.subject}
CHAPTER: ${note.chapter}
TITLE: ${note.title}
=====================================================

OVERVIEW:
${note.summary}

HIGH-YIELD BOARD POINTS:
${note.highYieldPoints.map((pt, i) => `${i + 1}. ${pt}`).join('\n')}

FORMULAS & KEY REACTIONS:
${note.formulasAndReactions.map((f) => `• ${f.label}:\n  ${f.formula}`).join('\n\n')}

COMMON BOARD EXAM PITFALLS:
${note.commonMistakes.map((m) => `[!] ${m}`).join('\n')}

NCERT EXEMPLAR STRATEGY TIPS:
${note.ncertExemplarTips.map((tip) => `[*] ${tip}`).join('\n')}

Generated for CBSE Class 10 Session 2026-27 Aspirants
Powered by VidyaSetu X
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = note.downloadFileName.replace('.pdf', '_Revision_2026-27.txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const toggleBookmark = (noteId: string) => {
    if (!student) {
      onOpenStudentAuth();
      return;
    }
    const list = student.bookmarkedNoteIds || [];
    const exists = list.includes(noteId);
    const updated = exists ? list.filter((id) => id !== noteId) : [...list, noteId];
    StorageService.setActiveStudent({
      ...student,
      bookmarkedNoteIds: updated
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/30 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>High-Yield Revision Notes & Formula Booklets</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Class 10 Science & Math Important Notes (2026-27)
            </h1>
            <p className="text-slate-300 text-sm mt-1.5 max-w-2xl">
              Concise NCERT mindmaps, essential balanced equations, mathematical formulas, and downloadable printable study guides.
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold hover:bg-amber-500/20 transition cursor-pointer"
            >
              <span>Manage Notes</span>
            </button>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3">
          <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
            {(['All', 'Science', 'Mathematics'] as const).map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`text-xs px-3.5 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                  selectedSubject === sub
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sub === 'Mathematics' ? 'Math' : sub}
              </button>
            ))}
          </div>

          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, formula (e.g. Ohm's law, Trigonometry, Redox, Quadratic)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-emerald-500 transition"
            />
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNotes.map((note) => {
          const isBookmarked = (student?.bookmarkedNoteIds || []).includes(note.id);

          return (
            <div
              key={note.id}
              className="rounded-3xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-lg hover:shadow-emerald-950/20 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      note.subject === 'Science'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                    }`}
                  >
                    {note.subject}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleBookmark(note.id)}
                      title="Bookmark Note"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 cursor-pointer"
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {note.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {note.summary}
                </p>

                {/* Key Formula preview */}
                {note.formulasAndReactions.length > 0 && (
                  <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Top Reaction / Formula
                    </span>
                    <p className="text-xs text-emerald-300 font-mono truncate">
                      {note.formulasAndReactions[0].formula}
                    </p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveNoteModal(note)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 cursor-pointer"
                >
                  <span>Read Full Note</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadPDF(note)}
                    title="Download Note"
                    className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-medium transition cursor-pointer flex items-center gap-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note Full Screen / PDF Reader Modal */}
      {activeNoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl my-8 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-slate-950 p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  CBSE Class X 2026-27 • {activeNoteModal.subject}
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5">{activeNoteModal.title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintNote}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium cursor-pointer"
                  title="Print this Note (Formatted for A4)"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDownloadPDF(activeNoteModal)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-700 text-xs font-medium cursor-pointer"
                  title="Download Note File"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveNoteModal(null)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 text-xs font-medium cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Simulated Clean Printable A4 Sheet */}
            <div className="p-6 md:p-8 space-y-6 max-h-[75vh] overflow-y-auto bg-slate-900">
              {/* Note Summary */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-1">
                  Core Concept Essence:
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeNoteModal.summary}
                </p>
              </div>

              {/* High-Yield Points */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>High-Yield CBSE Points (Frequently Tested)</span>
                </h4>
                <div className="space-y-2">
                  {activeNoteModal.highYieldPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs md:text-sm text-slate-200 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Formulas & Chemical Reactions */}
              {activeNoteModal.formulasAndReactions.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span>Formula Sheet & Balanced Reactions</span>
                  </h4>
                  <div className="space-y-2.5">
                    {activeNoteModal.formulasAndReactions.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/20 font-mono"
                      >
                        <span className="text-xs font-bold text-indigo-300 block mb-1">
                          {item.label}
                        </span>
                        <p className="text-xs md:text-sm text-emerald-300 font-semibold">
                          {item.formula}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Common Pitfalls & Traps */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Common Board Exam Mistakes to Avoid</span>
                </h4>
                <div className="space-y-2">
                  {activeNoteModal.commonMistakes.map((mistake, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs md:text-sm text-rose-200 flex items-start gap-2.5"
                    >
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <span>{mistake}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* NCERT Exemplar & Examiner Tips */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-2">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4" /> NCERT Exemplar Master Strategy Tip:
                </span>
                <ul className="text-xs space-y-1.5 list-disc list-inside">
                  {activeNoteModal.ncertExemplarTips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
