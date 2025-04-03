
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Shield, Mail, Calendar, Activity, User as UserIcon, Clock, FileText } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

const UserView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Mock user data
  const userData = {
    id,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Administrator',
    status: 'active',
    avatar: null,
    lastLogin: new Date(2025, 3, 1, 8, 30),
    createdAt: new Date(2024, 9, 15),
    permissions: [
      'manage_bookings',
      'manage_rooms',
      'manage_users',
      'manage_settings',
      'view_reports'
    ]
  };
  
  // Mock activities
  const activities = [
    {
      id: 1,
      action: 'Updated booking',
      details: 'Changed check-out date for booking #BK12345',
      timestamp: new Date(2025, 3, 3, 9, 15),
      type: 'booking'
    },
    {
      id: 2,
      action: 'Created user',
      details: 'Added new user Sarah Johnson with Receptionist role',
      timestamp: new Date(2025, 3, 2, 14, 30),
      type: 'user'
    },
    {
      id: 3,
      action: 'System login',
      details: 'Logged in from IP 192.168.1.1',
      timestamp: new Date(2025, 3, 2, 8, 0),
      type: 'auth'
    },
    {
      id: 4,
      action: 'Updated settings',
      details: 'Changed default tax rate from 7% to 7.5%',
      timestamp: new Date(2025, 3, 1, 16, 45),
      type: 'settings'
    },
    {
      id: 5,
      action: 'Added room',
      details: 'Created new room #305 in Marina Tower',
      timestamp: new Date(2025, 3, 1, 11, 20),
      type: 'room'
    },
    {
      id: 6,
      action: 'Generated report',
      details: 'Created monthly occupancy report for March 2025',
      timestamp: new Date(2025, 3, 1, 9, 0),
      type: 'report'
    },
  ];
  
  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'booking':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'user':
        return <UserIcon className="h-5 w-5 text-purple-500" />;
      case 'auth':
        return <Shield className="h-5 w-5 text-green-500" />;
      case 'settings':
        return <Edit className="h-5 w-5 text-orange-500" />;
      case 'room':
        return <UserIcon className="h-5 w-5 text-teal-500" />;
      case 'report':
        return <FileText className="h-5 w-5 text-indigo-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };
  
  if (loading) {
    return (
      <div className="animate-pulse p-6">
        <div className="h-7 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="bg-gray-100 rounded-lg p-6 h-96"></div>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate('/users')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">User Details</h1>
      </div>
      
      <div className="flex justify-end mb-6">
        <Button onClick={() => navigate(`/users/edit/${id}`)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit User
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={userData.avatar || undefined} />
              <AvatarFallback className="text-2xl">{getInitials(userData.name)}</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4">{userData.name}</CardTitle>
            <CardDescription className="flex items-center justify-center gap-1">
              <Mail className="h-4 w-4" />
              {userData.email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Role</div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{userData.role}</Badge>
                  {userData.status === 'active' ? (
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800">Inactive</Badge>
                  )}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Last login</div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{format(userData.lastLogin, 'MMM dd, yyyy HH:mm')}</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-1">Created</div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{format(userData.createdAt, 'MMM dd, yyyy')}</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground mb-2">Permissions</div>
                <div className="flex flex-wrap gap-2">
                  {userData.permissions.map(permission => (
                    <Badge key={permission} variant="outline" className="capitalize">
                      {permission.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="activity">
            <TabsList className="mb-4">
              <TabsTrigger value="activity">
                <Activity className="h-4 w-4 mr-2" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="bookings">
                <Calendar className="h-4 w-4 mr-2" />
                Bookings
              </TabsTrigger>
              <TabsTrigger value="notes">
                <FileText className="h-4 w-4 mr-2" />
                Notes
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Recent actions performed by this user</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {activities.map(activity => (
                      <div 
                        key={activity.id} 
                        className="flex gap-3 border-b pb-4 last:border-0 last:pb-0"
                      >
                        <div className="mt-0.5">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            {getActivityIcon(activity.type)}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="font-medium">{activity.action}</div>
                            <div className="text-sm text-muted-foreground">
                              {format(activity.timestamp, 'MMM dd, HH:mm')}
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mt-1">
                            {activity.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline">Load More Activity</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Activity Analytics</CardTitle>
                  <CardDescription>Usage patterns and statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold">27</div>
                        <div className="text-sm text-muted-foreground">Actions this week</div>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold">5.4</div>
                        <div className="text-sm text-muted-foreground">Daily average</div>
                      </div>
                      <div className="p-4 border rounded-lg text-center">
                        <div className="text-2xl font-bold">92%</div>
                        <div className="text-sm text-muted-foreground">Completion rate</div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Most Common Activities</h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span>Booking management</span>
                          <span className="font-medium">42%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>User management</span>
                          <span className="font-medium">28%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Report generation</span>
                          <span className="font-medium">15%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Other</span>
                          <span className="font-medium">15%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Bookings created or modified by this user</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-16 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto opacity-30 mb-3" />
                    <p>No recent booking activity found for this user</p>
                    <Button variant="outline" className="mt-4">View All Bookings</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Notes</CardTitle>
                  <CardDescription>Administrative notes about this user</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-16 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto opacity-30 mb-3" />
                    <p>No notes have been added for this user</p>
                    <Button variant="outline" className="mt-4">Add Note</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserView;
