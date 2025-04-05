
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search, Building, DollarSign, Percent, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Owners = () => {
  // Sample data - in a real app this would come from a database
  const owners = [
    { 
      id: 1, 
      name: 'David Miller', 
      email: 'david@example.com', 
      properties: 3, 
      revenue: 45000, 
      occupancy: 78,
      avatar: null 
    },
    { 
      id: 2, 
      name: 'Emma Wilson', 
      email: 'emma@example.com', 
      properties: 2, 
      revenue: 33000, 
      occupancy: 65,
      avatar: null 
    },
    { 
      id: 3, 
      name: 'James Taylor', 
      email: 'james@example.com', 
      properties: 5, 
      revenue: 87000, 
      occupancy: 82,
      avatar: null 
    },
    { 
      id: 4, 
      name: 'Sophia Garcia', 
      email: 'sophia@example.com', 
      properties: 1, 
      revenue: 15000, 
      occupancy: 72,
      avatar: null 
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Property Owners</h1>
          <p className="text-muted-foreground mt-1">Manage all property owners and their units</p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New Owner
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Owners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{owners.length}</div>
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Building className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{owners.reduce((acc, owner) => acc + owner.properties, 0)}</div>
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Building className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{formatCurrency(owners.reduce((acc, owner) => acc + owner.revenue, 0))}</div>
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="p-6 mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search owner by name or email..." 
            className="pl-10"
          />
        </div>
      </Card>
      
      <Card>
        <Table>
          <TableCaption>A list of all property owners and their details.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Owner</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Properties</TableHead>
              <TableHead>Revenue (YTD)</TableHead>
              <TableHead>Avg. Occupancy</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {owners.map((owner) => (
              <TableRow key={owner.id}>
                <TableCell className="font-medium flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={owner.avatar || undefined} />
                    <AvatarFallback>{getInitials(owner.name)}</AvatarFallback>
                  </Avatar>
                  <span>{owner.name}</span>
                </TableCell>
                <TableCell>{owner.email}</TableCell>
                <TableCell>{owner.properties}</TableCell>
                <TableCell>{formatCurrency(owner.revenue)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-muted-foreground" />
                    <span>{owner.occupancy}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Owners;
