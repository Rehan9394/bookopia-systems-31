
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Users = () => {
  // Sample data - in a real app this would come from a database
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', avatar: null },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Booking Agent', avatar: null },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Owner', avatar: null },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Cleaning Staff', avatar: null },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', role: 'Admin', avatar: null },
  ];

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

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-1">Manage system users and their permissions</p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New User
        </Button>
      </div>
      
      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search users..." 
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              All Roles
            </Button>
            <Button variant="outline" className="flex-1">
              Admins
            </Button>
            <Button variant="outline" className="flex-1">
              Booking Agents
            </Button>
          </div>
        </div>
      </Card>
      
      <Card>
        <Table>
          <TableCaption>A list of all system users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar || undefined} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <span>{user.name}</span>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge className={getRoleColor(user.role)} variant="outline">{user.role}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Users;
