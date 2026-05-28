import React, { useState } from 'react';
import { useExam } from './ExamContext';
import { GROUP_TIMES, getRoomSchedules, spcCandidates, ywgsCandidates, allCandidates } from '../examData';
import { Search, Building, Clock, ArrowRight, Check, X, Eye, HelpCircle, ArrowRightLeft } from 'lucide-react';
import { motion } from 'motion/react';

export const MasterSchedule: React.FC = () => {
  const { checkedIn, toggleCheckIn, setSelectedCandidateId, virtualTime } = useExam();
  
  // State: center selection
  const [selectedCenter, setSelectedCenter] = useState<'SPC' | 'YWGS'>('YWGS');
  // State: session selection (1 or 2)
  const [selectedSession, setSelectedSession] = useState<1 | 2>(1);
  // State: View mode ('grid' | 'cards')
  const [viewMode, setViewMode] = useState<'grid' | 'cards'>('grid');

  const spcRooms = ['5A', '5B', '5C', '5D', '5E'];
  const ywgsRooms = ['201', '202', '203', '204', '205'];
  const activeRooms = selectedCenter === 'SPC' ? spcRooms : ywgsRooms;

  // Rooms and corresponding examiner labels
  const roomLabels: Record<string, string> = {
    '201': 'SK (201)', '202': 'JY (202)', '203': 'AW (203)', '204': 'DY (204)', '205': 'CR (205)',
    '5A': 'KYY (5A)', '5B': 'TFN (5B)', '5C': 'AJ (5C)', '5D': 'WIY (5D)', '5E': 'MC (5E)',
  };

  const currentGroups = selectedSession === 1 ? [1, 2, 3] : [4, 5, 6, 7];

  // Helper to lookup candidate in cells
  const getCellCandidate = (room: string, groupNo: number, letter: 'A' | 'B' | 'C' | 'D') => {
    return allCandidates.find(c => 
      c.examLocation === selectedCenter && 
      c.examRoom === room && 
      c.groupNo === groupNo && 
      c.candidateLetter === letter
    );
  };

  return (
    <div id="master-schedule-root" className="space-y-6">
      
      {/* SELECTION CONTROLS HANGER */}
      <div id="controls-panel" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all hover:shadow-md">
        
        {/* Toggle center (YWGS vs SPC) */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mr-1">EXAM CENTER:</span>
          <button
            onClick={() => setSelectedCenter('YWGS')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all border cursor-pointer ${
              selectedCenter === 'YWGS'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Ying Wa Girls' School (YWGS)</span>
          </button>
          <button
            onClick={() => setSelectedCenter('SPC')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all border cursor-pointer ${
              selectedCenter === 'SPC'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>St. Paul's College (SPC)</span>
          </button>
        </div>

        {/* Toggle session and Layout Modes */}
        <div className="flex items-center space-x-4">
          
          {/* Session Toggle */}
          <div className="flex bg-slate-150 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setSelectedSession(1)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedSession === 1
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Session 1 (Groups 1-3)
            </button>
            <button
              onClick={() => setSelectedSession(2)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedSession === 2
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Session 2 (Groups 4-7)
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex bg-slate-150 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Grid Matrix
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Group Cards
            </button>
          </div>
        </div>
      </div>

      {/* RENDER VIEW SCHEMAS */}
      {viewMode === 'grid' ? (
        
        /* 1. OFFICIAL GRID MATRIX VIEW */
        <div id="grid-view-container" className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left minimal-scrollbar">
              
              {/* Table Column Headers */}
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-36 border-r border-slate-200">
                    Group & Times
                  </th>
                  <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-16 border-r border-slate-200">
                    Seat
                  </th>
                  {activeRooms.map(room => (
                    <th key={room} className="p-4 text-xs font-bold text-slate-700 border-r border-slate-200">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-400 text-[9px] uppercase tracking-wider">Exam Room</span>
                        <span className="text-xs font-extrabold text-slate-800 mt-0.5">{roomLabels[room]}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Table Body - Iterates groups */}
              <tbody>
                {currentGroups.map((gNo, gIndex) => {
                  const times = GROUP_TIMES[gNo];
                  
                  return (
                    <React.Fragment key={gNo}>
                      
                      {/* GROUP GROUP SEPARATOR SUB HEADER Row A/B/C/D */}
                      {['A', 'B', 'C', 'D'].map((letter, lIndex) => {
                        const isFirst = lIndex === 0;
                        const isLast = lIndex === 3;
                        
                        return (
                          <tr 
                            key={`${gNo}-${letter}`} 
                            className={`hover:bg-slate-50/40 group/row border-b border-slate-200 ${
                              isLast ? 'border-b-4 border-slate-250' : ''
                            }`}
                          >
                            {/* Merge Group Info cell vertically to span all 4 Seat rows */}
                            {isFirst && (
                              <td 
                                rowSpan={4} 
                                className="p-4 border-r border-slate-200 bg-slate-50/80 align-middle text-center"
                              >
                                <div className="space-y-1">
                                  <span className={`inline-block px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                    selectedCenter === 'YWGS' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-indigo-50 text-indigo-800 border border-indigo-100'
                                  }`}>
                                    Group {gNo}
                                  </span>
                                  <div className="text-[9px] text-slate-400 font-bold uppercase mt-2.5 tracking-wider">PREP</div>
                                  <div className="text-xs font-mono font-bold text-slate-800">{times.prepStart} AM</div>
                                  <div className="text-[9px] text-slate-400 font-bold uppercase mt-1.5 tracking-wider">EXAM</div>
                                  <div className="text-xs font-mono font-bold text-slate-800">{times.examStart} AM</div>
                                </div>
                              </td>
                            )}

                            {/* Letter cell */}
                            <td className="p-3 font-mono font-black text-xs text-slate-400 text-center bg-slate-50/30 border-r border-slate-200">
                              <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                                letter === 'A' || letter === 'B' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                  : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                              }`}>
                                {letter}
                              </span>
                            </td>

                            {/* Rooms cells */}
                            {activeRooms.map(room => {
                              const cand = getCellCandidate(room, gNo, letter as 'A' | 'B' | 'C' | 'D');
                              
                              return (
                                <td key={room} className="p-3 border-r border-slate-200 align-middle h-20 text-xs">
                                  {cand ? (
                                    <div className="relative group/cell overflow-hidden rounded-xl border border-slate-200 bg-slate-50/40 p-2.5 transition-all hover:bg-white hover:border-slate-300 hover:shadow-xs">
                                      {/* Small indicator bar */}
                                      <div className={`absolute top-0 bottom-0 left-0 w-1 ${
                                        cand.school === 'YWGS' ? 'bg-emerald-600' : 'bg-indigo-600'
                                      }`} />

                                      <div className="pl-2.5 flex items-start justify-between">
                                        <div className="space-y-0.5">
                                          <div className="flex items-center space-x-1.5">
                                            <span className={`font-mono font-extrabold text-[8px] uppercase px-1.5 py-0.2 rounded ${
                                              cand.school === 'SPC' ? 'bg-indigo-100 text-indigo-805' : 'bg-emerald-100 text-emerald-805'
                                            }`}>
                                              {cand.class}{cand.classNo}
                                            </span>
                                            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">{cand.id.split('-')[0]} ID: {cand.id.split('-')[1]}</span>
                                          </div>
                                          <div className="font-extrabold text-slate-800 text-xs line-clamp-1 py-0.5">{cand.name}</div>
                                        </div>

                                        {/* Status bullet button */}
                                        <button 
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleCheckIn(cand.id);
                                          }}
                                          className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all shrink-0 cursor-pointer ${
                                            checkedIn[cand.id]
                                              ? 'bg-emerald-500 border-emerald-500 text-white'
                                              : 'bg-white border-slate-200 text-transparent hover:border-slate-350 hover:text-slate-400'
                                          }`}
                                          title={checkedIn[cand.id] ? "Mark as Absent" : "Mark as Present / Checked-In"}
                                        >
                                          <Check className="w-3 h-3 stroke-[3px]" />
                                        </button>
                                      </div>

                                      {/* Action drawer */}
                                      <div className="pl-2.5 mt-1.5 flex items-center justify-between text-[10px] text-slate-400 opacity-60 group-hover/cell:opacity-100 transition-opacity">
                                        <button 
                                          onClick={() => setSelectedCandidateId(cand.id)}
                                          className="font-bold text-indigo-650 hover:underline hover:text-indigo-800 flex items-center cursor-pointer"
                                        >
                                          <Eye className="w-3 h-3 mr-0.5" /> Select Pass
                                        </button>
                                        <span className="font-mono text-[8px] font-bold leading-normal bg-slate-100 text-slate-500 px-1 py-0.5 rounded border border-slate-200/50">
                                          Report: {cand.reportingTime}
                                        </span>
                                      </div>

                                    </div>
                                  ) : (
                                    <div className="py-3 text-center text-slate-350 font-mono italic text-[9px] uppercase tracking-wider">
                                      — vacant —
                                    </div>
                                  )}
                                </td>
                              );
                            })}

                          </tr>
                        );
                      })}

                    </React.Fragment>
                  );
                })}
              </tbody>

            </table>
          </div>
        </div>

      ) : (
        /* 2. GROUP TIMELINE CARDS FLOW */
        <div id="cards-view-container" className="space-y-6">
          {currentGroups.map(gNo => {
            const times = GROUP_TIMES[gNo];
            
            return (
              <div key={gNo} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 transition-all hover:shadow-md">
                
                {/* Header Group details */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-slate-150">
                  <div className="flex items-center space-x-2">
                    <span className="bg-slate-900 text-white px-3 py-1 rounded-xl text-xs font-black tracking-wide">
                      GROUP {gNo}
                    </span>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                      Speaking Session: Room Allocation Profiles
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-2 sm:mt-0 font-mono text-xs">
                    <div className="flex items-center text-slate-500 font-semibold uppercase text-[10.5px]">
                      <Clock className="w-3.5 h-3.5 mr-1 text-indigo-605 animate-pulse" />
                      <span>Prep: <strong className="text-slate-700 font-mono font-bold">{times.prepStart} - {times.prepEnd}</strong></span>
                    </div>
                    <div className="flex items-center text-slate-500 font-semibold uppercase text-[10.5px]">
                      <ArrowRight className="w-3.5 h-3.5 mx-1 text-slate-400" />
                      <span>Exam: <strong className="text-slate-700 font-mono font-bold">{times.examStart} - {times.examEnd}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Grid of rooms within this group */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {activeRooms.map(room => {
                    const roomCands = [
                      getCellCandidate(room, gNo, 'A'),
                      getCellCandidate(room, gNo, 'B'),
                      getCellCandidate(room, gNo, 'C'),
                      getCellCandidate(room, gNo, 'D'),
                    ].filter((c): c is NonNullable<typeof c> => c !== undefined);

                    return (
                      <div key={room} className="rounded-xl border border-slate-200 bg-slate-50/40 p-4 space-y-3.5 flex flex-col justify-between transition-all hover:bg-slate-50/60 hover:shadow-xs">
                        
                        <div>
                          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                            <span className="font-extrabold text-xs text-slate-800">{roomLabels[room]}</span>
                            <span className="text-[9px] bg-indigo-50 text-indigo-750 border border-indigo-100 px-1.5 py-0.5 rounded font-black">
                              GRP {gNo}
                            </span>
                          </div>

                          <div className="space-y-2 mt-2.5">
                            {roomCands.map(cand => (
                              <div key={cand.id} className="flex items-center justify-between text-xs">
                                <div className="flex items-center space-x-1.5">
                                  <span className={`w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center font-mono ${
                                    cand.candidateLetter === 'A' || cand.candidateLetter === 'B' 
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-250' 
                                      : 'bg-indigo-100 text-indigo-800 border border-indigo-250'
                                  }`}>
                                    {cand.candidateLetter}
                                  </span>
                                  <span 
                                    onClick={() => setSelectedCandidateId(cand.id)}
                                    className="font-bold text-slate-800 hover:text-indigo-600 hover:underline cursor-pointer truncate max-w-[85px]"
                                    title={cand.name}
                                  >
                                    {cand.name.split(' ')[0]}
                                  </span>
                                  <span className="text-[9px] text-slate-400 font-bold">({cand.school})</span>
                                </div>

                                <button
                                  onClick={() => toggleCheckIn(cand.id)}
                                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center cursor-pointer ${
                                    checkedIn[cand.id] ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-transparent hover:bg-slate-300'
                                  }`}
                                >
                                  <Check className="w-2.5 h-2.5 stroke-[3px]" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Summary indicator */}
                        <div className="pt-2 border-t border-slate-200 text-[10px] text-slate-405 font-bold uppercase tracking-wider flex items-center justify-between">
                          <span>Reported:</span>
                          <span className="font-mono font-bold text-slate-800">
                            {roomCands.filter(c => checkedIn[c.id]).length} / {roomCands.length}
                          </span>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
