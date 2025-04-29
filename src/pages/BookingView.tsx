import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBooking } from '@/hooks/useBookings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { 
  Loader, 
  FileIcon, 
  CalendarDays, 
  User, 
  Building, 
  BedDouble, 
  CreditCard,
  FileText
} from 'lucide-react';

const BookingView = () => {
  const { id } = useParams<{ id: string }>();
  const { data: booking, isLoading, error } = useBooking(id || '');
  
  if (!id) {
    return <div className="p-6">No booking ID provided</div>;
  }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading booking details...</span>
      </div>
    );
  }
  
  if (error || !booking) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-red-500">Failed to load booking details</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'checked-in':
        return <Badge className="bg-blue-100 text-blue-800">Checked In</Badge>;
      case 'checked-out':
        return <Badge className="bg-purple-100 text-purple-800">Checked Out</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Booking Details</h1>
          <p className="text-muted-foreground mt-1">
            Viewing booking {booking.booking_number}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link to={`/bookings/edit/${id}`}>Edit Booking</Link>
          </Button>
          <Button asChild>
            <Link to="/bookings">Back to Bookings</Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Guest Information Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-xl">Guest Information</CardTitle>
              <CardDescription>Guest details and documents</CardDescription>
            </div>
            <User className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Booking Reference</h3>
                <p>{booking.booking_number}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
                {getStatusBadge(booking.status)}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">Guest Name</h3>
              <p className="font-medium">{booking.guest_name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Email Address</h3>
                <p>{booking.guestEmail || "Not provided"}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Phone Number</h3>
                <p>{booking.guestPhone || "Not provided"}</p>
              </div>
            </div>

            {/* Display Guest Document */}
            {booking.guestDocument && (
              <div className="mt-4 border-t pt-4">
                <h3 className="font-medium text-sm text-muted-foreground mb-2">Guest ID/Passport</h3>
                <div className="flex items-center gap-2">
                  <FileIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{booking.guestDocument}</span>
                  <Button variant="outline" size="sm" asChild>
                    <a href={booking.guestDocument} target="_blank" rel="noopener noreferrer">
                      View Document
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Booking Summary Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-xl">Booking Summary</CardTitle>
              <CardDescription>Overview of the current booking</CardDescription>
            </div>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
              <div className="font-medium text-blue-800">Stay Information</div>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <div className="text-muted-foreground">Check-in</div>
                <div className="text-right font-medium">
                  {booking.check_in ? format(new Date(booking.check_in), 'MMM dd, yyyy') : 'Not set'}
                </div>
                <div className="text-muted-foreground">Check-out</div>
                <div className="text-right font-medium">
                  {booking.check_out ? format(new Date(booking.check_out), 'MMM dd, yyyy') : 'Not set'}
                </div>
                <div className="text-muted-foreground">Nights</div>
                <div className="text-right font-medium">
                  {booking.check_in && booking.check_out ? 
                    Math.round((new Date(booking.check_out).getTime() - new Date(booking.check_in).getTime()) / (1000 * 60 * 60 * 24)) : 
                    'N/A'
                  }
                </div>
                <div className="text-muted-foreground">Guests</div>
                <div className="text-right font-medium">
                  {(booking.adults || 0) + (booking.children || 0)} ({booking.adults || 0} adults, {booking.children || 0} children)
                </div>
              </div>
            </div>
            
            <div className="space-y-3 pt-3 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Base Rate:</span>
                <span>${booking.baseRate?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-muted-foreground">Total Amount:</span>
                <span>${booking.amount?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Security Deposit:</span>
                <span>${booking.securityDeposit?.toFixed(2) || '0.00'}</span>
              </div>
            </div>

            <div className="pt-3 border-t">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-muted-foreground">Grand Total:</span>
                <span>${((booking.amount || 0) + (booking.securityDeposit || 0)).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-muted-foreground">Payment Status:</span>
                <Badge variant="outline" className={
                  booking.payment_status === 'paid' ? 'bg-green-50 text-green-700 border-green-200' :
                  booking.payment_status === 'partial' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                  'bg-red-50 text-red-700 border-red-200'
                }>
                  {booking.payment_status?.charAt(0).toUpperCase() + booking.payment_status?.slice(1) || 'Unknown'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Booking Details Card */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-xl">Room Details</CardTitle>
              <CardDescription>Room and property information</CardDescription>
            </div>
            <BedDouble className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Property</h3>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <p>{booking.rooms?.property || 'Not specified'}</p>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Room Number</h3>
                <div className="flex items-center gap-2">
                  <BedDouble className="h-4 w-4 text-muted-foreground" />
                  <p>{booking.rooms?.number || 'Not specified'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <h3 className="font-medium text-sm text-muted-foreground">Booking Dates</h3>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <p>
                  {booking.check_in && booking.check_out 
                    ? `${format(new Date(booking.check_in), 'MMMM d, yyyy')} - ${format(new Date(booking.check_out), 'MMMM d, yyyy')}` 
                    : 'Dates not specified'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Adults</h3>
                <p>{booking.adults || 0}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-muted-foreground">Children</h3>
                <p>{booking.children || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Financial Details Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-xl">Financial Details</CardTitle>
              <CardDescription>Breakdown of costs and fees</CardDescription>
            </div>
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Commission:</span>
                <span>${booking.commission?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tourism Fee:</span>
                <span>${booking.tourismFee?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">VAT:</span>
                <span>${booking.vat?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Net To Owner:</span>
                <span>${booking.netToOwner?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
            
            <div className="pt-3 border-t space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Amount Paid:</span>
                <span className="font-medium text-green-600">${booking.amountPaid?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-red-600">Remaining Amount:</span>
                <span className="font-medium text-red-600">${booking.remainingAmount?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Notes Card */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-xl">Notes</CardTitle>
              <CardDescription>Additional notes and special requests</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            {booking.notes ? (
              <p>{booking.notes}</p>
            ) : (
              <p className="text-muted-foreground italic">No notes available</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-4">
        <Button variant="outline" asChild>
          <Link to="/bookings">Back to Bookings</Link>
        </Button>
        {booking.status === 'confirmed' && (
          <Button>Check In Guest</Button>
        )}
        {booking.status === 'checked-in' && (
          <Button>Check Out Guest</Button>
        )}
      </div>
    </div>
  );
};

export default BookingView;
