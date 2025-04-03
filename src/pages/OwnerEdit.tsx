
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, Building, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Owner name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(6, {
    message: "Phone number is required.",
  }),
  address: z.string().min(5, {
    message: "Address is required.",
  }),
  bankDetails: z.string().optional(),
  commissionRate: z.string().min(1, {
    message: "Commission rate is required.",
  }),
  notes: z.string().optional(),
});

const OwnerEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  // Mock data for the owner - in a real app, this would be fetched from an API
  const mockOwner = {
    id: id,
    name: 'David Miller',
    email: 'david@example.com',
    phone: '+1 234 567 890',
    address: '123 Maple Street, New York, NY 10001',
    bankDetails: 'Bank: CitiBank\nAccount: 1234567890\nIBAN: US123456789',
    commissionRate: '15',
    notes: 'Prefers email communication. Properties require weekly maintenance reports.',
    avatar: null
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      bankDetails: '',
      commissionRate: '',
      notes: '',
    },
  });

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      // In a real app, this would fetch owner data from an API
      setLoading(false);
      form.reset({
        name: mockOwner.name,
        email: mockOwner.email,
        phone: mockOwner.phone,
        address: mockOwner.address,
        bankDetails: mockOwner.bankDetails,
        commissionRate: mockOwner.commissionRate,
        notes: mockOwner.notes,
      });
      toast({
        description: `Loaded owner information for ID: ${id}`
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id, toast, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would save the data to an API
    console.log(values);
    
    toast({
      title: "Owner Updated",
      description: `Owner ${values.name} has been updated successfully.`,
    });
    
    // Navigate back to the owner details page
    navigate(`/owners/${id}`);
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="animate-pulse p-6">
        <div className="h-7 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="bg-gray-100 rounded-lg p-6 h-96"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate(`/owners/${id}`)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Edit Owner</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Edit the owner's personal and contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+1 234 567 890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="commissionRate"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Commission Rate (%)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" max="100" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Full address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Financial Details</CardTitle>
                  <CardDescription>Bank and payment information</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="bankDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Bank name, account number, IBAN, etc."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This information will be used for payments to the owner.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Additional Information</CardTitle>
                  <CardDescription>Any notes or special requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Additional notes about this owner..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate(`/owners/${id}`)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Owner Profile</CardTitle>
              <CardDescription>Details and property information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <Avatar className="w-24 h-24 mx-auto">
                <AvatarImage src={mockOwner.avatar || undefined} />
                <AvatarFallback className="text-2xl">
                  {getInitials(mockOwner.name)}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="font-semibold text-lg">{mockOwner.name}</h3>
                <p className="text-muted-foreground">{mockOwner.email}</p>
              </div>
              
              <div className="pt-4 border-t text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Properties</span>
                </div>
                
                <div className="space-y-2 ml-7">
                  <div className="p-2 bg-primary/5 rounded-md">
                    <div className="font-medium">Marina Tower - Room 305</div>
                    <div className="text-sm text-muted-foreground">
                      Ocean View, King Bed
                    </div>
                  </div>
                  <div className="p-2 bg-primary/5 rounded-md">
                    <div className="font-medium">Downtown Heights - Room 401</div>
                    <div className="text-sm text-muted-foreground">
                      City View, Two Queen Beds
                    </div>
                  </div>
                  <div className="p-2 bg-primary/5 rounded-md">
                    <div className="font-medium">Marina Tower - Room 210</div>
                    <div className="text-sm text-muted-foreground">
                      Garden View, Queen Bed
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OwnerEdit;
