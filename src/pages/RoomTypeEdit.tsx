
import React from 'react';
import { useParams } from 'react-router-dom';
import RoomTypeForm from '@/components/settings/RoomTypeForm';

export default function RoomTypeEdit() {
  const { id } = useParams<{ id: string }>();
  
  return <RoomTypeForm roomTypeId={id} />;
}
