
import React, { useState, useEffect } from 'react';
import { RoomList } from '@/components/rooms/RoomList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Mock data for rooms
const roomsData = [
  {
    id: "1",
    roomNumber: "101",
    property: "Marina Tower",
    type: "Deluxe Suite",
    status: "available",
    price: 150,
  },
  {
    id: "2",
    roomNumber: "102",
    property: "Marina Tower",
    type: "Standard Room",
    status: "occupied",
    price: 120,
  },
  {
    id: "3",
    roomNumber: "201",
    property: "Downtown Heights",
    type: "Premium Suite",
    status: "maintenance",
    price: 180,
  },
  {
    id: "4",
    roomNumber: "202",
    property: "Downtown Heights",
    type: "Family Room",
    status: "available",
    price: 165,
  },
];

const Rooms = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [propertyFilter, setPropertyFilter] = useState<string>(searchParams.get('property') || "all");
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('status') || "all");
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || "");
  const [filteredRooms, setFilteredRooms] = useState(roomsData);
  
  // Apply filters when filter values change
  useEffect(() => {
    console.log('Applying filters:', { propertyFilter, statusFilter, searchQuery });
    
    let filtered = [...roomsData];
    
    // Apply property filter
    if (propertyFilter !== 'all') {
      filtered = filtered.filter(room => room.property === propertyFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(room => room.status === statusFilter);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(room => 
        room.roomNumber.toLowerCase().includes(query) || 
        room.property.toLowerCase().includes(query) ||
        room.type.toLowerCase().includes(query)
      );
    }
    
    setFilteredRooms(filtered);
    
    // Update URL with filters
    const params = new URLSearchParams();
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (propertyFilter !== 'all') params.set('property', propertyFilter);
    if (searchQuery) params.set('q', searchQuery);
    
    setSearchParams(params, { replace: true });
  }, [propertyFilter, statusFilter, searchQuery]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        description: `Searching for "${searchQuery}"`,
      });
    }
  };
  
  // Handle room actions
  const handleViewRoom = (id: string) => {
    navigate(`/rooms/view/${id}`);
  };
  
  const handleEditRoom = (id: string) => {
    navigate(`/rooms/edit/${id}`);
  };
  
  // Handle clearing filters
  const clearFilters = () => {
    setPropertyFilter("all");
    setStatusFilter("all");
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
          <h1 className="text-3xl font-bold">Rooms</h1>
          <p className="text-muted-foreground mt-1">Manage all your room properties</p>
        </div>
        <Button className="flex items-center gap-2" asChild>
          <Link to="/rooms/add">
            <PlusCircle className="h-4 w-4" />
            Add New Room
          </Link>
        </Button>
      </div>
      
      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <form onSubmit={handleSearch}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by room number, property..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          
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
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="occupied">Occupied</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {(statusFilter !== "all" || propertyFilter !== "all" || searchQuery) && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} found
            </div>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </Card>
      
      <RoomList 
        view={view} 
        onViewChange={setView}
        rooms={filteredRooms}
        onViewRoom={handleViewRoom}
        onEditRoom={handleEditRoom}
      />
    </div>
  );
};

export default Rooms;
