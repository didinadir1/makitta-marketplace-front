export interface Schedule {
  id: string;
  name: string;
  dates: string[]; // Changed from days, startTime, endTime to an array of dates (e.g., "YYYY-MM-DD")
  productIds: string[];
}