import React, { useState } from 'react';
import { ExamProvider, useExam } from './components/ExamContext';
import { DashboardStats } from './components/DashboardStats';
import { CandidateFinder } from './components/CandidateFinder';
import { MasterSchedule } from './components/MasterSchedule';
import { ExaminerPortal } from './components/ExaminerPortal';
import { CheckInSimulator } from './components/CheckInSimulator';
import { allCandidates } from './examData';
import { 
  Building2, 
  Users, 
  Calendar, 
  ShieldCheck, 
  Clock, 
  LayoutDashboard, 
  UserCheck2, 
  Award, 
  BookOpen, 
  Sliders, 
  Play, 
  Pause,
  Home
} from 'lucide-react';
import { motion } from 'motion/react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'finder' | 'master' | 'examiner' | 'checkin'>('dashboard');
  const { virtualTime, setVirtualTime, isAutoPlay, setIsAutoPlay } = useExam();

  // Presets of virtual time to jump to key moments of the day
  const virtualTimePresets = [
    { label: '08:15 AM (Registration 1)', time: '08:15' },
    { label: '08:45 AM (Group 1 Discussion)', time: '08:45' },
    { label: '09:25 AM (Registration 2)', time: '09:25' },
    { label: '10:15 AM (Group 5 Discussion)', time: '10:15' },
    { label: '10:55 AM (Group 7 Discussion)', time: '10:55' },
  ];

  // Map to beautiful titles
  const tabTitles: Record<string, string> = {
    dashboard: 'General Dashboard',
    finder: 'Candidate Personal Pass Portal',
    master: 'Interactive Master Selection Grid',
    examiner: 'DSE Examiner Board & Grading Sheet',
    checkin: 'Admin Check-In Desk',
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans select-none antialiased text-slate-900">
      
      {/* HEADER HERO SECTION */}
      <header className="h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between shadow-sm sticky top-0 z-40 flex-shrink-0">
        
        {/* Dual Brand Logos & Titles */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2.5">
            {/* SPC Blue Shield badge spacer */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-800 border border-white shadow-xs flex items-center justify-center text-white font-serif text-[11px] font-black" title="St. Paul's College">
              SPC
            </div>
            {/* YWGS Green Shield badge spacer */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-700 border border-white shadow-xs flex items-center justify-center text-white font-serif text-[10px] font-bold" title="Ying Wa Girls' School">
              YWG
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[9px] font-black tracking-widest text-indigo-600 uppercase">Joint Speaking Portal</span>
              <span className="text-[8px] bg-slate-100 text-slate-500 border border-slate-200 px-1 py-0.2 rounded font-bold uppercase tracking-wider">HKDSE Spec</span>
            </div>
            <h1 className="text-sm sm:text-base font-extrabold text-slate-800 tracking-tight leading-none mt-0.5">
              SPC & YWGS Joint English Certificate Exam
            </h1>
          </div>
        </div>

        {/* Quick Stats indicators in title */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2.5 text-xs font-semibold text-slate-500">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
              <span className="text-slate-700">SPC Center</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
              <span className="text-slate-700">YWGS Center</span>
            </span>
          </div>
          <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
            Live Console
          </div>
        </div>

      </header>

      {/* CLOCK CONTROL CONTROLLERS SECTION */}
      <section id="virtual-timeline-section" className="bg-slate-900 py-3 px-6 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs">
          
          {/* Time & Play controls */}
          <div className="flex items-center space-x-3.5">
            <div className="flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700/60">
              <Clock className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span className="text-slate-400 font-bold mr-1">VIRTUAL TIME:</span>
              <span className="font-mono font-bold text-sm tracking-tight text-white">{virtualTime} AM</span>
            </div>

            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5 border transition-all cursor-pointer ${
                isAutoPlay 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm font-black' 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <span>{isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}</span>
              <span>{isAutoPlay ? 'Auto Flow Playing' : 'Auto Flow Stopped'}</span>
            </button>
          </div>

          {/* Presets Slider List */}
          <div className="flex items-center space-x-2 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
            <span className="text-slate-450 font-bold mr-1 shrink-0 uppercase text-[9px] tracking-widest">TIMELINE PRESETS:</span>
            {virtualTimePresets.map(preset => (
              <button
                key={preset.time}
                onClick={() => {
                  setVirtualTime(preset.time);
                  setIsAutoPlay(false);
                }}
                className={`px-3 py-1 text-[10.5px] font-bold rounded-lg border transition-all shrink-0 cursor-pointer ${
                  virtualTime === preset.time
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-650 hover:text-white'
                }`}
              >
                {preset.label.split(' ')[0]} {preset.label.split(' ')[1]}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* CORE APPLICATION NAVIGATION & VIEW CONTAINER */}
      <main className="flex-grow p-6 max-w-7xl mx-auto w-full space-y-6 flex flex-col">
        
        {/* Navigation Tabs bar */}
        <div className="flex overflow-x-auto whitespace-nowrap bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm space-x-1 scrollbar-none">
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('finder')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'finder'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Find Candidate Pass</span>
          </button>

          <button
            onClick={() => setActiveTab('master')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'master'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Master Interactive Grid</span>
          </button>

          <button
            onClick={() => setActiveTab('examiner')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'examiner'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Examiner Portal Grading</span>
          </button>

          <button
            onClick={() => setActiveTab('checkin')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'checkin'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <UserCheck2 className="w-3.5 h-3.5" />
            <span>Registration Check Desk</span>
          </button>

        </div>

        {/* Dynamic section titles */}
        <div className="flex items-center space-x-2 pb-1">
          <div className="w-1.5 h-4 bg-indigo-600 rounded"></div>
          <h2 className="text-xs font-bold tracking-widest uppercase text-slate-400">
            {tabTitles[activeTab]}
          </h2>
        </div>

        {/* Dynamic renders */}
        <div id="active-viewport-element" className="flex-grow">
          {activeTab === 'dashboard' && <DashboardStats />}
          {activeTab === 'finder' && <CandidateFinder />}
          {activeTab === 'master' && <MasterSchedule />}
          {activeTab === 'examiner' && <ExaminerPortal />}
          {activeTab === 'checkin' && <CheckInSimulator />}
        </div>

      </main>

      {/* FOOTER DISCLAIMER */}
      <footer className="h-10 px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[10.5px] text-slate-405 font-bold uppercase tracking-wider flex-shrink-0">
        <div>System Engine: HKDSE speaking V2</div>
        <div>Workspace: SPC & YWGS Joint Center</div>
        <div className="hidden sm:inline">Session Year: {currentYear}</div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <ExamProvider>
      <AppContent />
    </ExamProvider>
  );
}
