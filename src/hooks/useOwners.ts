
import { Owner } from "@/services/supabase-types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface OwnerWithStats extends Owner {
  properties?: number;
  revenue?: number;
  occupancy?: number;
  avatar?: string;
  paymentDetails?: {
    bank: string;
    accountNumber: string;
    routingNumber: string;
  };
  joinedDate?: string;
}

export const useOwners = () => {
  return useQuery({
    queryKey: ["owners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('owners')
        .select('*');
      
      if (error) {
        console.error('Error fetching owners:', error);
        throw error;
      }
      
      // Convert to the extended type with stats
      const ownersWithStats: OwnerWithStats[] = (data || []).map(owner => ({
        ...owner,
        properties: owner.properties || 0,
        revenue: owner.revenue || 0,
        occupancy: owner.occupancy || 0,
        joinedDate: owner.joined_date || owner.created_at,
      }));
      
      return ownersWithStats;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useOwner = (id: string) => {
  return useQuery({
    queryKey: ["owner", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Owner ID is required");
      }
      
      const { data, error } = await supabase
        .from('owners')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error fetching owner with ID ${id}:`, error);
        throw error;
      }
      
      // Convert to the extended type with stats
      const ownerWithStats: OwnerWithStats = {
        ...data,
        properties: data.properties || 0,
        revenue: data.revenue || 0,
        occupancy: data.occupancy || 0,
        joinedDate: data.joined_date || data.created_at,
      };
      
      return ownerWithStats;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
