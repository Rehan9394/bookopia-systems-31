
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpFromLine, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function TodayCheckouts() {
  // In a real app, this data would come from an API
  const checkouts = [
    { id: '3', guest: 'Michael Brown', room: '401', property: 'Marina Tower', time: '12:00', status: 'checked-in' },
    { id: '4', guest: 'Sarah Davis', room: '501', property: 'Downtown Heights', time: '10:00', status: 'checked-in' },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center">
            <ArrowUpFromLine className="mr-2 h-5 w-5 text-primary" />
            Today's Check-outs
          </CardTitle>
          <Link to="/bookings?filter=today-checkouts">
            <Button variant="ghost" size="sm" className="h-7 text-xs">View All</Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {checkouts.length > 0 ? (
          <div className="divide-y">
            {checkouts.map((checkout) => (
              <div key={checkout.id} className="flex items-center justify-between p-3">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{checkout.guest}</p>
                    <p className="text-xs text-muted-foreground">
                      {checkout.property} - Room {checkout.room}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-1 text-xs bg-green-50 text-green-800 border-green-200">
                    {checkout.time}
                  </Badge>
                  <Link to={`/bookings/${checkout.id}`}>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">Check-out</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>No check-outs scheduled for today</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
