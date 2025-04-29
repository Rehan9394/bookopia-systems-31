
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from 'react-router-dom';
import PropertyForm from './PropertyForm';
import RoomTypeForm from './RoomTypeForm';
import GeneralSettingsForm from './GeneralSettingsForm';

const SettingsLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('general');

  React.useEffect(() => {
    const path = location.pathname;
    if (path.includes('/settings/properties')) {
      setActiveTab('properties');
    } else if (path.includes('/settings/room-types')) {
      setActiveTab('roomTypes');
    } else if (path.includes('/settings/users')) {
      setActiveTab('users');
    } else {
      setActiveTab('general');
    }
  }, [location]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    switch (value) {
      case 'properties':
        navigate('/settings/properties');
        break;
      case 'roomTypes':
        navigate('/settings/room-types');
        break;
      case 'users':
        navigate('/settings/users');
        break;
      default:
        navigate('/settings');
        break;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings</p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="roomTypes">Room Types</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <GeneralSettingsForm />
        </TabsContent>
        
        <TabsContent value="properties">
          <div className="space-y-6">
            {!location.pathname.includes('add') && !location.pathname.includes('edit') && (
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Properties</h2>
                  <p className="text-muted-foreground">Manage your property portfolio</p>
                </div>
                <button
                  onClick={() => navigate('/property/add')}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                >
                  Add Property
                </button>
              </div>
            )}

            {location.pathname.includes('/property/add') && <PropertyForm />}
            {location.pathname.includes('/property/edit/') && (
              <PropertyForm propertyId={location.pathname.split('/').pop()} />
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="roomTypes">
          <div className="space-y-6">
            {!location.pathname.includes('add') && !location.pathname.includes('edit') && (
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Room Types</h2>
                  <p className="text-muted-foreground">Manage room categories and pricing</p>
                </div>
                <button
                  onClick={() => navigate('/room-type/add')}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                >
                  Add Room Type
                </button>
              </div>
            )}

            {location.pathname.includes('/room-type/add') && <RoomTypeForm />}
            {location.pathname.includes('/room-type/edit/') && (
              <RoomTypeForm roomTypeId={location.pathname.split('/').pop()} />
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Users</h2>
                <p className="text-muted-foreground">Manage system users and their roles</p>
              </div>
              <button
                onClick={() => navigate('/user/add')}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
              >
                Add User
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsLayout;
