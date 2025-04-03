
import React, { useState } from 'react';
import { Bell, Search, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New booking', message: 'John Smith just booked Room 301', read: false, time: '10 minutes ago' },
    { id: 2, title: 'Check-in reminder', message: 'Emma Johnson will check in today at 3 PM', read: false, time: '1 hour ago' },
    { id: 3, title: 'Cleaning alert', message: 'Room 205 needs immediate cleaning', read: true, time: '2 hours ago' },
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        description: `Searching for "${searchQuery}"`,
      });
      // In a real app, this would navigate to search results or filter data
      setSearchQuery('');
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    toast({
      description: "All notifications marked as read",
    });
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    toast({
      description: "Notification removed",
    });
  };

  const handleLogout = () => {
    toast({
      description: "You have been logged out",
    });
    // In a real app, this would clear auth state
    navigate('/login');
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <header className="h-16 border-b border-border bg-background/90 backdrop-blur-sm sticky top-0 z-10">
      <div className="h-full flex items-center justify-between px-6">
        <div className="flex items-center w-1/3">
          <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search bookings, rooms, guests..." 
              className="pl-10 bg-background border-muted"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-primary rounded-full" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="mb-4">
                <SheetTitle>Notifications</SheetTitle>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-muted-foreground">
                    {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
                  </span>
                  {unreadCount > 0 && (
                    <Button variant="outline" size="sm" onClick={markAllAsRead}>
                      Mark all as read
                    </Button>
                  )}
                </div>
              </SheetHeader>
              <div className="space-y-4">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div key={notification.id} className={`p-3 border rounded-md relative ${!notification.read ? 'bg-primary/5 border-primary/20' : ''}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <span className="text-xs text-muted-foreground mt-1 block">{notification.time}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      {!notification.read && (
                        <div className="absolute top-1/2 -left-1.5 w-1.5 h-1.5 bg-primary rounded-full transform -translate-y-1/2" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No notifications</p>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 pr-0.5"
              >
                <span className="font-medium">Admin User</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar.png" alt="Admin User" />
                  <AvatarFallback className="bg-primary/10 text-primary">AU</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
