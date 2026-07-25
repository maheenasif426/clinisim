import React from 'react';
import { Activity, ShieldCheck, HeartPulse, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 py-8 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Branding & Status */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-teal-500/10 border border-teal-500/30 rounded-lg text-teal-400">
              <Activity className="w-4 h-4" />
            </div>
            <span className="text-sm font-extrabold text-white tracking-wide">CliniSim</span>
          </div>
          
          <div className="hidden sm:block w-px h-4 bg-slate-800"></div>

          <div className="flex items-center space-x-2 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-800/80 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-300 font-medium">OSCE Engine Active</span>
          </div>
        </div>

       

        {/* Copyright & Social/Extra */}
        <div className="text-xs text-slate-500 text-center md:text-right">
          <p>© {new Date().getFullYear()} CliniSim. All rights reserved.</p>
          <p className="mt-0.5 text-[10px] text-slate-600">Interactive Medical Simulation & Assessment Suite</p>
        </div>

      </div>
    </footer>
  );
}