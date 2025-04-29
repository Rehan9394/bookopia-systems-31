
import React from 'react';
import { useParams } from 'react-router-dom';
import PropertyForm from '@/components/settings/PropertyForm';

export default function PropertyEdit() {
  const { id } = useParams<{ id: string }>();
  
  return <PropertyForm propertyId={id} />;
}
