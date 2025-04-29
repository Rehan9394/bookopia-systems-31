
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
      
      // Map the database fields to the Expense type
      const expenses: Expense[] = (data || []).map(expense => ({
        ...expense,
        property: expense.property_id || '',
        paymentMethod: expense.payment_method,
        owner: expense.owner_id
      }));
      
      return expenses;
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
        property: data.property_id || '',
        paymentMethod: data.payment_method,
        owner: data.owner_id
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
        description: expense.description,
        amount: expense.amount,
        date: expense.date,
        category: expense.category,
        property_id: expense.property_id || expense.property,
        vendor: expense.vendor || null,
        payment_method: expense.paymentMethod || expense.payment_method,
        receipt_url: expense.receipt_url || null,
        notes: expense.notes || null,
        status: expense.status || 'pending',
        owner_id: expense.owner_id || expense.owner || null
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
        description: expense.description,
        amount: expense.amount,
        date: expense.date,
        category: expense.category,
        property_id: expense.property_id || expense.property,
        vendor: expense.vendor || null,
        payment_method: expense.paymentMethod || expense.payment_method,
        receipt_url: expense.receipt_url || null,
        notes: expense.notes || null,
        status: expense.status || 'pending',
        owner_id: expense.owner_id || expense.owner || null
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
