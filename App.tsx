import React from 'react';
import { Calculator } from './components/Calculator';
import { Clock } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
      
      {/* Header - Simplified */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center md:justify-start h-16 items-center">
            {/* Logo / Title */}
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl text-white">
                <Clock size={24} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-gray-900">Time Duration Calculator</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Hero Text */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Time Duration Calculator
            </h1>
            <p className="text-lg text-gray-600">
              Calculate the exact duration between two dates and times. Includes business days, weekends, and AI-powered insights.
            </p>
          </div>

          {/* Calculator Tool */}
          <Calculator />

          {/* Feature Grid (SEO & Value Prop) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 border-t border-gray-200 pt-16 no-print">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-4">
                <Clock size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Precise Calculation</h3>
              <p className="text-gray-600 text-sm">Get results in years, months, days, hours, and minutes instantly.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-purple-100 p-4 rounded-full text-purple-600 mb-4">
                <Clock size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Business Days</h3>
              <p className="text-gray-600 text-sm">Exclude weekends automatically for accurate work-day planning.</p>
            </div>
             <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-teal-100 p-4 rounded-full text-teal-600 mb-4">
                <Clock size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Visual Breakdown</h3>
              <p className="text-gray-600 text-sm">See charts and detailed stats about the time interval.</p>
            </div>
          </div>

        </div>
      </main>

      {/* Footer - Minimal/Empty */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12 no-print">
        <div className="max-w-7xl mx-auto px-4 text-center">
        </div>
      </footer>

      {/* Global CSS */}
      <style>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #2563EB;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #2563EB;
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;