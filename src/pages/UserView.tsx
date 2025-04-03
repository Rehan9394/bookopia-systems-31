
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, UserCheck, UserX, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const UserView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  
  // Mock user data - in a real app, this would be fetched from an API
  const [user, setUser] = useState({
    id: Number(id),
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    avatar: null,
    status: 'Active',
    lastLogin: '2023-11-15T08:30:00',
    dateCreated: '2023-09-01T10:00:00',
    permissions: ['Users', 'Bookings', 'Properties', 'Reports', 'Settings']
  });
  
  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleDeactivate = () => {
    // In a real app, this would call an API to deactivate the user
    toast({
      title: "User Deactivated",
      description: `${user.name} has been deactivated.`,
      variant: "destructive"
    });
    
    setUser({
      ...user,
      status: 'Inactive'
    });
  };
  
  const handleActivate = () => {
    // In a real app, this would call an API to activate the user
    toast({
      title: "User Activated",
      description: `${user.name} has been activated.`,
    });
    
    setUser({
      ...user,
      status: 'Active'
    });
  };
  
  const handleResetPassword = () => {
    // In a real app, this would call an API to send a reset password email
    toast({
      title: "Password Reset Email Sent",
      description: `A password reset email has been sent to ${user.email}.`
    });
  };
  
  const handleDeleteUser = () => {
    // In a real app, this would call an API to delete the user
    toast({
      title: "User Deleted",
      description: `${user.name} has been permanently deleted.`,
      variant: "destructive"
    });
    
    navigate('/users');
  };
  
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin': return 'bg-blue-100 text-blue-800';
      case 'Booking Agent': return 'bg-green-100 text-green-800';
      case 'Owner': return 'bg-purple-100 text-purple-800';
      case 'Cleaning Staff': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="animate-pulse p-6">
        <div className="h-7 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="bg-gray-100 rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="h-20 w-20 bg-gray-200 rounded-full"></div>
            <div className="space-y-3 flex-1">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate('/users')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">User Details</h1>
        <Badge className={user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
          {user.status}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">User Information</CardTitle>
              <CardDescription>Basic information about the user account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user.avatar || undefined} />
                  <AvatarFallback className="text-2xl">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold">{user.name}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="mt-2">
                    <Badge className={getRoleColor(user.role)} variant="outline">
                      {user.role}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                <div>
                  <p className="text-sm text-muted-foreground">Account Created</p>
                  <p className="font-medium">{formatDate(user.dateCreated)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Login</p>
                  <p className="font-medium">{formatDate(user.lastLogin)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Permissions</CardTitle>
              <CardDescription>Access rights and permissions for this user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.permissions.map(permission => (
                  <Badge key={permission} variant="outline">
                    {permission}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Actions</CardTitle>
              <CardDescription>Manage this user account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full gap-2" asChild>
                <Link to={`/users/edit/${id}`}>
                  <Edit className="h-4 w-4" />
                  Edit User
                </Link>
              </Button>
              
              <Button 
                className="w-full gap-2" 
                variant="outline"
                onClick={handleResetPassword}
              >
                <Key className="h-4 w-4" />
                Reset Password
              </Button>
              
              {user.status === 'Active' ? (
                <Button 
                  className="w-full gap-2" 
                  variant="outline"
                  onClick={handleDeactivate}
                >
                  <UserX className="h-4 w-4" />
                  Deactivate User
                </Button>
              ) : (
                <Button 
                  className="w-full gap-2" 
                  variant="outline"
                  onClick={handleActivate}
                >
                  <UserCheck className="h-4 w-4" />
                  Activate User
                </Button>
              )}
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    className="w-full gap-2" 
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete User
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the user account
                      for {user.name} and remove their data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteUser}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserView;
