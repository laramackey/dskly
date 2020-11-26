CREATE TABLE bookings (
    seat_id integer NOT NULL,
    booking_date date NOT NULL,
    booking_name text NOT NULL,
    booking_state integer NOT NUlL,
    date_added timestamp WITH TIME ZONE DEFAULT now(),
    PRIMARY KEY (seat_id, booking_date)
); 