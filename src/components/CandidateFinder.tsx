import React, { useState } from 'react';
import { useExam } from './ExamContext';
import { searchCandidates, getGroupMembers, GROUP_TIMES, allCandidates } from '../examData';
import { Search, MapPin, Calendar, Clock, CheckCircle, Circle, User, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { Candidate } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const CandidateFinder: React.FC = () => {
  const { checkedIn, toggleCheckIn, setSelectedCandidateId, selectedCandidateId, virtualTime } = useExam();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Candidate[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim()) {
      setSearchResults(searchCandidates(val));
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectCandidate = (id: string) => {
    setSelectedCandidateId(id);
    setSearchQuery('');
    setSearchResults([]);
  };

  const selectedCandidate = allCandidates.find(c => c.id === selectedCandidateId);
  const groupMembers = selectedCandidate 
    ? getGroupMembers(selectedCandidate.examLocation, selectedCandidate.examRoom, selectedCandidate.groupNo)
    : [];

  // Parse time into minutes to evaluate personal schedule steps
  const parseTimeToMin = (tStr: string) => {
    const [h, m] = tStr.split(':').map(Number);
    return h * 60 + m;
  };

  const getJourneyStatus = (cand: Candidate) => {
    const virtualMin = parseTimeToMin(virtualTime);
    const reportMin = parseTimeToMin(cand.reportingTime);
    const times = GROUP_TIMES[cand.groupNo];
    const prepStartMin = parseTimeToMin(times.prepStart);
    const examStartMin = parseTimeToMin(times.examStart);
    const examEndMin = parseTimeToMin(times.examEnd);

    return {
      reported: checkedIn[cand.id],
      isReporting: virtualMin >= reportMin && virtualMin < prepStartMin,
      isPreparing: virtualMin >= prepStartMin && virtualMin < examStartMin,
      isSpeaking: virtualMin >= examStartMin && virtualMin <= examEndMin,
      isFinished: virtualMin > examEndMin,
    };
  };

  const journey = selectedCandidate ? getJourneyStatus(selectedCandidate) : null;

  return (
    <div id="candidate-finder-root" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* SEARCH CARD */}
      <div id="search-card-container" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit transition-all hover:shadow-md">
        <h3 className="text-sm font-bold text-slate-800 mb-1.5 uppercase tracking-wide">Find Candidate Schedule</h3>
        <p className="text-xs text-slate-500 mb-4 leading-normal font-medium">
          Enter candidate name, class index (e.g. 5A), or registration code (e.g. SPC-5A10 or YWGS-5B11) to lookup speaking exam credentials.
        </p>

        <div className="relative mb-4">
          <input
            type="text"
            id="candidate-search-input"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search e.g. 'Martin', '5A', 'YWGS-5B'"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 outline-none text-xs font-semibold transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 placeholder:text-slate-400"
          />
          <Search className="absolute left-3.5 top-3.5 w-3.5 h-3.5 text-slate-400" />
        </div>

        {/* Search results */}
        <div id="search-results-box" className="max-h-80 overflow-y-auto space-y-2 pr-1">
          {searchQuery && searchResults.length === 0 && (
            <div className="text-center py-6 text-slate-400 font-bold text-xs uppercase tracking-wider">
              No candidates found matching "{searchQuery}"
            </div>
          )}
          {searchResults.map((cand) => (
            <button
              key={cand.id}
              onClick={() => handleSelectCandidate(cand.id)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                selectedCandidateId === cand.id 
                  ? 'border-indigo-600 bg-indigo-50/50' 
                  : 'border-slate-200 hover:border-slate-350 hover:bg-slate-50'
              }`}
            >
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className={`text-[9px] uppercase font-black px-1.5 py-0.5 rounded ${
                    cand.school === 'SPC' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {cand.school}-{cand.class}{cand.classNo}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">Letter: {cand.candidateLetter}</span>
                </div>
                <div className="text-xs font-extrabold text-slate-800 mt-1.5">{cand.name}</div>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">{cand.examLocation} Center</span>
                <span className="text-xs text-slate-700 font-mono font-bold">{cand.reportingTime} AM</span>
              </div>
            </button>
          ))}

          {!searchQuery && (
            <div className="text-center py-6 text-slate-400 font-bold text-[11px] uppercase tracking-widest leading-relaxed">
              Type in the box above to find a student...
            </div>
          )}
        </div>
      </div>

      {/* CANDIDATE PASS & SCHEDULE DETAILS */}
      <div id="pass-and-details-container" className="lg:col-span-2">
        <AnimatePresence mode="wait">
          {selectedCandidate && journey ? (
            <motion.div
              key={selectedCandidate.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* STYLED CREDENTIAL PASS */}
              <div id="credential-pass-card" className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all hover:shadow-md">
                
                {/* School color band header */}
                <div className={`p-6 text-white ${
                  selectedCandidate.school === 'SPC' 
                    ? 'bg-indigo-750' 
                    : 'bg-emerald-750'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">
                          {selectedCandidate.school === 'SPC' ? "St. Paul's College" : "Ying Wa Girls' School"}
                        </span>
                        <span className="text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-slate-900 px-1.5 py-0.5 rounded">
                          HKDSE Joint Speaking
                        </span>
                      </div>
                      <h2 className="text-xl font-bold mt-2 tracking-tight">{selectedCandidate.name}</h2>
                      <div className="text-xs text-white/80 font-mono mt-1">
                        Reg ID: {selectedCandidate.id} • Class Code: {selectedCandidate.class}{selectedCandidate.classNo}
                      </div>
                    </div>

                    {/* Candidate ID letter bubble */}
                    <div className="w-14 h-14 bg-white/10 rounded-xl backdrop-blur-md flex flex-col items-center justify-center border border-white/20">
                      <span className="text-[10px] font-bold text-white/70 uppercase">Letter</span>
                      <span className="text-2xl font-mono font-extrabold text-white">{selectedCandidate.candidateLetter}</span>
                    </div>
                  </div>
                </div>

                {/* Body details */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Left Column: Core Schedule Times */}
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">OFFICIAL ALLOCATIONS</h4>
                    
                    {/* Location */}
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-orange-50 text-orange-600 border border-orange-100 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block font-semibold">Allocated Exam Center</span>
                        <span className="text-sm font-bold text-slate-800">
                          {selectedCandidate.examLocation === 'SPC' ? "St. Paul's College" : "Ying Wa Girls' School"}
                        </span>
                        <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                          {selectedCandidate.examLocation === 'SPC' 
                            ? "7-9 Bonham Road, Mid-Levels, Hong Kong" 
                            : "76 Robinson Road, Mid-Levels, Hong Kong"}
                        </p>
                      </div>
                    </div>

                    {/* Reporting Time */}
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block font-semibold">Reporting Time</span>
                        <span className="text-sm font-bold text-slate-800 font-mono">{selectedCandidate.reportingTime} AM</span>
                        <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                          Session: {selectedCandidate.session} • Group: {selectedCandidate.groupNo}
                        </p>
                      </div>
                    </div>

                    {/* Exam Room Detail */}
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-purple-50 text-purple-600 border border-purple-100 mt-0.5">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block font-semibold">Rooms (Prep & Speaking)</span>
                        <span className="text-sm font-bold text-slate-800">
                          Room {selectedCandidate.examRoom} ({selectedCandidate.examLocation})
                        </span>
                        <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                          Waiting Room:{' '}
                          {selectedCandidate.examLocation === 'YWGS' 
                            ? 'Room 208/209 (English & Chinese Room)' 
                            : 'English Rooms I / II (5/F)'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Interaction Checklist */}
                  <div className="space-y-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">ATTENDANCE STATUS</span>
                      <button
                        onClick={() => toggleCheckIn(selectedCandidate.id)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-colors ${
                          checkedIn[selectedCandidate.id]
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {checkedIn[selectedCandidate.id] ? 'Mark Pending' : 'Check In'}
                      </button>
                    </div>

                    <div className="flex items-center space-x-3 py-1">
                      {checkedIn[selectedCandidate.id] ? (
                        <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                          <User className="w-5 h-5 font-bold" />
                        </div>
                      )}
                      <div>
                        <span className="text-xs font-semibold text-slate-505 block">Check-In Status</span>
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${
                          checkedIn[selectedCandidate.id] ? 'text-emerald-600' : 'text-slate-400'
                        }`}>
                          {checkedIn[selectedCandidate.id] ? 'Reported (Present)' : 'Not Checked In (Pending)'}
                        </span>
                      </div>
                    </div>

                    {/* Step Timeline Journey */}
                    <div className="border-t border-slate-200/60 pt-3 space-y-2 mt-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Exam-Day Live Journey</span>
                      
                      <div className="space-y-2 text-xs">
                        {/* Step 1 */}
                        <div className="flex items-center justify-between text-slate-600">
                          <span className="flex items-center space-x-1.5">
                            {checkedIn[selectedCandidate.id] ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Circle className="w-3.5 h-3.5 text-slate-300" />}
                            <span className={checkedIn[selectedCandidate.id] ? 'line-through text-slate-400' : ''}>1. Arrive & Check In</span>
                          </span>
                          <span className="text-[10px] font-mono font-medium text-slate-400">{selectedCandidate.reportingTime} AM</span>
                        </div>

                        {/* Step 2 */}
                        <div className={`flex items-center justify-between ${journey.isPreparing ? 'text-indigo-600 font-bold' : 'text-slate-600'}`}>
                          <span className="flex items-center space-x-1.5">
                            {journey.isPreparing ? <Clock className="w-3.5 h-3.5 animate-spin" /> : journey.isFinished || journey.isSpeaking ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Circle className="w-3.5 h-3.5 text-slate-300" />}
                            <span>2. Formulate Points (Prep Room)</span>
                          </span>
                          <span className="text-[10px] font-mono font-medium">{GROUP_TIMES[selectedCandidate.groupNo].prepStart} AM</span>
                        </div>

                        {/* Step 3 */}
                        <div className={`flex items-center justify-between ${journey.isSpeaking ? 'text-indigo-600 font-bold' : 'text-slate-600'}`}>
                          <span className="flex items-center space-x-1.5">
                            {journey.isSpeaking ? <Clock className="w-3.5 h-3.5 animate-bounce" /> : journey.isFinished ? <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> : <Circle className="w-3.5 h-3.5 text-slate-300" />}
                            <span>3. Joint Discussion (Exam Room)</span>
                          </span>
                          <span className="text-[10px] font-mono font-medium">{GROUP_TIMES[selectedCandidate.groupNo].examStart} AM</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* SPEAKING GROUP PEERS */}
              <div id="speaking-peers-card" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="w-4.5 h-4.5 text-indigo-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">Your Speaking Group Peers</h3>
                </div>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed font-semibold">
                  The HKDSE Joint English Speaking exam groups 4 candidates (Candidates A, B, C, and D) in a room. Here is who you will be speaking with for <strong>Group {selectedCandidate.groupNo} (Room {selectedCandidate.examRoom})</strong>:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {(['A', 'B', 'C', 'D'] as const).map(letter => {
                    const peer = groupMembers.find(m => m.candidateLetter === letter);
                    const isSelf = peer?.id === selectedCandidate.id;

                    return (
                      <div
                        key={letter}
                        className={`rounded-xl border p-4 text-center flex flex-col justify-between transition-all ${
                          isSelf 
                            ? 'border-indigo-600 bg-indigo-50/20 shadow-xs ring-1 ring-indigo-500/20' 
                            : peer 
                              ? 'border-slate-200 bg-white hover:border-slate-355' 
                              : 'border-dashed border-slate-300 bg-slate-50/55'
                        }`}
                      >
                        <div>
                          <span className={`block w-7 h-7 mx-auto rounded-full font-mono text-xs font-black flex items-center justify-center border mb-2 ${
                            isSelf 
                              ? 'bg-indigo-650 text-white border-indigo-600' 
                              : peer?.school === 'SPC' 
                                ? 'bg-indigo-50 text-indigo-705 border-indigo-150' 
                                : peer?.school === 'YWGS' 
                                  ? 'bg-emerald-50 text-emerald-705 border-emerald-150' 
                                  : 'bg-slate-100 text-slate-400 border-slate-200'
                          }`}>
                            {letter}
                          </span>

                          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Candidate {letter}</span>
                          <span className="text-xs font-black text-slate-800 line-clamp-1 mt-1 block h-4">
                            {peer ? peer.name.split(' ')[0] : 'Vacant Slot'}
                          </span>
                          <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">
                            {peer ? `${peer.school} - ${peer.class}${peer.classNo}` : '—'}
                          </p>
                        </div>

                        {peer && (
                          <div className="mt-3.5 pt-2 border-t border-slate-100 flex items-center justify-center space-x-1">
                            <span className={`w-1.5 h-1.5 rounded-full ${checkedIn[peer.id] ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                            <span className={`text-[9px] font-bold uppercase tracking-wider ${checkedIn[peer.id] ? 'text-emerald-600' : 'text-slate-400'}`}>
                              {checkedIn[peer.id] ? 'Reported' : 'Absent'}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <div id="no-search-results-fallback" className="bg-slate-50/60 rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-400">
              <User className="w-12 h-12 text-slate-300 mx-auto mb-3 stroke-1" />
              <p className="text-xs font-extrabold text-slate-500 tracking-wider uppercase">No Candidate Selected</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
                Use the lookup panel on the left to search for a candidate and access their official joint speaking exam pass sheet.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};
