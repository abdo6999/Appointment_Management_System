-- create_doctors_table | Up commands
create table doctors (
  id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  specialization TEXT NOT NULL,
  bio TEXT,
  experience_years INTEGER,
  clinic_address TEXT,
  consultation_fee NUMERIC(10, 2),
  available_days TEXT[], 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


CREATE TRIGGER set_updated_at_doctors
BEFORE UPDATE ON doctors
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();