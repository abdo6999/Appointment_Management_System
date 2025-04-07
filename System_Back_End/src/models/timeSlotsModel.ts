import { supabase } from "../supabase";
import { Database, Tables } from "../database.types";

export class TimeSlotsModel {

  async getTimeSlotsByDoctorId(doctorId: string) {
    const { data, error } = await supabase
      .from("time_slots")
      .select("*")
      .eq("doctor_id", doctorId);
    if (error) {
      return { error: error.message };
    }
    return data;
  }

  async getAvailableTimeSlots(doctorId: string, appointmentDate: string) {
    const { data, error } = await supabase
      .from("time_slots")
      .select("*")
      .eq("doctor_id", doctorId)
      .gte("start_time", new Date(appointmentDate).toISOString())
      .lte("end_time", new Date(appointmentDate).toISOString());
    if (error) {
      return { error: error.message };
    }
    return data;
  }

  async deleteTimeSlotById(timeSlotId: string) {
    const { data, error } = await supabase
      .from("time_slots")
      .delete()
      .eq("id", timeSlotId)
      .select("*")
      .single();
    if (error) {
      return { error: error.message };
    }
    return data;
  }

  async updateTimeSlot(timeSlotId: string, updatedData: Partial<Tables<"time_slots">>) {
    const { data, error } = await supabase
      .from("time_slots")
      .update(updatedData)
      .eq("id", timeSlotId)
      .select("*")
      .single();
    if (error) {
      return { error: error.message };
    }
    return data;
  }
}
