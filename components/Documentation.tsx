import React from 'react';
import { BookOpen, CheckCircle, Zap, Cpu, Calendar, TrendingUp } from 'lucide-react';

export const Documentation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in-up pb-10">
      
      {/* Intro */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
          <BookOpen className="text-blue-600" size={32} />
          Documentation & User Guide
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Welcome to the <strong>Time Duration Calculator</strong>. This advanced tool is designed to help you calculate the precise duration between two dates, analyze productivity, and gain AI-powered insights into your time. Whether for payroll, project planning, or curiosity, this guide will help you get the most out of it.
        </p>
      </div>

      {/* How to Use Section */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
           <Zap className="text-yellow-500" /> How to Use This Tool
        </h3>
        <div className="space-y-6">
            <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center">1</div>
                <div>
                    <h4 className="font-bold text-lg text-gray-900">Select Start Date & Time</h4>
                    <p className="text-gray-600 mt-1">Choose your starting point using the calendar picker. You can specify the exact hour and minute (AM/PM) for precision.</p>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center">2</div>
                <div>
                    <h4 className="font-bold text-lg text-gray-900">Select End Date & Time</h4>
                    <p className="text-gray-600 mt-1">Choose the target date. Use the "Set Now" shortcut to quickly select the current moment.</p>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center">3</div>
                <div>
                    <h4 className="font-bold text-lg text-gray-900">Configure Advanced Options</h4>
                    <p className="text-gray-600 mt-1">
                        Click "Show Advanced Options" to:
                    </p>
                    <ul className="list-disc ml-5 mt-2 text-gray-500 space-y-1">
                        <li><strong>Exclude Weekends:</strong> Automatically subtract Saturdays and Sundays for business day calculations.</li>
                        <li><strong>Hourly Rate:</strong> Enter your hourly wage to see "Time is Money" earnings estimations.</li>
                    </ul>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center">4</div>
                <div>
                    <h4 className="font-bold text-lg text-gray-900">Calculate & Download</h4>
                    <p className="text-gray-600 mt-1">Click the "Calculate Duration" button. Once the analysis is complete, you can generate an AI insight or click "Download in PDF" to save a report.</p>
                </div>
            </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Cpu className="text-purple-500"/> Advanced Features
            </h3>
            <ul className="space-y-3">
                <li className="flex items-start gap-2">
                    <CheckCircle size={18} className="text-green-500 mt-1" />
                    <span className="text-gray-600"><strong>Millisecond Precision:</strong> Accurate calculations for exact time measurement.</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircle size={18} className="text-green-500 mt-1" />
                    <span className="text-gray-600"><strong>Business Days Logic:</strong> Smart logic to separate working days from weekends.</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircle size={18} className="text-green-500 mt-1" />
                    <span className="text-gray-600"><strong>AI Integration:</strong> Google Gemini powered trivia and historical context.</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircle size={18} className="text-green-500 mt-1" />
                    <span className="text-gray-600"><strong>Mobile Responsive:</strong> Works perfectly on phones, tablets, and desktops.</span>
                </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="text-blue-500"/> Value & Benefits
            </h3>
            <ul className="space-y-3">
                <li className="flex items-start gap-2">
                    <CheckCircle size={18} className="text-green-500 mt-1" />
                    <span className="text-gray-600"><strong>Payroll Estimation:</strong> Quickly estimate potential earnings for a given period.</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircle size={18} className="text-green-500 mt-1" />
                    <span className="text-gray-600"><strong>Life Perspective:</strong> Visualize time as a percentage of your life or a year.</span>
                </li>
                <li className="flex items-start gap-2">
                    <CheckCircle size={18} className="text-green-500 mt-1" />
                    <span className="text-gray-600"><strong>Visual Reports:</strong> Beautiful pie charts and progress bars for presentations.</span>
                </li>
            </ul>
          </div>
      </div>
    </div>
  );
};