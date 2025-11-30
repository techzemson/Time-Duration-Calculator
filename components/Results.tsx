import React, { useState } from 'react';
import { CalculationResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DollarSign, Heart, Wind, BrainCircuit, Copy, Check, Clock, Briefcase, Calendar, Zap } from 'lucide-react';
import { generateTimeInsight } from '../services/geminiService';

interface ResultsProps {
  result: CalculationResult;
  hourlyRate: number;
}

const COLORS = ['#3b82f6', '#94a3b8', '#ef4444'];

export const Results: React.FC<ResultsProps> = ({ result, hourlyRate }) => {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [copied, setCopied] = useState(false);

  const pieData = [
    { name: 'Business Days', value: result.businessDays },
    { name: 'Weekend/Non-Work', value: result.weekendDays },
  ];

  // Calculations for extra features
  const standardWorkHours = result.businessDays * 8;
  const workEarnings = (standardWorkHours * hourlyRate).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  const continuousEarnings = (result.totalHours * hourlyRate).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  
  const totalWeeks = (result.totalDays / 7).toFixed(1);
  const totalFortnights = (result.totalDays / 14).toFixed(2);
  const percentageOfYear = ((result.totalDays / 365.25) * 100).toFixed(2);
  const percentageOfLife = ((result.totalDays / (80 * 365.25)) * 100).toFixed(5); // Based on 80 years

  const handleGetInsight = async () => {
    setLoadingAi(true);
    const text = await generateTimeInsight(result.formattedDuration);
    setAiInsight(text);
    setLoadingAi(false);
  };

  const copyToClipboard = async () => {
    const text = `Duration Calculation:\n${result.formattedDuration}\nTotal Days: ${result.totalDays}\nBusiness Days: ${result.businessDays}`;
    try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    } catch (err) {
        console.error('Failed to copy', err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up print-break-inside">
      {/* Primary Result Card */}
      <div className="bg-white rounded-2xl p-6 shadow-xl border-l-8 border-blue-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 no-print">
          <Clock size={120} />
        </div>
        <h2 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Total Duration</h2>
        <div className="text-4xl md:text-5xl font-extrabold text-blue-900 break-words">
          {result.formattedDuration}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {result.totalDays} Total Days
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            {result.businessDays} Business Days
          </span>
           <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            {result.weekendDays} Weekend Days
          </span>
        </div>
      </div>

      {/* Visualizations Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-gray-800 mb-4 w-full text-left">Time Composition</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                    >
                    {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Detailed Breakdown</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase">Hours</p>
                    <p className="text-xl font-bold text-gray-700">{result.totalHours.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase">Minutes</p>
                    <p className="text-xl font-bold text-gray-700">{result.totalMinutes.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase">Seconds</p>
                    <p className="text-xl font-bold text-gray-700">{result.totalSeconds.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase">Milliseconds</p>
                    <p className="text-xl font-bold text-gray-700">{result.diffMilliseconds.toLocaleString()}</p>
                </div>
            </div>
        </div>
      </div>

      {/* EXTRA FEATURE: Productivity Analysis */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg print-break-inside">
         <div className="flex items-center gap-2 mb-4">
            <Briefcase className="text-blue-400" />
            <h3 className="text-lg font-bold">Productivity & Work Analysis</h3>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-700/50 p-4 rounded-xl">
                <p className="text-slate-400 text-xs uppercase mb-1">Standard Work Hours (8h/day)</p>
                <p className="text-2xl font-bold text-blue-300">{standardWorkHours.toLocaleString()} hrs</p>
            </div>
             <div className="bg-slate-700/50 p-4 rounded-xl">
                <p className="text-slate-400 text-xs uppercase mb-1">Work Earnings (@ ${hourlyRate}/hr)</p>
                <p className="text-2xl font-bold text-green-400">{workEarnings}</p>
            </div>
             <div className="bg-slate-700/50 p-4 rounded-xl">
                <p className="text-slate-400 text-xs uppercase mb-1">24/7 Earnings (Continuous)</p>
                <p className="text-2xl font-bold text-purple-400">{continuousEarnings}</p>
            </div>
         </div>
      </div>

       {/* EXTRA FEATURE: Alternative Units & Perspective */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
             <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="text-orange-500" size={20}/> Alternative Units
             </h3>
             <div className="space-y-3">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Weeks</span>
                    <span className="font-bold text-gray-900">{totalWeeks}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-600">Fortnights</span>
                    <span className="font-bold text-gray-900">{totalFortnights}</span>
                </div>
                 <div className="flex justify-between items-center pb-2">
                    <span className="text-gray-600">Decades</span>
                    <span className="font-bold text-gray-900">{(result.totalDays / 3652.5).toFixed(4)}</span>
                </div>
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
             <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Zap className="text-yellow-500" size={20}/> Perspective
             </h3>
             <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">% of a Year</span>
                        <span className="font-bold">{percentageOfYear}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min(parseFloat(percentageOfYear), 100)}%` }}></div>
                    </div>
                </div>
                 <div>
                    <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">% of Average Life (80y)</span>
                        <span className="font-bold">{percentageOfLife}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.min(parseFloat(percentageOfLife), 100)}%` }}></div>
                    </div>
                </div>
             </div>
          </div>
      </div>

      {/* Fun Facts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-6 rounded-2xl shadow border border-rose-200">
            <div className="flex items-center space-x-2 text-rose-700 mb-2">
                <Heart size={20} />
                <h3 className="font-bold">Biological Cost</h3>
            </div>
            <p className="text-sm text-rose-600 mb-1">Heartbeats (avg):</p>
            <p className="text-xl font-bold text-rose-900">{result.heartbeats.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-2xl shadow border border-indigo-200">
             <div className="flex items-center space-x-2 text-indigo-700 mb-2">
                <Wind size={20} />
                <h3 className="font-bold">Breaths Taken</h3>
            </div>
            <p className="text-sm text-indigo-600 mb-1">Breaths (avg):</p>
            <p className="text-xl font-bold text-indigo-900">{result.breaths.toLocaleString()}</p>
          </div>
      </div>

      {/* AI Insight Section */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
                <BrainCircuit className="text-blue-400" /> 
                Time Travel Trivia & Insights
            </h3>
            {!aiInsight && !loadingAi && (
                 <button 
                 onClick={handleGetInsight}
                 className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition-colors no-print"
               >
                 Generate Insights
               </button>
            )}
        </div>
        
        {loadingAi && (
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-700 rounded"></div>
                    <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                </div>
            </div>
        )}

        {aiInsight && (
            <div className="prose prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: aiInsight.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
        )}
         {!aiInsight && !loadingAi && (
            <p className="text-slate-400 text-sm">
                Unlock historical or fun facts about this specific duration using Google's Gemini AI. 
                Click the button above to discover what could be done in {result.formattedDuration}.
            </p>
         )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center pt-4 no-print">
        <button onClick={copyToClipboard} className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-medium transition-all min-w-[160px] justify-center">
            {copied ? <Check size={18} className="text-green-600"/> : <Copy size={18} />} 
            {copied ? 'Copied!' : 'Copy Results'}
        </button>
      </div>
    </div>
  );
};