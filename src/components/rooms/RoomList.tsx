
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarClock, Edit, Home, Trash2, UserCheck } from 'lucide-react';
import { ViewToggle } from '@/components/ui/ViewToggle';

interface Room {
  id: string;
  roomNumber: string;
  property: string;
  status: 'available' | 'occupied' | 'maintenance';
  owner: string;
  nextBooking?: {
    guestName: string;
    checkIn: string;
    checkOut: string;
  };
}

// Mock data - would come from API in real app
const rooms: Room[] = [
  {
    id: '1',
    roomNumber: '101',
    property: 'Marina Tower',
    status: 'available',
    owner: 'John Doe',
    nextBooking: {
      guestName: 'Sarah Davis',
      checkIn: '2023-06-18',
      checkOut: '2023-06-20'
    }
  },
  {
    id: '2',
    roomNumber: '102',
    property: 'Marina Tower',
    status: 'occupied',
    owner: 'Jane Smith',
    nextBooking: {
      guestName: 'Michael Chen',
      checkIn: '2023-06-12',
      checkOut: '2023-06-16'
    }
  },
  {
    id: '3',
    roomNumber: '201',
    property: 'Downtown Heights',
    status: 'maintenance',
    owner: 'Robert Wilson',
  },
  {
    id: '4',
    roomNumber: '202',
    property: 'Downtown Heights',
    status: 'available',
    owner: 'Lisa Wong',
    nextBooking: {
      guestName: 'Emma Johnson',
      checkIn: '2023-06-25',
      checkOut: '2023-06-28'
    }
  },
  {
    id: '5',
    roomNumber: '301',
    property: 'Marina Tower',
    status: 'occupied',
    owner: 'John Doe',
    nextBooking: {
      guestName: 'James Brown',
      checkIn: '2023-06-14',
      checkOut: '2023-06-18'
    }
  },
  {
    id: '6',
    roomNumber: '302',
    property: 'Marina Tower',
    status: 'available',
    owner: 'Jane Smith',
    nextBooking: {
      guestName: 'David Miller',
      checkIn: '2023-07-01',
      checkOut: '2023-07-05'
    }
  }
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
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

interface RoomListProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export function RoomList({ view, onViewChange }: RoomListProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Rooms</h2>
        <div className="flex gap-4">
          <ViewToggle view={view} setView={onViewChange} />
          <Button>Add New Room</Button>
        </div>
      </div>
      
      {view === 'list' ? (
        <div className="rounded-lg overflow-hidden border border-border">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left font-medium px-6 py-3">Room No.</th>
                <th className="text-left font-medium px-6 py-3">Property</th>
                <th className="text-left font-medium px-6 py-3">Status</th>
                <th className="text-left font-medium px-6 py-3">Owner</th>
                <th className="text-left font-medium px-6 py-3">Next Booking</th>
                <th className="text-left font-medium px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rooms.map((room) => (
                <tr key={room.id} className="group hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{room.roomNumber}</td>
                  <td className="px-6 py-4">{room.property}</td>
                  <td className="px-6 py-4">{getStatusBadge(room.status)}</td>
                  <td className="px-6 py-4">{room.owner}</td>
                  <td className="px-6 py-4">
                    {room.nextBooking ? (
                      <div className="flex flex-col">
                        <span className="text-sm">{room.nextBooking.guestName}</span>
                        <span className="text-xs text-muted-foreground mt-1 flex items-center">
                          <CalendarClock className="h-3 w-3 mr-1" />
                          {formatDate(room.nextBooking.checkIn)} - {formatDate(room.nextBooking.checkOut)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">No upcoming bookings</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <Home className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Room {room.roomNumber}</h3>
                      <p className="text-sm text-muted-foreground">{room.property}</p>
                    </div>
                  </div>
                  {getStatusBadge(room.status)}
                </div>
                
                <div className="border-t border-border pt-4 mt-2">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-1.5 bg-muted rounded-md mt-0.5">
                      <UserCheck className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">OWNER</p>
                      <p className="text-sm">{room.owner}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-muted rounded-md mt-0.5">
                      <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">NEXT BOOKING</p>
                      {room.nextBooking ? (
                        <div>
                          <p className="text-sm">{room.nextBooking.guestName}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {formatDate(room.nextBooking.checkIn)} - {formatDate(room.nextBooking.checkOut)}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm">No upcoming bookings</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4 mt-4 border-t">
                  <Button size="sm" variant="outline">
                    <Edit className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm">Manage</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
