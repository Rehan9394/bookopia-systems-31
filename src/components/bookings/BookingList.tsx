
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, Edit, Eye, LogOut, Trash2, User, XCircle } from 'lucide-react';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
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

interface Booking {
  id: string;
  reference: string;
  guestName: string;
  property: string;
  unitNo: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled' | 'pending';
  totalPaid: number;
  securityDeposit?: number;
  commission?: number;
  tourismFee?: number;
  vat?: number;
  netToOwner?: number;
}

// Mock data - would come from API in real app
const bookings: Booking[] = [
  {
    id: '1',
    reference: 'BK-2023-001',
    guestName: 'John Smith',
    property: 'Marina Tower',
    unitNo: '301',
    checkIn: '2023-06-15',
    checkOut: '2023-06-18',
    status: 'confirmed',
    totalPaid: 850.00,
    securityDeposit: 200.00,
    commission: 85.00,
    tourismFee: 25.50,
    vat: 42.50,
    netToOwner: 697.00
  },
  {
    id: '2',
    reference: 'BK-2023-002',
    guestName: 'Emma Johnson',
    property: 'Downtown Heights',
    unitNo: '502',
    checkIn: '2023-06-14',
    checkOut: '2023-06-16',
    status: 'checked-in',
    totalPaid: 620.00,
    securityDeposit: 150.00,
    commission: 62.00,
    tourismFee: 18.60,
    vat: 31.00,
    netToOwner: 508.40
  },
  {
    id: '3',
    reference: 'BK-2023-003',
    guestName: 'Michael Chen',
    property: 'Marina Tower',
    unitNo: '205',
    checkIn: '2023-06-12',
    checkOut: '2023-06-13',
    status: 'checked-out',
    totalPaid: 310.00,
    securityDeposit: 100.00,
    commission: 31.00,
    tourismFee: 9.30,
    vat: 15.50,
    netToOwner: 254.20
  },
  {
    id: '4',
    reference: 'BK-2023-004',
    guestName: 'Sarah Davis',
    property: 'Downtown Heights',
    unitNo: '501',
    checkIn: '2023-06-18',
    checkOut: '2023-06-20',
    status: 'confirmed',
    totalPaid: 620.00,
    securityDeposit: 150.00,
    commission: 62.00,
    tourismFee: 18.60,
    vat: 31.00,
    netToOwner: 508.40
  },
  {
    id: '5',
    reference: 'BK-2023-005',
    guestName: 'Robert Wilson',
    property: 'Marina Tower',
    unitNo: '401',
    checkIn: '2023-06-20',
    checkOut: '2023-06-25',
    status: 'confirmed',
    totalPaid: 1250.00,
    securityDeposit: 300.00,
    commission: 125.00,
    tourismFee: 37.50,
    vat: 62.50,
    netToOwner: 1025.00
  },
  {
    id: '6',
    reference: 'BK-2023-006',
    guestName: 'Lisa Wong',
    property: 'Downtown Heights',
    unitNo: '302',
    checkIn: '2023-06-10',
    checkOut: '2023-06-12',
    status: 'cancelled',
    totalPaid: 0.00,
    securityDeposit: 0.00,
    commission: 0.00,
    tourismFee: 0.00,
    vat: 0.00,
    netToOwner: 0.00
  }
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function getStatusBadge(status: string) {
  switch (status) {
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
      return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
  }
}

interface BookingListProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export function BookingList({ view, onViewChange }: BookingListProps) {
  const { toast } = useToast();

  const handleStatusChange = (bookingId: string, newStatus: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled') => {
    // In a real app, this would call an API to update the booking status
    toast({
      description: `Booking ${bookingId} status changed to ${newStatus}`,
    });
  };

  const handleDelete = (bookingId: string) => {
    // In a real app, this would call an API to delete the booking
    toast({
      description: `Booking ${bookingId} has been deleted`,
      variant: "destructive"
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Bookings</h2>
        <ViewToggle view={view} setView={onViewChange} />
      </div>
      
      {view === 'list' ? (
        <div className="rounded-lg overflow-hidden border border-border">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left font-medium px-6 py-3">Reference</th>
                <th className="text-left font-medium px-6 py-3">Guest</th>
                <th className="text-left font-medium px-6 py-3">Property / Unit</th>
                <th className="text-left font-medium px-6 py-3">Check In/Out</th>
                <th className="text-left font-medium px-6 py-3">Status</th>
                <th className="text-left font-medium px-6 py-3">Amount</th>
                <th className="text-left font-medium px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.map((booking) => (
                <tr key={booking.id} className="group hover:bg-muted/50">
                  <td className="px-6 py-4 text-sm font-medium">{booking.reference}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                        <User className="h-4 w-4" />
                      </div>
                      <span>{booking.guestName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {booking.property} <span className="text-muted-foreground">/ Unit {booking.unitNo}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                      <span>
                        {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    ${booking.totalPaid.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Link to={`/bookings/${booking.id}`}>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/bookings/edit/${booking.id}`}>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      
                      {booking.status === 'confirmed' && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleStatusChange(booking.id, 'checked-in')}
                          className="text-green-600"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {booking.status === 'checked-in' && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleStatusChange(booking.id, 'checked-out')}
                          className="text-blue-600"
                        >
                          <LogOut className="h-4 w-4" />
                        </Button>
                      )}
                      
                      {(booking.status === 'confirmed' || booking.status === 'pending') && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleStatusChange(booking.id, 'cancelled')}
                          className="text-red-500"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the booking. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(booking.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{booking.reference}</p>
                    <h3 className="text-lg font-semibold mt-1">{booking.guestName}</h3>
                  </div>
                  {getStatusBadge(booking.status)}
                </div>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Property:</span>
                    <span>{booking.property} / Unit {booking.unitNo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Check-in:</span>
                    <span>{formatDate(booking.checkIn)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Check-out:</span>
                    <span>{formatDate(booking.checkOut)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Total Paid:</span>
                    <span className="font-semibold">${booking.totalPaid.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                  <Link to={`/bookings/${booking.id}`} className="col-span-1">
                    <Button size="sm" variant="outline" className="w-full">
                      <Eye className="h-3.5 w-3.5 mr-1" />
                      View
                    </Button>
                  </Link>
                  <Link to={`/bookings/edit/${booking.id}`} className="col-span-1">
                    <Button size="sm" variant="outline" className="w-full">
                      <Edit className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                  </Link>
                  
                  {booking.status === 'confirmed' && (
                    <Button 
                      size="sm" 
                      className="col-span-1 w-full"
                      onClick={() => handleStatusChange(booking.id, 'checked-in')}
                    >
                      Check In
                    </Button>
                  )}
                  
                  {booking.status === 'checked-in' && (
                    <Button 
                      size="sm" 
                      className="col-span-1 w-full"
                      onClick={() => handleStatusChange(booking.id, 'checked-out')}
                    >
                      Check Out
                    </Button>
                  )}
                  
                  {(booking.status !== 'confirmed' && booking.status !== 'checked-in') && (
                    <div className="col-span-1">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="outline" className="w-full text-red-500">
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the booking. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(booking.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
