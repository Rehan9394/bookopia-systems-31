import { Route, Routes, Navigate, useLocation, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/use-auth';

// Regular staff pages
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import BookingAdd from './pages/BookingAdd';
import BookingEdit from './pages/BookingEdit';
import BookingView from './pages/BookingView';
import Rooms from './pages/Rooms';
import RoomAdd from './pages/RoomAdd';
import RoomEdit from './pages/RoomEdit';
import RoomView from './pages/RoomView';
import Availability from './pages/Availability';
import CleaningStatus from './pages/CleaningStatus';
import Owners from './pages/Owners';
import OwnerAdd from './pages/OwnerAdd';
import OwnerEdit from './pages/OwnerEdit';
import OwnerView from './pages/OwnerView';
import Users from './pages/Users';
import UserAdd from './pages/UserAdd';
import UserEdit from './pages/UserEdit';
import UserView from './pages/UserView';
import Expenses from './pages/Expenses';
import ExpenseAdd from './pages/ExpenseAdd';
import ExpenseEdit from './pages/ExpenseEdit';
import ExpenseView from './pages/ExpenseView';
import Reports from './pages/Reports';
import ChannelManager from './pages/ChannelManager';
import AuditLogs from './pages/AuditLogs';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Property owner pages
import OwnerLogin from './pages/OwnerLogin';
import OwnerDashboard from './pages/OwnerDashboard';
import OwnerBookings from './pages/OwnerBookings';
import OwnerCleaningStatus from './pages/OwnerCleaningStatus';
import OwnerAvailability from './pages/OwnerAvailability';
import OwnerReports from './pages/OwnerReports';

// New pages for settings functionality
import PropertyAdd from './pages/PropertyAdd';
import PropertyEdit from './pages/PropertyEdit';
import RoomTypeAdd from './pages/RoomTypeAdd';
import RoomTypeEdit from './pages/RoomTypeEdit';
import EmailTemplateEdit from './pages/EmailTemplateEdit';
import SmsTemplateEdit from './pages/SmsTemplateEdit';
import UserRoleAdd from './pages/UserRoleAdd';
import UserRoleEdit from './pages/UserRoleEdit';

// Layout components
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { OwnerSidebar } from './components/layout/OwnerSidebar';
import { OwnerLayout } from './components/layout/OwnerLayout';

import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/owner/login" element={<OwnerLogin />} />
        
        {/* Owner routes (protected) */}
        <Route path="/owner" element={<OwnerLayout />}>
          <Route path="dashboard" element={
            <ProtectedRoute requiredRole={['owner']}>
              <OwnerDashboard />
            </ProtectedRoute>
          } />
          <Route path="bookings" element={
            <ProtectedRoute requiredRole={['owner']}>
              <OwnerBookings />
            </ProtectedRoute>
          } />
          <Route path="cleaning" element={
            <ProtectedRoute requiredRole={['owner']}>
              <OwnerCleaningStatus />
            </ProtectedRoute>
          } />
          <Route path="availability" element={
            <ProtectedRoute requiredRole={['owner']}>
              <OwnerAvailability />
            </ProtectedRoute>
          } />
          <Route path="reports" element={
            <ProtectedRoute requiredRole={['owner']}>
              <OwnerReports />
            </ProtectedRoute>
          } />
        </Route>
        
        {/* Main app layout (staff routes) */}
        <Route 
          path="/" 
          element={
            <div className="grid h-screen grid-cols-[280px_1fr] overflow-hidden">
              <Sidebar />
              <div className="flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
                  <Outlet />
                </main>
              </div>
            </div>
          }
        >
          <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
          <Route path="bookings/add" element={<ProtectedRoute><BookingAdd /></ProtectedRoute>} />
          <Route path="bookings/:id" element={<ProtectedRoute><BookingView /></ProtectedRoute>} />
          <Route path="bookings/:id/edit" element={<ProtectedRoute><BookingEdit /></ProtectedRoute>} />
          <Route path="rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
          <Route path="rooms/add" element={<ProtectedRoute><RoomAdd /></ProtectedRoute>} />
          <Route path="rooms/:id" element={<ProtectedRoute><RoomView /></ProtectedRoute>} />
          <Route path="rooms/:id/edit" element={<ProtectedRoute><RoomEdit /></ProtectedRoute>} />
          <Route path="availability" element={<ProtectedRoute><Availability /></ProtectedRoute>} />
          <Route path="cleaning" element={<ProtectedRoute><CleaningStatus /></ProtectedRoute>} />
          <Route path="owners" element={<ProtectedRoute><Owners /></ProtectedRoute>} />
          <Route path="owners/add" element={<ProtectedRoute><OwnerAdd /></ProtectedRoute>} />
          <Route path="owners/:id" element={<ProtectedRoute><OwnerView /></ProtectedRoute>} />
          <Route path="owners/:id/edit" element={<ProtectedRoute><OwnerEdit /></ProtectedRoute>} />
          <Route path="users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="users/add" element={<ProtectedRoute><UserAdd /></ProtectedRoute>} />
          <Route path="users/:id" element={<ProtectedRoute><UserView /></ProtectedRoute>} />
          <Route path="users/:id/edit" element={<ProtectedRoute><UserEdit /></ProtectedRoute>} />
          <Route path="expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
          <Route path="expenses/add" element={<ProtectedRoute><ExpenseAdd /></ProtectedRoute>} />
          <Route path="expenses/:id" element={<ProtectedRoute><ExpenseView /></ProtectedRoute>} />
          <Route path="expenses/:id/edit" element={<ProtectedRoute><ExpenseEdit /></ProtectedRoute>} />
          <Route path="reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="channels" element={<ProtectedRoute><ChannelManager /></ProtectedRoute>} />
          <Route path="audit-logs" element={<ProtectedRoute><AuditLogs /></ProtectedRoute>} />
          <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          
          {/* Settings routes */}
          <Route path="settings/properties/add" element={<ProtectedRoute><PropertyAdd /></ProtectedRoute>} />
          <Route path="settings/properties/:id/edit" element={<ProtectedRoute><PropertyEdit /></ProtectedRoute>} />
          <Route path="settings/room-types/add" element={<ProtectedRoute><RoomTypeAdd /></ProtectedRoute>} />
          <Route path="settings/room-types/:id/edit" element={<ProtectedRoute><RoomTypeEdit /></ProtectedRoute>} />
          <Route path="settings/email-templates/:id" element={<ProtectedRoute><EmailTemplateEdit /></ProtectedRoute>} />
          <Route path="settings/sms-templates/:id" element={<ProtectedRoute><SmsTemplateEdit /></ProtectedRoute>} />
          <Route path="settings/user-roles/add" element={<ProtectedRoute><UserRoleAdd /></ProtectedRoute>} />
          <Route path="settings/user-roles/:id/edit" element={<ProtectedRoute><UserRoleEdit /></ProtectedRoute>} />
        </Route>
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Toaster />
    </AuthProvider>
  );
}

const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: { 
  children: JSX.Element,
  requiredRole?: string[]
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();
  
  // Don't redirect until auth state is loaded from localStorage
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If a role is required and user doesn't have it, redirect accordingly
  if (requiredRole && (!user || !requiredRole.includes(user.role))) {
    // Redirect staff to staff dashboard or owners to owner dashboard
    if (user.role === 'owner') {
      return <Navigate to="/owner/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }
  
  // User is authenticated and has required role, render the component
  return children;
};

export default App;
