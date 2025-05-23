import { z } from 'zod';

export const scheduleSchema = z.object({
  id: z.string().optional(), // ID is optional for new schedules
  name: z.string().min(1, 'Schedule name is required'),
  dates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')).min(1, 'At least one date must be selected'), // Validate array of date strings
  productIds: z.array(z.string()).min(1, 'At least one product must be associated'),
});

export type ScheduleFormData = z.infer<typeof scheduleSchema>;
