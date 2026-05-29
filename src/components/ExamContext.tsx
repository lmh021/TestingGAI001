import React, { createContext, useContext, useState, useEffect } from 'react';
import { CandidateGrade } from '../types';

interface ExamContextType {
  checkedIn: Record<string, boolean>;
  grades: Record<string, CandidateGrade>;
  toggleCheckIn: (id: string) => void;
  bulkCheckIn: (ids: string[], status: boolean) => void;
  saveGrade: (id: string, grade: CandidateGrade) => void;
  virtualTime: string; // "08:15", "08:45", etc.
  setVirtualTime: (time: string) => void;
  isAutoPlay: boolean;
  setIsAutoPlay: (play: boolean) => void;
  selectedCandidateId: string | null;
  setSelectedCandidateId: (id: string | null) => void;

  // Countdown timer states
  countdownTime: number;
  countdownMax: number;
  isCountdownRunning: boolean;
  setCountdownTime: (secs: number) => void;
  setCountdownMax: (secs: number) => void;
  setIsCountdownRunning: (running: boolean) => void;

  // Persistence/commencement states
  commencementGrades: Record<string, CandidateGrade>;
  resetGradesToCommencement: () => void;
  deleteGrades: (ids: string[]) => void;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [checkedIn, setCheckedIn] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('exam_portal_checked_in');
    return saved ? JSON.parse(saved) : {};
  });

  const [grades, setGrades] = useState<Record<string, CandidateGrade>>(() => {
    const saved = localStorage.getItem('exam_portal_grades');
    return saved ? JSON.parse(saved) : {};
  });

  // Keep an immutable reference of grades at the initial commencement of the session
  const [commencementGrades] = useState<Record<string, CandidateGrade>>(() => {
    const saved = localStorage.getItem('exam_portal_grades');
    return saved ? JSON.parse(saved) : {};
  });

  // Default virtual time to "08:15" (reporting time for session 1)
  const [virtualTime, setVirtualTime] = useState<string>('08:15');
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  // Real-time Countdown states (preset to 10 minutes = 600 seconds by default)
  const [countdownTime, setCountdownTime] = useState<number>(600);
  const [countdownMax, setCountdownMax] = useState<number>(600);
  const [isCountdownRunning, setIsCountdownRunning] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('exam_portal_checked_in', JSON.stringify(checkedIn));
  }, [checkedIn]);

  useEffect(() => {
    localStorage.setItem('exam_portal_grades', JSON.stringify(grades));
  }, [grades]);

  // Real-time Countdown ticker effect
  useEffect(() => {
    if (!isCountdownRunning) return;

    const timer = setInterval(() => {
      setCountdownTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCountdownRunning(false);
          
          // Play classic exam alarm chime using Web Audio API
          try {
            const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioCtx) {
              const ctx = new AudioCtx();
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.frequency.setValueAtTime(660, ctx.currentTime);
              gain.gain.setValueAtTime(0.5, ctx.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
              osc.start();
              osc.stop(ctx.currentTime + 1.5);
            }
          } catch (e) {
            console.log('Audio chiming blocked or unsupported');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCountdownRunning]);

  // Virtual clock auto-play effect (1 virtual minute every 1.5 real seconds)
  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setVirtualTime((prev) => {
        const [hoursStr, minutesStr] = prev.split(':');
        let hours = parseInt(hoursStr, 10);
        let minutes = parseInt(minutesStr, 10);
        
        minutes += 1;
        if (minutes >= 60) {
          minutes = 0;
          hours += 1;
        }
        
        if (hours >= 12) {
          hours = 8; // reset loop back to 8:00 AM
          minutes = 0;
        }

        const hStr = String(hours).padStart(2, '0');
        const mStr = String(minutes).padStart(2, '0');
        return `${hStr}:${mStr}`;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const toggleCheckIn = (id: string) => {
    setCheckedIn((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const bulkCheckIn = (ids: string[], status: boolean) => {
    setCheckedIn((prev) => {
      const updated = { ...prev };
      ids.forEach(id => {
        updated[id] = status;
      });
      return updated;
    });
  };

  const saveGrade = (id: string, grade: CandidateGrade) => {
    setGrades((prev) => ({
      ...prev,
      [id]: grade,
    }));
  };

  const deleteGrades = (ids: string[]) => {
    setGrades((prev) => {
      const updated = { ...prev };
      ids.forEach(id => {
        delete updated[id];
      });
      return updated;
    });
  };

  const resetGradesToCommencement = () => {
    setGrades({});
    localStorage.removeItem('exam_portal_grades');
  };

  return (
    <ExamContext.Provider
      value={{
        checkedIn,
        grades,
        toggleCheckIn,
        bulkCheckIn,
        saveGrade,
        virtualTime,
        setVirtualTime,
        isAutoPlay,
        setIsAutoPlay,
        selectedCandidateId,
        setSelectedCandidateId,
        countdownTime,
        countdownMax,
        isCountdownRunning,
        setCountdownTime,
        setCountdownMax,
        setIsCountdownRunning,
        commencementGrades,
        resetGradesToCommencement,
        deleteGrades,
      }}
    >
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};
