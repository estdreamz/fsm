export interface WaterQualityDataPoint {
  time: string; // HH:MM
  temp: number; // temperature °C
  do: number;   // dissolved oxygen mg/L
  ph: number;   // pH value
}

export default WaterQualityDataPoint;
export interface WaterQualityDataPoint {
  time: string;
  temp: number;
  do: number; // Dissolved Oxygen
  ph: number;
}

export enum TimeRange {
  Daily = 'Daily',
  Monthly = 'Monthly',
  Quarterly = 'Quarterly',
  Annually = 'Annually'
}

export interface ChartSeries {
  name: string;
  data: number[];
}