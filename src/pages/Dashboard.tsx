
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
        <TodayActivity />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RecentBookings />
        </div>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Action Items</CardTitle>
            <CardDescription>Tasks that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-red-50 text-red-800 p-4 rounded-md flex items-start gap-3">
                <AlertCircle className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="font-medium">Maintenance Required</p>
                  <p className="text-sm mt-1">Room 201 in Downtown Heights needs urgent maintenance</p>
                  <Button size="sm" className="mt-2" variant="outline" asChild>
                    <Link to="/rooms/view/3">View Room</Link>
                  </Button>
                </div>
              </div>
              
              <div className="p-4 border rounded-md">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Pending Reviews</p>
                  <span className="text-sm bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">5</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">5 guests have checked out without leaving a review</p>
                <Button className="w-full mt-3" variant="outline" size="sm">Manage Reviews</Button>
              </div>
              
              <div className="p-4 border rounded-md">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Low Inventory Items</p>
                  <span className="text-sm bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full">3</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">3 items are running low and need to be restocked</p>
                <Button className="w-full mt-3" variant="outline" size="sm">View Inventory</Button>
              </div>
              
              <Button className="w-full" variant="outline" asChild>
                <Link to="/settings">System Settings</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>Frequently used actions and reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-auto py-4 justify-start flex-col items-start" variant="outline" asChild>
                <Link to="/bookings/new">
                  <div className="flex flex-col items-start gap-1">
                    <CalendarCheck className="h-6 w-6 mb-1 text-primary" />
                    <span className="font-medium">New Booking</span>
                    <span className="text-xs text-muted-foreground">Create a new reservation</span>
                  </div>
                </Link>
              </Button>
              <Button className="h-auto py-4 justify-start flex-col items-start" variant="outline" asChild>
                <Link to="/rooms/add">
                  <div className="flex flex-col items-start gap-1">
                    <BedDouble className="h-6 w-6 mb-1 text-primary" />
                    <span className="font-medium">Add Room</span>
                    <span className="text-xs text-muted-foreground">Create a new room listing</span>
                  </div>
                </Link>
              </Button>
              <Button className="h-auto py-4 justify-start flex-col items-start" variant="outline" asChild>
                <Link to="/availability">
                  <div className="flex flex-col items-start gap-1">
                    <ArrowDownToLine className="h-6 w-6 mb-1 text-primary" />
                    <span className="font-medium">Calendar</span>
                    <span className="text-xs text-muted-foreground">Check room availability</span>
                  </div>
                </Link>
              </Button>
              <Button className="h-auto py-4 justify-start flex-col items-start" variant="outline" asChild>
                <Link to="/reports">
                  <div className="flex flex-col items-start gap-1">
                    <DollarSign className="h-6 w-6 mb-1 text-primary" />
                    <span className="font-medium">Reports</span>
                    <span className="text-xs text-muted-foreground">View revenue reports</span>
                  </div>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Current month financial snapshot</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold">$24,580</p>
                  <p className="text-sm text-green-600">↑ 12% from last month</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Average Daily Rate</p>
                  <p className="text-2xl font-bold">$185</p>
                  <p className="text-sm text-green-600">↑ 5% from last month</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Revenue Target</span>
                    <span className="font-medium">$30,000</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '82%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground text-right">82% of monthly target reached</p>
                </div>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/reports">View Detailed Reports</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
