
import React, { useState } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useOwners } from '@/hooks/useOwners';

const OwnerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { data: owners } = useOwners();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is a mockup authentication for demo purposes
    // In a real app, this would be handled by a proper auth service
    setTimeout(() => {
      const foundOwner = owners?.find(owner => owner.email === email);
      
      if (foundOwner) {
        // Store owner info in localStorage for this demo
        localStorage.setItem('ownerLoggedIn', 'true');
        localStorage.setItem('ownerId', foundOwner.id);
        localStorage.setItem('ownerName', foundOwner.name);
        
        toast({
          title: 'Login successful',
          description: `Welcome back, ${foundOwner.name}!`,
        });
        
        navigate('/owner/dashboard');
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password.',
          variant: 'destructive',
        });
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 animate-fade-in bg-background">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Hotel Manager</h1>
        <p className="text-muted-foreground">Property Owner Portal</p>
      </div>
      
      <Card className="w-full max-w-md border-none shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Owner Login</CardTitle>
          <CardDescription className="text-center">
            Access your property dashboard
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="your.email@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit"
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login to Owner Portal'}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <p className="mt-4 text-center text-sm">
        <Link to="/login" className="text-primary hover:underline">
          Staff Login
        </Link>
      </p>
    </div>
  );
};

export default OwnerLogin;
