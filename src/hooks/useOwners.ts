
import { useQuery } from '@tanstack/react-query';
import { fetchOwners } from '@/services/api';
import { Owner } from '@/services/supabase-types';

export const useOwners = () => {
  return useQuery({
    queryKey: ['owners'],
    queryFn: fetchOwners
  });
};

// Hook to get owner data for the logged-in owner
export const useCurrentOwner = () => {
  const ownerId = localStorage.getItem('ownerId');
  const { data: owners } = useOwners();
  
  return {
    data: owners?.find((owner: Owner) => owner.id === ownerId),
    isLoading: !owners,
  };
};

// Hook to get properties owned by the current owner
export const useOwnerProperties = () => {
  const ownerId = localStorage.getItem('ownerId');
  
  return useQuery({
    queryKey: ['ownerProperties', ownerId],
    queryFn: async () => {
      // In a real app, this would call an API endpoint
      // For now, we'll return mock data
      return [
        {
          id: '1',
          name: 'Beachfront Villa',
          rooms: 4,
          location: 'Miami Beach, FL',
          revenue: 5240,
        },
        {
          id: '2',
          name: 'Downtown Heights',
          rooms: 3,
          location: 'Seattle, WA',
          revenue: 3150,
        },
      ];
    },
    enabled: !!ownerId,
  });
};
