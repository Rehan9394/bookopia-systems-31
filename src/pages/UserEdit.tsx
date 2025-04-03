
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserAdd } from './UserAdd';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UserEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    password: '',
    confirmPassword: '',
    sendInvite: false,
  });

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      // In a real app, this would fetch user data from an API
      setLoading(false);
      toast({
        description: `Loaded user information for ID: ${id}`
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id, toast]);

  if (loading) {
    return (
      <div className="animate-pulse p-6">
        <div className="h-7 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="bg-gray-100 rounded-lg p-6 h-96"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate(`/users/${id}`)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Edit User</h1>
      </div>
      
      <UserAdd mode="edit" initialData={userData} userId={id} />
    </div>
  );
};

export default UserEdit;
