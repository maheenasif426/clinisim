import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CaseLibrary from './components/CaseLibrary';
import OSCESession from './components/station/OSCESession';
import { useOsceStore } from './store/useOsceStore';
import Footer from './components/Footer';

export default function App() {
  const { phase } = useOsceStore();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {phase === 'dashboard' && <Dashboard />}
        {phase === 'library' && <CaseLibrary />}
        {phase !== 'dashboard' && phase !== 'library' && <OSCESession />}
      </main>
      <Footer />
    </div>
  );
}