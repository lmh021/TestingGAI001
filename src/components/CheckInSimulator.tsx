import React, { useState } from 'react';
import { useExam } from './ExamContext';
import { allCandidates } from '../examData';
import { Search, ToggleLeft, ToggleRight, CheckSquare, Square, Check, X, Building2, Eye, UserX, UserCheck, Trash2 } from 'lucide-react';
import { Candidate } from '../types';

export const CheckInSimulator: React.FC = () => {
  const { checkedIn, toggleCheckIn, bulkCheckIn, setSelectedCandidateId } = useExam();

  // Filter states
  const [centerFilter, setCenterFilter] = useState<'ALL' | 'SPC' | 'YWGS'>('ALL');
  const [sessionFilter, setSessionFilter] = useState<0 | 1 | 2>(0); // 0 means ALL
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PRESENT' | 'ABSENT'>('ALL');

  // Filter candidate pool
  const filteredCandidates = allCandidates.filter(c => {
    // Center check
    if (centerFilter !== 'ALL' && c.examLocation !== centerFilter) return false;
    // Session check
    if (sessionFilter !== 0 && c.session !== sessionFilter) return false;
    // Status check
    const isPresent = checkedIn[c.id] || false;
    if (statusFilter === 'PRESENT' && !isPresent) return false;
    if (statusFilter === 'ABSENT' && isPresent) return false;
    // Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        `${c.class}${c.classNo}`.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalFiltered = filteredCandidates.length;
  const presentFiltered = filteredCandidates.filter(c => checkedIn[c.id]).length;
  const absentFiltered = totalFiltered - presentFiltered;

  const handleToggleAll = (status: boolean) => {
    const ids = filteredCandidates.map(c => c.id);
    bulkCheckIn(ids, status);
  };

  return (
    <div id="check-in-desk-root" className="space-y-6">
      
      {/* OVERVIEW STATS PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Total Board */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Registrations Loaded</span>
            <span className="text-3xl font-black text-slate-900 font-mono mt-1.5 block">{totalFiltered}</span>
            <span className="text-[9px] text-slate-400 font-bold block mt-1.5">Matching current active filters</span>
          </div>
          <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl border border-slate-200">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        {/* Present Board */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Reported Candidates</span>
            <span className="text-3xl font-black text-emerald-600 font-mono mt-1.5 block">{presentFiltered}</span>
            <span className="text-[9px] text-emerald-600 font-bold block mt-1.5">Arrived at waiting room</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-150">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Absent Board */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Absent / Pending Pool</span>
            <span className="text-3xl font-black text-red-500 font-mono mt-1.5 block">{absentFiltered}</span>
            <span className="text-[9px] text-red-500 font-bold block mt-1.5">Check-in remaining pending</span>
          </div>
          <div className="p-3 bg-red-50 text-red-500 rounded-2xl border border-red-150">
            <UserX className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* FILTER & CRITERIA BAR */}
      <div id="filtering-toolbelt" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 transition-all hover:shadow-md">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Arrived student lookup..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-205 outline-none text-xs font-semibold focus:border-indigo-500 transition-all placeholder:text-slate-405"
            />
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          </div>

          {/* Filtering by active exam location */}
          <select
            value={centerFilter}
            onChange={(e) => setCenterFilter(e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl border border-slate-205 outline-none text-xs font-semibold focus:border-indigo-500 bg-white"
          >
            <option value="ALL">All Exam Centers (SPC & YWGS)</option>
            <option value="SPC">St. Paul's College Center Only</option>
            <option value="YWGS">Ying Wa Girls' School Center Only</option>
          </select>

          {/* Filtering by session reporting time */}
          <select
            value={sessionFilter}
            onChange={(e) => setSessionFilter(Number(e.target.value) as any)}
            className="w-full px-3 py-2 rounded-xl border border-slate-205 outline-none text-xs font-semibold focus:border-indigo-500 bg-white"
          >
            <option value={0}>All Speaking Sessions</option>
            <option value={1}>Session 1 (08:15 AM Report)</option>
            <option value={2}>Session 2 (09:25 AM Report)</option>
          </select>

          {/* Filtering by checked in state */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl border border-slate-205 outline-none text-xs font-semibold focus:border-indigo-500 bg-white"
          >
            <option value="ALL">All Attendance States</option>
            <option value="PRESENT">Checked-In (Present) only</option>
            <option value="ABSENT">Absent (Pending) only</option>
          </select>

        </div>

        {/* Bulk tools */}
        <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-405 font-bold uppercase tracking-wider text-[10px]">
            Simulated Registration Desk tools for day coordinator administrators.
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleToggleAll(true)}
              className="px-3 py-1.5 rounded-lg border border-emerald-100 text-emerald-805 bg-emerald-50 hover:bg-emerald-100 transition-colors font-bold text-xs cursor-pointer"
            >
              Checked In All Filtered
            </button>
            <button
              onClick={() => handleToggleAll(false)}
              className="px-3 py-1.5 rounded-lg border border-red-105 text-red-800 bg-red-50 hover:bg-red-100 transition-colors font-bold text-xs cursor-pointer"
            >
              Reset All Filtered Absent
            </button>
          </div>
        </div>

      </div>

      {/* TABLE DATA GRID */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-4 align-middle">Candidate Code</th>
                <th className="p-4 align-middle">Student Name</th>
                <th className="p-4 align-middle">Class Index</th>
                <th className="p-4 align-middle">Exam Center</th>
                <th className="p-4 align-middle">Seat</th>
                <th className="p-4 align-middle text-center w-36">Check In state</th>
                <th className="p-4 align-middle text-right pr-6 w-32">Inspection</th>
              </tr>
            </thead>

            {/* Candidate list items */}
            <tbody className="divide-y divide-slate-150">
              {filteredCandidates.map((cand) => {
                const isArrived = checkedIn[cand.id] || false;

                return (
                  <tr key={cand.id} className="hover:bg-slate-50/40 group">
                    <td className="p-4 font-mono font-bold text-slate-550">
                      {cand.id}
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-slate-800 text-sm leading-normal">{cand.name}</div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
                        {cand.school === 'SPC' ? "St. Paul's College" : "Ying Wa Girls' School"}
                      </div>
                    </td>

                    <td className="p-4">
                      <span className={`inline-block px-1.5 py-0.5 rounded font-mono font-bold ${
                        cand.school === 'SPC' ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {cand.class}{cand.classNo}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="font-semibold text-slate-700">{cand.examLocation} Center</div>
                      <div className="text-[10.5px] text-slate-400 font-mono">Room {cand.examRoom}</div>
                    </td>

                    <td className="p-4">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-mono font-bold text-[10px] flex items-center justify-center border border-slate-200">
                        {cand.candidateLetter}
                      </span>
                    </td>

                    <td className="p-4 align-middle text-center">
                      <button
                        onClick={() => toggleCheckIn(cand.id)}
                        className={`mx-auto px-3 py-1.5 rounded-xl border font-bold text-[11px] flex items-center space-x-1.5 transition-all ${
                          isArrived
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${isArrived ? 'bg-emerald-550' : 'bg-red-500 animate-pulse'}`}></span>
                        <span>{isArrived ? 'Present' : 'Absent'}</span>
                      </button>
                    </td>

                    <td className="p-4 text-right pr-6 align-middle">
                      <button
                        onClick={() => setSelectedCandidateId(cand.id)}
                        className="py-1.5 px-3 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:border-slate-300 font-bold text-[11px] inline-flex items-center space-x-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Pass</span>
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredCandidates.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400">
                    No candidates matched the filtered criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
