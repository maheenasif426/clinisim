import React from "react";
import { useOsceStore } from "../../store/useOsceStore";
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  CheckSquare,
} from "lucide-react";

export default function DebriefPhase() {
  const { finalScore, selectedCase, setPhase } = useOsceStore();

  if (!finalScore) {
    return (
      <div className="flex-1 p-8 text-center text-white bg-slate-950 flex flex-col items-center justify-center">
        <p className="text-sm text-slate-400 mb-4">
          No evaluation score found.
        </p>
        <button
          onClick={() => setPhase("library")}
          className="bg-teal-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs"
        >
          Return to Library
        </button>
      </div>
    );
  }

  const targetDiagnosis =
    selectedCase?.script?.hiddenDiagnosis || "Target Condition";

  // Map categories safely with explicit fallbacks
  const scoreCategories = [
    {
      label: "History Taking",
      score: finalScore.historyScore ?? 0,
      correctPoints: finalScore.historyCorrect || [
        `Thorough inquiry into ${targetDiagnosis} risk factors`,
      ],
    },
    {
      label: "Clinical Examination",
      score: finalScore.examScore ?? 0,
      correctPoints: finalScore.examCorrect || [
        `Targeted physical assessment for ${targetDiagnosis}`,
      ],
    },
    {
      label: "Diagnosis Accuracy",
      score: finalScore.diagnosisScore ?? 0,
      correctPoints: finalScore.diagnosisCorrect || [targetDiagnosis],
    },
    {
      label: "Clinical Reasoning",
      score: finalScore.reasoningScore ?? 0,
      correctPoints: finalScore.reasoningCorrect || [
        `Synthesis of clinical findings matching ${targetDiagnosis}`,
      ],
    },
  ];

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-950 min-h-full">
      {/* Header Score Card */}
      <div className="bg-gradient-to-r from-teal-950 to-slate-900 border border-teal-500/30 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Station Complete
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-1">
            {finalScore.overall ?? 0}% Final Score
          </h2>
          <p className="text-sm text-teal-200/70 mt-1 font-medium">
            Earned +{finalScore.xpEarned ?? 0} XP
          </p>
        </div>
        <div className="text-left md:text-right bg-slate-950/50 p-3 rounded-lg border border-slate-800/50 w-full md:w-auto">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">
            Target Diagnosis
          </span>
          <p className="text-base font-bold text-teal-300 mt-0.5">
            {targetDiagnosis}
          </p>
        </div>
      </div>

      {/* Overall Examiner Remarks */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
        <h3 className="font-bold text-sm text-slate-200 mb-2 flex items-center space-x-2">
          <Lightbulb className="w-4 h-4 text-teal-400" />
          <span>Overall Examiner Remarks</span>
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          {finalScore.feedback || "Evaluation completed successfully."}
        </p>
      </div>

      {/* Detailed Section Breakdown */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
          Correct Answers & Required Clinical Findings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scoreCategories.map((s) => {
            const displayPoints = Array.isArray(s.correctPoints)
              ? s.correctPoints
              : [String(s.correctPoints)];
            const isPerfect = s.score >= 90;

            return (
              <div
                key={s.label}
                className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-slate-200">
                      {s.label}
                    </span>
                    <div
                      className={`flex items-center space-x-1 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${
                        isPerfect
                          ? "bg-emerald-400/10 border-emerald-400/20 text-emerald-400"
                          : s.score >= 70
                            ? "bg-amber-400/10 border-amber-400/20 text-amber-400"
                            : "bg-rose-400/10 border-rose-400/20 text-rose-400"
                      }`}
                    >
                      {isPerfect ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : s.score >= 70 ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-400" />
                      )}
                      <span>
                        {isPerfect
                          ? "Mastered"
                          : s.score >= 70
                            ? "Acceptable"
                            : "Incorrect / Missing"}
                      </span>
                    </div>
                  </div>

                  {/* Score Number & Progress Bar */}
                  <div className="mt-3 mb-4">
                    <div className="flex justify-between items-end mb-1.5">
                      <span className="text-2xl font-extrabold text-white leading-none">
                        {s.score}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-1000 ${
                          s.score >= 90
                            ? "bg-emerald-500"
                            : s.score >= 70
                              ? "bg-amber-500"
                              : "bg-rose-500"
                        }`}
                        style={{ width: `${s.score}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Correct Answers / Expected Findings List */}
                <div className="mt-2 pt-3 border-t border-slate-800/50">
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider flex items-center space-x-1 mb-2">
                    <CheckSquare className="w-3 h-3" />
                    <span>Correct Answer / Expected Findings</span>
                  </span>
                  <ul className="space-y-1.5">
                    {displayPoints.map((point, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-300 flex items-start space-x-1.5 leading-relaxed"
                      >
                        <span className="text-teal-500 mt-0.5">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Return Button */}
      <div className="pt-4">
        <button
          onClick={() => setPhase("library")}
          className="w-full bg-slate-800 hover:bg-teal-600 text-slate-200 hover:text-white font-bold text-sm py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Return to Case Library</span>
        </button>
      </div>
    </div>
  );
}
