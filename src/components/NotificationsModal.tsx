import React, { useState } from 'react';
import { X, Bell, Calendar, Download, FileText, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(notifications[0]?.id || null);

  if (!isOpen) return null;

  const filtered =
    selectedCategory === 'All'
      ? notifications
      : notifications.filter((n) => n.category === selectedCategory);

  const handleDownloadNotice = (notif: NotificationItem) => {
    const text = `================================================
CENTRAL BOARD OF SECONDARY EDUCATION
OFFICIAL CIRCULAR / NOTIFICATION (SESSION 2026-27)
================================================
TITLE: ${notif.title}
CATEGORY: ${notif.category}
DATE: ${notif.date}

SUMMARY:
${notif.summary}

CIRCULAR TEXT:
${notif.fullContent}

VidyaSetu CBSE Class X Official Portal
`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = notif.pdfTitle || `CBSE_Circular_${notif.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden text-slate-100 max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-950 p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">CBSE Board 2026-27 Circulars</h2>
              <p className="text-xs text-slate-400">Official directives, datesheet, syllabus notifications</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="p-3 bg-slate-950/60 border-b border-slate-800 flex flex-wrap gap-1.5 shrink-0">
          {(['All', 'CBSE Circular', 'Datesheet', 'Syllabus Update', 'Exam Strategy'] as const).map(
            (cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            )
          )}
        </div>

        {/* Content list */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {filtered.map((item) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3 transition hover:border-slate-700"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-500">{item.date}</span>
                      {item.isImportant && (
                        <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.2 rounded">
                          Priority
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.summary}</p>
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer shrink-0"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="pt-3 border-t border-slate-900 space-y-3 animate-in fade-in">
                    <div className="p-4 rounded-xl bg-slate-900/90 text-xs md:text-sm text-slate-300 font-mono whitespace-pre-line leading-relaxed">
                      {item.fullContent}
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDownloadNotice(item)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-semibold cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Circular PDF</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
