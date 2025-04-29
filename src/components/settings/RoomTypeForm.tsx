
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Bed, Save } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useProperties } from '@/hooks/useProperties';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RoomTypeFormProps {
  roomTypeId?: string;
}

export default function RoomTypeForm({ roomTypeId }: RoomTypeFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock data for room types
  const roomTypes = [
    {
      id: '1',
      name: 'Standard Room',
      description: 'A comfortable room with basic amenities.',
      baseRate: 120,
      maxOccupancy: 2,
      propertyId: 'marina',
      amenities: ['WiFi', 'TV', 'Air Conditioning'],
      active: true
    },
    {
      id: '2',
      name: 'Deluxe Suite',
      description: 'A spacious suite with premium amenities and separate living area.',
      baseRate: 180,
      maxOccupancy: 3,
      propertyId: 'marina',
      amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Ocean View'],
      active: true
    },
    {
      id: '3',
      name: 'Executive Suite',
      description: 'Luxury suite with executive amenities and premium services.',
      baseRate: 250,
      maxOccupancy: 4,
      propertyId: 'downtown',
      amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'City View', 'Room Service'],
      active: true
    },
    {
      id: '4',
      name: 'Penthouse Suite',
      description: 'Our most luxurious accommodation with panoramic views.',
      baseRate: 400,
      maxOccupancy: 4,
      propertyId: 'downtown',
      amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Bar', 'Penthouse View', 'Room Service', 'Hot Tub'],
      active: true
    }
  ];
  
  const roomType = roomTypeId ? roomTypes.find(rt => rt.id === roomTypeId) : undefined;
  
  // Get properties for dropdown
  const { data: properties, isLoading: propertiesLoading } = useProperties();
  
  const [formData, setFormData] = useState({
    name: roomType?.name || '',
    description: roomType?.description || '',
    baseRate: roomType?.baseRate?.toString() || '0',
    maxOccupancy: roomType?.maxOccupancy?.toString() || '2',
    propertyId: roomType?.propertyId || '',
    amenities: roomType?.amenities?.join(', ') || '',
    active: roomType?.active !== false, // Default to active
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to the server
    toast({
      title: roomType ? "Room Type Updated" : "Room Type Created",
      description: roomType 
        ? "The room type has been updated successfully." 
        : "New room type has been created successfully."
    });
    
    navigate('/settings');
  };
  
  if (roomTypeId && !roomType) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Room type not found</h1>
        <Button variant="ghost" className="mt-4" onClick={() => navigate('/settings')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Settings
        </Button>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{roomType ? 'Edit Room Type' : 'Add Room Type'}</h1>
          <p className="text-muted-foreground mt-1">
            {roomType ? 'Update room type details' : 'Create a new room type for your property'}
          </p>
        </div>
        <Button variant="ghost" onClick={() => navigate('/settings')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Settings
        </Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bed className="h-5 w-5" />
              Room Type Details
            </CardTitle>
            <CardDescription>
              Configure the details for this room type
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Room Type Name *</Label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="propertyId">Property *</Label>
                <Select 
                  value={formData.propertyId} 
                  onValueChange={(value) => handleSelectChange('propertyId', value)}
                  disabled={propertiesLoading}
                >
                  <SelectTrigger id="propertyId">
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties?.map(property => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="baseRate">Base Rate ($ per night) *</Label>
                <Input 
                  id="baseRate"
                  name="baseRate"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.baseRate}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxOccupancy">Maximum Occupancy *</Label>
                <Input 
                  id="maxOccupancy"
                  name="maxOccupancy"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.maxOccupancy}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amenities">Amenities (comma separated)</Label>
              <Input 
                id="amenities"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                placeholder="WiFi, TV, Air Conditioning, Mini Bar, etc."
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Active Status</Label>
                <p className="text-sm text-muted-foreground">
                  Inactive room types will not be available for booking
                </p>
              </div>
              <Switch
                checked={formData.active}
                onCheckedChange={(checked) => handleSwitchChange('active', checked)}
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate('/settings')}>
            Cancel
          </Button>
          <Button type="submit" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {roomType ? 'Update Room Type' : 'Create Room Type'}
          </Button>
        </div>
      </form>
    </div>
  );
}
