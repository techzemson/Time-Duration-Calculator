import React, { useState } from 'react';
import { CalculationResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Download, Share2, DollarSign, Heart, Wind, BrainCircuit, Copy, Printer, Check, Clock } from 'lucide-react';
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

  const moneyEarned = (result.totalHours * hourlyRate).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  const handleGetInsight = async () => {
    setLoadingAi(true);
    const text = await generateTimeInsight(result.formattedDuration);
    setAiInsight(text);
    setLoadingAi(false);
  };

  const handlePrint = () => {
    window.print();
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

  const handleShare = async () => {
      const shareData = {
          title: 'Time Duration Result',
          text: `I just calculated a duration of ${result.formattedDuration} (${result.totalDays} days)! Check it out.`,
          url: window.location.href
      };

      if (navigator.share) {
          try {
              await navigator.share(shareData);
          } catch (err) {
              console.log('Error sharing', err);
          }
      } else {
          // Fallback
          copyToClipboard();
          alert('Link copied to clipboard (Share API not supported on this device)');
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

        {/* Breakdown Stats */}
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

      {/* Fun Facts & Money */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl shadow border border-emerald-200">
            <div className="flex items-center space-x-2 text-emerald-700 mb-2">
                <DollarSign size={20} />
                <h3 className="font-bold">Time is Money</h3>
            </div>
            <p className="text-sm text-emerald-600 mb-2">At ${hourlyRate}/hr:</p>
            <p className="text-2xl font-bold text-emerald-900">{moneyEarned}</p>
          </div>

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
        <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-medium transition-all">
            <Printer size={18} /> Print / Save PDF
        </button>
        <button onClick={handleShare} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1">
            <Share2 size={18} /> Share Calculation
        </button>
      </div>
    </div>
  );
};