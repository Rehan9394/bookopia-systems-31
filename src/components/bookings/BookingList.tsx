import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LayoutGrid, List, Eye, Pencil, Trash2, Calendar, Clock, User, Home, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { useToast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  guestName: string;
  roomNumber: string;
  property: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled' | 'pending';
  totalAmount: string;
  paymentStatus: 'paid' | 'partial' | 'unpaid';
  guestAvatar?: string;
}

interface BookingListProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
  bookings?: Booking[];
  isLoading?: boolean;
}

export function BookingList({ 
  view, 
  onViewChange,
  bookings: propBookings,
  isLoading = false
}: BookingListProps) {
  const { toast } = useToast();
  
  // Sample data - in a real app this would come from props or an API
  const sampleBookings: Booking[] = [
    {
      id: 'BK12345',
      guestName: 'John Smith',
      roomNumber: '101',
      property: 'Marina Tower',
      checkIn: '2025-04-05',
      checkOut: '2025-04-10',
      status: 'confirmed',
      totalAmount: '$750',
      paymentStatus: 'paid'
    },
    {
      id: 'BK12346',
      guestName: 'Sarah Johnson',
      roomNumber: '204',
      property: 'Downtown Heights',
      checkIn: '2025-04-07',
      checkOut: '2025-04-12',
      status: 'pending',
      totalAmount: '$850',
      paymentStatus: 'unpaid'
    },
    {
      id: 'BK12347',
      guestName: 'Michael Brown',
      roomNumber: '305',
      property: 'Marina Tower',
      checkIn: '2025-04-03',
      checkOut: '2025-04-08',
      status: 'checked-in',
      totalAmount: '$680',
      paymentStatus: 'paid'
    },
    {
      id: 'BK12348',
      guestName: 'Emma Wilson',
      roomNumber: '402',
      property: 'Downtown Heights',
      checkIn: '2025-04-01',
      checkOut: '2025-04-04',
      status: 'checked-out',
      totalAmount: '$450',
      paymentStatus: 'paid'
    },
    {
      id: 'BK12349',
      guestName: 'James Taylor',
      roomNumber: '103',
      property: 'Marina Tower',
      checkIn: '2025-04-10',
      checkOut: '2025-04-15',
      status: 'confirmed',
      totalAmount: '$920',
      paymentStatus: 'partial'
    },
    {
      id: 'BK12350',
      guestName: 'Olivia Garcia',
      roomNumber: '201',
      property: 'Downtown Heights',
      checkIn: '2025-04-08',
      checkOut: '2025-04-09',
      status: 'cancelled',
      totalAmount: '$150',
      paymentStatus: 'unpaid'
    }
  ];
  
  // Use provided bookings or fall back to sample data
  const bookings = propBookings || sampleBookings;
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed':
        return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>;
      case 'checked-in':
        return <Badge className="bg-green-100 text-green-800">Checked In</Badge>;
      case 'checked-out':
        return <Badge className="bg-gray-100 text-gray-800">Checked Out</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getPaymentStatusBadge = (status: string) => {
    switch(status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'partial':
        return <Badge className="bg-yellow-100 text-yellow-800">Partial</Badge>;
      case 'unpaid':
        return <Badge className="bg-red-100 text-red-800">Unpaid</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const handleDeleteBooking = (bookingId: string) => {
    // In a real app, this would call an API to delete the booking
    toast({
      title: "Booking Deleted",
      description: `Booking ${bookingId} has been removed.`,
      variant: "destructive"
    });
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end mb-4">
          <div className="bg-gray-200 h-10 w-24 rounded animate-pulse"></div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-gray-100 h-24 rounded animate-pulse"></div>
        ))}
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="bg-background border rounded-md p-1 flex">
          <Button
            variant={view === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('list')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={view === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {view === 'list' ? (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={booking.guestAvatar} />
                          <AvatarFallback>{getInitials(booking.guestName)}</AvatarFallback>
                        </Avatar>
                        <span>{booking.guestName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.roomNumber}, {booking.property}</span>
                      </div>
                    </TableCell>
                    <TableCell>{booking.checkIn}</TableCell>
                    <TableCell>{booking.checkOut}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{booking.totalAmount}</span>
                        <span>{getPaymentStatusBadge(booking.paymentStatus)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/bookings/${booking.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/bookings/edit/${booking.id}`}>
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
                                This will permanently delete the booking {booking.id} for {booking.guestName}. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteBooking(booking.id)}>
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
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No bookings found matching your criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className={`
                    h-2 w-full 
                    ${booking.status === 'confirmed' ? 'bg-blue-500' : ''}
                    ${booking.status === 'checked-in' ? 'bg-green-500' : ''}
                    ${booking.status === 'checked-out' ? 'bg-gray-500' : ''}
                    ${booking.status === 'cancelled' ? 'bg-red-500' : ''}
                    ${booking.status === 'pending' ? 'bg-yellow-500' : ''}
                  `}></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={booking.guestAvatar} />
                            <AvatarFallback>{getInitials(booking.guestName)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{booking.guestName}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {booking.id}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        {getStatusBadge(booking.status)}
                        <div className="mt-1">
                          {getPaymentStatusBadge(booking.paymentStatus)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <span>Room {booking.roomNumber}, {booking.property}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.checkIn} to {booking.checkOut}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.totalAmount}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link to={`/bookings/${booking.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link to={`/bookings/edit/${booking.id}`}>
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto opacity-30 mb-3" />
              <p>No bookings found matching your criteria</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
