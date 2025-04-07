-- create_work_schedules_table | Up commands
CREATE TYPE work_schedule_day AS ENUM ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday');

CREATE TABLE work_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  work_days work_schedule_day[] NOT NULL,  
  start_time TEXT NOT NULL,  -- e.g., '08:00 AM'
  end_time TEXT NOT NULL,    -- e.g., '02:00 PM'
  appointment_duration INTERVAL NOT NULL,  -- Duration of the appointment (e.g., '30 minutes')
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enum for days of the week

-- Trigger for updating 'updated_at' column
CREATE TRIGGER set_updated_at_work_schedules
BEFORE UPDATE ON work_schedules
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

-- Create a trigger function to delete old time slots before updating the work schedule
CREATE OR REPLACE FUNCTION delete_old_time_slots()
RETURNS TRIGGER AS $$
BEGIN
  -- Delete the old time slots for the doctor and work schedule
  DELETE FROM time_slots
  WHERE doctor_id = OLD.doctor_id
    AND work_schedule_id = OLD.id;
  
  -- Return the new row (for update)
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger that calls the delete_old_time_slots function before update
CREATE TRIGGER delete_old_time_slots_before_update
BEFORE UPDATE ON work_schedules
FOR EACH ROW
EXECUTE FUNCTION delete_old_time_slots();

-- Modify the generate_time_slots function to insert new time slots after the update
CREATE OR REPLACE FUNCTION generate_time_slots()
RETURNS TRIGGER AS $$
DECLARE
  start_time TIME;
  end_time TIME;
  slot_interval INTERVAL;
  slot_start TIME;
  slot_end TIME;
BEGIN
  start_time := NEW.start_time::time;
  end_time := NEW.end_time::time;
  slot_interval := NEW.appointment_duration;
  slot_start := start_time;
  slot_end := slot_start + slot_interval;

  -- Loop to generate time slots
  WHILE slot_end <= end_time LOOP
    -- Insert the slot with the formatted time
    INSERT INTO time_slots (
      doctor_id,
      work_schedule_id,
      slot_start_time,
      slot_end_time
    ) VALUES (
      NEW.doctor_id,
      NEW.id,
      TO_CHAR(slot_start, 'HH:MIAM'),  
      TO_CHAR(slot_end, 'HH:MIAM')     
    );

    slot_start := slot_end;
    slot_end := slot_start + slot_interval;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to insert time slots after inserting or updating work schedules
CREATE TRIGGER create_or_update_time_slots
AFTER INSERT OR UPDATE ON work_schedules
FOR EACH ROW
EXECUTE FUNCTION generate_time_slots();
