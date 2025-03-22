
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';

interface RoomBooking {
  id: string;
  guestName: string;
  startDate: string;
  endDate: string;
  status: 'confirmed' | 'checked-in';
}

interface Room {
  id: string;
  number: string;
  property: string;
  bookings: RoomBooking[];
}

// Mock data
const rooms: Room[] = [
  {
    id: '1',
    number: '101',
    property: 'Marina Tower',
    bookings: [
      {
        id: 'b1',
        guestName: 'John Smith',
        startDate: '2023-06-15',
        endDate: '2023-06-18',
        status: 'confirmed'
      },
      {
        id: 'b2',
        guestName: 'Emma Johnson',
        startDate: '2023-06-20',
        endDate: '2023-06-25',
        status: 'confirmed'
      }
    ]
  },
  {
    id: '2',
    number: '102',
    property: 'Marina Tower',
    bookings: [
      {
        id: 'b3',
        guestName: 'Michael Chen',
        startDate: '2023-06-12',
        endDate: '2023-06-17',
        status: 'checked-in'
      }
    ]
  },
  {
    id: '3',
    number: '201',
    property: 'Downtown Heights',
    bookings: []
  },
  {
    id: '4',
    number: '202',
    property: 'Downtown Heights',
    bookings: [
      {
        id: 'b4',
        guestName: 'Sarah Davis',
        startDate: '2023-06-18',
        endDate: '2023-06-20',
        status: 'confirmed'
      }
    ]
  },
  {
    id: '5',
    number: '301',
    property: 'Marina Tower',
    bookings: [
      {
        id: 'b5',
        guestName: 'Robert Wilson',
        startDate: '2023-06-14',
        endDate: '2023-06-19',
        status: 'checked-in'
      }
    ]
  }
];

// Generate array of dates for the calendar view
const generateDates = (startDate: Date, days: number) => {
  const dates = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
};

// Calculate booking position and width for the calendar view
const calculateBookingStyle = (booking: RoomBooking, viewStartDate: Date, totalDays: number) => {
  const startDate = new Date(booking.startDate);
  const endDate = new Date(booking.endDate);
  
  // Calculate days from view start to booking start
  const startDiff = Math.max(0, Math.floor((startDate.getTime() - viewStartDate.getTime()) / (24 * 60 * 60 * 1000)));
  
  // Calculate booking duration in days
  const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
  
  // Ensure the booking is visible in the current view
  if (startDiff >= totalDays || startDiff + duration <= 0) {
    return null;
  }
  
  // Adjust start and width if the booking extends outside the view
  const visibleStart = Math.max(0, startDiff);
  const visibleDuration = Math.min(totalDays - visibleStart, duration - Math.max(0, -startDiff));
  
  return {
    left: `${(visibleStart / totalDays) * 100}%`,
    width: `${(visibleDuration / totalDays) * 100}%`,
    status: booking.status
  };
};

const Availability = () => {
  const [viewStartDate, setViewStartDate] = useState(new Date());
  const totalDays = 14; // Show 2 weeks
  
  const calendarDates = generateDates(viewStartDate, totalDays);
  
  const moveWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(viewStartDate);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setViewStartDate(newDate);
  };
  
  const formatDateHeader = (date: Date) => {
    const day = date.getDate();
    const isToday = new Date().toDateString() === date.toDateString();
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    
    return (
      <div className={`text-center ${isToday ? 'bg-primary/10 rounded-md' : ''}`}>
        <div className="text-xs text-muted-foreground">{dayName}</div>
        <div className={`text-sm font-semibold ${isToday ? 'text-primary' : ''}`}>{day}</div>
      </div>
    );
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Availability Calendar</h1>
          <p className="text-muted-foreground mt-1">View and manage room bookings</p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New Booking
        </Button>
      </div>
      
      <Card className="mb-8">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle>Room Availability</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => moveWeek('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-sm font-medium">
                  {viewStartDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
                <Button variant="outline" size="icon" onClick={() => moveWeek('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Property Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="marina">Marina Tower</SelectItem>
                  <SelectItem value="downtown">Downtown Heights</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardDescription>
            Drag bookings to adjust dates or move between rooms. Click on empty spaces to create new bookings.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-b border-border">
            <div className="grid grid-cols-[150px_1fr] border-b border-border">
              <div className="p-3 font-medium text-sm bg-muted border-r border-border">Room</div>
              <div className="grid grid-cols-14 bg-muted">
                {calendarDates.map((date, i) => (
                  <div key={i} className="p-3 text-center border-r border-border last:border-r-0">
                    {formatDateHeader(date)}
                  </div>
                ))}
              </div>
            </div>
            
            {rooms.map((room) => (
              <div key={room.id} className="grid grid-cols-[150px_1fr] border-b border-border last:border-b-0">
                <div className="p-4 border-r border-border flex flex-col">
                  <span className="font-medium">Room {room.number}</span>
                  <span className="text-sm text-muted-foreground">{room.property}</span>
                </div>
                <div className="relative h-[80px]">
                  {/* Grid lines for days */}
                  <div className="grid grid-cols-14 h-full">
                    {Array.from({ length: totalDays }).map((_, i) => (
                      <div key={i} className="border-r border-border last:border-r-0"></div>
                    ))}
                  </div>
                  
                  {/* Bookings */}
                  {room.bookings.map((booking) => {
                    const style = calculateBookingStyle(booking, viewStartDate, totalDays);
                    if (!style) return null;
                    
                    return (
                      <div 
                        key={booking.id}
                        className={`absolute top-[16px] h-[48px] rounded-md cursor-pointer transition-shadow hover:shadow-md ${
                          style.status === 'confirmed' ? 'bg-blue-100 border border-blue-300' : 'bg-green-100 border border-green-300'
                        }`}
                        style={{ left: style.left, width: style.width }}
                      >
                        <div className="p-2 text-xs font-medium truncate">
                          {booking.guestName}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="text-sm font-medium">Legend:</div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500"></div>
          <span className="text-sm">Confirmed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span className="text-sm">Checked In</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <span className="text-sm">Cancelled</span>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Tip: Drag the edges of a booking to extend or shorten its duration. Drag the entire booking to move it to a different date or room.
      </div>
    </div>
  );
};

export default Availability;
