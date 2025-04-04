
import { useQuery } from '@tanstack/react-query';
import { fetchOwners } from '@/services/api';

export const useOwners = () => {
  return useQuery({
    queryKey: ['owners'],
    queryFn: fetchOwners
  });
};
