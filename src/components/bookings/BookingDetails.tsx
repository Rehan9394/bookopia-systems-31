
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  CalendarClock, 
  CreditCard, 
  Edit, 
  FileText, 
  Home, 
  Mail, 
  Phone, 
  Printer, 
  User, 
  Users 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Booking } from '@/services/supabase-types';

interface BookingDetailsProps {
  bookingData: Booking;
}

// Since our database schema doesn't match the component's expected data format,
// we'll create an adapter to transform the Booking data into the format the component expects
interface BookingDetailsUI {
  id: string;
  reference: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  property: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled' | 'pending';
  paymentStatus: 'paid' | 'partial' | 'pending' | 'refunded';
  baseRate: number;
  totalAmount: number;
  adults: number;
  children: number;
  notes?: string;
  createdAt: string;
  paymentHistory?: Array<{
    id: string;
    date: string;
    amount: number;
    method: string;
    status: string;
  }>;
  activityLog?: Array<{
    id: string;
    date: string;
    action: string;
    user: string;
  }>;
}

// Function to adapt the database booking to UI format
function adaptBookingForUI(booking: Booking): BookingDetailsUI {
  // Create mock data for properties that don't exist in our database schema
  return {
    id: booking.id,
    reference: booking.booking_number,
    guestName: booking.guest_name,
    guestEmail: "guest@example.com", // Mock data
    guestPhone: "+1 (555) 123-4567", // Mock data
    property: booking.rooms?.property || "Unknown Property",
    roomNumber: booking.rooms?.number || "Unknown",
    checkIn: booking.check_in,
    checkOut: booking.check_out,
    status: booking.status as 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled' | 'pending',
    paymentStatus: booking.payment_status as 'paid' | 'partial' | 'pending' | 'refunded',
    baseRate: booking.amount / (getNights(booking.check_in, booking.check_out) || 1), // Estimate base rate
    totalAmount: booking.amount,
    adults: 2, // Mock data
    children: 0, // Mock data
    notes: booking.special_requests || undefined,
    createdAt: booking.created_at,
    // Mock payment history
    paymentHistory: [
      {
        id: 'p1',
        date: booking.created_at.split('T')[0],
        amount: booking.amount,
        method: 'Credit Card',
        status: 'Success'
      }
    ],
    // Mock activity log
    activityLog: [
      {
        id: 'a1',
        date: booking.created_at,
        action: 'Booking Created',
        user: 'admin@example.com'
      },
      {
        id: 'a2',
        date: booking.updated_at,
        action: 'Booking Updated',
        user: 'system'
      }
    ]
  };
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function getNights(checkIn: string, checkOut: string) {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = checkOutDate.getTime() - checkInDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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

function getPaymentStatusBadge(status: string) {
  switch (status) {
    case 'paid':
      return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
    case 'partial':
      return <Badge className="bg-yellow-100 text-yellow-800">Partially Paid</Badge>;
    case 'pending':
      return <Badge className="bg-blue-100 text-blue-800">Pending Payment</Badge>;
    case 'refunded':
      return <Badge className="bg-red-100 text-red-800">Refunded</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
  }
}

export function BookingDetails({ bookingData }: BookingDetailsProps) {
  // Transform the database booking to the UI format
  const bookingUI = adaptBookingForUI(bookingData);
  const nights = getNights(bookingUI.checkIn, bookingUI.checkOut);
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/bookings">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Booking {bookingUI.reference}</h1>
              {getStatusBadge(bookingUI.status)}
            </div>
            <p className="text-muted-foreground mt-1">
              {formatDate(bookingUI.checkIn)} - {formatDate(bookingUI.checkOut)} • {nights} {nights > 1 ? 'nights' : 'night'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Guest
          </Button>
          <Button asChild>
            <Link to={`/bookings/edit/${bookingUI.id}`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>
                Created on {formatDate(bookingUI.createdAt)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Guest Information</h3>
                    <div className="bg-muted/30 rounded-md p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{bookingUI.guestName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <a href={`mailto:${bookingUI.guestEmail}`} className="text-primary hover:underline">
                          {bookingUI.guestEmail}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground" />
                        <span>{bookingUI.guestPhone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <span>{bookingUI.adults} Adults, {bookingUI.children} Children</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Payment Information</h3>
                    <div className="bg-muted/30 rounded-md p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Payment Status</span>
                        {getPaymentStatusBadge(bookingUI.paymentStatus)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Base Rate</span>
                        <span>${bookingUI.baseRate.toFixed(2)} / night</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Nights</span>
                        <span>{nights}</span>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between font-bold">
                        <span>Total Amount</span>
                        <span>${bookingUI.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Reservation Details</h3>
                    <div className="bg-muted/30 rounded-md p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Home className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <span className="font-medium">Room {bookingUI.roomNumber}</span>
                          <p className="text-sm text-muted-foreground">{bookingUI.property}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <CalendarClock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <p className="text-xs text-muted-foreground">Check-in</p>
                              <p className="font-medium">{formatDate(bookingUI.checkIn)}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Check-out</p>
                              <p className="font-medium">{formatDate(bookingUI.checkOut)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full" asChild>
                        <Link to={`/rooms/view/${bookingUI.roomNumber}`}>
                          View Room Details
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {bookingUI.notes && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Special Requests / Notes</h3>
                      <div className="bg-muted/30 rounded-md p-4">
                        <p className="text-sm">{bookingUI.notes}</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Actions</h3>
                    <div className="bg-muted/30 rounded-md p-4 space-y-2">
                      {bookingUI.status === 'confirmed' && (
                        <Button className="w-full">Check In Guest</Button>
                      )}
                      {bookingUI.status === 'checked-in' && (
                        <Button className="w-full">Check Out Guest</Button>
                      )}
                      {(bookingUI.status === 'confirmed' || bookingUI.status === 'pending') && (
                        <Button variant="outline" className="w-full text-red-500 hover:text-red-700">
                          Cancel Booking
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks for this booking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" size="lg">
                <CreditCard className="h-4 w-4 mr-2" />
                Process Payment
              </Button>
              <Button className="w-full justify-start" size="lg">
                <FileText className="h-4 w-4 mr-2" />
                Generate Invoice
              </Button>
              <Button className="w-full justify-start" size="lg" variant="outline" asChild>
                <Link to={`/bookings/edit/${bookingUI.id}`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Modify Booking
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <Tabs defaultValue="payments">
          <div className="px-6 pt-6">
            <TabsList className="mb-4">
              <TabsTrigger value="payments">Payment History</TabsTrigger>
              <TabsTrigger value="activity">Activity Log</TabsTrigger>
            </TabsList>
          </div>
          <CardContent className="pt-0">
            <TabsContent value="payments" className="mt-0">
              <div className="rounded-lg overflow-hidden border border-border">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left font-medium px-6 py-3">Date</th>
                      <th className="text-left font-medium px-6 py-3">Amount</th>
                      <th className="text-left font-medium px-6 py-3">Method</th>
                      <th className="text-left font-medium px-6 py-3">Status</th>
                      <th className="text-left font-medium px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {bookingUI.paymentHistory?.map((payment) => (
                      <tr key={payment.id} className="hover:bg-muted/50">
                        <td className="px-6 py-4">{formatDate(payment.date)}</td>
                        <td className="px-6 py-4 font-medium">${payment.amount.toFixed(2)}</td>
                        <td className="px-6 py-4">{payment.method}</td>
                        <td className="px-6 py-4">
                          <Badge className={
                            payment.status === 'Success' 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }>
                            {payment.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Button size="sm" variant="outline">Receipt</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="activity" className="mt-0">
              <div className="rounded-lg overflow-hidden border border-border">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left font-medium px-6 py-3">Date</th>
                      <th className="text-left font-medium px-6 py-3">Action</th>
                      <th className="text-left font-medium px-6 py-3">User</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {bookingUI.activityLog?.map((activity) => (
                      <tr key={activity.id} className="hover:bg-muted/50">
                        <td className="px-6 py-4">{activity.date}</td>
                        <td className="px-6 py-4 font-medium">{activity.action}</td>
                        <td className="px-6 py-4">{activity.user}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
