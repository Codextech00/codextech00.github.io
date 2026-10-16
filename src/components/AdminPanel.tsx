import React, { useState } from 'react';
import {
  Shield,
  Bell,
  Sparkles,
  FileText,
  BookOpen,
  Users,
  KeyRound,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Download,
  Lock,
  Eye,
  LogOut,
  X
} from 'lucide-react';
import {
  NotificationItem,
  QuizQuestion,
  SamplePaper,
  ChapterNote,
  StudentProfile,
  SubjectType,
  ChapterType,
  QuestionDifficulty
} from '../types';
import { StorageService } from '../utils/storage';

interface AdminPanelProps {
  notifications: NotificationItem[];
  questions: QuizQuestion[];
  papers: SamplePaper[];
  notes: ChapterNote[];
  onUpdateNotifications: (items: NotificationItem[]) => void;
  onUpdateQuestions: (items: QuizQuestion[]) => void;
  onUpdatePapers: (items: SamplePaper[]) => void;
  onUpdateNotes: (items: ChapterNote[]) => void;
  onLogoutAdmin: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  notifications,
  questions,
  papers,
  notes,
  onUpdateNotifications,
  onUpdateQuestions,
  onUpdatePapers,
  onUpdateNotes,
  onLogoutAdmin
}) => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'questions' | 'papers' | 'notes' | 'students' | 'security'>('notifications');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3500);
  };

  // -------------------------------------------------------------
  // 1. NOTIFICATIONS MANAGEMENT (Add / Edit / Delete)
  // -------------------------------------------------------------
  const [editingNotif, setEditingNotif] = useState<NotificationItem | null>(null);
  const [notifForm, setNotifForm] = useState({
    title: '',
    category: 'CBSE Circular' as NotificationItem['category'],
    summary: '',
    fullContent: '',
    isImportant: true
  });

  const handleSaveNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifForm.title.trim()) return;

    if (editingNotif) {
      // Update existing
      const updated = notifications.map((n) =>
        n.id === editingNotif.id
          ? {
              ...n,
              title: notifForm.title,
              category: notifForm.category,
              summary: notifForm.summary,
              fullContent: notifForm.fullContent || notifForm.summary,
              isImportant: notifForm.isImportant
            }
          : n
      );
      onUpdateNotifications(updated);
      StorageService.saveNotifications(updated);
      setEditingNotif(null);
      showSuccess('Circular updated successfully!');
    } else {
      // Add new
      const newItem: NotificationItem = {
        id: `notif-${Date.now()}`,
        title: notifForm.title,
        category: notifForm.category,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        summary: notifForm.summary,
        fullContent: notifForm.fullContent || notifForm.summary,
        isImportant: notifForm.isImportant,
        pdfTitle: `${notifForm.title.replace(/\s+/g, '_').slice(0, 20)}.pdf`
      };
      const updated = [newItem, ...notifications];
      onUpdateNotifications(updated);
      StorageService.saveNotifications(updated);
      showSuccess('New CBSE notification published to all students!');
    }

    setNotifForm({
      title: '',
      category: 'CBSE Circular',
      summary: '',
      fullContent: '',
      isImportant: true
    });
  };

  const startEditNotification = (item: NotificationItem) => {
    setEditingNotif(item);
    setNotifForm({
      title: item.title,
      category: item.category,
      summary: item.summary,
      fullContent: item.fullContent,
      isImportant: item.isImportant
    });
  };

  const handleDeleteNotification = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    onUpdateNotifications(updated);
    StorageService.saveNotifications(updated);
    showSuccess('Notification removed successfully.');
  };

  // -------------------------------------------------------------
  // 2. QUIZ BANK MANAGEMENT (Add / Edit / Delete)
  // -------------------------------------------------------------
  const [editingQuestion, setEditingQuestion] = useState<QuizQuestion | null>(null);
  const [qForm, setQForm] = useState({
    subject: 'Science' as SubjectType,
    chapter: 'Chemical Reactions and Equations' as ChapterType,
    difficulty: 'Competency/HOTS' as QuestionDifficulty,
    question: '',
    opt0: '',
    opt1: '',
    opt2: '',
    opt3: '',
    correctIndex: 0,
    explanation: '',
    formulaOrHint: ''
  });

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qForm.question.trim() || !qForm.opt0.trim()) return;

    if (editingQuestion) {
      const updated = questions.map((q) =>
        q.id === editingQuestion.id
          ? {
              ...q,
              subject: qForm.subject,
              chapter: qForm.chapter,
              difficulty: qForm.difficulty,
              question: qForm.question,
              options: [qForm.opt0, qForm.opt1, qForm.opt2, qForm.opt3],
              correctIndex: Number(qForm.correctIndex),
              explanation: qForm.explanation || 'Standard CBSE solution.',
              formulaOrHint: qForm.formulaOrHint || undefined,
              isCompetencyBased: qForm.difficulty === 'Competency/HOTS'
            }
          : q
      );
      onUpdateQuestions(updated);
      StorageService.saveQuestions(updated);
      setEditingQuestion(null);
      showSuccess('Question updated in the board bank!');
    } else {
      const newQuestion: QuizQuestion = {
        id: `q-custom-${Date.now()}`,
        subject: qForm.subject,
        chapter: qForm.chapter,
        difficulty: qForm.difficulty,
        question: qForm.question,
        options: [qForm.opt0, qForm.opt1, qForm.opt2, qForm.opt3],
        correctIndex: Number(qForm.correctIndex),
        explanation: qForm.explanation || 'Standard CBSE marking scheme solution.',
        formulaOrHint: qForm.formulaOrHint || undefined,
        isCompetencyBased: qForm.difficulty === 'Competency/HOTS'
      };
      const updated = [newQuestion, ...questions];
      onUpdateQuestions(updated);
      StorageService.saveQuestions(updated);
      showSuccess('Question added to Board Quiz Bank!');
    }

    setQForm({
      subject: 'Science',
      chapter: 'Chemical Reactions and Equations',
      difficulty: 'Competency/HOTS',
      question: '',
      opt0: '',
      opt1: '',
      opt2: '',
      opt3: '',
      correctIndex: 0,
      explanation: '',
      formulaOrHint: ''
    });
  };

  const startEditQuestion = (q: QuizQuestion) => {
    setEditingQuestion(q);
    setQForm({
      subject: q.subject,
      chapter: q.chapter,
      difficulty: q.difficulty,
      question: q.question,
      opt0: q.options[0] || '',
      opt1: q.options[1] || '',
      opt2: q.options[2] || '',
      opt3: q.options[3] || '',
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      formulaOrHint: q.formulaOrHint || ''
    });
  };

  const handleDeleteQuestion = (id: string) => {
    const updated = questions.filter((q) => q.id !== id);
    onUpdateQuestions(updated);
    StorageService.saveQuestions(updated);
    showSuccess('Question deleted from bank.');
  };

  // -------------------------------------------------------------
  // 3. SAMPLE PAPERS MANAGEMENT (Add / Edit / Delete)
  // -------------------------------------------------------------
  const [editingPaper, setEditingPaper] = useState<SamplePaper | null>(null);
  const [paperForm, setPaperForm] = useState({
    title: '',
    subject: 'Science' as SubjectType,
    paperType: 'Sample Question Paper 2026-27' as SamplePaper['paperType'],
    durationMinutes: 180,
    maximumMarks: 80,
    blueprintOverview: '',
    sampleQText: '',
    sampleQAnswer: ''
  });

  const handleSavePaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperForm.title.trim()) return;

    if (editingPaper) {
      const updated = papers.map((p) =>
        p.id === editingPaper.id
          ? {
              ...p,
              title: paperForm.title,
              subject: paperForm.subject,
              paperType: paperForm.paperType,
              durationMinutes: Number(paperForm.durationMinutes),
              maximumMarks: Number(paperForm.maximumMarks),
              blueprintOverview: paperForm.blueprintOverview
            }
          : p
      );
      onUpdatePapers(updated);
      StorageService.saveSamplePapers(updated);
      setEditingPaper(null);
      showSuccess('Sample Paper updated successfully!');
    } else {
      const newPaper: SamplePaper = {
        id: `paper-custom-${Date.now()}`,
        title: paperForm.title,
        subject: paperForm.subject,
        paperType: paperForm.paperType,
        year: '2026-27',
        durationMinutes: Number(paperForm.durationMinutes),
        maximumMarks: Number(paperForm.maximumMarks),
        blueprintOverview: paperForm.blueprintOverview || 'Official CBSE 2026-27 Blueprint format',
        generalInstructions: [
          'All questions are compulsory.',
          'Section A has 20 MCQs of 1 mark each.',
          'Section B carries 2 marks each.',
          'Section C carries 3 marks each.',
          'Section D carries 5 marks each.',
          'Section E has 3 Case-based questions of 4 marks each.'
        ],
        sections: [
          {
            name: 'Section A - Objective Questions',
            description: '1 Mark each questions',
            totalMarks: 20,
            questions: [
              {
                questionNumber: 1,
                text: paperForm.sampleQText || 'Sample standard competency question.',
                marks: 1,
                answerKey: paperForm.sampleQAnswer || 'Sample official answer key.',
                stepMarksExplanation: '1 mark for correct deduction.'
              }
            ]
          }
        ]
      };
      const updated = [newPaper, ...papers];
      onUpdatePapers(updated);
      StorageService.saveSamplePapers(updated);
      showSuccess('New Sample Question Paper published!');
    }

    setPaperForm({
      title: '',
      subject: 'Science',
      paperType: 'Sample Question Paper 2026-27',
      durationMinutes: 180,
      maximumMarks: 80,
      blueprintOverview: '',
      sampleQText: '',
      sampleQAnswer: ''
    });
  };

  const startEditPaper = (p: SamplePaper) => {
    setEditingPaper(p);
    setPaperForm({
      title: p.title,
      subject: p.subject,
      paperType: p.paperType,
      durationMinutes: p.durationMinutes,
      maximumMarks: p.maximumMarks,
      blueprintOverview: p.blueprintOverview,
      sampleQText: p.sections[0]?.questions[0]?.text || '',
      sampleQAnswer: p.sections[0]?.questions[0]?.answerKey || ''
    });
  };

  const handleDeletePaper = (id: string) => {
    const updated = papers.filter((p) => p.id !== id);
    onUpdatePapers(updated);
    StorageService.saveSamplePapers(updated);
    showSuccess('Sample paper removed.');
  };

  // -------------------------------------------------------------
  // 4. CHAPTER NOTES MANAGEMENT (Add / Edit / Delete)
  // -------------------------------------------------------------
  const [editingNote, setEditingNote] = useState<ChapterNote | null>(null);
  const [noteForm, setNoteForm] = useState({
    title: '',
    subject: 'Science' as SubjectType,
    chapter: 'Chemical Reactions and Equations' as ChapterType,
    summary: '',
    formulaLabel: '',
    formulaValue: '',
    mistake: '',
    downloadFileName: ''
  });

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteForm.title.trim()) return;

    if (editingNote) {
      const updated = notes.map((n) =>
        n.id === editingNote.id
          ? {
              ...n,
              title: noteForm.title,
              subject: noteForm.subject,
              chapter: noteForm.chapter,
              summary: noteForm.summary,
              formulasAndReactions: [
                { label: noteForm.formulaLabel || 'Formula', formula: noteForm.formulaValue || 'Formula details' }
              ],
              commonMistakes: [noteForm.mistake || 'Common exam mistake to avoid']
            }
          : n
      );
      onUpdateNotes(updated);
      StorageService.saveNotes(updated);
      setEditingNote(null);
      showSuccess('Chapter note updated successfully!');
    } else {
      const newNote: ChapterNote = {
        id: `note-custom-${Date.now()}`,
        title: noteForm.title,
        subject: noteForm.subject,
        chapter: noteForm.chapter,
        summary: noteForm.summary,
        highYieldPoints: [
          'High yield point 1: Crucial for board examination.',
          'High yield point 2: Emphasized in NCERT exemplar.'
        ],
        formulasAndReactions: [
          { label: noteForm.formulaLabel || 'Key Equation', formula: noteForm.formulaValue || 'E = mc²' }
        ],
        commonMistakes: [noteForm.mistake || 'Avoid units error and step omissions.'],
        ncertExemplarTips: ['Read chapter summary thoroughly before answering.'],
        downloadFileName: noteForm.downloadFileName || `${noteForm.title.replace(/\s+/g, '_')}.pdf`
      };
      const updated = [newNote, ...notes];
      onUpdateNotes(updated);
      StorageService.saveNotes(updated);
      showSuccess('New chapter revision note added!');
    }

    setNoteForm({
      title: '',
      subject: 'Science',
      chapter: 'Chemical Reactions and Equations',
      summary: '',
      formulaLabel: '',
      formulaValue: '',
      mistake: '',
      downloadFileName: ''
    });
  };

  const startEditNote = (n: ChapterNote) => {
    setEditingNote(n);
    setNoteForm({
      title: n.title,
      subject: n.subject,
      chapter: n.chapter,
      summary: n.summary,
      formulaLabel: n.formulasAndReactions[0]?.label || '',
      formulaValue: n.formulasAndReactions[0]?.formula || '',
      mistake: n.commonMistakes[0] || '',
      downloadFileName: n.downloadFileName
    });
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    onUpdateNotes(updated);
    StorageService.saveNotes(updated);
    showSuccess('Chapter note removed.');
  };

  // -------------------------------------------------------------
  // 5. ADMIN CREDENTIALS & SECURITY
  // -------------------------------------------------------------
  const currentCreds = StorageService.getAdminCredentials();
  const [adminUsername, setAdminUsername] = useState(currentCreds.username);
  const [adminPassword, setAdminPassword] = useState(currentCreds.password);
  const [adminName, setAdminName] = useState(currentCreds.name || 'Academic Administrator');

  const handleUpdateSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.updateAdminCredentials({
      username: adminUsername.trim(),
      password: adminPassword.trim(),
      name: adminName.trim()
    });
    showSuccess('Admin username and password updated successfully! Only you hold these credentials.');
  };

  // -------------------------------------------------------------
  // 6. STUDENTS MANAGEMENT
  // -------------------------------------------------------------
  const registeredStudents = StorageService.getRegisteredStudents();

  // -------------------------------------------------------------
  // 7. EXPORT / FACTORY RESET
  // -------------------------------------------------------------
  const handleExportBackup = () => {
    const data = {
      notifications,
      questions,
      papers,
      notes,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VidyaSetu_CBSE_2027_Backup_${Date.now()}.json`;
    a.click();
  };

  const handleFactoryReset = () => {
    if (window.confirm('Are you sure you want to restore default CBSE 2026-27 questions, notes and circulars?')) {
      StorageService.resetAllToDefaults();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border border-amber-500/40 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">Administrator Control Room</h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Full Authority
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                You have master access to add, edit, or delete circulars, quiz questions, sample papers, notes, and change admin credentials.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportBackup}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Backup</span>
            </button>
            <button
              onClick={onLogoutAdmin}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold hover:bg-rose-500/20 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Admin</span>
            </button>
          </div>
        </div>

        {/* Success Banner */}
        {successMsg && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tab Selector */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap gap-2">
          {(
            [
              { id: 'notifications', label: 'Circulars & Updates', icon: Bell },
              { id: 'questions', label: 'Quiz Questions Bank', icon: Sparkles },
              { id: 'papers', label: 'Sample Papers', icon: FileText },
              { id: 'notes', label: 'Chapter Notes', icon: BookOpen },
              { id: 'students', label: 'Students Roster', icon: Users },
              { id: 'security', label: 'Change Admin Credentials', icon: KeyRound }
            ] as const
          ).map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. NOTIFICATIONS TAB */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                {editingNotif ? <Edit className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-amber-400" />}
                <span>{editingNotif ? 'Edit Board Circular' : 'Publish New CBSE 2026-27 Notification / Circular'}</span>
              </h3>
              {editingNotif && (
                <button
                  onClick={() => {
                    setEditingNotif(null);
                    setNotifForm({ title: '', category: 'CBSE Circular', summary: '', fullContent: '', isImportant: true });
                  }}
                  className="text-xs text-rose-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" /> Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveNotification} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Circular Title</label>
                  <input
                    type="text"
                    required
                    value={notifForm.title}
                    onChange={(e) => setNotifForm({ ...notifForm, title: e.target.value })}
                    placeholder="e.g. CBSE 2027 Practical Examination Timetable"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Category</label>
                  <select
                    value={notifForm.category}
                    onChange={(e: any) => setNotifForm({ ...notifForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400"
                  >
                    <option value="CBSE Circular">CBSE Circular</option>
                    <option value="Datesheet">Datesheet</option>
                    <option value="Syllabus Update">Syllabus Update</option>
                    <option value="Exam Strategy">Exam Strategy</option>
                    <option value="Urgent">Urgent Alert</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Brief Summary</label>
                <input
                  type="text"
                  required
                  value={notifForm.summary}
                  onChange={(e) => setNotifForm({ ...notifForm, summary: e.target.value })}
                  placeholder="One sentence highlight shown in notifications drawer"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Full Circular Text</label>
                <textarea
                  rows={3}
                  value={notifForm.fullContent}
                  onChange={(e) => setNotifForm({ ...notifForm, fullContent: e.target.value })}
                  placeholder="Detailed circular contents, points, guidelines..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifForm.isImportant}
                    onChange={(e) => setNotifForm({ ...notifForm, isImportant: e.target.checked })}
                    className="rounded accent-amber-500"
                  />
                  <span>Mark as Urgent / Priority Alert</span>
                </label>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition cursor-pointer"
                >
                  {editingNotif ? 'Update Circular' : 'Publish Circular'}
                </button>
              </div>
            </form>
          </div>

          {/* List of Existing Circulars with Edit & Delete */}
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Active Circulars ({notifications.length})</h3>
            <div className="space-y-3">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">{notif.category}</span>
                      <span className="text-xs text-slate-500">{notif.date}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{notif.title}</h4>
                    <p className="text-xs text-slate-400">{notif.summary}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => startEditNotification(notif)}
                      className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition cursor-pointer"
                      title="Edit Notification"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteNotification(notif.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                      title="Delete Notification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. QUESTIONS TAB */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                {editingQuestion ? <Edit className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-amber-400" />}
                <span>{editingQuestion ? 'Edit Board Question' : 'Add Custom Question to Board Bank'}</span>
              </h3>
              {editingQuestion && (
                <button
                  onClick={() => {
                    setEditingQuestion(null);
                    setQForm({
                      subject: 'Science',
                      chapter: 'Chemical Reactions and Equations',
                      difficulty: 'Competency/HOTS',
                      question: '',
                      opt0: '',
                      opt1: '',
                      opt2: '',
                      opt3: '',
                      correctIndex: 0,
                      explanation: '',
                      formulaOrHint: ''
                    });
                  }}
                  className="text-xs text-rose-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" /> Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Subject</label>
                  <select
                    value={qForm.subject}
                    onChange={(e: any) => setQForm({ ...qForm, subject: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Science">Science</option>
                    <option value="Mathematics">Mathematics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Chapter</label>
                  <input
                    type="text"
                    value={qForm.chapter}
                    onChange={(e: any) => setQForm({ ...qForm, chapter: e.target.value })}
                    placeholder="Chapter Name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Difficulty</label>
                  <select
                    value={qForm.difficulty}
                    onChange={(e: any) => setQForm({ ...qForm, difficulty: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Competency/HOTS">Competency/HOTS</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Question Text</label>
                <textarea
                  rows={2}
                  required
                  value={qForm.question}
                  onChange={(e) => setQForm({ ...qForm, question: e.target.value })}
                  placeholder="e.g. In an electric circuit with resistance..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Option A</label>
                  <input
                    type="text"
                    required
                    value={qForm.opt0}
                    onChange={(e) => setQForm({ ...qForm, opt0: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Option B</label>
                  <input
                    type="text"
                    required
                    value={qForm.opt1}
                    onChange={(e) => setQForm({ ...qForm, opt1: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Option C</label>
                  <input
                    type="text"
                    required
                    value={qForm.opt2}
                    onChange={(e) => setQForm({ ...qForm, opt2: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Option D</label>
                  <input
                    type="text"
                    required
                    value={qForm.opt3}
                    onChange={(e) => setQForm({ ...qForm, opt3: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Correct Option</label>
                  <select
                    value={qForm.correctIndex}
                    onChange={(e) => setQForm({ ...qForm, correctIndex: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-emerald-400 font-bold"
                  >
                    <option value={0}>Option A is Correct</option>
                    <option value={1}>Option B is Correct</option>
                    <option value={2}>Option C is Correct</option>
                    <option value={3}>Option D is Correct</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Key Formula / Hint</label>
                  <input
                    type="text"
                    value={qForm.formulaOrHint}
                    onChange={(e) => setQForm({ ...qForm, formulaOrHint: e.target.value })}
                    placeholder="e.g. V = IR or sin²θ + cos²θ = 1"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">CBSE Step-by-Step Marking Explanation</label>
                <textarea
                  rows={2}
                  value={qForm.explanation}
                  onChange={(e) => setQForm({ ...qForm, explanation: e.target.value })}
                  placeholder="Official steps according to NCERT 2026-27"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition cursor-pointer"
              >
                {editingQuestion ? 'Save Question Changes' : 'Save Question into Infinite Bank'}
              </button>
            </form>
          </div>

          {/* Questions Bank List with Edit & Delete */}
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Questions in Pool ({questions.length})</h3>
            <div className="space-y-3">
              {questions.map((q) => (
                <div key={q.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">{q.subject}</span>
                      <span className="text-xs text-slate-400">{q.chapter}</span>
                      <span className="text-[10px] text-amber-300">{q.difficulty}</span>
                    </div>
                    <p className="text-xs font-semibold text-white">{q.question}</p>
                    <p className="text-[11px] text-emerald-400">Answer: {q.options[q.correctIndex]}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => startEditQuestion(q)}
                      className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition cursor-pointer"
                      title="Edit Question"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                      title="Delete Question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. PAPERS TAB (Add / Edit / Delete) */}
      {activeTab === 'papers' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                {editingPaper ? <Edit className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-amber-400" />}
                <span>{editingPaper ? 'Edit Sample Paper' : 'Add / Configure Sample Question Paper'}</span>
              </h3>
              {editingPaper && (
                <button
                  onClick={() => {
                    setEditingPaper(null);
                    setPaperForm({
                      title: '',
                      subject: 'Science',
                      paperType: 'Sample Question Paper 2026-27',
                      durationMinutes: 180,
                      maximumMarks: 80,
                      blueprintOverview: '',
                      sampleQText: '',
                      sampleQAnswer: ''
                    });
                  }}
                  className="text-xs text-rose-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" /> Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSavePaper} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Paper Title</label>
                  <input
                    type="text"
                    required
                    value={paperForm.title}
                    onChange={(e) => setPaperForm({ ...paperForm, title: e.target.value })}
                    placeholder="e.g. CBSE Class X Science (086) Official Mock 2026-27"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Subject</label>
                  <select
                    value={paperForm.subject}
                    onChange={(e: any) => setPaperForm({ ...paperForm, subject: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Science">Science (086)</option>
                    <option value="Mathematics">Mathematics (041/241)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Max Marks</label>
                  <input
                    type="number"
                    value={paperForm.maximumMarks}
                    onChange={(e) => setPaperForm({ ...paperForm, maximumMarks: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    value={paperForm.durationMinutes}
                    onChange={(e) => setPaperForm({ ...paperForm, durationMinutes: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Blueprint & Structure Overview</label>
                <textarea
                  rows={2}
                  value={paperForm.blueprintOverview}
                  onChange={(e) => setPaperForm({ ...paperForm, blueprintOverview: e.target.value })}
                  placeholder="e.g. Formulated per CBSE 2026-27 50% competency guidelines."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition cursor-pointer"
              >
                {editingPaper ? 'Update Sample Paper' : 'Save & Publish Sample Paper'}
              </button>
            </form>
          </div>

          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Configured Sample Papers ({papers.length})</h3>
            <div className="space-y-4">
              {papers.map((p) => (
                <div key={p.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs font-bold text-violet-400">{p.subject}</span>
                      <h4 className="text-sm font-bold text-white">{p.title}</h4>
                      <p className="text-xs text-slate-400">{p.blueprintOverview}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg">
                        {p.maximumMarks} Marks
                      </span>
                      <button
                        onClick={() => startEditPaper(p)}
                        className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition cursor-pointer"
                        title="Edit Paper"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePaper(p.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                        title="Delete Paper"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 flex gap-4">
                    <span>Sections: {p.sections.length}</span>
                    <span>Duration: {p.durationMinutes} mins</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. NOTES TAB (Add / Edit / Delete) */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                {editingNote ? <Edit className="w-4 h-4 text-amber-400" /> : <Plus className="w-4 h-4 text-amber-400" />}
                <span>{editingNote ? 'Edit Chapter Note' : 'Add Chapter Revision Note'}</span>
              </h3>
              {editingNote && (
                <button
                  onClick={() => {
                    setEditingNote(null);
                    setNoteForm({
                      title: '',
                      subject: 'Science',
                      chapter: 'Chemical Reactions and Equations',
                      summary: '',
                      formulaLabel: '',
                      formulaValue: '',
                      mistake: '',
                      downloadFileName: ''
                    });
                  }}
                  className="text-xs text-rose-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" /> Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSaveNote} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Note Title</label>
                  <input
                    type="text"
                    required
                    value={noteForm.title}
                    onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                    placeholder="e.g. Electricity - Formula Sheet & Circuit Laws"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Subject</label>
                  <select
                    value={noteForm.subject}
                    onChange={(e: any) => setNoteForm({ ...noteForm, subject: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Science">Science</option>
                    <option value="Mathematics">Mathematics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Chapter Concept Summary</label>
                <textarea
                  rows={2}
                  required
                  value={noteForm.summary}
                  onChange={(e) => setNoteForm({ ...noteForm, summary: e.target.value })}
                  placeholder="Concise overview of the chapter core concepts..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Key Formula / Reaction Label</label>
                  <input
                    type="text"
                    value={noteForm.formulaLabel}
                    onChange={(e) => setNoteForm({ ...noteForm, formulaLabel: e.target.value })}
                    placeholder="e.g. Ohm's Law or Quadratic Formula"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-300 mb-1">Formula Equation</label>
                  <input
                    type="text"
                    value={noteForm.formulaValue}
                    onChange={(e) => setNoteForm({ ...noteForm, formulaValue: e.target.value })}
                    placeholder="e.g. V = I × R"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Common Board Exam Pitfall</label>
                <input
                  type="text"
                  value={noteForm.mistake}
                  onChange={(e) => setNoteForm({ ...noteForm, mistake: e.target.value })}
                  placeholder="e.g. Forgetting to convert minutes to seconds in Joules calculation"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition cursor-pointer"
              >
                {editingNote ? 'Save Note Updates' : 'Add Chapter Revision Note'}
              </button>
            </form>
          </div>

          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Configured High-Yield Notes ({notes.length})</h3>
            <div className="space-y-3">
              {notes.map((n) => (
                <div key={n.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400">{n.subject}</span>
                    <h4 className="text-xs font-bold text-white">{n.title}</h4>
                    <p className="text-[11px] text-slate-400 truncate max-w-lg">{n.summary}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => startEditNote(n)}
                      className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 transition cursor-pointer"
                      title="Edit Note"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(n.id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                      title="Delete Note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. STUDENTS ROSTER TAB */}
      {activeTab === 'students' && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">
              Registered Students ({registeredStudents.length})
            </h3>
          </div>
          <div className="divide-y divide-slate-800 overflow-x-auto">
            {registeredStudents.map((std) => (
              <div key={std.id} className="py-3 flex items-center justify-between text-xs min-w-[500px]">
                <div>
                  <p className="font-bold text-white">{std.name}</p>
                  <p className="text-[11px] text-slate-400">{std.email} • {std.schoolName}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-amber-400 font-semibold">{std.streakDays}d Streak</span>
                  <span className="text-emerald-400 font-semibold">{std.xpPoints} XP</span>
                  <span className="text-indigo-300 font-bold">Target: {std.targetPercentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. SECURITY / CREDENTIALS TAB */}
      {activeTab === 'security' && (
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Confidential Admin Access
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              Change Administrator ID & Password
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              The updated ID and password will immediately become the required credentials to log in. Only you will possess this passcode.
            </p>
          </div>

          <form onSubmit={handleUpdateSecurity} className="max-w-md space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Admin Name / Designation
              </label>
              <input
                type="text"
                required
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Admin ID / Login Username
              </label>
              <input
                type="text"
                required
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Admin Secure Password
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-amber-400 font-mono font-bold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update Admin Passcode</span>
            </button>
          </form>

          {/* Danger Zone */}
          <div className="pt-6 border-t border-slate-800/80">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
              Danger Zone / Factory Restore
            </h4>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
              <div>
                <p className="text-xs font-bold text-rose-200">Reset Website Content to Default 2026-27 State</p>
                <p className="text-[11px] text-slate-400">Restores default questions, sample papers, notes and credentials.</p>
              </div>
              <button
                onClick={handleFactoryReset}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow transition cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Factory Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
