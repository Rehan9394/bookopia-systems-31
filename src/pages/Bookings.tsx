
import React, { useState, useEffect } from 'react';
import { BookingList } from '@/components/bookings/BookingList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarIcon, PlusCircle, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';
import { useToast } from '@/hooks/use-toast';
import { Link, useSearchParams } from 'react-router-dom';

const Bookings = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('filter') || "all");
  const [propertyFilter, setPropertyFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Check for special filters in URL
  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter) {
      if (filter === 'today-checkins') {
        setStatusFilter('confirmed');
        toast({
          title: "Filter Applied",
          description: "Showing today's check-ins",
        });
      } else if (filter === 'today-checkouts') {
        setStatusFilter('checked-in');
        toast({
          title: "Filter Applied",
          description: "Showing today's check-outs",
        });
      }
    }
  }, [searchParams]);

  // Apply filters when values change
  useEffect(() => {
    console.log('Applying filters:', { statusFilter, propertyFilter, dateRange, searchQuery });
    // In a real app, this would fetch filtered data from an API
    
    // Update URL with filters for sharing/bookmarking
    const params = new URLSearchParams();
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (propertyFilter !== 'all') params.set('property', propertyFilter);
    if (searchQuery) params.set('q', searchQuery);
    if (dateRange.from) params.set('from', dateRange.from.toISOString());
    if (dateRange.to) params.set('to', dateRange.to.toISOString());
    
    setSearchParams(params, { replace: true });
  }, [statusFilter, propertyFilter, dateRange, searchQuery]);

  // Handle date range change
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range || { from: undefined, to: undefined });
    if (range?.from && range?.to) {
      toast({
        description: `Showing bookings from ${format(range.from, 'PPP')} to ${format(range.to, 'PPP')}`,
      });
    }
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        description: `Searching for "${searchQuery}"`,
      });
    }
  };

  // Handle clearing filters
  const clearFilters = () => {
    setDateRange({ from: undefined, to: undefined });
    setStatusFilter("all");
    setPropertyFilter("all");
    setSearchQuery("");
    setSearchParams({});
    toast({
      description: "All filters have been cleared",
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Bookings</h1>
          <p className="text-muted-foreground mt-1">Manage all your bookings in one place</p>
        </div>
        <Button className="flex items-center gap-2" asChild>
          <Link to="/bookings/new">
            <PlusCircle className="h-4 w-4" />
            Add New Booking
          </Link>
        </Button>
      </div>
      
      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <form onSubmit={handleSearch}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by guest name, reference..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="justify-start text-muted-foreground font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
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
                onSelect={handleDateRangeChange}
                numberOfMonths={2}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          
          <div className="grid grid-cols-2 gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="checked-in">Checked In</SelectItem>
                <SelectItem value="checked-out">Checked Out</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={propertyFilter} onValueChange={setPropertyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="Marina Tower">Marina Tower</SelectItem>
                <SelectItem value="Downtown Heights">Downtown Heights</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {(dateRange.from || statusFilter !== "all" || propertyFilter !== "all" || searchQuery) && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Active filters applied
            </div>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </Card>
      
      <BookingList view={view} onViewChange={setView} />
    </div>
  );
};

export default Bookings;
