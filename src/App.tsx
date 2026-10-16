/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StudentDashboard } from './components/StudentDashboard';
import { InfiniteQuiz } from './components/InfiniteQuiz';
import { SamplePapers } from './components/SamplePapers';
import { NotesSection } from './components/NotesSection';
import { EducationalPuzzles } from './components/EducationalPuzzles';
import { AdminPanel } from './components/AdminPanel';
import { StudentGate } from './components/StudentGate';
import { StudentAuthModal } from './components/StudentAuthModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { NotificationsModal } from './components/NotificationsModal';
import { Footer } from './components/Footer';
import { StorageService, DEFAULT_DEMO_STUDENT } from './utils/storage';
import {
  StudentProfile,
  NotificationItem,
  QuizQuestion,
  SamplePaper,
  ChapterNote
} from './types';

export default function App() {
  // Respect user constraint: "student can only excess after student login all thing should be avialble b admin excess"
  const [student, setStudent] = useState<StudentProfile | null>(() => {
    return StorageService.getActiveStudent();
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return StorageService.isAdminLoggedIn();
  });
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Modals state
  const [isStudentAuthOpen, setIsStudentAuthOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Core Data managed by Admin & Storage
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    StorageService.getNotifications()
  );
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    StorageService.getQuestions()
  );
  const [papers, setPapers] = useState<SamplePaper[]>(() =>
    StorageService.getSamplePapers()
  );
  const [notes, setNotes] = useState<ChapterNote[]>(() =>
    StorageService.getNotes()
  );

  // Sync active student state if changed
  useEffect(() => {
    if (student) {
      StorageService.setActiveStudent(student);
    }
  }, [student]);

  const handleTabChange = (tab: string) => {
    // If not logged in as student and not admin, prompt student login
    if (!student && !isAdmin) {
      if (tab === 'admin') {
        setIsAdminAuthOpen(true);
      } else {
        setIsStudentAuthOpen(true);
      }
      return;
    }

    if (tab === 'admin' && !isAdmin) {
      setIsAdminAuthOpen(true);
      return;
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginStudent = (newStudent: StudentProfile) => {
    setStudent(newStudent);
    StorageService.setActiveStudent(newStudent);
    setActiveTab('dashboard');
  };

  const handleLogoutStudent = () => {
    setStudent(null);
    StorageService.setActiveStudent(null);
    setActiveTab('dashboard');
  };

  const handleLoginAdmin = () => {
    setIsAdmin(true);
    StorageService.setAdminSession(true);
    setActiveTab('admin');
  };

  const handleLogoutAdmin = () => {
    setIsAdmin(false);
    StorageService.setAdminSession(false);
    setActiveTab('dashboard');
  };

  const isAuthenticated = Boolean(student || isAdmin);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        student={student}
        isAdmin={isAdmin}
        onOpenStudentAuth={() => setIsStudentAuthOpen(true)}
        onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
        onLogoutStudent={handleLogoutStudent}
        onLogoutAdmin={handleLogoutAdmin}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadCount={notifications.filter((n) => n.isImportant).length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* If neither student nor admin is logged in, show the Secure Access Gate */}
        {!isAuthenticated ? (
          <StudentGate
            onOpenStudentLogin={() => setIsStudentAuthOpen(true)}
            onOpenAdminLogin={() => setIsAdminAuthOpen(true)}
          />
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <StudentDashboard
                student={student || DEFAULT_DEMO_STUDENT}
                onOpenStudentAuth={() => setIsStudentAuthOpen(true)}
                onNavigateTab={handleTabChange}
              />
            )}

            {activeTab === 'quiz' && (
              <InfiniteQuiz
                student={student}
                onOpenStudentAuth={() => setIsStudentAuthOpen(true)}
                questionsBank={questions}
              />
            )}

            {activeTab === 'papers' && (
              <SamplePapers
                papers={papers}
                isAdmin={isAdmin}
                onOpenAdmin={() => handleTabChange('admin')}
              />
            )}

            {activeTab === 'notes' && (
              <NotesSection
                notes={notes}
                student={student}
                onOpenStudentAuth={() => setIsStudentAuthOpen(true)}
                isAdmin={isAdmin}
                onOpenAdmin={() => handleTabChange('admin')}
              />
            )}

            {activeTab === 'puzzles' && (
              <EducationalPuzzles
                student={student}
                onOpenStudentAuth={() => setIsStudentAuthOpen(true)}
              />
            )}

            {activeTab === 'admin' && isAdmin && (
              <AdminPanel
                notifications={notifications}
                questions={questions}
                papers={papers}
                notes={notes}
                onUpdateNotifications={(items) => setNotifications(items)}
                onUpdateQuestions={(items) => setQuestions(items)}
                onUpdatePapers={(items) => setPapers(items)}
                onUpdateNotes={(items) => setNotes(items)}
                onLogoutAdmin={handleLogoutAdmin}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
        onNavigateTab={handleTabChange}
      />

      {/* Modals */}
      <StudentAuthModal
        isOpen={isStudentAuthOpen}
        onClose={() => setIsStudentAuthOpen(false)}
        onLoginSuccess={handleLoginStudent}
      />

      <AdminLoginModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onLoginSuccess={handleLoginAdmin}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
      />
    </div>
  );
}
