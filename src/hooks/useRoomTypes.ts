
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface RoomType {
  id: string;
  name: string;
  description: string | null;
  base_rate: number;
  capacity: number;
  amenities: string[] | null;
  created_at: string;
  updated_at: string;
}

export const useRoomTypes = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const fetchRoomTypes = async (): Promise<RoomType[]> => {
    const { data, error } = await supabase
      .from('room_types')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching room types:', error);
      throw error;
    }
    
    return data || [];
  };

  const { mutate: createRoomType } = useMutation({
    mutationFn: async (roomType: Omit<RoomType, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('room_types')
        .insert(roomType)
        .select();

      if (error) throw error;
      return data?.[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roomTypes'] });
      toast({
        title: "Room Type Added",
        description: "Room type has been added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add room type: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const { mutate: updateRoomType } = useMutation({
    mutationFn: async ({ id, ...roomType }: Partial<RoomType> & { id: string }) => {
      const { data, error } = await supabase
        .from('room_types')
        .update(roomType)
        .eq('id', id)
        .select();

      if (error) throw error;
      return data?.[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roomTypes'] });
      toast({
        title: "Room Type Updated",
        description: "Room type has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update room type: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const { mutate: deleteRoomType } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('room_types')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roomTypes'] });
      toast({
        title: "Room Type Deleted",
        description: "Room type has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete room type: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  return {
    data: useQuery({
      queryKey: ["roomTypes"],
      queryFn: fetchRoomTypes,
    }).data,
    isLoading: useQuery({
      queryKey: ["roomTypes"],
      queryFn: fetchRoomTypes,
    }).isLoading,
    error: useQuery({
      queryKey: ["roomTypes"],
      queryFn: fetchRoomTypes,
    }).error,
    createRoomType,
    updateRoomType,
    deleteRoomType,
  };
};

export const useRoomType = (id: string) => {
  return useQuery({
    queryKey: ["roomType", id],
    queryFn: async () => {
      if (!id) throw new Error("Room Type ID is required");
      
      const { data, error } = await supabase
        .from('room_types')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error fetching room type with ID ${id}:`, error);
        throw error;
      }
      
      return data as RoomType;
    },
    enabled: !!id,
  });
};
