import React, { useState } from 'react';
import { useExam } from './ExamContext';
import { 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft,
  ChevronsUpDown,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FloatingClock: React.FC = () => {
  const { 
    countdownTime, 
    isCountdownRunning, 
    setIsCountdownRunning,
    countdownMax,
    setCountdownTime
  } = useExam();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // MM:SS formatting
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleToggleTimer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCountdownRunning(!isCountdownRunning);
  };

  const handleResetTimer = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCountdownRunning(false);
    setCountdownTime(countdownMax);
  };

  const isTimeCritical = countdownTime <= 60 && countdownTime > 0;
  const isTimeUp = countdownTime === 0;

  return (
    <div 
      id="floating-interactive-clock" 
      className="fixed bottom-14 right-6 z-[100] pointer-events-none flex flex-col items-end"
    >
      <div className="pointer-events-auto">
        <motion.div
          layout
          className={`flex items-center rounded-2xl shadow-xl border overflow-hidden p-1.5 transition-colors duration-500 ${
            isTimeUp 
              ? 'bg-red-950 border-red-500 text-white ring-4 ring-red-500/20' 
              : isTimeCritical 
                ? 'bg-amber-900 border-amber-500 text-white ring-4 ring-amber-500/20' 
                : 'bg-slate-900 border-slate-700 text-white'
          }`}
        >
          {/* Main Display: Left or Centered content */}
          <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 px-3 py-1.5 cursor-pointer hover:bg-white/5 rounded-xl transition-all select-none"
            title="Click to expand/collapse floating timer controls"
          >
            {isTimeUp ? (
              <AlertCircle className="w-4 h-4 text-red-400 animate-bounce shrink-0" />
            ) : (
              <Clock className={`w-4 h-4 text-indigo-400 shrink-0 ${isCountdownRunning ? 'animate-spin [animation-duration:8s]' : ''}`} />
            )}
            
            <div className="text-right">
              <span className={`font-mono font-black text-sm tracking-tight block ${
                isTimeCritical ? 'text-amber-300 animate-pulse' : ''
              }`}>
                {formatTime(countdownTime)}
              </span>
            </div>
            
            <span className="text-[10px] text-white/40 font-bold shrink-0 pl-1">
              {isExpanded ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            </span>
          </div>

          {/* Expanded controls section */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex items-center space-x-1 pr-1.5 border-l border-white/10 ml-2 pl-2 overflow-hidden shrink-0"
              >
                {/* Play / Pause */}
                <button
                  onClick={handleToggleTimer}
                  disabled={isTimeUp}
                  className={`p-2 rounded-lg cursor-pointer transition-colors ${
                    isTimeUp
                      ? 'text-white/20 cursor-not-allowed'
                      : isCountdownRunning
                        ? 'text-amber-400 hover:bg-white/5 hover:text-amber-300'
                        : 'text-indigo-400 hover:bg-white/5 hover:text-indigo-300'
                  }`}
                  title={isCountdownRunning ? 'Pause' : 'Start'}
                >
                  {isCountdownRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                </button>

                {/* Reset */}
                <button
                  onClick={handleResetTimer}
                  className="p-2 text-white/65 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer transition-all"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </div>

      {/* Mini status helper when collapsed */}
      {!isExpanded && isCountdownRunning && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 0.8, y: 0 }}
          className="text-[8px] bg-indigo-650 text-white font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md mt-1.5 shadow-sm text-center select-none"
        >
          Ticking in Background
        </motion.div>
      )}
    </div>
  );
};
