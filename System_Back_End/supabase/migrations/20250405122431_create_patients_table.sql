-- create_patients_table | Up commands

CREATE TABLE patients (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  date_of_birth DATE NOT NULL,
  gender TEXT CHECK (gender IN ('male', 'female')) NOT NULL,
  medical_history TEXT, 
  emergency_contact TEXT,  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Trigger for updating the 'updated_at' column for patients table
CREATE TRIGGER set_updated_at_patients
BEFORE UPDATE ON patients
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
