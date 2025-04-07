-- create_payments_table | Up commands
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed');

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL,
  payment_method TEXT NOT NULL,  -- e.g., 'card', 'cash'
  status payment_status NOT NULL DEFAULT 'pending',  -- Enum for payment status ('pending', 'paid', 'failed')
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enum for payment status

-- Trigger for updating 'updated_at' column
CREATE TRIGGER set_updated_at_payments
BEFORE UPDATE ON payments
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
