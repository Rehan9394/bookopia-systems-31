
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search, Eye, Pencil, Trash2 } from 'lucide-react';
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
import { Link, useSearchParams } from 'react-router-dom';
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

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

const Users = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Sample data - in a real app this would come from a database
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', avatar: null },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Booking Agent', avatar: null },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Owner', avatar: null },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Cleaning Staff', avatar: null },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', role: 'Admin', avatar: null },
  ];
  
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || "");
  const [roleFilter, setRoleFilter] = useState<string>(searchParams.get('role') || "all");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  
  // Apply filters when filter values change
  useEffect(() => {
    let filtered = users;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }
    
    setFilteredUsers(filtered);
    
    // Update URL with filters
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (roleFilter !== 'all') params.set('role', roleFilter);
    
    setSearchParams(params, { replace: true });
  }, [searchQuery, roleFilter]);

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
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      description: searchQuery ? `Searching for "${searchQuery}"` : "Showing all users",
    });
  };
  
  const handleRoleFilter = (role: string) => {
    setRoleFilter(role === roleFilter ? 'all' : role);
  };
  
  const handleDeleteUser = (userId: number) => {
    // In a real app, this would call an API to delete the user
    toast({
      title: "User Deleted",
      description: `User ID ${userId} has been removed.`,
      variant: "destructive"
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground mt-1">Manage system users and their permissions</p>
        </div>
        <Button className="flex items-center gap-2" asChild>
          <Link to="/users/add">
            <PlusCircle className="h-4 w-4" />
            Add New User
          </Link>
        </Button>
      </div>
      
      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <form onSubmit={handleSearch}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users by name or email..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={roleFilter === 'all' ? "default" : "outline"} 
              className="flex-1"
              onClick={() => handleRoleFilter('all')}
            >
              All Roles
            </Button>
            <Button 
              variant={roleFilter === 'Admin' ? "default" : "outline"} 
              className="flex-1"
              onClick={() => handleRoleFilter('Admin')}
            >
              Admins
            </Button>
            <Button 
              variant={roleFilter === 'Booking Agent' ? "default" : "outline"} 
              className="flex-1"
              onClick={() => handleRoleFilter('Booking Agent')}
            >
              Booking Agents
            </Button>
          </div>
        </div>
        
        {(searchQuery || roleFilter !== 'all') && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'} found
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setSearchQuery("");
                setRoleFilter("all");
                setSearchParams({});
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
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
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/users/${user.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/users/edit/${user.id}`}>
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the user account for {user.name}. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No users found matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Users;
