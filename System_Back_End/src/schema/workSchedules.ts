import { z } from "zod";

export const scheduleSchema = z.object({
  doctor_id: z.string(),
  work_days: z.array(
    z.enum([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ])
  ),
  start_time: z.string(),
  end_time: z.string(),
  appointment_duration: z.string(),
});
