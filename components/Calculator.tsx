import React, { useState, useEffect } from 'react';
import { CalculationResult } from '../types';
import { calculateDuration } from '../utils/timeLogic';
import { Results } from './Results';
import { Clock, Calendar, Briefcase, Settings, RefreshCw, ArrowRight, ChevronDown } from 'lucide-react';
import { format, addDays } from 'date-fns';

// Helper to generate arrays for select options
const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

export const Calculator: React.FC = () => {
  // Date State
  const [startDate, setStartDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(addDays(new Date(), 7), "yyyy-MM-dd"));

  // Time State - Start (Explicit AM/PM)
  const [startHour, setStartHour] = useState(format(new Date(), "hh"));
  const [startMinute, setStartMinute] = useState(format(new Date(), "mm"));
  const [startAmPm, setStartAmPm] = useState(format(new Date(), "a"));

  // Time State - End (Explicit AM/PM)
  const [endHour, setEndHour] = useState(format(new Date(), "hh"));
  const [endMinute, setEndMinute] = useState(format(new Date(), "mm"));
  const [endAmPm, setEndAmPm] = useState(format(new Date(), "a"));

  const [includeTime, setIncludeTime] = useState(true);
  const [excludeWeekends, setExcludeWeekends] = useState(false);
  const [salaryPerHour, setSalaryPerHour] = useState(25);
  const [customHolidays, setCustomHolidays] = useState<string[]>([]);

  const [calculating, setCalculating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const handleCalculate = () => {
    setResult(null);
    setCalculating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 80);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      // Convert 12h to 24h for Date parsing
      const get24Hour = (h: string, m: string, ap: string) => {
          let hour = parseInt(h, 10);
          if (ap === 'PM' && hour !== 12) hour += 12;
          if (ap === 'AM' && hour === 12) hour = 0;
          return `${hour.toString().padStart(2, '0')}:${m}`;
      };

      const startTimeStr = get24Hour(startHour, startMinute, startAmPm);
      const endTimeStr = get24Hour(endHour, endMinute, endAmPm);

      const startDateTimeStr = `${startDate}T${includeTime ? startTimeStr : '00:00'}`;
      const endDateTimeStr = `${endDate}T${includeTime ? endTimeStr : '00:00'}`;
      
      const start = new Date(startDateTimeStr);
      const end = new Date(endDateTimeStr);
      
      const res = calculateDuration(start, end, excludeWeekends, customHolidays);
      setResult(res);
      setCalculating(false);
    }, 1000);
  };

  const handleSwap = () => {
    const tempDate = startDate;
    setStartDate(endDate);
    setEndDate(tempDate);

    const tempH = startHour;
    const tempM = startMinute;
    const tempAP = startAmPm;
    
    setStartHour(endHour);
    setStartMinute(endMinute);
    setStartAmPm(endAmPm);

    setEndHour(tempH);
    setEndMinute(tempM);
    setEndAmPm(tempAP);
  };

  const setNow = (field: 'start' | 'end') => {
      const now = new Date();
      const d = format(now, "yyyy-MM-dd");
      const h = format(now, "hh");
      const m = format(now, "mm");
      const ap = format(now, "a");

      if (field === 'start') {
          setStartDate(d);
          setStartHour(h);
          setStartMinute(m);
          setStartAmPm(ap);
      } else {
          setEndDate(d);
          setEndHour(h);
          setEndMinute(m);
          setEndAmPm(ap);
      }
  };

  const TimeSelect = ({ 
      h, setH, m, setM, ap, setAp 
  }: { 
      h: string, setH: (v:string)=>void, 
      m: string, setM: (v:string)=>void, 
      ap: string, setAp: (v:string)=>void 
  }) => (
      <div className="flex gap-1 items-center">
          <div className="relative">
            <select value={h} onChange={(e) => setH(e.target.value)} className="appearance-none w-16 px-2 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 outline-none text-center font-medium">
                {hours.map(hr => <option key={hr} value={hr}>{hr}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-1 top-4 text-gray-400 pointer-events-none"/>
          </div>
          <span className="text-gray-400 font-bold">:</span>
          <div className="relative">
            <select value={m} onChange={(e) => setM(e.target.value)} className="appearance-none w-16 px-2 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 outline-none text-center font-medium">
                {minutes.map(min => <option key={min} value={min}>{min}</option>)}
            </select>
            <ChevronDown size={12} className="absolute right-1 top-4 text-gray-400 pointer-events-none"/>
          </div>
          <div className="relative ml-1">
            <select value={ap} onChange={(e) => setAp(e.target.value)} className="appearance-none w-20 px-2 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:border-blue-500 outline-none text-center font-bold text-gray-700">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
             <ChevronDown size={12} className="absolute right-2 top-4 text-gray-500 pointer-events-none"/>
          </div>
      </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-10 border border-gray-100">
        <div className="p-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
        
        <div className="p-6 md:p-10">
            {/* Input Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start relative">
                
                {/* Start Section */}
                <div className="md:col-span-5 space-y-4">
                    <label className="text-sm font-semibold text-gray-700 flex justify-between items-center">
                        <span className="flex items-center gap-2"><Calendar size={16} className="text-blue-500"/> Start Date & Time</span>
                        <button onClick={() => setNow('start')} className="text-xs text-blue-600 hover:underline">Set Now</button>
                    </label>
                    <div className="flex flex-col gap-3">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all outline-none font-medium text-gray-800"
                        />
                        {includeTime && (
                           <TimeSelect h={startHour} setH={setStartHour} m={startMinute} setM={setStartMinute} ap={startAmPm} setAp={setStartAmPm} />
                        )}
                    </div>
                </div>

                {/* Swap Button */}
                <div className="md:col-span-2 flex justify-center items-center h-full pt-8">
                     <button onClick={handleSwap} className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-colors transform hover:rotate-180 duration-300 shadow-sm" title="Swap Dates">
                         <RefreshCw size={20} />
                     </button>
                </div>

                {/* End Section */}
                <div className="md:col-span-5 space-y-4">
                     <label className="text-sm font-semibold text-gray-700 flex justify-between items-center">
                        <span className="flex items-center gap-2"><Calendar size={16} className="text-purple-500"/> End Date & Time</span>
                        <button onClick={() => setNow('end')} className="text-xs text-blue-600 hover:underline">Set Now</button>
                    </label>
                    <div className="flex flex-col gap-3">
                         <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all outline-none font-medium text-gray-800"
                        />
                         {includeTime && (
                              <TimeSelect h={endHour} setH={setEndHour} m={endMinute} setM={setEndMinute} ap={endAmPm} setAp={setEndAmPm} />
                        )}
                    </div>
                </div>
            </div>

            {/* Advanced Toggles */}
            <div className="mt-8 no-print">
                <button 
                    onClick={() => setAdvancedOpen(!advancedOpen)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
                >
                    <Settings size={16} /> {advancedOpen ? "Hide Advanced Options" : "Show Advanced Options"}
                </button>
                
                {advancedOpen && (
                    <div className="mt-4 p-5 bg-gray-50 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                        <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                            <span className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                                <Clock size={18} className="text-teal-500"/> Include Time
                            </span>
                            <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input type="checkbox" checked={includeTime} onChange={(e) => setIncludeTime(e.target.checked)} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-gray-300 checked:right-0 checked:border-blue-600"/>
                                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                            <span className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                                <Briefcase size={18} className="text-orange-500"/> Exclude Weekends
                            </span>
                            <input 
                                type="checkbox" 
                                checked={excludeWeekends} 
                                onChange={(e) => setExcludeWeekends(e.target.checked)}
                                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                            />
                        </div>

                         <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                            <label className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-1 block">Hourly Rate ($)</label>
                            <input 
                                type="number" 
                                value={salaryPerHour}
                                onChange={(e) => setSalaryPerHour(parseFloat(e.target.value) || 0)}
                                className="w-full text-gray-800 font-medium focus:outline-none"
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Calculate Button */}
            <div className="mt-8 flex flex-col items-center no-print">
                {!calculating ? (
                    <button 
                        onClick={handleCalculate}
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300 transform hover:-translate-y-1 w-full md:w-auto min-w-[200px]"
                    >
                        Calculate Duration
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                ) : (
                    <div className="w-full max-w-md">
                        <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-blue-700">Analysing time data...</span>
                        <span className="text-sm font-medium text-blue-700">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-100 ease-out" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Results Section */}
      {result && <Results result={result} hourlyRate={salaryPerHour} />}
    </div>
  );
};