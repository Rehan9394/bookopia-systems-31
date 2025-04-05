
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarClock, Edit, Home, Trash2, UserCheck, Loader } from 'lucide-react';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { useRooms } from '@/hooks/useRooms';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Room } from '@/services/supabase-types';

function formatDate(dateString: string) {
  try {
    return format(new Date(dateString), 'MMM d');
  } catch (e) {
    return dateString;
  }
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
  const { data: rooms, isLoading, error } = useRooms();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading rooms...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-500">Failed to load rooms data</p>
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Rooms</h2>
        <div className="flex gap-4">
          <ViewToggle view={view} setView={onViewChange} />
          <Button asChild>
            <Link to="/rooms/add">Add New Room</Link>
          </Button>
        </div>
      </div>
      
      {view === 'list' ? (
        <div className="rounded-lg overflow-hidden border border-border">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left font-medium px-6 py-3">Room No.</th>
                <th className="text-left font-medium px-6 py-3">Floor</th>
                <th className="text-left font-medium px-6 py-3">Type</th>
                <th className="text-left font-medium px-6 py-3">Status</th>
                <th className="text-left font-medium px-6 py-3">Rate</th>
                <th className="text-left font-medium px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rooms && rooms.map((room) => (
                <tr key={room.id} className="group hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{room.number}</td>
                  <td className="px-6 py-4">{room.floor}</td>
                  <td className="px-6 py-4">{room.type}</td>
                  <td className="px-6 py-4">{getStatusBadge(room.status)}</td>
                  <td className="px-6 py-4">${room.rate}/night</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" asChild>
                        <Link to={`/rooms/view/${room.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {(!rooms || rooms.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                    No rooms found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms && rooms.map((room) => (
            <Card key={room.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <Home className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Room {room.number}</h3>
                      <p className="text-sm text-muted-foreground">{room.type}</p>
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
                      <p className="text-xs font-medium text-muted-foreground">CAPACITY</p>
                      <p className="text-sm">{room.capacity} Guests</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-muted rounded-md mt-0.5">
                      <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">RATE</p>
                      <p className="text-sm">${room.rate}/night</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4 mt-4 border-t">
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/rooms/edit/${room.id}`}>
                      <Edit className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to={`/rooms/view/${room.id}`}>
                      Manage
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          {(!rooms || rooms.length === 0) && (
            <div className="col-span-full text-center py-10 border rounded-md bg-muted/10">
              <p className="text-muted-foreground">No rooms found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
