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

  // Default virtual time to "08:15" (reporting time for session 1)
  const [virtualTime, setVirtualTime] = useState<string>('08:15');
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('exam_portal_checked_in', JSON.stringify(checkedIn));
  }, [checkedIn]);

  useEffect(() => {
    localStorage.setItem('exam_portal_grades', JSON.stringify(grades));
  }, [grades]);

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
