
import React from 'react';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentBookings } from '@/components/dashboard/RecentBookings';
import { OccupancyChart } from '@/components/dashboard/OccupancyChart';
import { ArrowDownToLine, ArrowUpFromLine, BedDouble, CalendarCheck, DollarSign, Percent, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back to your hotel management dashboard.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Available Rooms" 
          value="12" 
          icon={BedDouble}
          trend="up"
          trendValue="+2 from yesterday"
          className="animate-slide-up"
          description="Out of 20 total rooms"
        />
        <StatCard 
          title="Today's Check-ins" 
          value="5" 
          icon={ArrowDownToLine}
          className="animate-slide-up [animation-delay:100ms]"
          description="3 are arriving in the morning"
        />
        <StatCard 
          title="Today's Check-outs" 
          value="3" 
          icon={ArrowUpFromLine}
          className="animate-slide-up [animation-delay:200ms]"
          description="All scheduled before noon"
        />
        <StatCard 
          title="Occupancy Rate" 
          value="78%" 
          icon={Percent}
          trend="up"
          trendValue="+5% from last week"
          className="animate-slide-up [animation-delay:300ms]"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <OccupancyChart />
        </div>
        <div>
          <Card className="h-full">
            <CardHeader className="pb-4">
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you can perform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" size="lg">
                  <CalendarCheck className="mr-2 h-5 w-5" />
                  New Booking
                </Button>
                <Button className="w-full justify-start" size="lg" variant="outline">
                  <Users className="mr-2 h-5 w-5" />
                  Check-in Guest
                </Button>
                <Button className="w-full justify-start" size="lg" variant="outline">
                  <ArrowUpFromLine className="mr-2 h-5 w-5" />
                  Check-out Guest
                </Button>
                <Button className="w-full justify-start" size="lg" variant="outline">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Record Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mb-8">
        <RecentBookings />
      </div>
      
      <div>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Room Cleaning Status</CardTitle>
            <CardDescription>Overview of room cleaning status across all properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <div className="bg-green-100 text-green-800 px-4 py-3 rounded-md flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="font-medium">12 Clean</span>
              </div>
              <div className="bg-yellow-100 text-yellow-800 px-4 py-3 rounded-md flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <span className="font-medium">5 In Progress</span>
              </div>
              <div className="bg-red-100 text-red-800 px-4 py-3 rounded-md flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span className="font-medium">3 Needs Cleaning</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
