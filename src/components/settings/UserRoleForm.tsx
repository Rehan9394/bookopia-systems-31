
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Shield } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface UserRoleFormProps {
  roleId?: string;
}

// Mock user roles
const userRoles = {
  'administrator': {
    id: 'administrator',
    name: 'Administrator',
    description: 'Full system access with all permissions',
    isSystem: true,
    permissions: {
      manageBookings: true,
      manageRooms: true,
      viewReports: true,
      manageStaff: true,
      systemSettings: true,
      createBookings: true,
      editBookings: true,
      checkInOut: true,
      viewRooms: true,
      editRooms: true,
      viewProperties: true,
      editProperties: true,
      manageUsers: true,
    }
  },
  'manager': {
    id: 'manager',
    name: 'Manager',
    description: 'Property management with limited system settings access',
    isSystem: true,
    permissions: {
      manageBookings: true,
      manageRooms: true,
      viewReports: true,
      manageStaff: true,
      systemSettings: false,
      createBookings: true,
      editBookings: true,
      checkInOut: true,
      viewRooms: true,
      editRooms: true,
      viewProperties: true,
      editProperties: false,
      manageUsers: false,
    }
  },
  'staff': {
    id: 'staff',
    name: 'Staff',
    description: 'Front desk operations with limited management access',
    isSystem: true,
    permissions: {
      manageBookings: false,
      manageRooms: false,
      viewReports: false,
      manageStaff: false,
      systemSettings: false,
      createBookings: true,
      editBookings: true,
      checkInOut: true,
      viewRooms: true,
      editRooms: false,
      viewProperties: true,
      editProperties: false,
      manageUsers: false,
    }
  },
};

export default function UserRoleForm({ roleId }: UserRoleFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const role = roleId ? userRoles[roleId as keyof typeof userRoles] : undefined;
  const isSystem = role?.isSystem || false;
  
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    permissions: {
      manageBookings: role?.permissions.manageBookings || false,
      manageRooms: role?.permissions.manageRooms || false,
      viewReports: role?.permissions.viewReports || false,
      manageStaff: role?.permissions.manageStaff || false,
      systemSettings: role?.permissions.systemSettings || false,
      createBookings: role?.permissions.createBookings || false,
      editBookings: role?.permissions.editBookings || false,
      checkInOut: role?.permissions.checkInOut || false,
      viewRooms: role?.permissions.viewRooms || false,
      editRooms: role?.permissions.editRooms || false,
      viewProperties: role?.permissions.viewProperties || false,
      editProperties: role?.permissions.editProperties || false,
      manageUsers: role?.permissions.manageUsers || false,
    }
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePermissionChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [name]: checked
      }
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to the server
    toast({
      title: role ? "Role Updated" : "Role Created",
      description: role 
        ? "The user role has been updated successfully." 
        : "New user role has been created successfully."
    });
    
    navigate('/settings');
  };
  
  if (roleId && !role) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Role not found</h1>
        <Button variant="ghost" className="mt-4" onClick={() => navigate('/settings')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Settings
        </Button>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{role ? 'Edit User Role' : 'Add User Role'}</h1>
          <p className="text-muted-foreground mt-1">
            {role ? 'Update user role details and permissions' : 'Create a new user role with custom permissions'}
          </p>
        </div>
        <Button variant="ghost" onClick={() => navigate('/settings')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Settings
        </Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Role Details
            </CardTitle>
            <CardDescription>
              Basic information about this user role
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Role Name *</Label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSystem}
              />
              {isSystem && (
                <p className="text-sm text-amber-600">
                  This is a system role and its name cannot be changed.
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>
              Configure what users with this role can do
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Bookings</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between border rounded-md p-3">
                  <Label>Create Bookings</Label>
                  <Switch
                    checked={formData.permissions.createBookings}
                    onCheckedChange={(checked) => handlePermissionChange('createBookings', checked)}
                  />
                </div>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <Label>Edit Bookings</Label>
                  <Switch
                    checked={formData.permissions.editBookings}
                    onCheckedChange={(checked) => handlePermissionChange('editBookings', checked)}
                  />
                </div>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <Label>Check In/Out</Label>
                  <Switch
                    checked={formData.permissions.checkInOut}
                    onCheckedChange={(checked) => handlePermissionChange('checkInOut', checked)}
                  />
                </div>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <Label>Manage All Bookings</Label>
                  <Switch
                    checked={formData.permissions.manageBookings}
                    onCheckedChange={(checked) => handlePermissionChange('manageBookings', checked)}
                  />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Rooms & Properties</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between border rounded-md p-3">
                  <Label>View Rooms</Label>
                  <Switch
                    checked={formData.permissions.viewRooms}
                    onCheckedChange={(checked) => handlePermissionChange('viewRooms', checked)}
                  />
                </div>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <Label>Edit Rooms</Label>
                  <Switch
                    checked={formData.permissions.editRooms}
                    onCheckedChange={(checked) => handlePermissionChange('editRooms', checked)}
                  />
                </div>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <Label>Manage All Rooms</Label>
                  <Switch
                    checked={formData.permissions.manageRooms}
                    onCheckedChange={(checked) => handlePermissionChange('manageRooms', checked)}
                  />
                </div>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <Label>View Properties</Label>
                  <Switch
                    checked={formData.permissions.viewProperties}
                    onCheckedChange={(checked) => handlePermissionChange('viewProperties', checked)}
                  />
                </div>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <Label>Edit Properties</Label>
                  <Switch
                    checked={formData.permissions.editProperties}
                    onCheckedChange={(checked) => handlePermissionChange('editProperties', checked)}
                  />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Administration</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between border rounded-md p-3">
                  <Label>View Reports</Label>
                  <Switch
                    checked={formData.permissions.viewReports}
                    onCheckedChange={(checked) => handlePermissionChange('viewReports', checked)}
                  />
                </div>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <Label>Manage Staff</Label>
                  <Switch
                    checked={formData.permissions.manageStaff}
                    onCheckedChange={(checked) => handlePermissionChange('manageStaff', checked)}
                  />
                </div>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <Label>Manage Users</Label>
                  <Switch
                    checked={formData.permissions.manageUsers}
                    onCheckedChange={(checked) => handlePermissionChange('manageUsers', checked)}
                  />
                </div>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <Label>System Settings</Label>
                  <Switch
                    checked={formData.permissions.systemSettings}
                    onCheckedChange={(checked) => handlePermissionChange('systemSettings', checked)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => navigate('/settings')}>
            Cancel
          </Button>
          <Button type="submit" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            {role ? 'Update Role' : 'Create Role'}
          </Button>
        </div>
      </form>
    </div>
  );
}
