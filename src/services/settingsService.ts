
import { supabase } from "@/integrations/supabase/client";

export interface GeneralSetting {
  id: string;
  setting_key: string;
  setting_value: string | null;
  setting_type: string;
  setting_group: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export type SettingGroup = 'general' | 'notification' | 'payment' | 'booking';

// Function to get all settings
export const fetchSettings = async (): Promise<GeneralSetting[]> => {
  const { data, error } = await supabase
    .from('general_settings')
    .select('*');

  if (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }

  return data || [];
};

// Function to get settings by group
export const fetchSettingsByGroup = async (group: SettingGroup): Promise<GeneralSetting[]> => {
  const { data, error } = await supabase
    .from('general_settings')
    .select('*')
    .eq('setting_group', group);

  if (error) {
    console.error(`Error fetching ${group} settings:`, error);
    throw error;
  }

  return data || [];
};

// Function to update a setting
export const updateSetting = async (id: string, value: string): Promise<GeneralSetting> => {
  const { data, error } = await supabase
    .from('general_settings')
    .update({ setting_value: value })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating setting:', error);
    throw error;
  }

  return data;
};

// Function to create a setting
export const createSetting = async (setting: Omit<GeneralSetting, 'id' | 'created_at' | 'updated_at'>): Promise<GeneralSetting> => {
  const { data, error } = await supabase
    .from('general_settings')
    .insert(setting)
    .select()
    .single();

  if (error) {
    console.error('Error creating setting:', error);
    throw error;
  }

  return data;
};

// Function to delete a setting
export const deleteSetting = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('general_settings')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting setting:', error);
    throw error;
  }
};
