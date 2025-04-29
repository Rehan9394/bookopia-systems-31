// Import the supabase client
import { supabase } from "@/integrations/supabase/client";
import { 
  Room, 
  Booking, 
  User, 
  Owner, 
  Expense, 
  CleaningTask,
  PropertyOwnership
} from './supabase-types';

// Fetch rooms from Supabase
export const fetchRooms = async (): Promise<Room[]> => {
  const { data, error } = await supabase
    .from('rooms')
    .select('*');
  
  if (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
  
  return (data || []).map(room => ({
    ...room,
    status: room.status as 'available' | 'occupied' | 'maintenance'
  })) as Room[];
};

export const fetchRoomById = async (id: string): Promise<Room> => {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching room with ID ${id}:`, error);
      throw error;
    }
    
    if (!data) {
      throw new Error(`Room with ID ${id} not found`);
    }
    
    return {
      ...data,
      status: data.status as 'available' | 'occupied' | 'maintenance'
    } as Room;
  } catch (error) {
    console.error(`Error in fetchRoomById:`, error);
    throw error;
  }
};

export const fetchRoomByNumber = async (number: string): Promise<Room> => {
  try {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('number', number)
      .single();
    
    if (error) {
      console.error(`Error fetching room with number ${number}:`, error);
      throw error;
    }
    
    if (!data) {
      throw new Error(`Room with number ${number} not found`);
    }
    
    return {
      ...data,
      status: data.status as 'available' | 'occupied' | 'maintenance'
    } as Room;
  } catch (error) {
    console.error(`Error in fetchRoomByNumber:`, error);
    throw error;
  }
};

export const fetchBookings = async (): Promise<Booking[]> => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, rooms(number, property:type)');
    
    if (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error(`Error in fetchBookings:`, error);
    throw error;
  }
};

export const fetchBookingById = async (id: string): Promise<Booking> => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, rooms(number, property:type)')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error(`Error fetching booking with ID ${id}:`, error);
      throw error;
    }
    
    if (!data) {
      throw new Error(`Booking with ID ${id} not found`);
    }
    
    return data;
  } catch (error) {
    console.error(`Error in fetchBookingById:`, error);
    throw error;
  }
};

// Add additional API functions for other entities
export const fetchTodayCheckins = async (): Promise<Booking[]> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*, rooms(number, property:type)')
      .eq('check_in', today)
      .eq('status', 'confirmed');
    
    if (error) {
      console.error('Error fetching today\'s check-ins:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error(`Error in fetchTodayCheckins:`, error);
    throw error;
  }
};

export const fetchTodayCheckouts = async (): Promise<Booking[]> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*, rooms(number, property:type)')
      .eq('check_out', today)
      .eq('status', 'checked-in');
    
    if (error) {
      console.error('Error fetching today\'s check-outs:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error(`Error in fetchTodayCheckouts:`, error);
    throw error;
  }
};

// For now, providing empty implementations to avoid TypeScript errors
// These will be filled in as needed by future changes
export const fetchUsers = async (): Promise<User[]> => { return []; };
export const fetchOwners = async (): Promise<Owner[]> => { return []; };
export const fetchExpenses = async (): Promise<Expense[]> => { return []; };
export const fetchCleaningTasks = async (): Promise<CleaningTask[]> => { return []; };
export const fetchPropertyOwnership = async (): Promise<PropertyOwnership[]> => { return []; };
export const updateBookingStatus = async (id: string, status: string): Promise<void> => {};
export const updateRoomStatus = async (id: string, status: string): Promise<void> => {};
export const updateCleaningTaskStatus = async (id: string, status: string): Promise<void> => {};
