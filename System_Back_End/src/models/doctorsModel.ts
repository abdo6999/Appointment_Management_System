import { Tables } from "../database.types";
import { supabase } from "../supabase";

export class DoctorModel {

  async createDoctor(doctor:Tables<'doctors'>) {
    const {data , error} = await supabase
    .from('doctors')
    .insert(doctor)
    .select("*") 
    .single()

    if (error) return { error: error.message };
    return data;
  }


  async getDoctorById(doctorId: string) {
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .eq("id", doctorId)
      .single();

    if (error) return { error: error.message };
    return data;
  }

  // Get all doctors
  async getAllDoctors() {
    let { data, error } = await supabase.from("doctors").select("*,users(name)");
    if (error) return { error: error.message };
    if (!data) {
      return []; 
    }
    const flatDoctors = data.map(({ users, ...doctor }) => ({
      ...doctor,
      ...users
    }));
    return flatDoctors;
  }

  // Update doctor details
  async updateDoctor(doctorId: string, updatedDoctor: Partial<Tables<"doctors">>) {
    const { data, error } = await supabase
      .from("doctors")
      .update(updatedDoctor)
      .eq("id", doctorId)
      .select("*")
      .single();

    if (error) return { error: error.message };
    return data;
  }

  // Delete doctor from database
  async deleteDoctor(doctorId: string) {
    const { data, error } = await supabase
      .from("doctors")
      .delete()
      .eq("id", doctorId)
      .select("*")
      .single();

    if (error) return { error: error.message };
    return data;
  }
}
