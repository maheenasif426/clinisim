import { create } from 'zustand';
import { StarterCases } from '../data/starterCases';
import { evaluateSession } from '../services/aiEngine'; 
const LOCAL_STORAGE_KEY = 'clinSim_vr_user_progress_v1';

const getInitialProgress = () => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (saved) {
    try { return JSON.parse(saved); } catch (e) { /* fallback */ }
  }
  return {
    totalXP: 0,
    completedCasesCount: 0,
    historyAccuracy: 0,
    examAccuracy: 0,
    diagnosisAccuracy: 0,
    completedSessions: [],
    apiKey: ''
  };
};

export const useOsceStore = create((set, get) => ({
  cases: StarterCases,
  selectedCase: null,
  phase: 'dashboard', // 'dashboard' | 'library' | 'intro' | 'history' | 'examination' | 'diagnosis' | 'debrief'
  
  // Session State
  timeRemaining: 600,
  isTimerActive: false,
  dialogueHistory: [],
  performedExams: [],
  provisionalDiagnosis: '',
  differentialDiagnoses: [],
  clinicalReasoning: '',
  finalScore: null,
  isAIThinking: false,

  // User Local Progress
  userProgress: getInitialProgress(),

  setApiKey: (key) => {
    const updated = { ...get().userProgress, apiKey: key };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    set({ userProgress: updated });
  },

  selectCase: (osceCase) => {
    set({
      selectedCase: osceCase,
      phase: 'intro',
      timeRemaining: osceCase.timeLimitMinutes * 60,
      isTimerActive: false,
      dialogueHistory: [{
        id: 'init-1',
        sender: 'examiner',
        text: `Station Briefing: You have ${osceCase.timeLimitMinutes} minutes. ${osceCase.vignette}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }],
      performedExams: [],
      provisionalDiagnosis: '',
      differentialDiagnoses: [],
      clinicalReasoning: '',
      finalScore: null
    });
  },

  setPhase: (phase) => {
    set({ 
      phase, 
      isTimerActive: phase === 'history' || phase === 'examination' || phase === 'diagnosis' 
    });
  },

  tickTimer: () => {
    const { timeRemaining } = get();
    if (timeRemaining > 0) {
      set({ timeRemaining: timeRemaining - 1 });
    } else {
      set({ isTimerActive: false });
    }
  },

  addDialogue: (msg) => {
    set((state) => ({
      dialogueHistory: [
        ...state.dialogueHistory,
        {
          ...msg,
          id: `msg-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    }));
  },

  setAIThinking: (status) => set({ isAIThinking: status }),

  performExam: (exam) => {
    const { performedExams } = get();
    if (!performedExams.some((e) => e.id === exam.id)) {
      set({ performedExams: [...performedExams, exam] });
    }
  },

  setDiagnosisData: (provisional, differentials, reasoning) => {
    set({
      provisionalDiagnosis: provisional,
      differentialDiagnoses: differentials,
      clinicalReasoning: reasoning
    });
  },

  /**
   * Async action to trigger AI evaluation, wait for the response, 
   * save progress, and transition cleanly into the debrief screen.
   */
  evaluateAndCompleteSession: async () => {
    const state = get();
    if (!state.selectedCase) return;

    set({ isAIThinking: true });

    try {
      // Await the asynchronous Groq API evaluation from aiEngine.js
      const score = await evaluateSession(
        state.selectedCase,
        state.dialogueHistory,
        state.performedExams,
        state.provisionalDiagnosis,
        state.differentialDiagnoses,
        state.clinicalReasoning
      );

      const newXP = state.userProgress.totalXP + (score.xpEarned || 0);
      const newCount = state.userProgress.completedCasesCount + 1;
      
      const updatedProgress = {
        ...state.userProgress,
        totalXP: newXP,
        completedCasesCount: newCount,
        historyAccuracy: Math.round((state.userProgress.historyAccuracy * (newCount - 1) + (score.historyScore || 0)) / newCount),
        examAccuracy: Math.round((state.userProgress.examAccuracy * (newCount - 1) + (score.examScore || 0)) / newCount),
        diagnosisAccuracy: Math.round((state.userProgress.diagnosisAccuracy * (newCount - 1) + (score.diagnosisScore || 0)) / newCount),
        completedSessions: [
          ...state.userProgress.completedSessions,
          {
            caseId: state.selectedCase.id,
            title: state.selectedCase.title,
            score: score.overall || 0,
            date: new Date().toLocaleDateString()
          }
        ]
      };

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedProgress));

      set({
        finalScore: score,
        userProgress: updatedProgress,
        isTimerActive: false,
        isAIThinking: false,
        phase: 'debrief'
      });
    } catch (error) {
      console.error("Failed to complete session evaluation:", error);
      set({ isAIThinking: false });
    }
  },

  saveCompletedSession: (score) => {
    const state = get();
    const newXP = state.userProgress.totalXP + score.xpEarned;
    const newCount = state.userProgress.completedCasesCount + 1;
    
    const updatedProgress = {
      ...state.userProgress,
      totalXP: newXP,
      completedCasesCount: newCount,
      historyAccuracy: Math.round((state.userProgress.historyAccuracy * (newCount - 1) + score.historyScore) / newCount),
      examAccuracy: Math.round((state.userProgress.examAccuracy * (newCount - 1) + score.examScore) / newCount),
      diagnosisAccuracy: Math.round((state.userProgress.diagnosisAccuracy * (newCount - 1) + score.diagnosisScore) / newCount),
      completedSessions: [
        ...state.userProgress.completedSessions,
        {
          caseId: state.selectedCase.id,
          title: state.selectedCase.title,
          score: score.overall,
          date: new Date().toLocaleDateString()
        }
      ]
    };

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedProgress));
    set({ finalScore: score, userProgress: updatedProgress, isTimerActive: false, phase: 'debrief' });
  },

  resetProgress: () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    set({
      userProgress: {
        totalXP: 0,
        completedCasesCount: 0,
        historyAccuracy: 0,
        examAccuracy: 0,
        diagnosisAccuracy: 0,
        completedSessions: [],
        apiKey: ''
      }
    });
  }
}));