export interface CalculationResult {
  diffMilliseconds: number;
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  businessDays: number;
  weekendDays: number;
  formattedDuration: string;
  heartbeats: number; // Fun fact
  breaths: number; // Fun fact
}

export interface CalculatorState {
  startDate: string;
  endDate: string;
  includeTime: boolean;
  excludeWeekends: boolean;
  salaryPerHour: number;
  customHolidays: string[]; // List of YYYY-MM-DD strings
}

export type TabType = 'duration' | 'add_subtract' | 'age';
