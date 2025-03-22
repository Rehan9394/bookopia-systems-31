
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Availability from "./pages/Availability";
import Rooms from "./pages/Rooms";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const MainLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-background overflow-auto">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="availability" element={<Availability />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="expenses" element={<Navigate to="/" />} />
            <Route path="cleaning" element={<Navigate to="/" />} />
            <Route path="channel" element={<Navigate to="/" />} />
            <Route path="users" element={<Navigate to="/" />} />
            <Route path="owners" element={<Navigate to="/" />} />
            <Route path="reports" element={<Navigate to="/" />} />
            <Route path="audit" element={<Navigate to="/" />} />
            <Route path="settings" element={<Navigate to="/" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
