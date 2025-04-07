import { DoctorModel } from "../models/doctorsModel";
import { UserModel } from "../models/usersModel";  // Update with the correct path to your UserController

const user = new UserModel();
const doctorModel = new DoctorModel();

// Helper function to create a delay
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function create() {
  try {
    // Creating Admin
    const admin = {
      username: 'admin',
      password_hash: 'admin',  // You might want to hash this in the createAdmin method
      name: 'Admin User',
      email: 'admin@example.com',
      phone: '1234567890',
      role: 'admin',
    };

    console.log("Creating Admin...");
    const adminResult = await user.createAdmin(admin as any);
    console.log("Admin Created:", adminResult);

    // Creating 10 Doctors
    const doctorProfiles = [
      { name: 'Dr. John Doe', specialization: 'Cardiology', bio: 'Experienced Cardiologist', experience_years: 10, clinic_address: 'Clinic A', consultation_fee: 100, available_days: 'Monday, Wednesday, Friday' },
      { name: 'Dr. Jane Smith', specialization: 'Neurology', bio: 'Neurologist with 8 years of experience', experience_years: 8, clinic_address: 'Clinic B', consultation_fee: 120, available_days: 'Tuesday, Thursday' },
      { name: 'Dr. Michael Brown', specialization: 'Orthopedics', bio: 'Orthopedic Surgeon with 15 years of experience', experience_years: 15, clinic_address: 'Clinic C', consultation_fee: 150, available_days: 'Monday, Friday' },
      { name: 'Dr. Emily Davis', specialization: 'Pediatrics', bio: 'Pediatrician specializing in child care', experience_years: 12, clinic_address: 'Clinic D', consultation_fee: 80, available_days: 'Wednesday, Saturday' },
      { name: 'Dr. William Wilson', specialization: 'Dentistry', bio: 'Expert in cosmetic and general dentistry', experience_years: 10, clinic_address: 'Clinic E', consultation_fee: 90, available_days: 'Tuesday, Friday' },
      { name: 'Dr. Sarah Martinez', specialization: 'Dermatology', bio: 'Specializing in skin conditions and treatments', experience_years: 7, clinic_address: 'Clinic F', consultation_fee: 110, available_days: 'Monday, Thursday' },
      { name: 'Dr. David Lee', specialization: 'General Medicine', bio: 'Experienced in treating various health issues', experience_years: 20, clinic_address: 'Clinic G', consultation_fee: 95, available_days: 'Monday, Wednesday, Saturday' },
      { name: 'Dr. Olivia Clark', specialization: 'Gynecology', bio: 'Experienced gynecologist with a focus on women\'s health', experience_years: 10, clinic_address: 'Clinic H', consultation_fee: 130, available_days: 'Tuesday, Thursday' },
      { name: 'Dr. Daniel Harris', specialization: 'Oncology', bio: 'Specialist in cancer treatment and management', experience_years: 15, clinic_address: 'Clinic I', consultation_fee: 200, available_days: 'Wednesday, Friday' },
      { name: 'Dr. Sophia Walker', specialization: 'Psychiatry', bio: 'Specialized in mental health treatment', experience_years: 8, clinic_address: 'Clinic J', consultation_fee: 100, available_days: 'Monday, Thursday' },
    ];

    // Loop through the profiles to create doctors
    for (const profile of doctorProfiles) {
      const userData = {
        username: profile.name.replace('Dr. ', '').toLowerCase().replace(' ', '_'),
        password_hash: 'doctor123',
        name: profile.name.replace("Dr. ",""),
        email: `${profile.name.replace(' ', '_').toLowerCase()}@example.com`,
        phone: '1234567890',
        role: 'doctor',
      };

      console.log(`Creating Doctor: ${profile.name}`);
      const  {uuid}  = await user.createDoctor(userData as any);
      console.log(`Doctor Created: ${profile.name}, UUID: ${uuid}`);
      console.log(uuid)
      // Create the doctor profile
      const doctorProfile = {
        id: uuid,
        specialization: profile.specialization,
        bio: profile.bio,
        experience_years: profile.experience_years,
        clinic_address: profile.clinic_address,
        consultation_fee: profile.consultation_fee,
        available_days: profile.available_days.split(', ').map(day => day.trim()),
      };
      
      console.log(`Creating Profile for Doctor: ${profile.name}`);
      const doctorProfileResult = await doctorModel.createDoctor(doctorProfile as any);
      console.log(`Profile Created for Doctor: ${profile.name}, Result:`, doctorProfileResult);

      // Delay 1 second to prevent server overload
      await delay(1000); // Delay 1 second
    }
  } catch (error) {
    console.error("Error during creation process:", error);
  }
}

create();
