
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  Search, 
  Filter, 
  DownloadCloud, 
  UserCheck,
  Edit,
  Trash,
  LogIn,
  Settings,
  RefreshCw,
  ShieldCheck,
  User
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

type LogType = 'auth' | 'booking' | 'user' | 'system' | 'settings';

interface AuditLog {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  type: LogType;
  ip: string;
  details: string;
}

const AuditLogs = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });

  // Sample data - in a real app this would come from a database
  const logs: AuditLog[] = [
    { 
      id: 1, 
      timestamp: '2023-11-15 14:30:22', 
      user: 'admin@example.com', 
      action: 'User login', 
      type: 'auth',
      ip: '192.168.1.1',
      details: 'Successful login attempt' 
    },
    { 
      id: 2, 
      timestamp: '2023-11-15 13:45:10', 
      user: 'jane@example.com', 
      action: 'Booking created', 
      type: 'booking',
      ip: '192.168.1.2',
      details: 'Created booking #BK12345 for Room 301' 
    },
    { 
      id: 3, 
      timestamp: '2023-11-15 12:30:05', 
      user: 'admin@example.com', 
      action: 'User created', 
      type: 'user',
      ip: '192.168.1.1',
      details: 'Created new user sarah@example.com with role Cleaning Staff' 
    },
    { 
      id: 4, 
      timestamp: '2023-11-15 11:20:15', 
      user: 'john@example.com', 
      action: 'Booking updated', 
      type: 'booking',
      ip: '192.168.1.3',
      details: 'Updated check-out date for booking #BK12340' 
    },
    { 
      id: 5, 
      timestamp: '2023-11-15 10:15:30', 
      user: 'system', 
      action: 'Daily backup', 
      type: 'system',
      ip: 'internal',
      details: 'Automatic system backup completed successfully' 
    },
    { 
      id: 6, 
      timestamp: '2023-11-15 09:45:00', 
      user: 'admin@example.com', 
      action: 'Settings changed', 
      type: 'settings',
      ip: '192.168.1.1',
      details: 'Updated tax rate from 7% to 7.5%' 
    },
    { 
      id: 7, 
      timestamp: '2023-11-14 16:30:22', 
      user: 'jane@example.com', 
      action: 'Booking cancelled', 
      type: 'booking',
      ip: '192.168.1.2',
      details: 'Cancelled booking #BK12335 with refund' 
    },
    { 
      id: 8, 
      timestamp: '2023-11-14 15:20:10', 
      user: 'robert@example.com', 
      action: 'User login failed', 
      type: 'auth',
      ip: '192.168.1.4',
      details: 'Failed login attempt (incorrect password)' 
    },
    { 
      id: 9, 
      timestamp: '2023-11-14 14:10:05', 
      user: 'admin@example.com', 
      action: 'User updated', 
      type: 'user',
      ip: '192.168.1.1',
      details: 'Updated permissions for john@example.com' 
    },
    { 
      id: 10, 
      timestamp: '2023-11-14 10:45:30', 
      user: 'system', 
      action: 'System update', 
      type: 'system',
      ip: 'internal',
      details: 'Applied system update v2.3.0' 
    },
  ];

  const getLogIcon = (type: LogType) => {
    switch(type) {
      case 'auth':
        return <LogIn className="h-5 w-5 text-blue-500" />;
      case 'booking':
        return <Edit className="h-5 w-5 text-green-500" />;
      case 'user':
        return <User className="h-5 w-5 text-purple-500" />;
      case 'system':
        return <RefreshCw className="h-5 w-5 text-amber-500" />;
      case 'settings':
        return <Settings className="h-5 w-5 text-indigo-500" />;
      default:
        return null;
    }
  };

  const getLogTypeBadge = (type: LogType) => {
    switch(type) {
      case 'auth':
        return <Badge className="bg-blue-100 text-blue-800">Authentication</Badge>;
      case 'booking':
        return <Badge className="bg-green-100 text-green-800">Booking</Badge>;
      case 'user':
        return <Badge className="bg-purple-100 text-purple-800">User</Badge>;
      case 'system':
        return <Badge className="bg-amber-100 text-amber-800">System</Badge>;
      case 'settings':
        return <Badge className="bg-indigo-100 text-indigo-800">Settings</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">Track all activity across your system</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <DownloadCloud className="h-4 w-4" />
            Export Logs
          </Button>
          <Button className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Security Report
          </Button>
        </div>
      </div>
      
      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by user, action, or details..." 
              className="pl-10"
            />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-muted-foreground font-normal"
              >
                <Filter className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Filter by date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={new Date()}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Filter by log type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Log Types</SelectItem>
              <SelectItem value="auth">Authentication</SelectItem>
              <SelectItem value="booking">Booking</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="settings">Settings</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
      
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {getLogIcon(log.type)}
                    {getLogTypeBadge(log.type)}
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {log.user === 'system' ? (
                      <Badge variant="outline">System</Badge>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <UserCheck className="h-4 w-4 text-muted-foreground" />
                        <span>{log.user}</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                <TableCell className="max-w-xs truncate">{log.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      
      <div className="mt-8 space-y-6">
        <Separator />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Showing 1-10 of 1,248 log entries
          </div>
          <div className="flex gap-2">
            <Button variant="outline" disabled>Previous</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
        
        <div className="border rounded-md p-4 bg-amber-50 text-amber-800">
          <div className="flex gap-2 items-start">
            <ShieldCheck className="h-5 w-5 mt-0.5" />
            <div>
              <h3 className="font-medium">Audit Log Retention Policy</h3>
              <p className="text-sm">Logs are retained for 90 days by default. For longer retention periods, please adjust your settings or export logs regularly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
