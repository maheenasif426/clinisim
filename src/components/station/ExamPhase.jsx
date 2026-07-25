import React from 'react';
import { useOsceStore } from '../../store/useOsceStore';
import { Stethoscope, CheckCircle2 } from 'lucide-react';

export default function ExamPhase() {
  const { selectedCase, performedExams, performExam } = useOsceStore();

  return (
    <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-bold text-xs text-slate-200 mb-3 flex items-center space-x-2">
          <Stethoscope className="w-4 h-4 text-teal-400" />
          <span>Physical Examination Maneuvers</span>
        </h3>
        <div className="space-y-2">
          {selectedCase.physicalExams.map((ex) => {
            const isDone = performedExams.some((pe) => pe.id === ex.id);
            return (
              <div
                key={ex.id}
                onClick={() => performExam(ex)}
                className={`p-3 rounded-lg border cursor-pointer transition ${
                  isDone
                    ? 'bg-slate-950 border-teal-500/50'
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-teal-400">
                    {ex.system}
                  </span>
                  {isDone && <CheckCircle2 className="w-4 h-4 text-teal-400" />}
                </div>
                <h4 className="font-bold text-xs mt-2 text-white">{ex.name}</h4>
                <p className="text-[11px] text-slate-400 mt-1">{ex.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
        <h3 className="font-bold text-xs text-slate-200 mb-3">Recorded Clinical Findings</h3>
        {performedExams.length === 0 ? (
          <div className="h-40 flex items-center justify-center text-slate-500 text-xs text-center">
            Select a physical maneuver to perform examination.
          </div>
        ) : (
          <div className="space-y-3">
            {performedExams.map((ex) => (
              <div key={ex.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-xs font-bold text-teal-400">{ex.name}</span>
                <p className="text-xs font-mono mt-1 text-slate-200">{ex.finding}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}