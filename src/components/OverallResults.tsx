import React, { useState, useMemo } from 'react';
import { useExam } from './ExamContext';
import { allCandidates } from '../examData';
import { Candidate, CandidateGrade } from '../types';
import { 
  Download, 
  Search, 
  SlidersHorizontal, 
  Calendar, 
  GraduationCap, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  FileText, 
  FilterX, 
  CheckCircle, 
  Hourglass, 
  Percent,
  X
} from 'lucide-react';

interface RowData {
  candidate: Candidate;
  grade: CandidateGrade | null;
  avgMark: number;
  status: 'Graded' | 'Pending';
  examDate: string; // "YYYY-MM-DD"
}

// Assign unique, spread dates to candidates based on their groupNo to demonstrate date-filtering beautifully
const getExamDateByGroup = (groupNo: number): string => {
  const day = 24 + groupNo; // Group 1: 2026-05-25, Group 7: 2026-05-31
  return `2026-05-${day}`;
};

export const OverallResults: React.FC = () => {
  const { grades } = useExam();

  // Filters State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedSchool, setSelectedSchool] = useState<'all' | 'SPC' | 'YWGS'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'Graded' | 'Pending'>('all');
  
  // Date filters (defaults of empty to show all)
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Sorting State
  const [sortField, setSortField] = useState<keyof RowData | 'name' | 'class' | 'group' | 'school'>('avgMark');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Compile full candidates dataset with corresponding scores
  const rawDataset = useMemo<RowData[]>(() => {
    return allCandidates.map(cand => {
      const grade = grades[cand.id] || null;
      const avgMark = grade 
        ? (grade.pronunciation + grade.vocabulary + grade.organization + grade.strategies) / 4 
        : 0;
      
      return {
        candidate: cand,
        grade,
        avgMark,
        status: grade ? 'Graded' : 'Pending',
        examDate: getExamDateByGroup(cand.groupNo),
      };
    });
  }, [grades]);

  // List of unique classes for class filter dropdown
  const availableClasses = useMemo<string[]>(() => {
    const classesSet = new Set<string>();
    allCandidates.forEach(c => {
      if (c.class) classesSet.add(c.class);
    });
    return Array.from(classesSet).sort();
  }, []);

  // Filter application
  const filteredDataset = useMemo(() => {
    return rawDataset.filter(row => {
      // 1. Search term match (Name / ID)
      const matchesSearch = 
        row.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.candidate.id.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Class match
      const matchesClass = selectedClass === 'all' || row.candidate.class === selectedClass;

      // 3. School match
      const matchesSchool = selectedSchool === 'all' || row.candidate.school === selectedSchool;

      // 4. Grading Status match
      const matchesStatus = selectedStatus === 'all' || row.status === selectedStatus;

      // 5. Date range match
      let matchesDates = true;
      if (startDate) {
        matchesDates = matchesDates && row.examDate >= startDate;
      }
      if (endDate) {
        matchesDates = matchesDates && row.examDate <= endDate;
      }

      return matchesSearch && matchesClass && matchesSchool && matchesStatus && matchesDates;
    });
  }, [rawDataset, searchTerm, selectedClass, selectedSchool, selectedStatus, startDate, endDate]);

  // Sort application
  const sortedDataset = useMemo(() => {
    const sorted = [...filteredDataset];
    sorted.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'name':
          comparison = a.candidate.name.localeCompare(b.candidate.name);
          break;
        case 'school':
          comparison = a.candidate.school.localeCompare(b.candidate.school);
          break;
        case 'class':
          // Sort by class then classNo
          comparison = a.candidate.class.localeCompare(b.candidate.class);
          if (comparison === 0) {
            comparison = parseInt(a.candidate.classNo) - parseInt(b.candidate.classNo);
          }
          break;
        case 'group':
          comparison = a.candidate.groupNo - b.candidate.groupNo;
          break;
        case 'avgMark':
          comparison = a.avgMark - b.avgMark;
          break;
        case 'examDate':
          comparison = a.examDate.localeCompare(b.examDate);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = 0;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
    return sorted;
  }, [filteredDataset, sortField, sortDirection]);

  // Handle Sort Toggle
  const requestSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc'); // default to higher score / descending order
    }
  };

  // Quick preset dates helpers
  const handleDatePreset = (preset: 'last3days' | 'thisweek' | 'clear') => {
    if (preset === 'last3days') {
      setStartDate('2026-05-26');
      setEndDate('2026-05-29');
    } else if (preset === 'thisweek') {
      setStartDate('2026-05-25');
      setEndDate('2026-05-31');
    } else {
      setStartDate('');
      setEndDate('');
    }
  };

  // Reset all filters in one click
  const handleClearAllFilters = () => {
    setSearchTerm('');
    setSelectedClass('all');
    setSelectedSchool('all');
    setSelectedStatus('all');
    setStartDate('');
    setEndDate('');
  };

  // CSV Exporter Action
  const exportToCSV = () => {
    // CSV Header row
    const headers = [
      'Candidate ID',
      'Name',
      'School',
      'Class & No.',
      'Seat Letter',
      'Exam Group',
      'Exam Room',
      'Exam Location',
      'Reporting Time',
      'Exam Date',
      'Pronunciation Score (1-6)',
      'Strategies Score (1-6)',
      'Vocabulary Score (1-6)',
      'Organization Score (1-6)',
      'Average Score',
      'Status',
      'Remarks / Remarks Notes'
    ];

    // Build Rows
    const rows = sortedDataset.map(row => {
      const cand = row.candidate;
      const grade = row.grade;
      
      // Escape excel fields with quotes to avoid splitting on commas
      const nameEscaped = `"${cand.name.replace(/"/g, '""')}"`;
      const notesEscaped = grade?.notes ? `"${grade.notes.replace(/"/g, '""').replace(/\r?\n/g, ' ')}"` : '""';

      return [
        cand.id,
        nameEscaped,
        cand.school,
        `${cand.class}-${cand.classNo}`,
        cand.candidateLetter,
        `Group ${cand.groupNo}`,
        cand.examRoom,
        cand.examLocation,
        cand.reportingTime,
        row.examDate,
        grade?.pronunciation ?? '',
        grade?.strategies ?? '',
        grade?.vocabulary ?? '',
        grade?.organization ?? '',
        row.avgMark > 0 ? row.avgMark.toFixed(2) : '0.00',
        row.status,
        notesEscaped
      ].join(',');
    });

    // Combine Header with Content
    const csvContent = [headers.join(','), ...rows].join('\n');
    
    // Create actual file download blob
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `DSE_Joint_Exam_Overall_Results_${new Date().toISOString().split('T')[0]}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render column headers with interactive sorting icons
  const renderSortHeader = (label: string, field: typeof sortField) => {
    const isCurrent = sortField === field;
    return (
      <button 
        onClick={() => requestSort(field)}
        className="flex items-center space-x-1 hover:text-slate-900 group font-bold tracking-wider text-[10px] text-slate-500 cursor-pointer uppercase py-1"
      >
        <span>{label}</span>
        <span className="shrink-0">
          {isCurrent ? (
            sortDirection === 'asc' ? 
              <ArrowUp className="w-3.5 h-3.5 text-indigo-600" /> : 
              <ArrowDown className="w-3.5 h-3.5 text-indigo-600" />
          ) : (
            <ArrowUpDown className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
          )}
        </span>
      </button>
    );
  };

  // Metrics calculators
  const stats = useMemo(() => {
    const graded = rawDataset.filter(r => r.status === 'Graded');
    const totalCount = rawDataset.length;
    const gradedCount = graded.length;
    const gradedPercentage = totalCount > 0 ? Math.round((gradedCount / totalCount) * 100) : 0;
    
    // Average mark of all graded candidates
    const avgScoreSum = graded.reduce((sum, current) => sum + current.avgMark, 0);
    const averageScore = gradedCount > 0 ? (avgScoreSum / gradedCount).toFixed(2) : '0.00';

    return {
      totalCount,
      gradedCount,
      gradedPercentage,
      averageScore
    };
  }, [rawDataset]);

  return (
    <div id="overall-results-section" className="space-y-6">
      
      {/* SECTION BANNER SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* STAT 1: TOTAL CANDIDATES */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Candidates</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">{stats.totalCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600">
            <GraduationCap className="w-5 h-5" />
          </div>
        </div>

        {/* STAT 2: GRADED STUDENTS */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Graded Completed</span>
            <span className="text-2xl font-black text-emerald-600 mt-1 block">{stats.gradedCount}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>

        {/* STAT 3: GRADING COMPLETION % */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Evaluation Rate</span>
            <span className="text-2xl font-black text-indigo-650 mt-1 block">{stats.gradedPercentage}%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Percent className="w-5 h-5" />
          </div>
        </div>

        {/* STAT 4: AVERAGE SELECTION MARK */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Class Mean Average</span>
            <span className="text-2xl font-black text-slate-805 mt-1 block">{stats.averageScore} <span className="text-xs font-bold text-slate-400">/ 6.0</span></span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600">
            <FileText className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* FILTER PANEL GRID */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        
        {/* Row 1: Search & School Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Real-time search bar */}
          <div className="relative flex-grow max-w-xl">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search candidate name or registration DSE number..."
              className="w-full text-xs py-2.5 pl-10 pr-4 bg-slate-50 border border-slate-205 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-semibold"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* School Selection Tabs */}
          <div className="flex bg-slate-100 border border-slate-200 p-1 rounded-xl shrink-0">
            <button
              onClick={() => setSelectedSchool('all')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                selectedSchool === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All Schools
            </button>
            <button
              onClick={() => setSelectedSchool('SPC')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                selectedSchool === 'SPC' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              SPC Only
            </button>
            <button
              onClick={() => setSelectedSchool('YWGS')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                selectedSchool === 'YWGS' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              YWGS Only
            </button>
          </div>

        </div>

        {/* Row 2: Secondary Dropdowns (Class, Evaluation Status, Date Ranges) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end pt-2 border-t border-slate-100">
          
          {/* Class Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full text-xs py-2 px-3 bg-slate-50 border border-slate-205 rounded-xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-semibold"
            >
              <option value="all">All Classes (5A - 5E)</option>
              {availableClasses.map(c => (
                <option key={c} value={c}>Class {c}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grading Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs py-2 px-3 bg-slate-50 border border-slate-205 rounded-xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-semibold"
            >
              <option value="all">All Evaluation States</option>
              <option value="Graded">Graded & Submitted</option>
              <option value="Pending">Pending Evaluation</option>
            </select>
          </div>

          {/* Date Picker Start */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>Exam Date from</span>
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min="2026-05-25"
              max="2026-05-31"
              className="w-full text-xs py-1.5 px-3 bg-slate-50 border border-slate-205 rounded-xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-semibold text-slate-700"
            />
          </div>

          {/* Date Picker End */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>Exam Date to</span>
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min="2026-05-25"
              max="2026-05-31"
              className="w-full text-xs py-1.5 px-3 bg-slate-50 border border-slate-205 rounded-xl outline-none focus:bg-white focus:border-indigo-500 transition-all font-semibold text-slate-700"
            />
          </div>

        </div>

        {/* Row 3: Filter Tools Info & Export button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-3 border-t border-slate-100">
          
          {/* Quick Date Presets */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-bold text-[9.5px] uppercase tracking-wide shrink-0">Date Presets:</span>
            <button 
              onClick={() => handleDatePreset('thisweek')}
              className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-705 border border-indigo-100 font-bold rounded-lg transition-colors cursor-pointer text-[10.5px]"
            >
              Whole Exam (May 25-31)
            </button>
            <button 
              onClick={() => handleDatePreset('last3days')}
              className="px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-705 border border-teal-100 font-bold rounded-lg transition-colors cursor-pointer text-[10.5px]"
            >
              May 26 - May 29
            </button>
            {(startDate || endDate || selectedClass !== 'all' || selectedSchool !== 'all' || selectedStatus !== 'all' || searchTerm) && (
              <button
                onClick={handleClearAllFilters}
                className="text-slate-550 hover:text-red-500 flex items-center space-x-1 pl-1 font-bold transition-colors cursor-pointer text-[10.5px]"
              >
                <FilterX className="w-3.5 h-3.5 text-red-500" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Action buttons (Export & Filter count indicator) */}
          <div className="flex items-center gap-3">
            <div className="text-[10px] text-slate-500 font-bold bg-slate-100 border border-slate-200 py-1.5 px-3 rounded-lg">
              Showing {sortedDataset.length} of {rawDataset.length} Entries
            </div>
            
            <button
              onClick={exportToCSV}
              disabled={sortedDataset.length === 0}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs shrink-0 cursor-pointer ${
                sortedDataset.length === 0
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                  : 'bg-indigo-650 text-white hover:bg-indigo-700'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export to CSV ({sortedDataset.length})</span>
            </button>
          </div>

        </div>

      </div>

      {/* CORE ASSESSMENT DATA GRID TABLE */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        
        {sortedDataset.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <FilterX className="w-10 h-10 mx-auto text-slate-300" />
            <h4 className="text-sm font-bold text-slate-700">No candidates match your filters</h4>
            <p className="text-xs max-w-sm mx-auto leading-normal">
              Try search keywords, broadening your school, class, or date ranges, or clear filters to see candidates directory list.
            </p>
            <button
              onClick={handleClearAllFilters}
              className="mt-3 px-3.5 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold rounded-lg text-xs hover:bg-indigo-100 transition-all cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              
              {/* Header */}
              <thead className="bg-slate-50/75 border-b border-slate-200 text-[10.5px]">
                <tr>
                  <th className="py-3.5 px-4 font-bold">{renderSortHeader('Candidate Name & ID', 'name')}</th>
                  <th className="py-3.5 px-4 font-bold">{renderSortHeader('School', 'school')}</th>
                  <th className="py-3.5 px-4 font-bold">{renderSortHeader('Class', 'class')}</th>
                  <th className="py-3.5 px-4 font-bold">{renderSortHeader('Room / Group', 'group')}</th>
                  
                  {/* Score indicators */}
                  <th className="py-3.5 px-2 font-bold text-slate-500 uppercase tracking-wider text-[10px] text-center w-14" title="Pronunciation & Delivery">P</th>
                  <th className="py-3.5 px-2 font-bold text-slate-500 uppercase tracking-wider text-[10px] text-center w-14" title="Vocabulary & Language Patterns">V</th>
                  <th className="py-3.5 px-2 font-bold text-slate-500 uppercase tracking-wider text-[10px] text-center w-14" title="Ideas & Organisation">O</th>
                  <th className="py-3.5 px-2 font-bold text-slate-500 uppercase tracking-wider text-[10px] text-center w-14" title="Communication Strategies">S</th>
                  
                  <th className="py-3.5 px-4 font-bold text-right">{renderSortHeader('Avg Score', 'avgMark')}</th>
                  <th className="py-3.5 px-4 font-bold text-right">{renderSortHeader('Exam Date', 'examDate')}</th>
                  <th className="py-3.5 px-4 font-bold text-center">{renderSortHeader('Status', 'status')}</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-slate-205">
                {sortedDataset.map(({ candidate, grade, avgMark, status, examDate }) => {
                  return (
                    <tr 
                      key={candidate.id} 
                      className="hover:bg-slate-50/50 transition-all text-slate-700"
                    >
                      
                      {/* 1. Name & ID */}
                      <td className="py-3 px-4 font-medium">
                        <div>
                          <div className="font-extrabold text-slate-800 text-[12.5px] hover:text-indigo-600 transition-colors">
                            {candidate.name}
                          </div>
                          <div className="font-mono text-[9px] text-slate-400 font-bold mt-0.5">
                            {candidate.id} • Seat {candidate.candidateLetter}
                          </div>
                        </div>
                      </td>

                      {/* 2. School */}
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded ${
                          candidate.school === 'SPC' 
                            ? 'bg-indigo-50 border border-indigo-200 text-indigo-700' 
                            : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                        }`}>
                          {candidate.school}
                        </span>
                      </td>

                      {/* 3. Class */}
                      <td className="py-3 px-4 font-bold text-slate-700">
                        {candidate.class}-{candidate.classNo}
                      </td>

                      {/* 4. Room & Group */}
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-semibold text-slate-700">Room {candidate.examRoom}</div>
                          <div className="text-[10px] text-slate-400 font-bold mt-0.2">Group {candidate.groupNo}</div>
                        </div>
                      </td>

                      {/* Scores columns (P, V, O, S) */}
                      <td className="py-3 px-2 text-center">
                        <span className={`inline-block w-6 py-1 h-6 rounded text-xs font-mono font-bold align-middle ${
                          grade ? 'bg-slate-100 text-slate-800' : 'text-slate-300 font-black'
                        }`}>
                          {grade?.pronunciation ?? '-'}
                        </span>
                      </td>

                      <td className="py-3 px-2 text-center">
                        <span className={`inline-block w-6 py-1 h-6 rounded text-xs font-mono font-bold align-middle ${
                          grade ? 'bg-slate-100 text-slate-800' : 'text-slate-300 font-black'
                        }`}>
                          {grade?.vocabulary ?? '-'}
                        </span>
                      </td>

                      <td className="py-3 px-2 text-center">
                        <span className={`inline-block w-6 py-1 h-6 rounded text-xs font-mono font-bold align-middle ${
                          grade ? 'bg-slate-100 text-slate-800' : 'text-slate-300 font-black'
                        }`}>
                          {grade?.organization ?? '-'}
                        </span>
                      </td>

                      <td className="py-3 px-2 text-center">
                        <span className={`inline-block w-6 py-1 h-6 rounded text-xs font-mono font-bold align-middle ${
                          grade ? 'bg-slate-100 text-slate-800' : 'text-slate-300 font-black'
                        }`}>
                          {grade?.strategies ?? '-'}
                        </span>
                      </td>

                      {/* Average */}
                      <td className="py-3 px-4 text-right font-mono font-extrabold text-xs text-indigo-750">
                        {status === 'Graded' ? (
                          <span className="bg-indigo-50/75 border border-indigo-100/60 px-2 py-0.8 rounded-lg text-indigo-700">
                            {avgMark.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-3 px-4 text-right text-slate-500 font-medium font-mono text-[10.5px]">
                        {examDate}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold px-2 py-0.8 rounded-xl border ${
                          status === 'Graded'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : 'bg-amber-50 border-amber-250 text-amber-600'
                        }`}>
                          {status === 'Graded' ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-emerald-500" />
                              <span>Graded</span>
                            </>
                          ) : (
                            <>
                              <Hourglass className="w-3 h-3 text-amber-500" />
                              <span>Pending</span>
                            </>
                          )}
                        </span>
                      </td>

                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        )}

      </div>

    </div>
  );
};
