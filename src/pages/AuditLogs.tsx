
import React, { useState, useEffect } from 'react';
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
import { useToast } from '@/hooks/use-toast';

type LogType = 'auth' | 'booking' | 'user' | 'system' | 'settings' | 'all';

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
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [logType, setLogType] = useState<LogType>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  // Sample data - in a real app this would come from a database
  const allLogs: AuditLog[] = [
    { 
      id: 1, 
      timestamp: '2025-04-03 14:30:22', 
      user: 'admin@example.com', 
      action: 'User login', 
      type: 'auth',
      ip: '192.168.1.1',
      details: 'Successful login attempt' 
    },
    { 
      id: 2, 
      timestamp: '2025-04-03 13:45:10', 
      user: 'jane@example.com', 
      action: 'Booking created', 
      type: 'booking',
      ip: '192.168.1.2',
      details: 'Created booking #BK12345 for Room 301' 
    },
    { 
      id: 3, 
      timestamp: '2025-04-03 12:30:05', 
      user: 'admin@example.com', 
      action: 'User created', 
      type: 'user',
      ip: '192.168.1.1',
      details: 'Created new user sarah@example.com with role Cleaning Staff' 
    },
    { 
      id: 4, 
      timestamp: '2025-04-03 11:20:15', 
      user: 'john@example.com', 
      action: 'Booking updated', 
      type: 'booking',
      ip: '192.168.1.3',
      details: 'Updated check-out date for booking #BK12340' 
    },
    { 
      id: 5, 
      timestamp: '2025-04-03 10:15:30', 
      user: 'system', 
      action: 'Daily backup', 
      type: 'system',
      ip: 'internal',
      details: 'Automatic system backup completed successfully' 
    },
    { 
      id: 6, 
      timestamp: '2025-04-03 09:45:00', 
      user: 'admin@example.com', 
      action: 'Settings changed', 
      type: 'settings',
      ip: '192.168.1.1',
      details: 'Updated tax rate from 7% to 7.5%' 
    },
    { 
      id: 7, 
      timestamp: '2025-04-02 16:30:22', 
      user: 'jane@example.com', 
      action: 'Booking cancelled', 
      type: 'booking',
      ip: '192.168.1.2',
      details: 'Cancelled booking #BK12335 with refund' 
    },
    { 
      id: 8, 
      timestamp: '2025-04-02 15:20:10', 
      user: 'robert@example.com', 
      action: 'User login failed', 
      type: 'auth',
      ip: '192.168.1.4',
      details: 'Failed login attempt (incorrect password)' 
    },
    { 
      id: 9, 
      timestamp: '2025-04-02 14:10:05', 
      user: 'admin@example.com', 
      action: 'User updated', 
      type: 'user',
      ip: '192.168.1.1',
      details: 'Updated permissions for john@example.com' 
    },
    { 
      id: 10, 
      timestamp: '2025-04-02 10:45:30', 
      user: 'system', 
      action: 'System update', 
      type: 'system',
      ip: 'internal',
      details: 'Applied system update v2.3.0' 
    },
    { 
      id: 11, 
      timestamp: '2025-04-01 16:15:22', 
      user: 'admin@example.com', 
      action: 'User deleted', 
      type: 'user',
      ip: '192.168.1.1',
      details: 'Removed inactive user michael@example.com' 
    },
    { 
      id: 12, 
      timestamp: '2025-04-01 14:30:10', 
      user: 'jane@example.com', 
      action: 'Booking modified', 
      type: 'booking',
      ip: '192.168.1.2',
      details: 'Added extra bed to booking #BK12330' 
    },
  ];
  
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>(allLogs);
  
  // Apply filters when filter values change
  useEffect(() => {
    let filtered = [...allLogs];
    
    // Apply log type filter
    if (logType !== 'all') {
      filtered = filtered.filter(log => log.type === logType);
    }
    
    // Apply date range filter
    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate >= dateRange.from! && logDate <= dateRange.to!;
      });
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(log => 
        log.user.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.details.toLowerCase().includes(query) ||
        log.ip.toLowerCase().includes(query)
      );
    }
    
    setFilteredLogs(filtered);
    setCurrentPage(1);
    
    // Notification when filters are applied
    if (logType !== 'all' || dateRange.from || searchQuery) {
      toast({
        description: "Log filters applied successfully",
      });
    }
  }, [logType, dateRange, searchQuery]);
  
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
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  // Handle clearing filters
  const clearFilters = () => {
    setLogType("all");
    setDateRange({ from: undefined, to: undefined });
    setSearchQuery("");
    setFilteredLogs(allLogs);
    toast({
      description: "All filters have been cleared",
    });
  };
  
  // Handle export logs
  const handleExportLogs = () => {
    toast({
      title: "Exporting Logs",
      description: "Your logs are being prepared for download",
    });
  };
  
  // Handle security report
  const handleSecurityReport = () => {
    toast({
      title: "Generating Report",
      description: "Security audit report is being generated",
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">Track all activity across your system</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2" onClick={handleExportLogs}>
            <DownloadCloud className="h-4 w-4" />
            Export Logs
          </Button>
          <Button className="flex items-center gap-2" onClick={handleSecurityReport}>
            <ShieldCheck className="h-4 w-4" />
            Security Report
          </Button>
        </div>
      </div>
      
      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <form onSubmit={handleSearch}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by user, action, or details..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
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
          
          <Select value={logType} onValueChange={(value) => setLogType(value as LogType)}>
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
        
        {(logType !== "all" || dateRange.from || searchQuery) && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {filteredLogs.length} log entries found
            </div>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
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
            {currentLogs.length > 0 ? (
              currentLogs.map((log) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No log entries found matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
      
      <div className="mt-8 space-y-6">
        <Separator />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredLogs.length)} of {filteredLogs.length} log entries
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={goToPreviousPage} 
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button 
              variant="outline" 
              onClick={goToNextPage} 
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </Button>
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
