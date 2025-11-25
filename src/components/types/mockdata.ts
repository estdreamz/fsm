import { WaterQualityDataPoint } from './types';

// Helper to generate a 24h format time array starting from a given hour (default 00:00)
export const generateTimeLabels = (startHour = 0): string[] => {
  const times: string[] = [];
  let hour = startHour;
  for (let i = 0; i < 24; i++) {
    const timeStr = `${hour.toString().padStart(2, '0')}:00`;
    times.push(timeStr);
    hour = (hour + 1) % 24;
  }
  return times;
};

// Generate minute-resolution time strings for a 24-hour window starting at 06:00
export const generateMinuteTimes = (startHour = 0, minutesInDay = 24 * 60): string[] => {
  const times: string[] = [];
  let totalMinutes = startHour * 60;
  for (let i = 0; i < minutesInDay; i++) {
    const minuteOfDay = totalMinutes % (24 * 60);
    const h = Math.floor(minuteOfDay / 60);
    const m = minuteOfDay % 60;
    times.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
    totalMinutes++;
  }
  return times;
};

// Generate labels every `intervalHours` hours starting from `startHour` (e.g., 06:00, 09:00...)
export const generateIntervalHourLabels = (startHour = 0, intervalHours = 3): string[] => {
  const labels: string[] = [];
  for (let h = startHour; h < startHour + 24; h += intervalHours) {
    const hour = h % 24;
    labels.push(`${hour.toString().padStart(2, '0')}:00`);
  }
  return labels;
};

// Given minute-resolution times (24*60 points starting at `startHour`),
// return the indices that correspond to each `intervalHours` tick.
// Example: startHour=6, intervalHours=3 -> indices 0 (06:00), 180 (09:00), ...
export const generateIntervalTickIndices = (
  intervalHours = 3,
  minutesInDay = 24 * 60
): number[] => {
  const indices: number[] = [];
  const minutesPerInterval = intervalHours * 60;
  // index for the starting hour (e.g. 06:00) is 0 in minute-times
  for (let offset = 0; offset < minutesInDay; offset += minutesPerInterval) {
    indices.push(offset);
  }
  return indices;
};

// Generate somewhat realistic data for water quality
export const generateMockData = (startHour = 0, minutesInDay = 24 * 60): WaterQualityDataPoint[] => {
  // Keep hourly labels for x-axis via `generateTimeLabels()`
  // but produce data every minute using `generateMinuteTimes()`
  const minuteTimes = generateMinuteTimes(startHour, minutesInDay);

  // Parameters for base and noise
  const tempBase = 28;
  const doBase = 6.5;
  const phBase = 7.8;

  // shift to center the temperature peak around 14:00
  const peakHour = 14;
  const peakShift = ((peakHour - startHour) / 24);

  return minuteTimes.map((time, index) => {
    const fraction = index / minutesInDay; // 0..~1

    const tempVariation = Math.sin((fraction - peakShift) * Math.PI * 2) * 3;
    const tempNoise = (Math.random() - 0.5) * 0.5;

    const doVariation = Math.cos(fraction * Math.PI * 2) * 1.5;
    const doNoise = (Math.random() - 0.5) * 0.8;

    const phNoise = (Math.random() - 0.5) * 0.4;

    return {
      time,
      temp: parseFloat((tempBase + tempVariation + tempNoise).toFixed(1)),
      do: parseFloat((doBase + doVariation + doNoise).toFixed(1)),
      ph: parseFloat((phBase + phNoise).toFixed(1)),
    };
  });
};

// Generate mock data for a specific window (startHour, hours)
export const generateMockDataRange = (startHour = 0, hours = 9): WaterQualityDataPoint[] => {
  const minutes = hours * 60;
  return generateMockData(startHour, minutes);
};