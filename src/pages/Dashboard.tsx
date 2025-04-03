
import React from 'react';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentBookings } from '@/components/dashboard/RecentBookings';
import { OccupancyChart } from '@/components/dashboard/OccupancyChart';
import { TodayActivity } from '@/components/dashboard/TodayActivity';
import { 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  BedDouble, 
  CalendarCheck, 
  DollarSign, 
  Percent, 
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { TodayCheckins } from '@/components/dashboard/TodayCheckins';
import { TodayCheckouts } from '@/components/dashboard/TodayCheckouts';

const Dashboard = () => {
  return (
    <div className="animate-fade-in space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back to your hotel management dashboard.</p>
      </div>
      
      {/* Overview Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
      </section>
      
      {/* Analytics Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <OccupancyChart />
          </div>
          <TodayActivity />
        </div>
      </section>
      
      {/* Bookings Section */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Bookings & Activities</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TodayCheckins />
              <TodayCheckouts />
            </div>
            <RecentBookings />
          </div>
          
          {/* Action Items Section */}
          <section>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Action Items</CardTitle>
                <CardDescription>Tasks that need your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-red-50 text-red-800 p-3 rounded-md flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-medium">Maintenance Required</p>
                      <p className="text-sm mt-1">Room 201 in Downtown Heights needs urgent maintenance</p>
                      <Button size="sm" className="mt-2" variant="outline" asChild>
                        <Link to="/rooms/view/3">View Room</Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Pending Reviews</p>
                      <span className="text-sm bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">5</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">5 guests have checked out without leaving a review</p>
                    <Button className="w-full mt-2" variant="outline" size="sm">Manage Reviews</Button>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Low Inventory Items</p>
                      <span className="text-sm bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full">3</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">3 items are running low and need to be restocked</p>
                    <Button className="w-full mt-2" variant="outline" size="sm">View Inventory</Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Button variant="outline" asChild className="h-auto py-2">
                      <Link to="/bookings/new">
                        <CalendarCheck className="h-4 w-4 mr-2" />
                        New Booking
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="h-auto py-2">
                      <Link to="/settings">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Finances
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
