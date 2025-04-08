
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  Brush, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  BarChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
}

const NavItem = ({ to, icon: Icon, label, collapsed }: NavItemProps) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group",
        collapsed ? "justify-center" : "",
        isActive 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-foreground/70 hover:bg-accent hover:text-foreground"
      )}
    >
      <Icon className={cn("h-5 w-5 transition-transform", !collapsed && "group-hover:scale-110")} />
      {!collapsed && <span>{label}</span>}
      {collapsed && (
        <div className="absolute left-16 rounded-md px-2 py-1 ml-6 bg-popover text-foreground shadow-md opacity-0 -translate-x-3 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap z-50">
          {label}
        </div>
      )}
    </NavLink>
  );
};

interface NavGroupProps {
  title: string;
  children: React.ReactNode;
  collapsed: boolean;
}

const NavGroup = ({ title, children, collapsed }: NavGroupProps) => {
  return (
    <div className="mb-6">
      {!collapsed && (
        <div className="text-xs font-semibold text-foreground/50 uppercase tracking-wider px-3 mb-2">
          {title}
        </div>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

const OwnerHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const ownerName = localStorage.getItem('ownerName') || 'Property Owner';
  
  const handleLogout = () => {
    localStorage.removeItem('ownerLoggedIn');
    localStorage.removeItem('ownerId');
    localStorage.removeItem('ownerName');
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    
    navigate('/owner/login');
  };
  
  return (
    <header className="h-16 border-b border-border bg-background/90 backdrop-blur-sm sticky top-0 z-10">
      <div className="h-full flex items-center justify-between px-6">
        <div>
          <h1 className="font-semibold">Owner Portal</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right mr-2">
            <p className="text-sm font-medium">{ownerName}</p>
            <p className="text-xs text-muted-foreground">Property Owner</p>
          </div>
          
          <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export function OwnerLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div 
        className={cn(
          "h-screen sticky top-0 bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex items-center justify-between h-16 px-3 border-b border-border">
          {!collapsed && (
            <div className="font-semibold text-lg tracking-tight">
              HotelManager
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={cn("rounded-full", collapsed && "mx-auto")}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="flex-grow overflow-y-auto py-4 px-2">
          <NavGroup title="Overview" collapsed={collapsed}>
            <NavItem to="/owner/dashboard" icon={Home} label="Dashboard" collapsed={collapsed} />
            <NavItem to="/owner/bookings" icon={BookOpen} label="Bookings" collapsed={collapsed} />
            <NavItem to="/owner/availability" icon={Calendar} label="Availability" collapsed={collapsed} />
          </NavGroup>
          
          <NavGroup title="Management" collapsed={collapsed}>
            <NavItem to="/owner/cleaning" icon={Brush} label="Cleaning Status" collapsed={collapsed} />
            <NavItem to="/owner/reports" icon={BarChart} label="Reports" collapsed={collapsed} />
          </NavGroup>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col">
        <OwnerHeader />
        <main className="flex-1 p-6 bg-background overflow-auto">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default OwnerLayout;
