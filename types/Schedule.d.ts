export interface Schedule {
  id: string;
  name: string;
  days: string[];
  startTime: string;
  endTime: string;
  productIds: string[];
}
