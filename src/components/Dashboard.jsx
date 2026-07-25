import React from 'react';
import { useOsceStore } from '../store/useOsceStore';
import { 
  Award, CheckCircle, Zap, ArrowRight, ShieldCheck, 
  Activity, TrendingUp, BookOpen, Clock 
} from 'lucide-react';

export default function Dashboard() {
  const { userProgress, setPhase, cases, selectCase } = useOsceStore();

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 w-full min-h-full flex flex-col">
      
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-950 via-slate-900 to-slate-950 border border-teal-500/30 p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center mb-8 shadow-lg shadow-teal-900/10">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 mb-4 md:mb-0">
          <span className="text-xs font-extrabold text-teal-400 uppercase tracking-widest flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4" />
            OSCE Training Hub
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome back, Student</h2>
          <p className="text-sm text-slate-400 mt-2 max-w-lg leading-relaxed">
            Practice realistic medical encounters. Select a station from the library or jump into a recommended case below to continue your training.
          </p>
        </div>
        <button
          onClick={() => setPhase('library')}
          className="relative z-10 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm px-6 py-3.5 rounded-xl flex items-center space-x-2 transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transform hover:-translate-y-0.5"
        >
          <span>Start New Station</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content Grid (Two Columns on Desktop) */}
      <div className="flex flex-col lg:flex-row gap-8 flex-1">
        
        {/* Left Column (Main Stats & Cases) */}
        <div className="flex-1 space-y-8">
          
          {/* KPI Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl flex items-center space-x-4 hover:border-slate-700 transition-colors">
              <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl shadow-inner">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Experience</span>
                <div className="flex items-baseline space-x-2">
                  <p className="text-2xl font-black text-white">{userProgress.totalXP}</p>
                  <span className="text-xs font-semibold text-amber-400">XP</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 p-5 rounded-2xl flex items-center space-x-4 hover:border-slate-700 transition-colors">
              <div className="p-3.5 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-xl shadow-inner">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Completed Stations</span>
                <div className="flex items-baseline space-x-2">
                  <p className="text-2xl font-black text-white">{userProgress.completedCasesCount}</p>
                  <span className="text-xs font-semibold text-teal-400">Cases</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Starter Cases */}
          <div className="bg-slate-900/50 border border-slate-800/60 rounded-2xl p-6">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-teal-400" />
                  Recommended Cases
                </h3>
                <p className="text-xs text-slate-400 mt-1">Curated scenarios to build your clinical foundation.</p>
              </div>
              <button 
                onClick={() => setPhase('library')}
                className="text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
              >
                View all cases &rarr;
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {cases.slice(0, 3).map((c) => (
                <div 
                  key={c.id} 
                  className="bg-slate-950 border border-slate-800 hover:border-teal-500/30 p-5 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all duration-300 group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold text-teal-400 bg-teal-950/50 px-2.5 py-1 rounded-md border border-teal-900/50 uppercase tracking-wide">
                        {c.specialty}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {c.timeLimitMinutes || 10} min
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-slate-100 group-hover:text-teal-300 transition-colors">{c.title}</h4>
                    <p className="text-sm text-slate-400 mt-1 line-clamp-1">{c.vignette}</p>
                  </div>
                  <button
                    onClick={() => selectCase(c)}
                    className="bg-slate-800 hover:bg-teal-500 text-slate-200 hover:text-slate-950 text-sm font-bold px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Launch Case
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Analytics Sidebar) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 h-full flex flex-col">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5 text-teal-400" />
              Performance Analytics
            </h3>
            <p className="text-xs text-slate-400 mb-8">Your cumulative scoring across all simulated encounters.</p>
            
            <div className="space-y-6 flex-1">
              
              {/* History Score Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-semibold text-slate-200">History Taking</span>
                  </div>
                  <span className="text-sm font-bold text-white">{userProgress.historyAccuracy}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-800">
                  <div 
                    className="bg-blue-500 h-2.5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                    style={{ width: `${userProgress.historyAccuracy || 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Diagnosis Score Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-slate-200">Diagnostic Accuracy</span>
                  </div>
                  <span className="text-sm font-bold text-white">{userProgress.diagnosisAccuracy}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-800">
                  <div 
                    className="bg-emerald-500 h-2.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                    style={{ width: `${userProgress.diagnosisAccuracy || 0}%` }}
                  ></div>
                </div>
              </div>

              {/* Placeholder for future metric to fill space beautifully */}
              <div className="pt-4 border-t border-slate-800/50 mt-4 opacity-50">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-semibold text-slate-200">Clinical Reasoning</span>
                  </div>
                  <span className="text-sm font-bold text-white">--%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-800">
                  <div className="bg-slate-700 h-2.5 rounded-full" style={{ width: `0%` }}></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2 text-center">Complete more cases to unlock reasoning metrics.</p>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}