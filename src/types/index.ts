export type SubjectType = 'Science' | 'Mathematics';

export type ChapterType =
  // Science Chapters (CBSE Class 10 2026-27)
  | 'Chemical Reactions and Equations'
  | 'Acids, Bases and Salts'
  | 'Metals and Non-metals'
  | 'Carbon and its Compounds'
  | 'Life Processes'
  | 'Control and Coordination'
  | 'How do Organisms Reproduce?'
  | 'Heredity and Evolution'
  | 'Light – Reflection and Refraction'
  | 'The Human Eye and the Colourful World'
  | 'Electricity'
  | 'Magnetic Effects of Electric Current'
  | 'Our Environment'
  // Mathematics Chapters (CBSE Class 10 2026-27)
  | 'Real Numbers'
  | 'Polynomials'
  | 'Pair of Linear Equations in Two Variables'
  | 'Quadratic Equations'
  | 'Arithmetic Progressions'
  | 'Triangles'
  | 'Coordinate Geometry'
  | 'Introduction to Trigonometry'
  | 'Some Applications of Trigonometry'
  | 'Circles'
  | 'Areas Related to Circles'
  | 'Surface Areas and Volumes'
  | 'Statistics'
  | 'Probability';

export type QuestionDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Competency/HOTS';

export interface QuizQuestion {
  id: string;
  subject: SubjectType;
  chapter: ChapterType;
  difficulty: QuestionDifficulty;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  formulaOrHint?: string;
  isCompetencyBased?: boolean;
}

export interface QuizAttempt {
  id: string;
  timestamp: string;
  subject: SubjectType;
  chapter: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  timeSpentSeconds: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  schoolName: string;
  targetPercentage: number;
  avatarSeed: string;
  joinedDate: string;
  streakDays: number;
  xpPoints: number;
  quizAttempts: QuizAttempt[];
  bookmarkedQuestionIds: string[];
  bookmarkedNoteIds: string[];
  completedPuzzles: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  category: 'CBSE Circular' | 'Datesheet' | 'Syllabus Update' | 'Exam Strategy' | 'Urgent';
  date: string;
  summary: string;
  fullContent: string;
  isImportant: boolean;
  externalLink?: string;
  pdfTitle?: string;
}

export interface PaperSection {
  name: string;
  description: string;
  totalMarks: number;
  questions: {
    questionNumber: number;
    text: string;
    marks: number;
    subQuestions?: string[];
    answerKey: string;
    stepMarksExplanation: string;
  }[];
}

export interface SamplePaper {
  id: string;
  title: string;
  subject: SubjectType;
  paperType: 'Sample Question Paper 2026-27' | 'Practice Question Bank' | 'Case-Based Question Bank' | 'Previous Year Board Paper';
  year: string;
  durationMinutes: number;
  maximumMarks: number;
  blueprintOverview: string;
  sections: PaperSection[];
  generalInstructions: string[];
}

export interface ChapterNote {
  id: string;
  subject: SubjectType;
  chapter: ChapterType;
  title: string;
  summary: string;
  highYieldPoints: string[];
  formulasAndReactions: { label: string; formula: string; note?: string }[];
  commonMistakes: string[];
  diagramDescription?: string;
  ncertExemplarTips: string[];
  downloadFileName: string;
}

export interface PuzzleGame {
  id: string;
  title: string;
  subject: SubjectType;
  category: 'Equation Balancer' | 'Math CrossGrid' | 'Bio Matchup' | 'Physics Circuit Logic';
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  rewardXP: number;
}
