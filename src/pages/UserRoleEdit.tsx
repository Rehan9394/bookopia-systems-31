
import React from 'react';
import { useParams } from 'react-router-dom';
import UserRoleForm from '@/components/settings/UserRoleForm';

export default function UserRoleEdit() {
  const { id } = useParams<{ id: string }>();
  
  return <UserRoleForm roleId={id} />;
}
