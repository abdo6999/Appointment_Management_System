import { z } from "zod";

export const AppointmentSchema = z.object({
  appointment_date: z.string(),
  created_at: z.string().optional(), 
  doctor_id: z.string(),
  end_time: z.string(),
  id: z.string().optional(),
  notes: z.string().optional(),
  patient_id: z.string().optional().nullable(),
  guest_id:z.string().optional().nullable(),
  start_time: z.string(),
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]), 
  updated_at: z.string().optional(),
});


export type Appointment = z.infer<typeof AppointmentSchema>;