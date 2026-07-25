import React, { useState } from 'react';
import { useOsceStore } from '../store/useOsceStore';
import { Activity, RotateCcw, LayoutDashboard, BookOpen, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { resetProgress, setPhase, phase } = useOsceStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (newPhase) => {
    setPhase(newPhase);
    setIsMobileMenuOpen(false); // Close menu on mobile after selection
  };

  return (
    <header className="relative bg-slate-900 border-b border-slate-800 z-50">
      <div className="px-4 md:px-6 py-4 flex justify-between items-center">
        
        {/* Logo Section */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group" 
          onClick={() => handleNavigation('dashboard')}
        >
          <div className="p-2 bg-teal-500/10 border border-teal-500/30 rounded-xl text-teal-400 group-hover:bg-teal-500/20 transition-colors">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wide text-white">CliniSim</h1>
            <p className="text-[10px] sm:text-xs text-slate-400">Interactive OSCE Clinical Examiner</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
          <button
            onClick={() => handleNavigation('dashboard')}
            className={`text-sm px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors ${
              phase === 'dashboard' 
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => handleNavigation('library')}
            className={`text-sm px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors ${
              phase === 'library' 
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Case Library</span>
          </button>

          {/* Divider */}
          <div className="w-px h-6 bg-slate-800 mx-1"></div>

          <button
            onClick={() => {
              if (window.confirm('Reset all saved local progress?')) resetProgress();
            }}
            className="text-slate-400 hover:text-rose-400 p-2 rounded-lg transition-colors"
            title="Reset Local Storage"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-400 hover:text-white p-2 focus:outline-none transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 shadow-2xl transition-all duration-300 ease-in-out origin-top ${
          isMobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col p-4 space-y-2">
          <button
            onClick={() => handleNavigation('dashboard')}
            className={`text-sm px-4 py-3 rounded-xl flex items-center space-x-3 transition-colors ${
              phase === 'dashboard' 
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => handleNavigation('library')}
            className={`text-sm px-4 py-3 rounded-xl flex items-center space-x-3 transition-colors ${
              phase === 'library' 
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Case Library</span>
          </button>
          
          <div className="h-px bg-slate-800/50 my-2"></div>

          <button
            onClick={() => {
              if (window.confirm('Reset all saved local progress?')) {
                resetProgress();
                setIsMobileMenuOpen(false);
              }
            }}
            className="text-sm px-4 py-3 rounded-xl flex items-center space-x-3 text-slate-400 hover:text-rose-400 hover:bg-slate-800/50 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reset Progress</span>
          </button>
        </div>
      </div>
    </header>
  );
}