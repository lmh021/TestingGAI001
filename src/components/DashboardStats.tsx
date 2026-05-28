import React from 'react';
import { useExam } from './ExamContext';
import { getStats, allCandidates, GROUP_TIMES } from '../examData';
import { Users, Building2, CheckCircle2, AlertCircle, Clock, BarChart3, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

export const DashboardStats: React.FC = () => {
  const { checkedIn, grades, virtualTime } = useExam();
  const stats = getStats();

  // Calculate live checked in stats
  const totalCheckedIn = allCandidates.filter(c => checkedIn[c.id]).length;
  const attendanceRate = totalCheckedIn > 0 ? Math.round((totalCheckedIn / stats.total) * 100) : 0;
  
  const totalGraded = allCandidates.filter(c => grades[c.id]).length;
  const gradingRate = totalGraded > 0 ? Math.round((totalGraded / stats.total) * 100) : 0;

  // Group candidates by class to show distribution
  const spcClassCount: Record<string, number> = {};
  const ywgsClassCount: Record<string, number> = {};
  allCandidates.forEach(c => {
    if (c.school === 'SPC') {
      spcClassCount[c.class] = (spcClassCount[c.class] || 0) + 1;
    } else {
      ywgsClassCount[c.class] = (ywgsClassCount[c.class] || 0) + 1;
    }
  });

  // Calculate current active group and status from virtualTime
  const getActiveState = () => {
    const [h, m] = virtualTime.split(':').map(Number);
    const virtualMinutes = h * 60 + m;

    let currentAction = 'Registration / Briefing';
    let currentGroup = 0;
    let details = 'Candidates checking in and reporting to Waiting Rooms.';

    if (virtualMinutes < 8 * 60 + 15) {
      currentAction = 'Pre-Exam Prep';
      details = 'Exam centers preparing to open registration.';
    } else if (virtualMinutes >= 11 * 60 + 10) {
      currentAction = 'Exam Completed';
      details = 'All speaking sessions have concluded.';
    } else {
      // Loop through groups
      for (let g = 1; g <= 7; g++) {
        const times = GROUP_TIMES[g];
        const [psH, psM] = times.prepStart.split(':').map(Number);
        const [peH, peM] = times.prepEnd.split(':').map(Number);
        const [esH, esM] = times.examStart.split(':').map(Number);
        const [eeH, eeM] = times.examEnd.split(':').map(Number);

        const pStartMin = psH * 60 + psM;
        const pEndMin = peH * 60 + peM;
        const eStartMin = esH * 60 + esM;
        const eEndMin = eeH * 60 + eeM;

        // Check if prep time
        if (virtualMinutes >= pStartMin && virtualMinutes <= pEndMin) {
          currentAction = `Group ${g} Preparing`;
          currentGroup = g;
          details = `Group ${g} candidates formulating points in Preparation Rooms.`;
          break;
        }
        // Check if during exam
        if (virtualMinutes >= eStartMin && virtualMinutes <= eEndMin) {
          currentAction = `Group ${g} Speaking`;
          currentGroup = g;
          details = `Group ${g} candidates in Exam Rooms running their discussion sessions.`;
          break;
        }
        // Check if transition gap
        if (g < 7) {
          const nextTimes = GROUP_TIMES[g+1];
          const [nxtH, nxtM] = nextTimes.prepStart.split(':').map(Number);
          const nextStart = nxtH * 60 + nxtM;

          if (virtualMinutes > eEndMin && virtualMinutes < nextStart) {
            currentAction = `Transition Gap (Group ${g} to ${g+1})`;
            currentGroup = g;
            details = 'Moving candidates, sanitizing rooms, and preparing examiners.';
            break;
          }
        }
      }
    }

    if (virtualMinutes >= 9 * 60 + 40 && virtualMinutes <= 9 * 60 + 50) {
      currentAction = 'Mid-Session Break';
      details = '10-minute break for examiners. Group 4 starts preparing at 9:40.';
    }

    return { currentAction, currentGroup, details };
  };

  const activeState = getActiveState();

  // Bar proportions for class chart
  const classes = ['5A', '5B', '5C', '5D', '5E'];
  const maxClassCount = Math.max(...classes.map(c => Math.max(spcClassCount[c] || 0, ywgsClassCount[c] || 0)));

  return (
    <div id="dashboard-stats-grid" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* COLUMN 1: Live clock & interactive timeline tracking */}
      <div id="card-live-tracker" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Virtual Clock & Status</h4>
            <div className={`px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-semibold uppercase tracking-wider border border-indigo-100`}>
              LIVE STATE
            </div>
          </div>

          <div className="flex items-end gap-1.5 my-3">
            <span className="text-5xl font-black text-indigo-600 leading-none">{virtualTime}</span>
            <span className="text-xs font-bold text-slate-400 pb-1 uppercase">AM</span>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center space-x-2 text-slate-800 font-bold text-xs mb-1.5 uppercase tracking-wide">
              <Clock className="w-4 h-4 text-indigo-600 animate-pulse animate-duration-1000" />
              <span>{activeState.currentAction}</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed font-medium">
              {activeState.details}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2.5">
            <span>EXAM TIMELINE PROGRESS</span>
            <span>08:15 - 11:10 AM</span>
          </div>
          {/* Timeline bar indicator */}
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden relative border border-slate-200/50">
            <div 
              className="bg-indigo-600 h-full rounded-full transition-all duration-500"
              style={{
                width: (() => {
                  const [h, m] = virtualTime.split(':').map(Number);
                  const mins = h * 60 + m;
                  const startMin = 8 * 60 + 15;
                  const endMin = 11 * 60 + 10;
                  const pct = ((mins - startMin) / (endMin - startMin)) * 100;
                  return `${Math.min(100, Math.max(0, pct))}%`;
                })()
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="text-center bg-indigo-50/50 rounded-xl p-2 border border-indigo-100/60">
              <span className="block text-[9px] text-indigo-500 uppercase tracking-widest font-black">Reporting Session 1</span>
              <span className="text-xs font-mono font-bold text-indigo-900 mt-0.5 block">08:15 AM</span>
            </div>
            <div className="text-center bg-slate-50 rounded-xl p-2 border border-slate-200">
              <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-black">Reporting Session 2</span>
              <span className="text-xs font-mono font-bold text-slate-800 mt-0.5 block">09:25 AM</span>
            </div>
          </div>
        </div>
      </div>

      {/* COLUMN 2: Attendance & Grading Progress */}
      <div id="card-attendance-stats" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div>
          <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-4">Registration & Assessment Flow</h4>

          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Check-in count */}
            <div className="relative overflow-hidden bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="absolute right-2 bottom-1 text-slate-200/50">
                <CheckCircle2 className="w-16 h-16 stroke-1" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Checked In</span>
              <div className="flex items-baseline space-x-1 mt-1.5 z-10 relative">
                <span className="text-3xl font-black text-slate-800 leading-none">{totalCheckedIn}</span>
                <span className="text-xs font-bold text-slate-400">/ {stats.total}</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden relative z-10">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${attendanceRate}%` }} />
              </div>
              <span className="text-[9px] text-indigo-600 font-extrabold tracking-wider uppercase mt-1.5 block relative z-10">{attendanceRate}% arrived rate</span>
            </div>

            {/* Grades count */}
            <div className="relative overflow-hidden bg-indigo-50/45 border border-indigo-100 rounded-xl p-4">
              <div className="absolute right-2 bottom-1 text-indigo-100/30">
                <GraduationCap className="w-16 h-16 stroke-1" />
              </div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Evaluated</span>
              <div className="flex items-baseline space-x-1 mt-1.5 z-10 relative">
                <span className="text-3xl font-black text-indigo-900 leading-none">{totalGraded}</span>
                <span className="text-xs font-bold text-indigo-400">/ {stats.total}</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-3 overflow-hidden relative z-10">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${gradingRate}%` }} />
              </div>
              <span className="text-[9px] text-indigo-600 font-extrabold tracking-wider uppercase mt-1.5 block relative z-10">{gradingRate}% graded</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block"></span>
              <span>SPC Boys: <strong>{stats.spcCount}</strong></span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
              <span>YWGS Girls: <strong>{stats.ywgsCount}</strong></span>
            </span>
          </div>
          <div className="mt-2 text-[10.5px] text-slate-400 leading-relaxed font-medium">
            Cross-institution layout: <strong>{stats.spcAtYwgs}</strong> SPC boys examiner at YWGS center. <strong>{stats.ywgsAtSpc}</strong> YWGS girls evaluated at SPC center. Full synchronization complete.
          </div>
        </div>
      </div>

      {/* COLUMN 3: Class Allocation Bar Chart */}
      <div id="card-class-charts" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between transition-all hover:shadow-md">
        <div>
          <div className="flex items-center justify-between mb-4 mt-1">
            <h4 className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Class Representation Profiles</h4>
            <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="space-y-2.5">
            {classes.map(cls => {
              const spcCount = spcClassCount[cls] || 0;
              const ywgsCount = ywgsClassCount[cls] || 0;
              const spcPct = maxClassCount > 0 ? (spcCount / maxClassCount) * 100 : 0;
              const ywgsPct = maxClassCount > 0 ? (ywgsCount / maxClassCount) * 100 : 0;

              return (
                <div key={cls} className="flex items-center space-x-2.5 text-xs">
                  <span className="w-7 font-bold text-slate-500 text-right">{cls}</span>
                  <div className="flex-1 space-y-1">
                    {/* SPC class sub-bar */}
                    <div className="flex items-center">
                      <div className="h-2.5 bg-indigo-600 rounded-r-lg transition-all duration-300 flex items-center justify-end px-1.5" style={{ width: `${Math.max(8, spcPct)}%` }}>
                        <span className="text-[8px] text-white font-mono font-bold">{spcCount}</span>
                      </div>
                    </div>
                    {/* YWGS class sub-bar */}
                    <div className="flex items-center">
                      <div className="h-2.5 bg-emerald-600 rounded-r-lg transition-all duration-300 flex items-center justify-end px-1.5" style={{ width: `${Math.max(8, ywgsPct)}%` }}>
                        <span className="text-[8px] text-white font-mono font-bold">{ywgsCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 bg-indigo-600 rounded"></div>
            <span>St. Paul's</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-2.5 h-2.5 bg-emerald-600 rounded"></div>
            <span>Ying Wa</span>
          </div>
        </div>
      </div>

    </div>
  );
};
