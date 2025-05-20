import {Schedule} from "../types/Schedule";

export const mockSchedules: Schedule[] = [
  {
    id: 'sch1',
    name: 'Lunch Hours',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    startTime: '11:00',
    endTime: '14:00',
    productIds: ['prod1', 'prod2', 'prod4', 'prod6'], // Products available during lunch
  },
  {
    id: 'sch2',
    name: 'Dinner Hours',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    startTime: '17:00',
    endTime: '22:00',
    productIds: ['prod1', 'prod2', 'prod3', 'prod4', 'prod5'], // Products available during dinner
  },
  {
    id: 'sch3',
    name: 'Weekend Brunch',
    days: ['Saturday', 'Sunday'],
    startTime: '09:00',
    endTime: '14:00',
    productIds: ['prod1', 'prod4', 'prod6'], // Products available during brunch
  },
];
