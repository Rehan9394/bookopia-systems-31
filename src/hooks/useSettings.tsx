
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  fetchSettings, 
  fetchSettingsByGroup, 
  updateSetting, 
  createSetting, 
  deleteSetting, 
  GeneralSetting, 
  SettingGroup 
} from "@/services/settingsService";
import { useToast } from "@/hooks/use-toast";

export const useSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: settings = [], isLoading, error } = useQuery({
    queryKey: ["settings"],
    queryFn: fetchSettings,
  });

  const { mutate: updateSettingMutation } = useMutation({
    mutationFn: ({ id, value }: { id: string; value: string }) => updateSetting(id, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({
        title: "Setting Updated",
        description: "The setting has been updated successfully",
      });
    },
    onError: (error) => {
      console.error("Error updating setting:", error);
      toast({
        title: "Update Failed",
        description: "Failed to update the setting. Please try again.",
        variant: "destructive",
      });
    },
  });

  const { mutate: createSettingMutation } = useMutation({
    mutationFn: createSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({
        title: "Setting Created",
        description: "The setting has been created successfully",
      });
    },
    onError: (error) => {
      console.error("Error creating setting:", error);
      toast({
        title: "Creation Failed",
        description: "Failed to create the setting. Please try again.",
        variant: "destructive",
      });
    },
  });

  const { mutate: deleteSettingMutation } = useMutation({
    mutationFn: deleteSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast({
        title: "Setting Deleted",
        description: "The setting has been deleted successfully",
      });
    },
    onError: (error) => {
      console.error("Error deleting setting:", error);
      toast({
        title: "Deletion Failed",
        description: "Failed to delete the setting. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    settings,
    isLoading,
    error,
    updateSetting: updateSettingMutation,
    createSetting: createSettingMutation,
    deleteSetting: deleteSettingMutation,
  };
};

export const useSettingsByGroup = (group: SettingGroup) => {
  return useQuery({
    queryKey: ["settings", group],
    queryFn: () => fetchSettingsByGroup(group),
  });
};
