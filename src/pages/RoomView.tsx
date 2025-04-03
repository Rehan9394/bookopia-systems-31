
import React from 'react';
import { useParams } from 'react-router-dom';
import { RoomDetails } from '@/components/rooms/RoomDetails';

const RoomView = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, the room data would be fetched using the ID
  console.log('Viewing room with ID:', id);
  
  return <RoomDetails />;
};

export default RoomView;
