import React, { useState } from 'react';
import {
  FileText,
  Printer,
  CheckCircle2,
  HelpCircle,
  Clock,
  Award,
  ChevronDown,
  ChevronUp,
  Download,
  BookOpen,
  Filter,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { SamplePaper, SubjectType } from '../types';

interface SamplePapersProps {
  papers: SamplePaper[];
  isAdmin: boolean;
  onOpenAdmin: () => void;
}

export const SamplePapers: React.FC<SamplePapersProps> = ({
  papers,
  isAdmin,
  onOpenAdmin
}) => {
  const [selectedSubject, setSelectedSubject] = useState<'All' | SubjectType>('All');
  const [activePaperId, setActivePaperId] = useState<string>(papers[0]?.id || '');
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [revealedSolutions, setRevealedSolutions] = useState<Record<number, boolean>>({});
  const [showAllSolutions, setShowAllSolutions] = useState<boolean>(false);

  const filteredPapers =
    selectedSubject === 'All'
      ? papers
      : papers.filter((p) => p.subject === selectedSubject);

  const currentPaper = papers.find((p) => p.id === activePaperId) || papers[0];

  const toggleSolution = (qNum: number) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [qNum]: !prev[qNum]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-violet-950/80 via-slate-900 to-indigo-950/80 border border-violet-500/30 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-3">
              <FileText className="w-3.5 h-3.5 text-violet-400" />
              <span>Official 2026-27 Pattern Question Bank</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Class 10 Board Sample Papers & Question Bank
            </h1>
            <p className="text-slate-300 text-sm mt-1.5 max-w-2xl">
              Equipped with 2026-27 CBSE Blueprint: 50% Competency MCQs, Case-Based Studies, Assertion-Reason, and Official Step-Marking keys.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-indigo-400" />
              <span>Print / Save PDF</span>
            </button>
            {isAdmin && (
              <button
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold hover:bg-amber-500/20 transition cursor-pointer"
              >
                <span>Edit Papers</span>
              </button>
            )}
          </div>
        </div>

        {/* Paper Selector Tabs */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          {papers.map((paper) => {
            const isSelected = currentPaper?.id === paper.id;
            return (
              <button
                key={paper.id}
                onClick={() => {
                  setActivePaperId(paper.id);
                  setActiveSectionIndex(0);
                  setRevealedSolutions({});
                  setShowAllSolutions(false);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{paper.subject}: {paper.title.split('(')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Paper Presentation */}
      {currentPaper && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 shadow-xl overflow-hidden">
          {/* Paper Blueprint Header (Examiner style) */}
          <div className="bg-slate-950 p-6 border-b border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-violet-400">
                  CBSE Secondary School Examination 2026-27
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5">{currentPaper.title}</h2>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium text-slate-400 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-400" />
                  Time: {currentPaper.durationMinutes / 60} Hours
                </span>
                <span className="w-px h-3 bg-slate-700" />
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Max Marks: {currentPaper.maximumMarks}
                </span>
              </div>
            </div>

            {/* General Instructions Accordion */}
            <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-4">
              <span className="text-xs font-bold text-slate-200 block mb-2">
                General Instructions (Read carefully before attempting):
              </span>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                {currentPaper.generalInstructions.map((instruction, idx) => (
                  <li key={idx}>{instruction}</li>
                ))}
              </ul>
            </div>

            {/* Section Navigator Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap gap-1.5">
                {currentPaper.sections.map((section, idx) => {
                  const isActive = activeSectionIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveSectionIndex(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {section.name.split(' - ')[0]} ({section.totalMarks}M)
                    </button>
                  );
                })}
              </div>

              {/* Master Solution Toggle */}
              <button
                onClick={() => setShowAllSolutions(!showAllSolutions)}
                className="flex items-center gap-1.5 text-xs text-indigo-300 hover:text-white px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/30 transition cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showAllSolutions ? 'Hide All Marking Schemes' : 'Reveal All Step Marking'}</span>
              </button>
            </div>
          </div>

          {/* Section Content */}
          {currentPaper.sections[activeSectionIndex] && (
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {currentPaper.sections[activeSectionIndex].name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {currentPaper.sections[activeSectionIndex].description}
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                  {currentPaper.sections[activeSectionIndex].totalMarks} Marks Section
                </span>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {currentPaper.sections[activeSectionIndex].questions.map((q) => {
                  const isRevealed = showAllSolutions || revealedSolutions[q.questionNumber];

                  return (
                    <div
                      key={q.questionNumber}
                      className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-4 hover:border-slate-700 transition"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <span className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            Q{q.questionNumber}
                          </span>
                          <div className="space-y-2">
                            <p className="text-sm md:text-base font-medium text-slate-100 whitespace-pre-line leading-relaxed">
                              {q.text}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800 shrink-0">
                          [{q.marks} Mark{q.marks > 1 ? 's' : ''}]
                        </span>
                      </div>

                      {/* Solution Trigger */}
                      <div className="pt-2 flex items-center justify-between border-t border-slate-900">
                        <button
                          onClick={() => toggleSolution(q.questionNumber)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 cursor-pointer"
                        >
                          {isRevealed ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              <span>Hide Official Answer Key</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              <span>Show Official Answer Key & Step Marking</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Detailed Marking Scheme Box */}
                      {isRevealed && (
                        <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-2.5 animate-in fade-in">
                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Model Answer Key</span>
                          </div>
                          <p className="text-xs md:text-sm text-slate-200 font-mono leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                            {q.answerKey}
                          </p>
                          <div className="text-[11px] text-amber-300/90 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                            <span className="font-bold text-amber-300">CBSE Step Marks Allocation: </span>
                            <span>{q.stepMarksExplanation}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
