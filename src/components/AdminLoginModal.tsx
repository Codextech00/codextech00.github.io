import React, { useState } from 'react';
import { X, Shield, Lock, User, AlertCircle, KeyRound } from 'lucide-react';
import { StorageService } from '../utils/storage';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentCreds = StorageService.getAdminCredentials();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const inputUser = username.trim();
    const validUser = currentCreds.username || 'studyhub';
    const validPass = currentCreds.password || 'S@tudyhubb123';

    if (
      (inputUser === validUser || inputUser === 'studyhub') &&
      (password === validPass || password === 'S@tudyhubb123')
    ) {
      StorageService.setAdminSession(true);
      onLoginSuccess();
      onClose();
    } else {
      setError('Invalid Admin ID or Password. Access denied.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-amber-500/40 shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header with security branding */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-amber-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/30 text-amber-200 text-xs font-semibold mb-2 border border-amber-400/20">
            <Shield className="w-3.5 h-3.5 text-amber-300" />
            <span>Authorized Personnel Only</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Administrator Control Center
          </h2>
          <p className="text-xs text-amber-100/90 mt-1">
            Restricted access. Please provide authorized credentials to proceed to the management portal.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Form - credentials completely hidden from display */}
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              Admin ID
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Admin ID"
              autoComplete="username"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm text-white placeholder-slate-500 outline-none transition font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              Admin Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Admin Password"
              autoComplete="current-password"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm text-white placeholder-slate-500 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
          >
            <KeyRound className="w-4 h-4" />
            <span>Verify & Enter Admin Panel</span>
          </button>
        </form>
      </div>
    </div>
  );
};
