
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

export const useCleaningTasks = () => {
  return useQuery({
    queryKey: ['cleaning-tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cleaning_tasks')
        .select('*, rooms(number, property:type), users(name)');
      
      if (error) {
        console.error('Error fetching cleaning tasks:', error);
        throw error;
      }
      
      return data || [];
    }
  });
};

export const useUpdateCleaningTaskStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const { error } = await supabase
        .from('cleaning_tasks')
        .update({ status })
        .eq('id', id);
      
      if (error) {
        console.error(`Error updating cleaning task status for ID ${id}:`, error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cleaning-tasks'] });
      toast({
        title: 'Cleaning task updated',
        description: 'The cleaning task status has been updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to update cleaning task',
        description: error.message,
        variant: 'destructive',
      });
    }
  });
};
