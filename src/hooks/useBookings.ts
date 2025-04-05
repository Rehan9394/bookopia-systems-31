
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchBookings, 
  fetchBookingById, 
  fetchTodayCheckins, 
  fetchTodayCheckouts,
  updateBookingStatus 
} from '@/services/api';
import { useToast } from './use-toast';

export const useBookings = () => {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: fetchBookings
  });
};

export const useBooking = (id: string) => {
  return useQuery({
    queryKey: ['bookings', id],
    queryFn: () => fetchBookingById(id),
    enabled: !!id
  });
};

export const useTodayCheckins = () => {
  return useQuery({
    queryKey: ['bookings', 'today-checkins'],
    queryFn: fetchTodayCheckins
  });
};

export const useTodayCheckouts = () => {
  return useQuery({
    queryKey: ['bookings', 'today-checkouts'],
    queryFn: fetchTodayCheckouts
  });
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: ({ id, status }: { id: string, status: string }) => {
      return updateBookingStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast({
        title: 'Booking status updated',
        description: 'The booking status has been updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to update booking status',
        description: error.message,
        variant: 'destructive',
      });
    }
  });
};
