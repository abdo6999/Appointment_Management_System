# Patient Frontend - Appointment Management System

This is the **Patient Frontend** of the Appointment Management System built with **Angular**. The frontend allows patients to log in, register, view available doctors, book appointments, and manage their profile.

## Components

The following Angular components are implemented in this section:

- **LoginComponent**: Handles user login functionality for patients.
- **SignUpComponent**: Allows new patients to register and create an account.
- **LoadingComponent**: Displays a loading spinner while data is being fetched.
- **HomeComponent**: Displays the homepage where patients can navigate to different sections.
- **DoctorsComponent**: Displays a list of available doctors for booking.
- **BookingsComponent**: Displays a list of appointments that the patient has booked.
- **ProfileComponent**: Displays the patient's profile information and allows for updating.
- **NavComponent**: The navigation bar component for accessing different parts of the app.
- **BookComponent**: Allows patients to book an appointment with a doctor.
- **GuestComponent**: Allows guest users (who are not logged in) to book appointments using just an email.

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

This will compile and run the application on `http://localhost:4200`. Open this URL in your web browser to access the Patient Frontend.

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

- **Login**: Access the Login page to authenticate.
- **Sign Up**: Register as a new patient.
- **Doctors**: Browse through the list of available doctors.
- **Bookings**: View and manage your booked appointments.
- **Profile**: View and update your profile information.
- **Book an Appointment**: Choose a doctor and time slot to schedule an appointment.
- **Guest Booking**: If you're not logged in, you can still book an appointment as a guest using just your email.

