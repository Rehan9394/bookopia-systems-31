
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  description: string | null;
  email: string | null;
  phone: string | null;
  timezone: string | null;
  active: boolean | null;
  total_rooms: number | null;
  on_booking_sites: boolean | null;
  created_at: string;
  updated_at: string;
  // Computed fields from UI
  totalRooms?: number;
  availableRooms?: number;
  occupancyRate?: number;
  owner?: string;
}

export const useProperties = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const fetchProperties = async (): Promise<Property[]> => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
    
    // Map the data to include computed fields that UI expects
    return (data || []).map(property => ({
      ...property,
      totalRooms: property.total_rooms || 0,
      availableRooms: 0, // This would come from a join or separate query in a real app
      occupancyRate: 0, // This would be computed from bookings data
    }));
  };

  const { mutate: createProperty } = useMutation({
    mutationFn: async (property: Omit<Property, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('properties')
        .insert(property)
        .select();

      if (error) throw error;
      return data?.[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: "Property Added",
        description: "Property has been added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add property: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const { mutate: updateProperty } = useMutation({
    mutationFn: async ({ id, ...property }: Partial<Property> & { id: string }) => {
      const { data, error } = await supabase
        .from('properties')
        .update(property)
        .eq('id', id)
        .select();

      if (error) throw error;
      return data?.[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: "Property Updated",
        description: "Property has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update property: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const { mutate: deleteProperty } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      toast({
        title: "Property Deleted",
        description: "Property has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete property: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    data: useQuery({
      queryKey: ["properties"],
      queryFn: fetchProperties,
    }).data,
    isLoading: useQuery({
      queryKey: ["properties"],
      queryFn: fetchProperties,
    }).isLoading,
    error: useQuery({
      queryKey: ["properties"],
      queryFn: fetchProperties,
    }).error,
    createProperty,
    updateProperty,
    deleteProperty,
  };
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      if (!id) throw new Error("Property ID is required");
      
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error fetching property with ID ${id}:`, error);
        throw error;
      }
      
      return data as Property;
    },
    enabled: !!id,
  });
};
