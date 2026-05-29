import React from 'react';
import { useExam } from './ExamContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Volume2, 
  VolumeX, 
  AlertTriangle, 
  AlertCircle, 
  Sparkles,
  Timer
} from 'lucide-react';
import { motion } from 'motion/react';

export const CountdownTimer: React.FC = () => {
  const { 
    countdownTime, 
    countdownMax, 
    isCountdownRunning, 
    setCountdownTime, 
    setCountdownMax, 
    setIsCountdownRunning 
  } = useExam();

  const [soundMuted, setSoundMuted] = React.useState<boolean>(false);

  // Formatting seconds to MM:SS
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Preset setter helper
  const applyPreset = (minutes: number) => {
    setIsCountdownRunning(false);
    const secs = minutes * 60;
    setCountdownMax(secs);
    setCountdownTime(secs);
  };

  const handleToggleTimer = () => {
    setIsCountdownRunning(!isCountdownRunning);
  };

  const handleResetTimer = () => {
    setIsCountdownRunning(false);
    setCountdownTime(countdownMax);
  };

  // Alarm sound trigger test
  const triggerAudioBellSound = () => {
    if (soundMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
      
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.log('Audio error');
    }
  };

  // State calculations for indicators
  const percentRemaining = (countdownTime / countdownMax) * 100;
  const isTimeCritical = countdownTime <= 60 && countdownTime > 0;
  const isTimeUp = countdownTime === 0;

  let stateLabel = 'IDLE';
  let stateColor = 'bg-slate-100 text-slate-700 border-slate-300';
  
  if (isCountdownRunning) {
    if (isTimeCritical) {
      stateLabel = 'CRITICAL';
      stateColor = 'bg-amber-105 text-amber-700 border-amber-300 animate-pulse font-black';
    } else {
      stateLabel = 'RUNNING';
      stateColor = 'bg-indigo-50 text-indigo-700 border-indigo-200';
    }
  } else if (isTimeUp) {
    stateLabel = "TIME'S UP";
    stateColor = 'bg-red-50 text-red-600 border-red-200 font-extrabold animate-bounce';
  } else if (countdownTime < countdownMax) {
    stateLabel = 'PAUSED';
    stateColor = 'bg-slate-200 text-slate-600 border-slate-350';
  }

  return (
    <div id="interactive-countdown-view" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* LEFT & CENTER CARD: DISPLAY CONTAINER (TWO COLUMNS) */}
      <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[460px] hover:shadow-md transition-all">
        
        {/* Ambient background accent */}
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-colors duration-1000 ${
          isTimeUp ? 'bg-red-500/10' : isTimeCritical ? 'bg-amber-500/15' : 'bg-indigo-500/5'
        }`} />

        <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-6">
          <Timer className="w-4 h-4 text-indigo-600" />
          <span>Interactive Exam Clock Controller</span>
        </div>

        {/* Circular Timing Display or Ring */}
        <div className="relative w-64 h-64 flex items-center justify-center mb-8">
          
          {/* SVG Progress Ring */}
          <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle track */}
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              className="stroke-slate-100 fill-none" 
              strokeWidth="5" 
            />
            {/* Dynamic foreground progress circle */}
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              className={`fill-none transition-all duration-1000 ${
                isTimeUp 
                  ? 'stroke-red-500' 
                  : isTimeCritical 
                    ? 'stroke-amber-400' 
                    : 'stroke-indigo-600'
              }`}
              strokeWidth="5" 
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={(1 - percentRemaining / 100) * (2 * Math.PI * 45)}
              strokeLinecap="round"
            />
          </svg>

          {/* Time digits */}
          <div className="text-center z-10 p-4">
            <span className={`text-6xl font-mono font-black tracking-tight block ${
              isTimeUp 
                ? 'text-red-650 animate-bounce' 
                : isTimeCritical 
                  ? 'text-amber-505 animate-pulse' 
                  : 'text-slate-900'
            }`}>
              {formatTime(countdownTime)}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 block">
              Remaining Time
            </span>
          </div>

        </div>

        {/* TIME CRITICAL ALERTS */}
        {isTimeCritical && (
          <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200 text-amber-705 px-4.5 py-2.5 rounded-2xl mb-6 shadow-xs select-none">
            <AlertTriangle className="w-4 h-4 text-amber-500 animate-bounce shrink-0" />
            <span className="text-xs font-bold">WARNING: Under 1 minute remaining in active discussion!</span>
          </div>
        )}

        {isTimeUp && (
          <div className="flex flex-col items-center gap-1 bg-red-50 border border-red-200 text-red-700 px-6 py-3 rounded-2xl mb-6 shadow-sm animate-pulse">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500 animate-spin shrink-0" />
              <span className="text-sm font-extrabold uppercase tracking-wide">TIME IS UP!</span>
            </div>
            <span className="text-[11px] font-bold text-red-550">Active Joint Speaking cycle has now completed.</span>
          </div>
        )}

        {/* Start / Pause / Reset Toggles */}
        <div className="flex items-center gap-4">
          
          <button
            onClick={handleToggleTimer}
            className={`px-8 py-3 rounded-2xl font-bold flex items-center space-x-2 cursor-pointer transition-all shadow-md hover:-translate-y-0.5 ${
              isCountdownRunning
                ? 'bg-amber-550 hover:bg-amber-600 text-slate-900 ring-4 ring-amber-100/50'
                : isTimeUp
                  ? 'bg-slate-200 border border-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white ring-4 ring-indigo-100/50'
            }`}
            disabled={isTimeUp}
          >
            {isCountdownRunning ? (
              <>
                <Pause className="w-4 h-4 shrink-0" />
                <span>Pause Countdown</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current shrink-0" />
                <span>Start Countdown</span>
              </>
            )}
          </button>

          <button
            onClick={handleResetTimer}
            className="px-5 py-3 border border-slate-300 hover:bg-slate-50 text-slate-600 rounded-2xl font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-4 h-4 shrink-0 text-slate-400" />
            <span>Reset Time</span>
          </button>

        </div>

      </div>

      {/* RIGHT SIDEBAR: PRESET SELECTORS & AUDIO SETTINGS (ONE COLUMN) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6 hover:shadow-md transition-all">
        
        {/* Status Indicator */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Current System State</span>
          <div className={`p-4 rounded-xl border text-center font-bold text-xs ${stateColor} flex items-center justify-center space-x-2`}>
            {isCountdownRunning && <span className="w-2.5 h-2.5 rounded-full bg-current animate-ping shrink-0" />}
            <span className="text-sm font-extrabold">{stateLabel}</span>
          </div>
        </div>

        {/* Official Clock Presets */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">DSE Speaking Presets</span>
          
          <div className="space-y-2">
            
            {/* 10 Minute Preset */}
            <button
              onClick={() => applyPreset(10)}
              className="w-full text-left p-3.5 rounded-xl border border-slate-205 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer flex justify-between items-center group"
            >
              <div>
                <span className="block text-xs font-extrabold text-slate-800">10 Minute Master Timer</span>
                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Joint Group Prep & Speaking default duration</span>
              </div>
              <span className="text-indigo-650 font-mono font-black text-xs bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-xl">10:00</span>
            </button>

            {/* 8 Minute Preset */}
            <button
              onClick={() => applyPreset(8)}
              className="w-full text-left p-3.5 rounded-xl border border-slate-205 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer flex justify-between items-center group"
            >
              <div>
                <span className="block text-xs font-extrabold text-slate-800">8 Minute Cycle</span>
                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Group discussion (4 candidates)</span>
              </div>
              <span className="text-slate-650 font-mono font-black text-xs bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-xl">08:00</span>
            </button>

            {/* 6 Minute Preset */}
            <button
              onClick={() => applyPreset(6)}
              className="w-full text-left p-3.5 rounded-xl border border-slate-205 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer flex justify-between items-center group"
            >
              <div>
                <span className="block text-xs font-extrabold text-slate-800">6 Minute Cycle</span>
                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Group discussion (3 candidates)</span>
              </div>
              <span className="text-slate-650 font-mono font-black text-xs bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-xl">06:00</span>
            </button>

            {/* 1 Minute Response */}
            <button
              onClick={() => applyPreset(1)}
              className="w-full text-left p-3.5 rounded-xl border border-slate-205 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer flex justify-between items-center group"
            >
              <div>
                <span className="block text-xs font-extrabold text-slate-800">1 Minute Response</span>
                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Individual candidate reflection responder</span>
              </div>
              <span className="text-slate-650 font-mono font-black text-xs bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-xl">01:00</span>
            </button>

            {/* 30 seconds (quick test) */}
            <button
              onClick={() => applyPreset(0.5)}
              className="w-full text-left p-3.5 rounded-xl border border-slate-205 bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer flex justify-between items-center group"
            >
              <div>
                <span className="block text-xs font-extrabold text-slate-800">30 Seconds Tester</span>
                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">Quick chime/bell validation cycle</span>
              </div>
              <span className="text-slate-600 font-mono font-black text-xs bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-xl">00:30</span>
            </button>

          </div>

        </div>

        {/* Audio Alerts Setting */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">System Bells Audio Setup</span>
          
          <div className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center space-x-2 px-1">
              {soundMuted ? (
                <VolumeX className="w-4 h-4 text-slate-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-indigo-600" />
              )}
              <span className="text-xs font-extrabold text-slate-700">Chime: {soundMuted ? 'Muted' : 'Enabled'}</span>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setSoundMuted(!soundMuted)}
                className={`py-1 px-2.5 rounded-lg text-[10.5px] font-bold cursor-pointer border transition-colors ${
                  soundMuted
                    ? 'bg-amber-100 border-amber-300 text-amber-700'
                    : 'bg-white border-slate-200 hover:bg-slate-100 text-slate-600'
                }`}
              >
                {soundMuted ? 'Unmute' : 'Mute Bell'}
              </button>

              <button
                onClick={triggerAudioBellSound}
                disabled={soundMuted}
                className={`py-1 px-2.5 rounded-lg text-[10.5px] font-bold cursor-pointer border transition-all ${
                  soundMuted
                    ? 'bg-slate-100 border-slate-200 text-slate-350 cursor-not-allowed'
                    : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                Test Bell
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
