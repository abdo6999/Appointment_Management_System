import { supabase } from "../supabase";
import { Database, Tables } from "../database.types";

export class WorkSchedulesModel {
  async createWorkSchedule(work_schedule: Tables<"work_schedules">) {
    const { data, error } = await supabase
      .from("work_schedules")
      .insert(work_schedule)
      .select("*")
      .single();

    if (error) {
      return { error: error.message };
    }

    // Check if data is null or undefined
    if (!data) {
      return { error: "No data returned" };
    }

    return data;
  }

  async getWorkScheduleByDoctorId(doctorId: string) {
    const { data, error } = await supabase
      .from("work_schedules")
      .select("*")
      .eq("doctor_id", doctorId)
      .single()
    if (error) {
      return { error: error.message };
    }

    if (!data) {
      return { error: "No work schedule found for this doctor" };
    }

    return data;
  }

  async getAllWorkSchedules() {
    const { data, error } = await supabase.from("work_schedules").select("*");

    if (error) {
      return { error: error.message };
    }

    // Check if data is null or empty
    if (!data || data.length === 0) {
      return { error: "No work schedules available" };
    }

    return data;
  }

  async updateWorkSchedule(
    scheduleId: string,
    updatedSchedule: Partial<Tables<"work_schedules">>
  ) {
    const { data, error } = await supabase
      .from("work_schedules")
      .update(updatedSchedule)
      .eq("id", scheduleId)
      .select("*")
      .single();
      console.log(data)

    if (error) {
      return { error: error.message };
    }

    if (!data) {
      return { error: "Failed to update schedule" };
    }

    return data;
  }

  async deleteWorkSchedule(scheduleId: string) {
    const { data, error } = await supabase
      .from("work_schedules")
      .delete()
      .eq("id", scheduleId)
      .select("*")
      .single();

    if (error) {
      return { error: error.message };
    }

    // Check if data is null
    if (!data) {
      return { error: "Failed to delete schedule" };
    }

    return data;
  }

  async isDoctorAvailable(
    doctorId: string,
    dayOfWeek: Database["public"]["Enums"]["work_schedule_day"],
    requestedTime: string
  ) {
    const { data, error } = await supabase
      .from("work_schedules")
      .select("*")
      .eq("doctor_id", doctorId)
      .contains("work_days", [dayOfWeek])
      .gte("start_time", requestedTime)
      .lte("end_time", requestedTime);

    if (error) {
      return { error: error.message };
    }

    // Check if data is null or empty
    if (!data || data.length === 0) {
      return { error: "Doctor is not available at the requested time" };
    }

    return data;
  }
}
