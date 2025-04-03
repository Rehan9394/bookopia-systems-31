
import React from 'react';
import { useParams } from 'react-router-dom';
import { BookingDetails } from '@/components/bookings/BookingDetails';

const BookingView = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, the booking data would be fetched using the ID
  console.log('Viewing booking with ID:', id);
  
  return <BookingDetails />;
};

export default BookingView;
