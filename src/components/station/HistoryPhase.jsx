import React, { useState } from 'react';
import { useOsceStore } from '../../store/useOsceStore';
import { queryVirtualPatient } from '../../services/aiEngine';
import { Send, Mic, Brain } from 'lucide-react';

export default function HistoryPhase() {
  const {
    selectedCase,
    dialogueHistory,
    addDialogue,
    isAIThinking,
    setAIThinking,
    userProgress
  } = useOsceStore();

  const [inputQuestion, setInputQuestion] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleAskQuestion = async (e) => {
    if (e) e.preventDefault();
    if (!inputQuestion.trim() || isAIThinking) return;

    const text = inputQuestion.trim();
    setInputQuestion('');
    addDialogue({ sender: 'student', text });
    setAIThinking(true);

    const responseText = await queryVirtualPatient(
      selectedCase,
      text,
      dialogueHistory,
      userProgress.apiKey
    );

    addDialogue({ sender: 'patient', text: responseText });
    setAIThinking(false);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Web Speech API is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputQuestion(transcript);
    };
    recognition.start();
  };

  return (
    <div className="flex-1 flex flex-col p-4 overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-3 p-2">
        {dialogueHistory.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.sender === 'student' ? 'items-end' : m.sender === 'patient' ? 'items-start' : 'items-center'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'student'
                  ? 'bg-teal-600 text-white rounded-br-none'
                  : m.sender === 'patient'
                  ? 'bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700'
                  : 'bg-amber-950/40 border border-amber-800/50 text-amber-200 w-full text-center'
              }`}
            >
              {m.text}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1">{m.timestamp}</span>
          </div>
        ))}

        {isAIThinking && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs italic">
            <Brain className="w-4 h-4 animate-spin text-teal-400" />
            <span>Patient is responding...</span>
          </div>
        )}
      </div>

      <div className="py-2 flex gap-2 overflow-x-auto border-t border-slate-800">
        {['Onset', 'Character', 'Radiation', 'Associated Symptoms', 'Past Medical', 'Medications'].map((s) => (
          <button
            key={s}
            onClick={() => setInputQuestion(`Can you tell me about the ${s.toLowerCase()}?`)}
            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 px-2.5 py-1 rounded-full whitespace-nowrap"
          >
            + {s}
          </button>
        ))}
      </div>

      <form onSubmit={handleAskQuestion} className="flex space-x-2 mt-2">
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`p-2.5 rounded-lg border text-xs transition ${
            isListening ? 'bg-red-500/20 text-red-400 border-red-500 animate-pulse' : 'bg-slate-800 text-slate-300 border-slate-700'
          }`}
        >
          <Mic className="w-4 h-4" />
        </button>
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder="Ask the patient a question..."
          className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
        />
        <button
          type="submit"
          disabled={isAIThinking}
          className="bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold px-4 py-2 rounded-lg transition text-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}