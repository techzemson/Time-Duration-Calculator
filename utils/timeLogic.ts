import { CalculationResult } from '../types';
import { differenceInBusinessDays, differenceInDays, addDays, isWeekend, differenceInMilliseconds, intervalToDuration } from 'date-fns';

export const calculateDuration = (start: Date, end: Date, excludeWeekends: boolean, holidays: string[]): CalculationResult => {
  let diffMs = differenceInMilliseconds(end, start);
  
  // Basic absolute difference
  const duration = intervalToDuration({ start, end });
  
  const totalDays = diffMs / (1000 * 60 * 60 * 24);
  const totalHours = diffMs / (1000 * 60 * 60);
  const totalMinutes = diffMs / (1000 * 60);
  const totalSeconds = diffMs / 1000;

  // Business Days Calculation
  let businessDays = 0;
  let weekendDays = 0;
  
  // Simple iteration for accurate count if range is reasonable (< 50 years to avoid browser freeze)
  if (Math.abs(differenceInDays(end, start)) < 20000) {
     const daysDiff = Math.abs(differenceInDays(end, start));
     let tempDate = new Date(start);
     
     for (let i = 0; i <= daysDiff; i++) {
        const isSatSun = isWeekend(tempDate);
        if (isSatSun) {
           weekendDays++;
        } else {
           businessDays++;
        }
        tempDate = addDays(tempDate, 1);
     }
     // Adjustment for exact business logic libraries sometimes differing
     businessDays = Math.abs(differenceInBusinessDays(end, start)); 
     // Re-calc weekend days based on total - business
     weekendDays = Math.floor(Math.abs(totalDays)) - businessDays;
  } else {
      businessDays = Math.abs(differenceInBusinessDays(end, start));
      weekendDays = Math.floor(Math.abs(totalDays)) - businessDays;
  }

  // Formatting text
  const parts = [];
  if (duration.years) parts.push(`${duration.years} years`);
  if (duration.months) parts.push(`${duration.months} months`);
  if (duration.days) parts.push(`${duration.days} days`);
  if (duration.hours) parts.push(`${duration.hours} hours`);
  if (duration.minutes) parts.push(`${duration.minutes} minutes`);
  
  const formattedDuration = parts.join(', ') || '0 minutes';

  return {
    diffMilliseconds: diffMs,
    years: duration.years || 0,
    months: duration.months || 0,
    days: duration.days || 0,
    hours: duration.hours || 0,
    minutes: duration.minutes || 0,
    seconds: duration.seconds || 0,
    totalDays: parseFloat(totalDays.toFixed(2)),
    totalHours: parseFloat(totalHours.toFixed(2)),
    totalMinutes: parseFloat(totalMinutes.toFixed(0)),
    totalSeconds: parseFloat(totalSeconds.toFixed(0)),
    businessDays,
    weekendDays: Math.max(0, weekendDays),
    formattedDuration,
    heartbeats: Math.floor(totalMinutes * 80), // Avg 80 bpm
    breaths: Math.floor(totalMinutes * 16), // Avg 16 bpm
  };
};

export const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
}