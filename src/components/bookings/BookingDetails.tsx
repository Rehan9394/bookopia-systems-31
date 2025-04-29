import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBooking } from '@/hooks/useBookings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader, FileIcon } from 'lucide-react';

export function BookingDetails() {
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

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Booking Details</h1>
          <p className="text-muted-foreground">View booking information</p>
        </div>
        <Button asChild variant="outline">
          <Link to={`/bookings/${id}/edit`}>Edit Booking</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Guest Information Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Guest Information</CardTitle>
            <CardDescription>Guest details and documents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Booking Reference</h3>
                <p className="text-muted-foreground">{booking.booking_number}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Status</h3>
                <p className="text-muted-foreground">{booking.status}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Guest Name</h3>
              <p className="text-muted-foreground">{booking.guest_name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Email Address</h3>
                <p className="text-muted-foreground">{booking.guestEmail}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Phone Number</h3>
                <p className="text-muted-foreground">{booking.guestPhone}</p>
              </div>
            </div>

            {/* Display Guest Document */}
            {booking.guestDocument && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">Guest ID/Passport</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileIcon className="h-4 w-4" />
                  <span>{booking.guestDocument}</span>
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
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
            <CardDescription>Overview of the current booking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
              <div className="font-medium text-blue-800">Stay Information</div>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <div>Check-in</div>
                <div className="text-right font-medium">{booking.check_in}</div>
                <div>Check-out</div>
                <div className="text-right font-medium">{booking.check_out}</div>
                <div>Guests</div>
                <div className="text-right font-medium">
                  {(booking.adults || 0) + (booking.children || 0)} ({booking.adults || 0} adults, {booking.children || 0} children)
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t">
              <div className="flex justify-between text-sm">
                <span>Base Rate:</span>
                <span>${booking.baseRate?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total Amount:</span>
                <span>${booking.amount?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Security Deposit:</span>
                <span>${booking.securityDeposit?.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Details Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
            <CardDescription>Room and stay information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Property</h3>
                <p className="text-muted-foreground">{booking.rooms?.property}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Room Number</h3>
                <p className="text-muted-foreground">{booking.rooms?.number}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Details</CardTitle>
            <CardDescription>Breakdown of costs and fees</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Commission</h3>
              <p className="text-muted-foreground">${booking.commission?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Tourism Fee</h3>
              <p className="text-muted-foreground">${booking.tourismFee?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">VAT</h3>
              <p className="text-muted-foreground">${booking.vat?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Net To Owner</h3>
              <p className="text-muted-foreground">${booking.netToOwner?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Payment Status</h3>
              <p className="text-muted-foreground">{booking.payment_status}</p>
            </div>
          </CardContent>
        </Card>

        {/* Add display for Amount Paid and Remaining Amount in booking details */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>Overview of payment information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Amount Paid</h3>
              <p className="text-muted-foreground">${booking.amountPaid?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Remaining Amount</h3>
              <p className="text-muted-foreground">${booking.remainingAmount?.toFixed(2) || '0.00'}</p>
            </div>
          </CardContent>
        </Card>

        {/* Notes Card */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
            <CardDescription>Additional notes and special requests</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{booking.notes || 'No notes available'}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
