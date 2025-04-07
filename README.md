### Project Approach and Challenges

I approached this project with the intention of building a comprehensive system, which led to spending considerable time on certain areas, leaving some planned features incomplete or unused as the project deadline approached. Due to this, I had to write parts of the project that I am not entirely satisfied with, such as inconsistencies in organization, lack of clarity, and missing features across different sections. Despite these challenges, I am still determined to submit the project, although I acknowledge there are areas where improvements could be made. I look forward to your honest feedback, which will help me better understand my weaknesses and improve in the future.

### How to Use the Project

1. **Backend Setup**: Start by running the backend as per the provided instructions.
2. **User Creation**: Execute the seed command to create initial users.
3. **Doctor Section**: Open the Doctor section to set their working hours. These will be saved in the system.
4. **Appointment Booking**: Patients can book appointments with the doctor via the Patient section.
5. **View Appointments**: Both the patient and doctor can view the scheduled appointments.




# 🩺 Appointment Management System

An Appointment Management System built with a Full-Stack architecture. This app allows **Admins**, **Doctors**, and **Patients** to manage and book appointments through a secured and organized workflow.

## 👥 User Roles

- **Admin**: Manages doctors, patients, and appointments.
- **Doctor**: Checks appointments and updates appointment status.
- **Patient**: Can register, log in, and create/view appointments.
- **Guest**: Can register an appointment using email only.

## 🧩 Key Features

- User authentication (Login/Register) with Captcha
- Role-based access (Admin, Doctor, Patient)
- Time-slot based appointments (One per hour: 1:00 PM, 2:00 PM, etc.)
- Doctors update appointment statuses
- Guests can create appointments using just an email

## 🛠️ Tech Stack

- **Frontend**: Angular
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL with Supabase
- **Authentication**: JWT or session-based with Captcha integration
- **Others**: Bootstrap for styling, bcrypt for password hashing

## 📂 Project Structure

The project is divided into frontend and backend directories, each handling different parts of the system.

### Frontend Directories:
- **admin_Front_End/**: Admin panel interface for managing appointments, doctors, and patients.
- **doctor_Front_End/**: Doctor interface for managing and viewing appointments.
- **patient_Front_End/**: Patient interface for registration, login, and appointment creation.

### Backend Directory:
- **System_Back_End/**: Server-side code for handling authentication, appointment logic, database interactions, and role management.

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd Appointment-Management-System
   ```

2. **Frontend Setup**:
   - Install Angular dependencies:
     ```bash
     cd admin_Front_End
     npm install
     ```
     Repeat the installation for `doctor_Front_End` and `patient_Front_End`.

3. **Backend Setup**:
   - Install Node.js dependencies:
     ```bash
     cd System_Back_End
     npm install
     ```
   - Setup your **Supabase** account and database.

4. **Run the Application**:
   - Run the frontend:
     ```bash
     cd <frontend_directory>
     ng serve
     ```
   - Run the backend:
     ```bash
     npm run build
     cd /dist
     node .
     ```

## ⚙️ Configuration

- Make sure to update environment variables in both frontend and backend for API endpoints, database configurations, and Captcha keys.

