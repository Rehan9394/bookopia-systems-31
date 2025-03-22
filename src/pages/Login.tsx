
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Hotel Manager</h1>
        <p className="text-muted-foreground">Your complete hotel management solution</p>
      </div>
      
      <Tabs defaultValue="staff" className="w-full max-w-md">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="staff">Staff Login</TabsTrigger>
          <TabsTrigger value="owner">Owner Login</TabsTrigger>
        </TabsList>
        
        <TabsContent value="staff">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Staff Login</CardTitle>
              <CardDescription>Enter your credentials to access the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="staff-email">Email</Label>
                <Input id="staff-email" type="email" placeholder="your.email@example.com" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="staff-password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="staff-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Login to Dashboard</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="owner">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle>Owner Login</CardTitle>
              <CardDescription>Access your property dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="owner-email">Email</Label>
                <Input id="owner-email" type="email" placeholder="your.email@example.com" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="owner-password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="owner-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Login to Owner Portal</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
