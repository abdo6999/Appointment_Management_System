# Doctor Frontend - Appointment Management System

This is the **Doctor Frontend** of the Appointment Management System built with **Angular**. The frontend allows doctors to log in, manage their work schedule, view and update appointments, and manage their profile.

## Components

The following Angular components are implemented in this section:

- **LoginComponent**: Handles user login functionality for doctors.
- **WorkScheduleComponent**: Allows doctors to set and manage their working hours.
- **ProfileComponent**: Displays and allows doctors to update their profile information.
- **DoctorAppointmentsComponent**: Displays and allows doctors to view and update their scheduled appointments.
- **HomeComponent**: Displays the homepage where doctors can navigate to different sections of the app.

## Prerequisites

Before running the frontend, ensure you have the following installed:

- **Node.js** (>= v12.0.0)
- **Angular CLI** (>= v12.0.0)
- **npm** (>= v6.0.0)

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository_url>
```

### 2. Install Dependencies

Navigate to the project folder and install the required dependencies:

```bash
cd <project_folder>
npm install
```

### 3. Run the Application

Start the Angular development server:

```bash
ng serve
```

This will compile and run the application on `http://localhost:4200`. Open this URL in your web browser to access the Doctor Frontend.

### 4. Configuration

Make sure to update the environment configuration files (`src/environments/environment.ts`) with the appropriate backend API URL, for example:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'  // Replace with the backend URL
};
```

### 5. Navigate the Application

Once the frontend is running, you can use the following features:

- **Login**: Access the Login page to authenticate as a doctor.
- **Work Schedule**: Set and manage your working hours for appointments.
- **Appointments**: View and update appointments that patients have booked with you.
- **Profile**: View and update your profile information.
