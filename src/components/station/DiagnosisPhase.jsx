import React, { useState } from "react";
import { useOsceStore } from "../../store/useOsceStore";
import { evaluateSession } from "../../services/aiEngine";
import { Loader2 } from "lucide-react"; // Optional: for a loading spinner icon

export default function DiagnosisPhase() {
  const {
    selectedCase,
    dialogueHistory,
    performedExams,
    provisionalDiagnosis,
    differentialDiagnoses,
    clinicalReasoning,
    setDiagnosisData,
    saveCompletedSession,
    setPhase,
    isAIThinking,
    setAIThinking,
  } = useOsceStore();

  const [diffInput, setDiffInput] = useState("");

  const handleSubmit = async () => {
    if (isAIThinking) return;

    setAIThinking(true);

    try {
      // Await the asynchronous evaluation from the AI engine
      const evalResult = await evaluateSession(
        selectedCase,
        dialogueHistory,
        performedExams,
        provisionalDiagnosis,
        differentialDiagnoses,
        clinicalReasoning,
      );

      saveCompletedSession(evalResult);
      setPhase("debrief");
    } catch (error) {
      console.error("Evaluation failed:", error);
    } finally {
      setAIThinking(false);
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-5">
      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2">
          Provisional Diagnosis
        </label>
        <input
          type="text"
          value={provisionalDiagnosis}
          onChange={(e) =>
            setDiagnosisData(
              e.target.value,
              differentialDiagnoses,
              clinicalReasoning,
            )
          }
          placeholder="e.g., Acute ST-Elevation Myocardial Infarction"
          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2">
          Ranked Differential Diagnoses
        </label>
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={diffInput}
            onChange={(e) => setDiffInput(e.target.value)}
            placeholder="Add differential diagnosis..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-xs text-white"
          />
          <button
            onClick={() => {
              if (diffInput.trim()) {
                setDiagnosisData(
                  provisionalDiagnosis,
                  [...differentialDiagnoses, diffInput.trim()],
                  clinicalReasoning,
                );
                setDiffInput("");
              }
            }}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-xs font-semibold"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {differentialDiagnoses.map((d, idx) => (
            <span
              key={idx}
              className="bg-slate-800 text-teal-300 border border-slate-700 text-xs px-2.5 py-1 rounded-full"
            >
              {idx + 1}. {d}
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 mb-2">
          Clinical Reasoning
        </label>
        <textarea
          rows={3}
          value={clinicalReasoning}
          onChange={(e) =>
            setDiagnosisData(
              provisionalDiagnosis,
              differentialDiagnoses,
              e.target.value,
            )
          }
          placeholder="Provide clinical rationale based on positive and negative findings..."
          className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-teal-500"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={isAIThinking}
        className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-800 text-slate-950 font-bold text-xs py-3 rounded-lg transition flex items-center justify-center space-x-2"
      >
        {isAIThinking ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
            <span>Examiner is evaluating encounter...</span>
          </>
        ) : (
          <span>Submit to OSCE Examiner</span>
        )}
      </button>
    </div>
  );
}
