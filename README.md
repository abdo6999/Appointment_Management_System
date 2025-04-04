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
- Admin control panel for full management
- Doctors update appointment statuses
- Guests can create appointments using just an email

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (or optionally Angular/React)
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL or MongoDB
- **Authentication**: JWT or session-based with Captcha integration
- **Others**: Bootstrap for styling, bcrypt for password hashing

---

## ✅ To-Do List

### 1. **Setup & Initialization**
- [ ] Set up the project folder structure (client & server)
- [ ] Initialize `npm` in the backend folder
- [ ] Install backend dependencies: `express`, `bcrypt`, `jsonwebtoken`, `dotenv`, `pg` or `mongoose`, etc.
- [ ] Set up database schema for Users, Appointments

### 2. **Backend API**
#### Auth
- [ ] Register endpoint for Patient
- [ ] Login endpoint for Admin, Doctor, Patient
- [ ] Add Captcha verification
- [ ] JWT-based auth middleware

#### User Management
- [ ] Admin: CRUD for Patients & Doctors
- [ ] Patients: View appointments
- [ ] Doctors: View & update appointment status

#### Appointments
- [ ] Appointment creation (Patient or Admin)
- [ ] One appointment per time-slot constraint
- [ ] Appointment listing by role (Patient, Doctor, Admin)
- [ ] Appointment status update (Doctor)

### 3. **Frontend**
- [ ] Login & Register Forms with Captcha
- [ ] Admin Dashboard:
  - [ ] Manage Doctors
  - [ ] Manage Patients
  - [ ] Manage Appointments
- [ ] Doctor Panel:
  - [ ] View Appointments
  - [ ] Update Status
- [ ] Patient Panel:
  - [ ] View Appointments
  - [ ] Create Appointment
- [ ] Guest Appointment Form

### 4. **Captcha Integration**
- [ ] Use Google reCAPTCHA or custom math-based Captcha
- [ ] Validate before form submission (both client & server)

### 5. **Validation & Error Handling**
- [ ] Validate forms (frontend + backend)
- [ ] Handle errors (e.g., overlapping time slots)

### 6. **Deployment**
- [ ] Use Railway/Render/Heroku for backend
- [ ] Use Vercel/Netlify for frontend
- [ ] Configure environment variables for production

---

## 📂 Project Structure (Example)

