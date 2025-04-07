-- create_notifications_table | Up commands
CREATE TYPE notification_type AS ENUM ('appointment', 'system');

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,  -- User can be doctor or patient
  message TEXT NOT NULL,
  type notification_type NOT NULL,  -- Enum for notification types (e.g., 'appointment', 'system')
  read BOOLEAN DEFAULT FALSE,  -- Whether the notification is read or not
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enum for notification type

-- Trigger for updating 'updated_at' column
CREATE TRIGGER set_updated_at_notifications
BEFORE UPDATE ON notifications
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
