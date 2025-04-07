import { supabase } from "../supabase";
import { Database, Tables } from "../database.types";

export class AppointmentsModel {
  async createAppointment(appointment: Tables<"appointments">) {
    const { doctor_id, appointment_date, start_time, end_time, patient_id,guest_id } =
      appointment;
    if (!patient_id && !guest_id) {
      return { error: "patient id or guest_id does not exist." };
    }
    const { data: timeSlot, error: timeSlotError } = await supabase
      .from("time_slots")
      .select("id, slot_start_time, slot_end_time")
      .eq("doctor_id", doctor_id!)
      .eq("slot_start_time", start_time)
      .eq("slot_end_time", end_time)
      .single();

    if (timeSlotError || !timeSlot) {
      return { error: "The requested time slot does not exist." };
    }

    const { data: existingAppointment, error: appointmentError } =
      await supabase
        .from("appointments")
        .select("*")
        .eq("time_slot_id", timeSlot.id)
        .eq("appointment_date", appointment_date);
    if (
      appointmentError ||
      (existingAppointment && existingAppointment.length > 0)
    ) {
      return {
        error: "The requested time slot is already booked for this date.",
      };
    }

    const { data: patientAppointments, error: patientError } = await supabase
      .from("appointments")
      .select("id")
      .in("patient_id", [patient_id, guest_id].filter(id => id != null))
      .eq("appointment_date", appointment_date);

      if (patientError) {
        console.error(
          "Error checking patient appointments:",
          patientError.message
        );
        return { error: "Unable to verify patient's existing appointments." };
      }

    if (patientAppointments && patientAppointments.length > 0) {
      return { error: "You already have an appointment booked for this date." };
    }
    const { data: appointmentData, error: insertError } = await supabase
      .from("appointments")
      .insert(appointment)
      .select("*")
      .single();

    if (insertError) {
      return { error: insertError.message };
    }

    return { data: appointmentData };
  }

  async getBookedSlotIdsByDate(
    date: string,
    doctorId: string
  ): Promise<string[] | null> {
    const { data: appointments, error: apptError } = await supabase
      .from("appointments")
      .select("start_time")
      .eq("doctor_id", doctorId)
      .eq("appointment_date", date);
    if (apptError || !appointments) {
      console.error("Error getting appointments:", apptError?.message);
      return null;
    }

    const bookedTimes = appointments.map((a) => a.start_time);

    if (bookedTimes.length === 0) return [];

    const { data: timeSlots, error: slotError } = await supabase
      .from("time_slots")
      .select("id")
      .eq("doctor_id", doctorId)
      .in("slot_start_time", bookedTimes);

    if (slotError || !timeSlots) {
      console.error("Error getting time slots:", slotError?.message);
      return null;
    }

    return timeSlots.map((slot) => slot.id);
  }

  async getAppointmentsByDoctorId(doctorId: string) {
    const { data, error } = await supabase
      .from("appointments")
      .select("*, patients(*,users(name)),doctors(*)")
      .eq("doctor_id", doctorId);

    if (error) {
      return { error: error.message };
    }

    return data;
  }

  async getAppointmentsByPatientId(patientId: string) {
    const { data, error } = await supabase
      .from("appointments")
      .select("*,doctors(*,users(name))")
      .eq("patient_id", patientId);
    if (error) {
      return { error: error.message };
    }
    return data;
  }

  async getAppointmentsByGuestId(guestId: string) {
    const { data, error } = await supabase
      .from("appointments")
      .select("*,doctors(*,users(name))")
      .eq("guest_id", guestId);
    if (error) {
      return { error: error.message };
    }
    return data;
  }

  async updateAppointment(
    appointmentId: string,
    updatedAppointment: Partial<Tables<"appointments">>
  ) {
    const { data, error } = await supabase
      .from("appointments")
      .update(updatedAppointment)
      .eq("id", appointmentId)
      .select("*")
      .single();

    if (error) {
      return { error: error.message };
    }

    return data;
  }

  async cancelAppointment(appointmentId: string) {
    const { data: appointment, error } = await supabase
      .from("appointments")
      .select("time_slot_id, appointment_date")
      .eq("id", appointmentId)
      .single();

    if (error || !appointment) {
      return { error: "Appointment not found." };
    }

    await supabase.from("appointments").delete().eq("id", appointmentId);

    return { message: "Appointment cancelled and time slot is now available." };
  }
}
