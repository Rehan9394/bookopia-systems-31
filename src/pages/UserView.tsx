import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from '@/hooks/useUsers';
import { format } from 'date-fns';

export default function UserView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data: user, isLoading, error } = useUser(id || '');

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  if (error || !user) {
    return <div className="text-center">
      <h3 className="text-xl font-semibold mb-2">User Not Found</h3>
      <p className="text-muted-foreground">The user you are looking for does not exist or could not be loaded.</p>
      <Button variant="outline" className="mt-4" onClick={() => navigate('/users')}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Users
      </Button>
    </div>;
  }

  const handleDelete = () => {
    // Implementation for delete functionality
    toast({
      title: "Not implemented",
      description: "Delete functionality is not implemented yet.",
      variant: "destructive",
    });
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => navigate('/users')}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Users
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/users/${id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit User
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash className="mr-2 h-4 w-4" />
            Delete User
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar_url || ''} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </div>
          <div className="ml-auto">
            <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
              {user.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Role</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Last Active</TableCell>
                <TableCell>
                  {user.last_active ? format(new Date(user.last_active), 'PPp') : 'Never'}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Account Created</TableCell>
                <TableCell>{format(new Date(user.created_at), 'PPp')}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to={`/users/${id}/edit`} className="text-primary text-sm hover:underline">
            Manage User Account
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
