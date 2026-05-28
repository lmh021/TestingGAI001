export type School = 'SPC' | 'YWGS';

export interface Candidate {
  id: string; // "SPC-5A10" or "YWGS-5A01"
  school: School;
  class: string; // "5A", "5B", etc.
  classNo: string; // "1" or "01"
  name: string;
  reportingTime: string; // "8:15" | "9:25"
  session: 1 | 2;
  groupNo: number; // 1 | 2 | 3 | 4 | 5 | 6 | 7
  candidateLetter: 'A' | 'B' | 'C' | 'D';
  examRoom: string; // e.g. "5A", "201"
  examLocation: 'SPC' | 'YWGS';
}

export interface RoomSchedule {
  roomCode: string; // "5A", "201", etc.
  examinerId: string; // "KYY", "SK", etc.
  location: 'SPC' | 'YWGS';
  groups: {
    groupNo: number;
    prepTime: string; // "8:30"
    examTime: string; // "8:42"
    candidates: {
      A: Candidate | null;
      B: Candidate | null;
      C: Candidate | null;
      D: Candidate | null;
    };
  }[];
}

export interface CandidateGrade {
  pronunciation: number; // 1-6
  vocabulary: number; // 1-6
  organization: number; // 1-6
  strategies: number; // 1-6
  notes?: string;
}
