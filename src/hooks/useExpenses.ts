
import { Expense } from "@/services/supabase-types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

export const useExpenses = () => {
  return useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        console.error('Error fetching expenses:', error);
        throw error;
      }
      
      return data || [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useExpense = (id: string) => {
  return useQuery({
    queryKey: ["expense", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Expense ID is required");
      }
      
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error(`Error fetching expense with ID ${id}:`, error);
        throw error;
      }
      
      // Convert the data to match expected format
      const expenseData: Expense = {
        ...data,
        paymentMethod: data.payment_method,
      };
      
      return expenseData;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (expense: Partial<Expense>) => {
      // Format the data for Supabase
      const supabaseData = {
        ...expense,
        payment_method: expense.paymentMethod,
        receipt_url: expense.receipt_url || null,
      };
      
      const { data, error } = await supabase
        .from('expenses')
        .insert([supabaseData])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating expense:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast({
        title: "Expense created",
        description: "The expense has been created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create expense: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async ({ id, ...expense }: Partial<Expense> & { id: string }) => {
      // Format the data for Supabase
      const supabaseData = {
        ...expense,
        payment_method: expense.paymentMethod,
        receipt_url: expense.receipt_url || null,
      };
      
      const { data, error } = await supabase
        .from('expenses')
        .update(supabaseData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error(`Error updating expense with ID ${id}:`, error);
        throw error;
      }
      
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      queryClient.invalidateQueries({ queryKey: ['expense', variables.id] });
      toast({
        title: "Expense updated",
        description: "The expense has been updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update expense: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error(`Error deleting expense with ID ${id}:`, error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast({
        title: "Expense deleted",
        description: "The expense has been deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete expense: ${error.message}`,
        variant: "destructive",
      });
    },
  });
};
