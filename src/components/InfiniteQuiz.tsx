import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Award,
  Timer,
  CheckCircle,
  XCircle,
  HelpCircle,
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  ArrowRight,
  Flame,
  Brain,
  Edit3,
  BookOpen,
  Filter,
  Check,
  Lightbulb
} from 'lucide-react';
import { QuizQuestion, SubjectType, ChapterType, QuestionDifficulty, StudentProfile } from '../types';
import { generateInfiniteQuestion } from '../utils/infiniteQuizGenerator';
import { StorageService } from '../utils/storage';

interface InfiniteQuizProps {
  student: StudentProfile | null;
  onOpenStudentAuth: () => void;
  questionsBank: QuizQuestion[];
}

export const InfiniteQuiz: React.FC<InfiniteQuizProps> = ({
  student,
  onOpenStudentAuth,
  questionsBank
}) => {
  const [selectedSubject, setSelectedSubject] = useState<'All' | SubjectType>('All');
  const [selectedChapter, setSelectedChapter] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [quizMode, setQuizMode] = useState<'infinite' | 'bank'>('infinite');

  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showScratchpad, setShowScratchpad] = useState<boolean>(false);
  const [scratchNotes, setScratchNotes] = useState<string>('');

  // Session Stats
  const [sessionQuestionsAnswered, setSessionQuestionsAnswered] = useState<number>(0);
  const [sessionCorrectCount, setSessionCorrectCount] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Initialize first question
  useEffect(() => {
    loadNextQuestion();
  }, [selectedSubject, selectedChapter, selectedDifficulty, quizMode]);

  // Timer ticker
  useEffect(() => {
    let interval: any;
    if (isTimerRunning && !isSubmitted) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isSubmitted]);

  const loadNextQuestion = () => {
    setIsSubmitted(false);
    setSelectedOption(null);
    setShowHint(false);
    setTimerSeconds(0);
    setIsTimerRunning(true);

    if (quizMode === 'infinite') {
      const subjectFilter = selectedSubject === 'All' ? undefined : selectedSubject;
      const chapterFilter = selectedChapter === 'All' ? undefined : (selectedChapter as ChapterType);
      const dynamicQ = generateInfiniteQuestion(subjectFilter, chapterFilter);
      setCurrentQuestion(dynamicQ);
    } else {
      // Pick from curated bank
      let pool = questionsBank.length > 0 ? questionsBank : StorageService.getQuestions();
      if (selectedSubject !== 'All') {
        pool = pool.filter((q) => q.subject === selectedSubject);
      }
      if (selectedChapter !== 'All') {
        pool = pool.filter((q) => q.chapter === selectedChapter);
      }
      if (selectedDifficulty !== 'All') {
        pool = pool.filter((q) => q.difficulty === selectedDifficulty);
      }

      if (pool.length > 0) {
        const randomQ = pool[Math.floor(Math.random() * pool.length)];
        setCurrentQuestion(randomQ);
      } else {
        // Fallback to infinite generator if bank is filtered out
        const dynamicQ = generateInfiniteQuestion(
          selectedSubject === 'All' ? undefined : selectedSubject,
          selectedChapter === 'All' ? undefined : (selectedChapter as ChapterType)
        );
        setCurrentQuestion(dynamicQ);
      }
    }
  };

  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQuestion || isSubmitted) return;

    setIsSubmitted(true);
    setIsTimerRunning(false);

    const isCorrect = selectedOption === currentQuestion.correctIndex;
    const newAnswered = sessionQuestionsAnswered + 1;
    const newCorrect = isCorrect ? sessionCorrectCount + 1 : sessionCorrectCount;

    setSessionQuestionsAnswered(newAnswered);
    setSessionCorrectCount(newCorrect);

    if (isCorrect) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);

      // Trigger Confetti effect
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });

      // Save XP to student
      if (student) {
        const xpEarned = 25 + (currentQuestion.difficulty === 'Competency/HOTS' ? 15 : 0);
        StorageService.saveQuizAttempt(
          {
            id: `att-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            subject: currentQuestion.subject,
            chapter: currentQuestion.chapter,
            totalQuestions: 1,
            correctAnswers: 1,
            scorePercentage: 100,
            timeSpentSeconds: timerSeconds
          },
          xpEarned
        );
      }
    } else {
      setCurrentStreak(0);
      if (student) {
        StorageService.saveQuizAttempt(
          {
            id: `att-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            subject: currentQuestion.subject,
            chapter: currentQuestion.chapter,
            totalQuestions: 1,
            correctAnswers: 0,
            scorePercentage: 0,
            timeSpentSeconds: timerSeconds
          },
          5 // participation XP
        );
      }
    }
  };

  const handleToggleBookmark = () => {
    if (!student) {
      onOpenStudentAuth();
      return;
    }
    if (currentQuestion) {
      StorageService.toggleQuestionBookmark(currentQuestion.id);
    }
  };

  const isBookmarked =
    student && currentQuestion
      ? (student.bookmarkedQuestionIds || []).includes(currentQuestion.id)
      : false;

  const scienceChapters = [
    'Chemical Reactions and Equations',
    'Acids, Bases and Salts',
    'Metals and Non-metals',
    'Carbon and its Compounds',
    'Life Processes',
    'Control and Coordination',
    'How do Organisms Reproduce?',
    'Heredity and Evolution',
    'Light – Reflection and Refraction',
    'The Human Eye and the Colourful World',
    'Electricity',
    'Magnetic Effects of Electric Current',
    'Our Environment'
  ];

  const mathChapters = [
    'Real Numbers',
    'Polynomials',
    'Pair of Linear Equations in Two Variables',
    'Quadratic Equations',
    'Arithmetic Progressions',
    'Triangles',
    'Coordinate Geometry',
    'Introduction to Trigonometry',
    'Some Applications of Trigonometry',
    'Circles',
    'Areas Related to Circles',
    'Surface Areas and Volumes',
    'Statistics',
    'Probability'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Top Banner / Hero */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-indigo-950/80 border border-indigo-500/30 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Infinite CBSE 2026-27 Practice Engine</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Class 10 Infinite Quiz: Math & Science
            </h1>
            <p className="text-slate-300 text-sm mt-1.5 max-w-2xl">
              Endless dynamically synthesized challenges & CBSE competency questions. Never run out of questions, formulas, or full-solution breakdowns.
            </p>
          </div>

          {/* Quick Session Stats */}
          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-700/80 p-3 rounded-2xl shadow-inner">
            <div className="text-center px-3">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-lg">
                <Flame className="w-5 h-5 fill-amber-400" />
                <span>{currentStreak}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Streak</span>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div className="text-center px-3">
              <div className="text-emerald-400 font-bold text-lg">
                {sessionCorrectCount}/{sessionQuestionsAnswered}
              </div>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Score</span>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div className="text-center px-3">
              <div className="text-indigo-300 font-bold text-lg">
                {sessionQuestionsAnswered > 0
                  ? Math.round((sessionCorrectCount / sessionQuestionsAnswered) * 100)
                  : 100}%
              </div>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Accuracy</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Mode Switch */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 block">
              Quiz Mode
            </label>
            <div className="grid grid-cols-2 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setQuizMode('infinite')}
                className={`text-xs py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                  quizMode === 'infinite'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Infinite AI
              </button>
              <button
                onClick={() => setQuizMode('bank')}
                className={`text-xs py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                  quizMode === 'bank'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Board Bank
              </button>
            </div>
          </div>

          {/* Subject Filter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 block">
              Subject
            </label>
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {(['All', 'Science', 'Mathematics'] as const).map((sub) => (
                <button
                  key={sub}
                  onClick={() => {
                    setSelectedSubject(sub);
                    setSelectedChapter('All');
                  }}
                  className={`text-xs py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                    selectedSubject === sub
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {sub === 'Mathematics' ? 'Math' : sub}
                </button>
              ))}
            </div>
          </div>

          {/* Chapter Filter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 block">
              Chapter
            </label>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500 transition"
            >
              <option value="All">All Class 10 Chapters</option>
              {selectedSubject !== 'Mathematics' && (
                <optgroup label="Science Chapters">
                  {scienceChapters.map((ch) => (
                    <option key={ch} value={ch}>
                      {ch}
                    </option>
                  ))}
                </optgroup>
              )}
              {selectedSubject !== 'Science' && (
                <optgroup label="Mathematics Chapters">
                  {mathChapters.map((ch) => (
                    <option key={ch} value={ch}>
                      {ch}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 block">
              Question Level
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-indigo-500 transition"
            >
              <option value="All">All Difficulty Levels</option>
              <option value="Easy">Standard Foundation (Easy)</option>
              <option value="Medium">Moderate Board Standard</option>
              <option value="Hard">Advanced Problem</option>
              <option value="Competency/HOTS">Competency / HOTS (2026-27 Mandate)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      {currentQuestion ? (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-xl relative">
          {/* Question Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  currentQuestion.subject === 'Science'
                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                    : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                }`}
              >
                {currentQuestion.subject}
              </span>
              <span className="text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg">
                {currentQuestion.chapter}
              </span>
              {currentQuestion.isCompetencyBased && (
                <span className="text-[11px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                  Competency Based
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Timer */}
              <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 font-mono">
                <Timer className="w-3.5 h-3.5 text-indigo-400" />
                <span>
                  {Math.floor(timerSeconds / 60)}:
                  {(timerSeconds % 60).toString().padStart(2, '0')}
                </span>
              </div>

              {/* Scratchpad Toggle */}
              <button
                onClick={() => setShowScratchpad(!showScratchpad)}
                title="Rough Scratchpad"
                className={`p-1.5 rounded-lg border transition cursor-pointer ${
                  showScratchpad
                    ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Edit3 className="w-4 h-4" />
              </button>

              {/* Bookmark */}
              <button
                onClick={handleToggleBookmark}
                title="Bookmark for Revision"
                className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-amber-400 transition cursor-pointer"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4 text-amber-400" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Rough Scratchpad Drawer */}
          {showScratchpad && (
            <div className="mt-4 p-3 rounded-2xl bg-slate-950 border border-indigo-500/30 shadow-inner">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-indigo-300 flex items-center gap-1">
                  <Edit3 className="w-3.5 h-3.5" /> Scratchpad / Rough Work Calculation
                </span>
                <button
                  onClick={() => setScratchNotes('')}
                  className="text-[11px] text-slate-400 hover:text-rose-400 cursor-pointer"
                >
                  Clear Pad
                </button>
              </div>
              <textarea
                value={scratchNotes}
                onChange={(e) => setScratchNotes(e.target.value)}
                placeholder="Type your intermediate step calculations here (e.g. V = 220, R = 10, I = 22...)"
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 font-mono outline-none focus:border-indigo-500"
              />
            </div>
          )}

          {/* Question Body */}
          <div className="py-6">
            <h2 className="text-lg md:text-xl font-semibold text-white leading-relaxed whitespace-pre-line">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctIndex;

              let optionStyle = 'bg-slate-950/60 border-slate-800 text-slate-200 hover:bg-slate-800/60';
              if (isSelected && !isSubmitted) {
                optionStyle = 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-600/10';
              } else if (isSubmitted) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-100 font-medium';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-100 line-through';
                } else {
                  optionStyle = 'bg-slate-950/30 border-slate-800 text-slate-500 opacity-60';
                }
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold border ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-400'
                          : 'bg-slate-900 text-slate-400 border-slate-700'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm md:text-base leading-snug">{option}</span>
                  </div>

                  {isSubmitted && (
                    <div>
                      {isCorrect && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                      {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400" />}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Hint / Formula Drawer */}
          {currentQuestion.formulaOrHint && (
            <div className="mt-5">
              {!showHint ? (
                <button
                  onClick={() => setShowHint(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Reveal Key Formula / Board Hint</span>
                </button>
              ) : (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2.5 animate-in fade-in">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300">NCERT Reference Hint: </span>
                    <span>{currentQuestion.formulaOrHint}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Detailed Explanation upon submission */}
          {isSubmitted && (
            <div className="mt-6 p-5 rounded-2xl bg-slate-950 border border-slate-800 animate-in fade-in space-y-3">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  CBSE Marking Scheme Step-by-Step Solution
                </span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Action Footer */}
          <div className="mt-8 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Correct answer earns +25 XP for your student profile</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-md shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Check Answer</span>
                </button>
              ) : (
                <button
                  onClick={loadNextQuestion}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-md shadow-emerald-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Next Infinite Challenge</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-slate-400">Loading next question...</div>
      )}
    </div>
  );
};
