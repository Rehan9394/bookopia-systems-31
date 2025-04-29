
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Save, Trash } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { GeneralSetting } from "@/services/settingsService";

export default function GeneralSettingsForm() {
  const { settings, isLoading, updateSetting, createSetting, deleteSetting } = useSettings();
  const [activeTab, setActiveTab] = useState("general");

  // Group settings by their group
  const groupedSettings = settings.reduce((acc, setting) => {
    const group = setting.setting_group;
    if (!acc[group]) acc[group] = [];
    acc[group].push(setting);
    return acc;
  }, {} as Record<string, GeneralSetting[]>);
  
  const handleUpdateSetting = (id: string, value: string) => {
    updateSetting({ id, value });
  };

  const handleDeleteSetting = (id: string) => {
    deleteSetting(id);
  };
  
  const renderSettingField = (setting: GeneralSetting) => {
    switch (setting.setting_type) {
      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              id={setting.id}
              checked={setting.setting_value === 'true'}
              onCheckedChange={(checked) => 
                handleUpdateSetting(setting.id, checked ? 'true' : 'false')
              }
            />
            <Label htmlFor={setting.id}>{setting.setting_value === 'true' ? 'Enabled' : 'Disabled'}</Label>
          </div>
        );
        
      case 'number':
        return (
          <Input
            type="number"
            id={setting.id}
            value={setting.setting_value || ''}
            onChange={(e) => handleUpdateSetting(setting.id, e.target.value)}
          />
        );
        
      default:
        return (
          <Input
            type="text"
            id={setting.id}
            value={setting.setting_value || ''}
            onChange={(e) => handleUpdateSetting(setting.id, e.target.value)}
          />
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">General Settings</h1>
        <p className="text-muted-foreground">Configure system-wide settings for your application</p>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notification">Notifications</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="booking">Booking</TabsTrigger>
        </TabsList>
        
        {Object.entries(groupedSettings).map(([group, groupSettings]) => (
          <TabsContent key={group} value={group} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{group} Settings</CardTitle>
                <CardDescription>
                  Configure {group} settings for your application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {groupSettings.map((setting) => (
                  <div key={setting.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div>
                      <Label htmlFor={setting.id} className="font-medium">
                        {setting.setting_key.split('_').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </Label>
                      {setting.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {setting.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {renderSettingField(setting)}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSetting(setting.id)}
                      >
                        <Trash className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {groupSettings.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">
                    No {group} settings found. Add new settings below.
                  </p>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* New Setting Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Setting</CardTitle>
          <CardDescription>Create a new configuration setting</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            createSetting({
              setting_key: formData.get('setting_key') as string,
              setting_value: formData.get('setting_value') as string,
              setting_type: formData.get('setting_type') as string,
              setting_group: activeTab,
              description: formData.get('description') as string,
            });
            e.currentTarget.reset();
          }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="setting_key">Setting Key</Label>
                <Input
                  id="setting_key"
                  name="setting_key"
                  placeholder="e.g., site_name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="setting_type">Type</Label>
                <select 
                  id="setting_type"
                  name="setting_type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="string">Text</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                  <option value="json">JSON</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="setting_value">Value</Label>
              <Input
                id="setting_value"
                name="setting_value"
                placeholder="Setting value"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Description of this setting"
              />
            </div>
            
            <Button type="submit">Add Setting</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
