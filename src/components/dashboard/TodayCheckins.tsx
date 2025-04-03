
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownToLine, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function TodayCheckins() {
  // In a real app, this data would come from an API
  const checkins = [
    { id: '1', guest: 'John Smith', room: '301', property: 'Marina Tower', time: '14:00', status: 'pending' },
    { id: '2', guest: 'Emma Johnson', room: '502', property: 'Downtown Heights', time: '15:00', status: 'pending' },
    { id: '3', guest: 'Michael Chen', room: '205', property: 'Marina Tower', time: '12:00', status: 'pending' },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center">
            <ArrowDownToLine className="mr-2 h-5 w-5 text-primary" />
            Today's Check-ins
          </CardTitle>
          <Link to="/bookings?filter=today-checkins">
            <Button variant="ghost" size="sm" className="h-7 text-xs">View All</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {checkins.length > 0 ? (
          <div className="divide-y">
            {checkins.map((checkin) => (
              <div key={checkin.id} className="flex items-center justify-between p-3">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{checkin.guest}</p>
                    <p className="text-xs text-muted-foreground">
                      {checkin.property} - Room {checkin.room}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1 text-xs bg-blue-50 text-blue-800 border-blue-200">
                    {checkin.time}
                  </Badge>
                  <Link to={`/bookings/${checkin.id}`}>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">Check-in</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>No check-ins scheduled for today</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
