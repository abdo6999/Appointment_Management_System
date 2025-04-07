CREATE TABLE time_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    work_schedule_id UUID REFERENCES work_schedules(id) ON DELETE CASCADE,
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
    slot_start_time TEXT NOT NULL,  
    slot_end_time TEXT NOT NULL,    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE appointments
ADD CONSTRAINT fk_time_slot_id
FOREIGN KEY (time_slot_id)
REFERENCES time_slots(id)
ON DELETE CASCADE;


