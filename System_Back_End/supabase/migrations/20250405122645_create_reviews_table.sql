-- create_reviews_table | Up commands
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),  -- Rating between 1 and 5
  comment TEXT,  -- Optional field for review comments
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Trigger for updating 'updated_at' column
CREATE TRIGGER set_updated_at_reviews
BEFORE UPDATE ON reviews
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
