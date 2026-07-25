import React, { useEffect } from 'react';
import { useOsceStore } from '../../store/useOsceStore';
import { Clock, User, CheckCircle2 } from 'lucide-react';
import HistoryPhase from './HistoryPhase';
import ExamPhase from './ExamPhase';
import DiagnosisPhase from './DiagnosisPhase';
import DebriefPhase from './DebriefPhase';

export default function OSCESession() {
  const {
    selectedCase,
    phase,
    setPhase,
    timeRemaining,
    isTimerActive,
    tickTimer,
    performedExams
  } = useOsceStore();

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => tickTimer(), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining, tickTimer]);

  if (!selectedCase) return null;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 grid grid-cols-12 gap-4 p-6 overflow-hidden">
      {/* Patient Card Bar */}
      <div className="col-span-12 lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col">
        <div className="text-center pb-4 border-b border-slate-800">
          <div className="w-20 h-20 mx-auto mb-3 bg-teal-950 border-2 border-teal-500 rounded-full flex items-center justify-center text-teal-400">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-sm font-bold text-white">{selectedCase.patientProfile.name}</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {selectedCase.patientProfile.age} Y/O {selectedCase.patientProfile.gender}
          </p>
        </div>

        <div className="mt-4 flex-1 space-y-4">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Chief Complaint</span>
            <p className="text-xs font-medium mt-1 text-teal-300">"{selectedCase.script.chiefComplaint}"</p>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Exams Conducted</span>
            {performedExams.length === 0 ? (
              <p className="text-xs text-slate-500 mt-1">None yet.</p>
            ) : (
              <ul className="mt-2 space-y-1">
                {performedExams.map((ex) => (
                  <li key={ex.id} className="text-xs text-slate-300 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span className="truncate">{ex.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded border border-slate-800">
            <Clock className={`w-4 h-4 ${timeRemaining < 120 ? 'text-red-400 animate-pulse' : 'text-teal-400'}`} />
            <span className="font-mono text-xs font-bold text-white">{formatTime(timeRemaining)}</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Stage */}
      <div className="col-span-12 lg:col-span-9 bg-slate-900 border border-slate-800 rounded-xl flex flex-col overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/50">
          {[
            { id: 'intro', label: '1. Briefing' },
            { id: 'history', label: '2. History' },
            { id: 'examination', label: '3. Physical Exam' },
            { id: 'diagnosis', label: '4. Diagnosis' },
            { id: 'debrief', label: '5. Debrief' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPhase(tab.id)}
              className={`flex-1 py-3 text-xs font-semibold transition border-b-2 ${
                phase === tab.id
                  ? 'border-teal-400 text-teal-400 bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Phase Render */}
        {phase === 'intro' && (
          <div className="p-8 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-teal-400 uppercase">Station Objective</span>
              <h3 className="text-xl font-bold text-white">{selectedCase.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                {selectedCase.vignette}
              </p>
            </div>
            <button
              onClick={() => setPhase('history')}
              className="self-end bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-lg transition"
            >
              Begin Examination
            </button>
          </div>
        )}

        {phase === 'history' && <HistoryPhase />}
        {phase === 'examination' && <ExamPhase />}
        {phase === 'diagnosis' && <DiagnosisPhase />}
        {phase === 'debrief' && <DebriefPhase />}
      </div>
    </div>
  );
}