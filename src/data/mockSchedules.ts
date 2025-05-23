import {Schedule} from "../types/Schedule";

export const mockSchedules: Schedule[] = [
  {
    id: 'sch1',
    name: 'Lunch Hours (Sample)',
    dates: ['2024-08-01', '2024-08-02', '2024-08-05', '2024-08-06', '2024-08-07'], // Example dates
    productIds: ['prod1', 'prod2', 'prod4', 'prod6'], // Products available during lunch
  },
  {
    id: 'sch2',
    name: 'Dinner Hours (Sample)',
    dates: ['2024-08-01', '2024-08-02', '2024-08-03', '2024-08-04', '2024-08-05', '2024-08-06', '2024-08-07'], // Example dates
    productIds: ['prod1', 'prod2', 'prod3', 'prod4', 'prod5'], // Products available during dinner
  },
  {
    id: 'sch3',
    name: 'Weekend Brunch (Sample)',
    dates: ['2024-08-03', '2024-08-04', '2024-08-10', '2024-08-11'], // Example dates
    productIds: ['prod1', 'prod4', 'prod6'], // Products available during brunch
  },
];
