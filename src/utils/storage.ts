import {
  StudentProfile,
  QuizQuestion,
  SamplePaper,
  ChapterNote,
  NotificationItem,
  QuizAttempt
} from '../types';
import {
  INITIAL_NOTIFICATIONS,
  INITIAL_QUESTIONS,
  INITIAL_SAMPLE_PAPERS,
  INITIAL_NOTES
} from '../data/initialData';

const STORAGE_KEYS = {
  STUDENT: 'cbse2027_active_student',
  REGISTERED_STUDENTS: 'cbse2027_registered_students',
  ADMIN_AUTH: 'cbse2027_admin_auth',
  ADMIN_SESSION: 'cbse2027_admin_session',
  NOTIFICATIONS: 'cbse2027_notifications',
  QUESTIONS: 'cbse2027_questions',
  PAPERS: 'cbse2027_sample_papers',
  NOTES: 'cbse2027_chapter_notes'
};

const DEFAULT_ADMIN = {
  username: 'studyhub',
  password: 'S@tudyhubb123',
  role: 'CBSE Portal Super Admin',
  name: 'Academic Director'
};

export const DEFAULT_DEMO_STUDENT: StudentProfile = {
  id: 'std-2027-demo',
  name: 'Aarav Sharma',
  email: 'aarav.cbse2027@gmail.com',
  schoolName: 'Delhi Public School, R.K. Puram',
  targetPercentage: 96,
  avatarSeed: 'Aarav',
  joinedDate: '2026-10-01',
  streakDays: 7,
  xpPoints: 850,
  quizAttempts: [
    {
      id: 'att-1',
      timestamp: '2026-10-14 18:30',
      subject: 'Science',
      chapter: 'Chemical Reactions and Equations',
      totalQuestions: 10,
      correctAnswers: 9,
      scorePercentage: 90,
      timeSpentSeconds: 240
    },
    {
      id: 'att-2',
      timestamp: '2026-10-15 08:15',
      subject: 'Mathematics',
      chapter: 'Quadratic Equations',
      totalQuestions: 10,
      correctAnswers: 8,
      scorePercentage: 80,
      timeSpentSeconds: 310
    }
  ],
  bookmarkedQuestionIds: ['q-sci-01', 'q-math-04'],
  bookmarkedNoteIds: ['note-sci-chem-01'],
  completedPuzzles: ['puz-chem-balance']
};

export const StorageService = {
  // --- Admin Credential & Session Management ---
  getAdminCredentials() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.username === 'admin@cbse2027.edu' || parsed.username === 'admin.cbse2027@gmail.com') {
          return DEFAULT_ADMIN;
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_ADMIN;
  },

  updateAdminCredentials(newCreds: { username?: string; password?: string; name?: string }) {
    const current = this.getAdminCredentials();
    const updated = { ...current, ...newCreds };
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify(updated));
    return updated;
  },

  isAdminLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
  },

  setAdminSession(isLoggedIn: boolean) {
    if (isLoggedIn) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    }
  },

  // --- Student Auth & Profile Management ---
  getActiveStudent(): StudentProfile | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.STUDENT);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return null;
  },

  setActiveStudent(student: StudentProfile | null) {
    if (student) {
      localStorage.setItem(STORAGE_KEYS.STUDENT, JSON.stringify(student));
      this.upsertRegisteredStudent(student);
    } else {
      localStorage.removeItem(STORAGE_KEYS.STUDENT);
    }
  },

  getRegisteredStudents(): StudentProfile[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REGISTERED_STUDENTS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return [DEFAULT_DEMO_STUDENT];
  },

  upsertRegisteredStudent(student: StudentProfile) {
    const list = this.getRegisteredStudents();
    const idx = list.findIndex(s => s.id === student.id || s.email === student.email);
    if (idx >= 0) {
      list[idx] = student;
    } else {
      list.push(student);
    }
    localStorage.setItem(STORAGE_KEYS.REGISTERED_STUDENTS, JSON.stringify(list));
  },

  saveQuizAttempt(attempt: QuizAttempt, earnedXP: number) {
    const student = this.getActiveStudent();
    if (!student) return;

    const updated: StudentProfile = {
      ...student,
      xpPoints: (student.xpPoints || 0) + earnedXP,
      quizAttempts: [attempt, ...(student.quizAttempts || [])]
    };
    this.setActiveStudent(updated);
  },

  toggleQuestionBookmark(questionId: string): boolean {
    const student = this.getActiveStudent();
    if (!student) return false;

    const list = student.bookmarkedQuestionIds || [];
    const exists = list.includes(questionId);
    const updatedList = exists ? list.filter(id => id !== questionId) : [...list, questionId];

    this.setActiveStudent({
      ...student,
      bookmarkedQuestionIds: updatedList
    });
    return !exists;
  },

  markPuzzleComplete(puzzleId: string, rewardXP: number) {
    const student = this.getActiveStudent();
    if (!student) return;

    const completed = student.completedPuzzles || [];
    if (!completed.includes(puzzleId)) {
      this.setActiveStudent({
        ...student,
        xpPoints: (student.xpPoints || 0) + rewardXP,
        completedPuzzles: [...completed, puzzleId]
      });
    }
  },

  // --- Notifications Data ---
  getNotifications(): NotificationItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_NOTIFICATIONS;
  },

  saveNotifications(items: NotificationItem[]) {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(items));
  },

  // --- Questions Bank Data ---
  getQuestions(): QuizQuestion[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_QUESTIONS;
  },

  saveQuestions(items: QuizQuestion[]) {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(items));
  },

  // --- Sample Papers Data ---
  getSamplePapers(): SamplePaper[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PAPERS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SAMPLE_PAPERS;
  },

  saveSamplePapers(items: SamplePaper[]) {
    localStorage.setItem(STORAGE_KEYS.PAPERS, JSON.stringify(items));
  },

  // --- Chapter Notes Data ---
  getNotes(): ChapterNote[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NOTES);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_NOTES;
  },

  saveNotes(items: ChapterNote[]) {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(items));
  },

  // --- Reset to Factory Defaults ---
  resetAllToDefaults() {
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
    localStorage.removeItem(STORAGE_KEYS.PAPERS);
    localStorage.removeItem(STORAGE_KEYS.NOTES);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }
};
