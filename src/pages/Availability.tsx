
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, FilterX, Printer, DownloadCloud, List, ArrowRight, ArrowLeft, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format, addMonths, subMonths } from 'date-fns';

// Booking interface to define the structure of booking data
interface Booking {
  id: string;
  guestName: string;
  roomNumber: string;
  property: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  totalPaid: string;
}

const Availability = () => {
  const [view, setView] = useState('monthly');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [property, setProperty] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  // Mock data for the availability calendar
  const bookings: Booking[] = [
    { 
      id: 'BK12345', 
      guestName: 'John Smith',
      roomNumber: '101',
      property: 'Marina Tower',
      checkIn: '2025-04-02',
      checkOut: '2025-04-05',
      status: 'checked-in',
      totalPaid: '$450'
    },
    { 
      id: 'BK12346', 
      guestName: 'Sarah Johnson',
      roomNumber: '204',
      property: 'Downtown Heights',
      checkIn: '2025-04-05',
      checkOut: '2025-04-12',
      status: 'confirmed',
      totalPaid: '$1,120'
    },
    { 
      id: 'BK12347', 
      guestName: 'Michael Brown',
      roomNumber: '303',
      property: 'Marina Tower',
      checkIn: '2025-04-10',
      checkOut: '2025-04-15',
      status: 'confirmed',
      totalPaid: '$750'
    },
  ];
  
  // Function to navigate between months
  const navigateMonth = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentDate(addMonths(currentDate, 1));
    } else {
      setCurrentDate(subMonths(currentDate, 1));
    }
  };
  
  // Generate days for the current month
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, month, i + 1);
      return {
        date,
        day: i + 1,
        dayOfWeek: format(date, 'EEE')
      };
    });
  };
  
  // Generate rooms for display
  const getRooms = () => {
    // In a real app, this would be fetched from an API
    const rooms = [
      { id: '101', name: 'Room 101', property: 'Marina Tower' },
      { id: '102', name: 'Room 102', property: 'Marina Tower' },
      { id: '201', name: 'Room 201', property: 'Marina Tower' },
      { id: '202', name: 'Room 202', property: 'Marina Tower' },
      { id: '203', name: 'Room 203', property: 'Downtown Heights' },
      { id: '204', name: 'Room 204', property: 'Downtown Heights' },
      { id: '301', name: 'Room 301', property: 'Downtown Heights' },
      { id: '302', name: 'Room 302', property: 'Downtown Heights' },
      { id: '303', name: 'Room 303', property: 'Marina Tower' },
    ];
    
    if (property !== 'all') {
      return rooms.filter(room => room.property === property);
    }
    
    return rooms;
  };
  
  // Check if a room is booked on a specific date
  const getBookingForRoomOnDate = (roomId: string, date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return bookings.find(booking => 
      booking.roomNumber === roomId && 
      dateStr >= booking.checkIn && 
      dateStr <= booking.checkOut
    );
  };
  
  // Handle hover event on booking cell
  const handleBookingHover = (booking: Booking | null) => {
    setSelectedBooking(booking);
  };
  
  const days = getDaysInMonth();
  const rooms = getRooms();
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Availability Calendar</h1>
          <p className="text-muted-foreground mt-1">View and manage room availability</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <DownloadCloud className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => navigateMonth('prev')}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => navigateMonth('next')}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <Select value={property} onValueChange={setProperty}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select property" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="Marina Tower">Marina Tower</SelectItem>
                  <SelectItem value="Downtown Heights">Downtown Heights</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm">
                <FilterX className="h-4 w-4 mr-1" />
                Clear Filters
              </Button>
              <Tabs defaultValue="monthly">
                <TabsList>
                  <TabsTrigger 
                    value="monthly" 
                    onClick={() => setView('monthly')}
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger 
                    value="list" 
                    onClick={() => setView('list')}
                  >
                    <List className="h-4 w-4 mr-1" />
                    List
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-auto">
            <TooltipProvider>
              <div className="w-full min-w-[900px]">
                <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(40px,1fr))]">
                  {/* Header */}
                  <div className="h-12 border-b sticky top-0 bg-background z-10">
                    <div className="px-3 h-full flex items-center font-semibold">Room</div>
                  </div>
                  {days.map(day => (
                    <div 
                      key={day.day} 
                      className={`h-12 border-b border-l sticky top-0 bg-background z-10 
                      ${day.dayOfWeek === 'Sat' || day.dayOfWeek === 'Sun' ? 'bg-slate-50' : ''}`}
                    >
                      <div className="text-center flex flex-col justify-center h-full">
                        <div className="text-xs text-muted-foreground">{day.dayOfWeek}</div>
                        <div className="font-medium">{day.day}</div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Rooms and availability */}
                  {rooms.map(room => (
                    <React.Fragment key={room.id}>
                      <div className="border-b px-3 py-2 h-16 flex items-center">
                        <div>
                          <div className="font-medium">{room.name}</div>
                          <div className="text-xs text-muted-foreground">{room.property}</div>
                        </div>
                      </div>
                      
                      {days.map(day => {
                        const booking = getBookingForRoomOnDate(room.id, day.date);
                        const isBooked = booking !== undefined;
                        const isCheckIn = booking && format(day.date, 'yyyy-MM-dd') === booking.checkIn;
                        const isCheckOut = booking && format(day.date, 'yyyy-MM-dd') === booking.checkOut;
                        
                        return (
                          <div 
                            key={`${room.id}-${day.day}`} 
                            className={`
                              border-b border-l h-16 relative
                              ${day.dayOfWeek === 'Sat' || day.dayOfWeek === 'Sun' ? 'bg-slate-50' : ''}
                            `}
                            onMouseEnter={() => handleBookingHover(booking || null)}
                            onMouseLeave={() => handleBookingHover(null)}
                          >
                            {isBooked && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div 
                                    className={`
                                      absolute inset-1 rounded px-2 flex items-center justify-center text-xs font-medium
                                      ${isCheckIn ? 'rounded-l' : 'border-l-0'}
                                      ${isCheckOut ? 'rounded-r' : 'border-r-0'}
                                      ${booking?.status === 'confirmed' ? 'bg-blue-100 text-blue-800' : ''}
                                      ${booking?.status === 'checked-in' ? 'bg-green-100 text-green-800' : ''}
                                      ${booking?.status === 'checked-out' ? 'bg-gray-100 text-gray-800' : ''}
                                      ${booking?.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                                    `}
                                  >
                                    {isCheckIn && <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500 rounded-l"></div>}
                                    {isCheckOut && <div className="absolute right-0 top-0 bottom-0 w-1 bg-green-500 rounded-r"></div>}
                                    {booking?.guestName?.split(' ')[0]}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="w-64 p-0">
                                  <div className="p-3">
                                    <div className="font-semibold">{booking?.guestName}</div>
                                    <div className="text-sm">
                                      {booking?.checkIn} to {booking?.checkOut}
                                    </div>
                                    <div className="flex justify-between mt-2 text-sm">
                                      <span>Booking ID:</span>
                                      <span className="font-mono">{booking?.id}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>Status:</span>
                                      <span className="capitalize">{booking?.status}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span>Amount:</span>
                                      <span>{booking?.totalPaid}</span>
                                    </div>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
      
      {selectedBooking && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Selected Booking Details
            </CardTitle>
            <CardDescription>Currently viewing details for booking {selectedBooking.id}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Guest</div>
                <div className="font-medium">{selectedBooking.guestName}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Room</div>
                <div className="font-medium">{selectedBooking.roomNumber} ({selectedBooking.property})</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Dates</div>
                <div className="font-medium">{selectedBooking.checkIn} to {selectedBooking.checkOut}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Status</div>
                <div className="font-medium capitalize">{selectedBooking.status}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Amount Paid</div>
                <div className="font-medium">{selectedBooking.totalPaid}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Actions</div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a href={`/bookings/${selectedBooking.id}`}>View Details</a>
                  </Button>
                  <Button size="sm" variant="outline">Check In</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Availability;
