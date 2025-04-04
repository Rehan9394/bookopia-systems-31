
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchRooms, fetchRoomById, updateRoomStatus } from '@/services/api';
import { useToast } from './use-toast';

export const useRooms = () => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: fetchRooms
  });
};

export const useRoom = (id: string) => {
  return useQuery({
    queryKey: ['rooms', id],
    queryFn: () => fetchRoomById(id),
    enabled: !!id
  });
};

export const useUpdateRoomStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string, status: 'available' | 'occupied' | 'maintenance' }) => {
      return updateRoomStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      toast({
        title: 'Room status updated',
        description: 'The room status has been updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to update room status',
        description: error.message,
        variant: 'destructive',
      });
    }
  });
};
