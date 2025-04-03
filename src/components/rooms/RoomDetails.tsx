
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CalendarClock, Edit, Home, Loader, Settings, UserCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface RoomDetails {
  id: string;
  roomNumber: string;
  property: string;
  type: string;
  status: 'available' | 'occupied' | 'maintenance';
  description: string;
  amenities: string[];
  basePrice: number;
  owner: string;
  maxOccupancy: number;
  lastCleaned?: string;
  nextBooking?: {
    id: string;
    guestName: string;
    checkIn: string;
    checkOut: string;
  };
  currentBooking?: {
    id: string;
    guestName: string;
    checkIn: string;
    checkOut: string;
  };
  bookingHistory: Array<{
    id: string;
    guestName: string;
    checkIn: string;
    checkOut: string;
    status: 'completed' | 'cancelled';
  }>;
}

// Mock data for a specific room - would come from API in real app
const roomData: RoomDetails = {
  id: '1',
  roomNumber: '101',
  property: 'Marina Tower',
  type: 'Deluxe Suite',
  status: 'available',
  description: 'Luxurious suite with ocean view, featuring modern amenities and a spacious layout perfect for both business and leisure travelers.',
  amenities: ['Ocean View', 'King Bed', 'Mini Bar', 'Smart TV', 'Free WiFi', 'Work Desk', 'En-suite Bathroom', 'Air Conditioning'],
  basePrice: 180,
  owner: 'John Doe',
  maxOccupancy: 2,
  lastCleaned: '2023-11-15 14:30',
  nextBooking: {
    id: 'b1',
    guestName: 'Sarah Davis',
    checkIn: '2023-11-18',
    checkOut: '2023-11-20'
  },
  bookingHistory: [
    {
      id: 'bh1',
      guestName: 'Michael Chen',
      checkIn: '2023-11-01',
      checkOut: '2023-11-03',
      status: 'completed'
    },
    {
      id: 'bh2',
      guestName: 'Emma Johnson',
      checkIn: '2023-10-25',
      checkOut: '2023-10-27',
      status: 'completed'
    },
    {
      id: 'bh3',
      guestName: 'Robert Wilson',
      checkIn: '2023-10-15',
      checkOut: '2023-10-20',
      status: 'cancelled'
    }
  ]
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'available':
      return <Badge className="bg-green-100 text-green-800">Available</Badge>;
    case 'occupied':
      return <Badge className="bg-blue-100 text-blue-800">Occupied</Badge>;
    case 'maintenance':
      return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
  }
}

export function RoomDetails() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/rooms">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Room {roomData.roomNumber}</h1>
              {getStatusBadge(roomData.status)}
            </div>
            <p className="text-muted-foreground mt-1">{roomData.property} • {roomData.type}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to={`/rooms/edit/${roomData.id}`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Room
            </Link>
          </Button>
          <Button>Create Booking</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Room Details</CardTitle>
              <CardDescription>
                Information about Room {roomData.roomNumber}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{roomData.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {roomData.amenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/5">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Base Price</p>
                    <p className="font-medium">${roomData.basePrice} / night</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Max Occupancy</p>
                    <p className="font-medium">{roomData.maxOccupancy} Guests</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Owner</p>
                    <p className="font-medium">{roomData.owner}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Last Cleaned</p>
                    <p className="font-medium">{roomData.lastCleaned || 'Not recorded'}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Current Status</h3>
                  {roomData.status === 'occupied' && roomData.currentBooking ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                      <div className="flex items-start gap-3">
                        <UserCheck className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium">{roomData.currentBooking.guestName}</p>
                          <p className="text-sm text-muted-foreground">
                            Check-in: {formatDate(roomData.currentBooking.checkIn)} • 
                            Check-out: {formatDate(roomData.currentBooking.checkOut)}
                          </p>
                          <Button size="sm" variant="outline" className="mt-2" asChild>
                            <Link to={`/bookings/${roomData.currentBooking.id}`}>
                              View Booking
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : roomData.status === 'maintenance' ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                      <div className="flex items-start gap-3">
                        <Settings className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Under Maintenance</p>
                          <p className="text-sm text-muted-foreground">
                            This room is currently unavailable due to maintenance work.
                          </p>
                          <Button size="sm" variant="outline" className="mt-2">
                            Update Status
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                      <div className="flex items-start gap-3">
                        <Home className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Available for Booking</p>
                          {roomData.nextBooking ? (
                            <p className="text-sm text-muted-foreground">
                              Next booking: {roomData.nextBooking.guestName}, 
                              {formatDate(roomData.nextBooking.checkIn)} - 
                              {formatDate(roomData.nextBooking.checkOut)}
                            </p>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              No upcoming bookings.
                            </p>
                          )}
                          <Button size="sm" className="mt-2">
                            Create Booking
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks for this room</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" size="lg">
                <Loader className="h-4 w-4 mr-2" />
                Update Cleaning Status
              </Button>
              <Button className="w-full justify-start" size="lg">
                <CalendarClock className="h-4 w-4 mr-2" />
                Check Availability
              </Button>
              <Button className="w-full justify-start" variant="outline" size="lg" asChild>
                <Link to={`/rooms/edit/${roomData.id}`}>
                  <Settings className="h-4 w-4 mr-2" />
                  Update Room Details
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Booking History & Analytics</CardTitle>
        </CardHeader>
        <Tabs defaultValue="history">
          <div className="px-6">
            <TabsList className="mb-4">
              <TabsTrigger value="history">Booking History</TabsTrigger>
              <TabsTrigger value="occupancy">Occupancy Rate</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
            </TabsList>
          </div>
          <CardContent>
            <TabsContent value="history" className="mt-0">
              <div className="rounded-lg overflow-hidden border border-border">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left font-medium px-6 py-3">Guest</th>
                      <th className="text-left font-medium px-6 py-3">Check In</th>
                      <th className="text-left font-medium px-6 py-3">Check Out</th>
                      <th className="text-left font-medium px-6 py-3">Status</th>
                      <th className="text-left font-medium px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {roomData.bookingHistory.map((booking) => (
                      <tr key={booking.id} className="hover:bg-muted/50">
                        <td className="px-6 py-4 font-medium">{booking.guestName}</td>
                        <td className="px-6 py-4">{formatDate(booking.checkIn)}</td>
                        <td className="px-6 py-4">{formatDate(booking.checkOut)}</td>
                        <td className="px-6 py-4">
                          <Badge className={
                            booking.status === 'completed' 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/bookings/${booking.id}`}>
                              View Details
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="occupancy" className="mt-0">
              <div className="h-80 flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Occupancy rate chart will be displayed here</p>
              </div>
            </TabsContent>
            <TabsContent value="revenue" className="mt-0">
              <div className="h-80 flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Revenue analytics will be displayed here</p>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
