import React, { useState, useEffect, useRef } from 'react';
import { useExam } from './ExamContext';
import { getRoomSchedules, GROUP_TIMES, allCandidates } from '../examData';
import { Candidate, CandidateGrade } from '../types';
import { Shield, Play, Pause, RotateCcw, AlertTriangle, Save, GraduationCap, Award, MessageSquare, CheckCircle, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ExaminerPortal: React.FC = () => {
  const { checkedIn, grades, saveGrade, virtualTime } = useExam();

  // State: selected room
  const [selectedRoom, setSelectedRoom] = useState<string>('201');
  const [selectedLocation, setSelectedLocation] = useState<'YWGS' | 'SPC'>('YWGS');
  // State: selected group for grading
  const [activeGroupNo, setActiveGroupNo] = useState<number>(1);
  
  // Custom Toast State
  const [successToast, setSuccessToast] = useState<string | null>(null);
  
  // Timer states
  const [timerSeconds, setTimerSeconds] = useState<number>(480); // Default to 8 mins (480 secs)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerMode, setTimerMode] = useState<'discussion' | 'individual'>('discussion');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Rubric grading states for the 4 candidates in active group (mapped by seat letter)
  const [formGrades, setFormGrades] = useState<Record<string, CandidateGrade>>({
    A: { pronunciation: 1, vocabulary: 1, organization: 1, strategies: 1, notes: '' },
    B: { pronunciation: 1, vocabulary: 1, organization: 1, strategies: 1, notes: '' },
    C: { pronunciation: 1, vocabulary: 1, organization: 1, strategies: 1, notes: '' },
    D: { pronunciation: 1, vocabulary: 1, organization: 1, strategies: 1, notes: '' },
  });

  const spcRooms = ['5A', '5B', '5C', '5D', '5E'];
  const ywgsRooms = ['201', '202', '203', '204', '205'];
  const currentRooms = selectedLocation === 'YWGS' ? ywgsRooms : spcRooms;

  // Retrieve full schedule for this room
  const roomSchedule = getRoomSchedules(selectedLocation, selectedRoom);
  const activeGroup = roomSchedule.groups.find(g => g.groupNo === activeGroupNo);

  // Auto handle location switch when changing room code
  const handleRoomChange = (room: string) => {
    setSelectedRoom(room);
    // Automatically set group depending on virtual time inside this room
    const [h, m] = virtualTime.split(':').map(Number);
    const virtualMins = h * 60 + m;
    
    // Set active session group numbers based on times
    if (virtualMins >= 9 * 60 + 25) {
      setActiveGroupNo(4);
    } else {
      setActiveGroupNo(1);
    }
  };

  // Synchronize grading form when active group or candidate updates
  useEffect(() => {
    if (!activeGroup) return;

    const initialForms: Record<string, CandidateGrade> = {};
    (['A', 'B', 'C', 'D'] as const).forEach(letter => {
      const cand = activeGroup.candidates[letter];
      if (cand) {
        const savedGrade = grades[cand.id];
        initialForms[letter] = savedGrade || {
          pronunciation: 3,
          vocabulary: 3,
          organization: 3,
          strategies: 3,
          notes: ''
        };
      } else {
        initialForms[letter] = { pronunciation: 1, vocabulary: 1, organization: 1, strategies: 1, notes: '' };
      }
    });

    setFormGrades(initialForms);

    // Adjust timer for the group size: 3 candidates = 6 mins (360s), 4 candidates = 8 mins (480s)
    const activeCandCount = Object.values(activeGroup.candidates).filter(c => c !== null).length;
    const defaultSecs = timerMode === 'individual' ? 60 : (activeCandCount <= 3 ? 360 : 480);
    setTimerSeconds(defaultSecs);
    setIsTimerRunning(false);
  }, [activeGroupNo, selectedRoom, selectedLocation, timerMode]);

  // Handle Timer ticking
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsTimerRunning(false);
            playBeepChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  // Synthesizes an exam bell beep directly using Web Audio API
  const playBeepChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      
      // Let's create an elegant double chime
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      
      osc1.frequency.setValueAtTime(800, ctx.currentTime); // high pitched elegant tone
      gain1.gain.setValueAtTime(0.4, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      
      osc1.start();
      osc1.stop(ctx.currentTime + 0.8);

      // Repeat a bit later
      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.frequency.setValueAtTime(800, ctx.currentTime);
        gain2.gain.setValueAtTime(0.4, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
        osc2.start();
        osc2.stop(ctx.currentTime + 1.2);
      }, 350);

    } catch (e) {
      console.log('Audio Context blocked or not supported yet');
    }
  };

  const handleScoreChange = (letter: string, field: keyof CandidateGrade, value: any) => {
    setFormGrades(prev => ({
      ...prev,
      [letter]: {
        ...prev[letter],
        [field]: value
      }
    }));
  };

  const submitGradeForm = (letter: string, candId: string, name: string) => {
    saveGrade(candId, formGrades[letter]);
    setSuccessToast(`Candidate ${letter} (${name}) scores successfully saved!`);
    setTimeout(() => {
      setSuccessToast(null);
    }, 4000);
  };

  const formatTimerValue = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div id="examiner-portal-root" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* 1. ROOM SELECTOR & TIMER (LEFT COLUMN) */}
      <div id="room-timer-sidebar" className="space-y-6">
        
        {/* ROOM PICKER CARD */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 transition-all hover:shadow-md">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-indigo-650" />
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">Assigned Exam Rooms</h3>
          </div>

          {/* Location Toggle */}
          <div className="flex bg-slate-150 p-1.5 rounded-xl border border-slate-200/50">
            <button
              onClick={() => { setSelectedLocation('YWGS'); handleRoomChange('201'); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                selectedLocation === 'YWGS' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              YWGS (200s)
            </button>
            <button
              onClick={() => { setSelectedLocation('SPC'); handleRoomChange('5A'); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                selectedLocation === 'SPC' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              SPC (5/F)
            </button>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {currentRooms.map(r => (
              <button
                key={r}
                onClick={() => handleRoomChange(r)}
                className={`py-2 px-1 rounded-xl text-xs font-bold cursor-pointer border transition-all ${
                  selectedRoom === r
                    ? selectedLocation === 'YWGS'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Interactive Group Selectors inside room */}
          <div className="pt-3 border-t border-slate-200 space-y-1.5">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Active Session Groups</span>
            <div className="grid grid-cols-4 gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7].map(g => (
                <button
                  key={g}
                  onClick={() => setActiveGroupNo(g)}
                  className={`py-1.5 rounded-lg text-xs font-extrabold cursor-pointer transition-all border ${
                    activeGroupNo === g
                      ? 'bg-slate-905 text-white border-slate-905 shadow-xs'
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  G{g}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* BRIGHT TIMER CARD */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white text-center shadow-lg relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">
            <span>OFFICIAL AUDIO TIMER</span>
            <button 
              onClick={playBeepChime}
              className="text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
              title="Test Exam Bell chime tone"
            >
              <Volume2 className="w-3.5 h-3.5 mr-0.5" />
              <span>TEST BELL</span>
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="flex bg-slate-800 p-1 rounded-xl mb-6 border border-slate-700/60 text-xs">
            <button
              onClick={() => setTimerMode('discussion')}
              className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all ${
                timerMode === 'discussion' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Group Discussion
            </button>
            <button
              onClick={() => setTimerMode('individual')}
              className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all ${
                timerMode === 'individual' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              1-Min Response
            </button>
          </div>

          {/* Live countdown */}
          <div className="my-6">
            <div className={`text-5xl font-mono font-black tracking-tight ${timerSeconds <= 60 && timerSeconds > 0 ? 'text-amber-400 animate-pulse' : timerSeconds === 0 ? 'text-red-500 animate-bounce' : 'text-white'}`}>
              {formatTimerValue(timerSeconds)}
            </div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-2.5">
              {timerMode === 'discussion' ? 'Discussion Cycle' : 'Individual response cycle'}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-2 pt-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all ${
                isTimerRunning 
                  ? 'bg-amber-550 text-slate-900 hover:bg-amber-600' 
                  : 'bg-indigo-500 text-white hover:bg-indigo-600'
              }`}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isTimerRunning ? 'Pause Session' : 'Start Session'}</span>
            </button>

            <button
              onClick={() => {
                setIsTimerRunning(false);
                const activeCandCount = Object.values(activeGroup?.candidates || {}).filter(c => c !== null).length;
                setTimerSeconds(timerMode === 'individual' ? 60 : (activeCandCount <= 3 ? 360 : 480));
              }}
              className="p-2 border border-slate-700 hover:border-slate-600 rounded-xl transition-all text-slate-300"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[10px] text-slate-500 mt-5 leading-normal">
            Group Discussion setting is automatically calculated based on candidate sizing: 4 candidates have 8 mins, 3 candidates have 6 mins.
          </p>
        </div>
      </div>

      {/* 2. GRADING ASSESSMENT SHEET (MIDDLE/RIGHT COLUMN) */}
      <div id="grades-sheet-container" className="lg:col-span-2 space-y-6">
        
        {/* ROOM DETAILS HANGER */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all hover:shadow-md">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">ACTIVE ASSESSMENT POOL</span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-base font-extrabold text-slate-800">Room {selectedRoom} ({selectedLocation})</span>
              <span className="text-xs text-slate-305 font-bold">•</span>
              <span className="text-xs text-slate-500 font-extrabold uppercase tracking-wide">Examiner: {roomSchedule.examinerId}</span>
            </div>
          </div>

          <div className="text-left md:text-right text-xs">
            <span className="text-slate-400 font-bold uppercase block text-[9px] tracking-wider">CURRENT GROUP GRID</span>
            <span className="font-extrabold text-slate-700">Group {activeGroupNo} Candidates Pool</span>
          </div>
        </div>

        {/* CANDIDATES LIST INTEGRATION FOR GRADING */}
        <div className="space-y-4">
          
          {(['A', 'B', 'C', 'D'] as const).map(letter => {
            const cand = activeGroup?.candidates[letter];
            
            if (!cand) {
              return (
                <div key={letter} className="bg-slate-50/50 border border-dashed border-slate-250 rounded-2xl p-6 text-center text-slate-400 text-xs font-semibold">
                  Candidate Seat {letter} is vacant in Group {activeGroupNo} at this room.
                </div>
              );
            }

            const currentGrade = formGrades[letter];
            const isSaved = grades[cand.id] !== undefined;

            return (
              <div 
                key={cand.id} 
                className={`bg-white rounded-2xl border p-6 shadow-sm relative overflow-hidden transition-all hover:shadow-md ${
                  isSaved ? 'border-indigo-300 ring-2 ring-indigo-50/50' : 'border-slate-200'
                }`}
              >
                {/* Candidate overview badge */}
                <div className="flex flex-col md:flex-row md:items-start justify-between pb-4 border-b border-slate-200 gap-4">
                  <div className="flex items-start space-x-3">
                    <span className={`w-9 h-9 rounded-full font-mono text-sm font-black flex items-center justify-center border ${
                      cand.school === 'SPC' ? 'bg-indigo-50 text-indigo-700 border-indigo-205' : 'bg-emerald-50 text-emerald-700 border-emerald-205'
                    }`}>
                      {cand.candidateLetter}
                    </span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-slate-800">{cand.name}</span>
                        <span className={`text-[9px] uppercase font-mono font-bold px-1.5 py-0.2 rounded ${
                          cand.school === 'SPC' ? 'bg-indigo-50 text-indigo-800' : 'bg-emerald-50 text-emerald-800'
                        }`}>
                          {cand.school}-{cand.class}{cand.classNo}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                        DSE Registration ID: {cand.id} • Seat: {letter} • Status: {' '}
                        <span className={checkedIn[cand.id] ? 'text-emerald-600 font-bold' : 'text-red-500 font-bold'}>
                          {checkedIn[cand.id] ? 'Present' : 'Absent'}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Saved indication label */}
                  {isSaved && (
                    <div className="flex items-center text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-100">
                      <CheckCircle className="w-3.5 h-3.5 mr-1" />
                      <span>Graded Submitted</span>
                    </div>
                  )}
                </div>

                {/* Score Controls Sliders/Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
                  <div className="space-y-4">
                    
                    {/* Rubric item 1 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-600 font-bold">1. Pronunciation & Delivery</span>
                        <span className="text-indigo-600 font-mono font-bold">Score: {currentGrade?.pronunciation || 1} / 6</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5, 6].map(val => (
                          <button
                            key={val}
                            onClick={() => handleScoreChange(letter, 'pronunciation', val)}
                            className={`flex-1 py-1 rounded text-xs font-bold border transition-all ${
                              currentGrade?.pronunciation === val
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Rubric item 2 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-600 font-bold">2. Communication Strategies</span>
                        <span className="text-indigo-600 font-mono font-bold">Score: {currentGrade?.strategies || 1} / 6</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5, 6].map(val => (
                          <button
                            key={val}
                            onClick={() => handleScoreChange(letter, 'strategies', val)}
                            className={`flex-1 py-1 rounded text-xs font-bold border transition-all ${
                              currentGrade?.strategies === val
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Rubric item 3 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-600 font-bold">3. Vocabulary & Language Patterns</span>
                        <span className="text-indigo-600 font-mono font-bold">Score: {currentGrade?.vocabulary || 1} / 6</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5, 6].map(val => (
                          <button
                            key={val}
                            onClick={() => handleScoreChange(letter, 'vocabulary', val)}
                            className={`flex-1 py-1 rounded text-xs font-bold border transition-all ${
                              currentGrade?.vocabulary === val
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Rubric item 4 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-600 font-bold">4. Ideas & Organisation</span>
                        <span className="text-indigo-600 font-mono font-bold">Score: {currentGrade?.organization || 1} / 6</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5, 6].map(val => (
                          <button
                            key={val}
                            onClick={() => handleScoreChange(letter, 'organization', val)}
                            className={`flex-1 py-1 rounded text-xs font-bold border transition-all ${
                              currentGrade?.organization === val
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Remarks & Save controls */}
                  <div className="flex flex-col justify-between">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 flex items-center space-x-1">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                        <span>Examiner Assessment Remarks (Optional)</span>
                      </label>
                      <textarea
                        value={currentGrade?.notes || ''}
                        onChange={(e) => handleScoreChange(letter, 'notes', e.target.value)}
                        placeholder="Add structured points e.g., 'Maintained good eye contact, formulated clear transition signals, but need wider range of vocabulary.'"
                        rows={5}
                        className="w-full text-xs p-3 rounded-xl border border-slate-205 outline-none transition-all focus:border-indigo-500 hover:border-slate-300 placeholder:text-slate-400 font-semibold"
                      />
                    </div>

                    <button
                      onClick={() => submitGradeForm(letter, cand.id, cand.name)}
                      className="w-full mt-3 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center space-x-1.5 transition-all hover:bg-slate-800 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Candidate Graded Form</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* SUCCESS TOAST FLYOUT */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[100] bg-emerald-600 border border-emerald-520 text-white font-bold text-xs py-3.5 px-5 rounded-2xl shadow-xl flex items-center space-x-2.5 max-w-sm"
          >
            <CheckCircle className="w-4 h-4 text-emerald-100 shrink-0" />
            <span>{successToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
