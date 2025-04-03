
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, Mail, Phone, Building2, CreditCard, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OwnerView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  
  // Mock owner data - in a real app, this would be fetched from an API
  const [owner, setOwner] = useState({
    id: Number(id),
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    properties: [
      { id: 1, name: 'Marina Tower - Unit 501', type: 'Apartment', status: 'Active' },
      { id: 2, name: 'Downtown Heights - Suite 302', type: 'Condo', status: 'Active' }
    ],
    accountingInfo: {
      bankName: 'National Bank',
      accountNumber: '****5678',
      routingNumber: '****9876',
      paymentMethod: 'Direct Deposit'
    },
    taxInfo: {
      taxId: '*****4321',
      taxDocuments: ['2022_Tax_Form.pdf', '2023_Tax_Form.pdf']
    },
    dateJoined: '2021-06-15T10:00:00',
    avatar: null,
    status: 'Active'
  });
  
  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleDelete = () => {
    // In a real app, this would call an API to delete the owner
    toast({
      title: "Owner Deleted",
      description: `${owner.firstName} ${owner.lastName} has been permanently deleted.`,
      variant: "destructive"
    });
    
    navigate('/owners');
  };
  
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="animate-pulse p-6">
        <div className="h-7 bg-gray-200 rounded w-1/4 mb-6"></div>
        <div className="bg-gray-100 rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="h-20 w-20 bg-gray-200 rounded-full"></div>
            <div className="space-y-3 flex-1">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/5"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate('/owners')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">Owner Details</h1>
        <Badge className={owner.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
          {owner.status}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="info">Basic Info</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Owner Information</CardTitle>
                  <CardDescription>Personal and contact details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={owner.avatar || undefined} />
                      <AvatarFallback className="text-2xl">{getInitials(owner.firstName, owner.lastName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-semibold">{owner.firstName} {owner.lastName}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p className="text-muted-foreground">{owner.email}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="text-muted-foreground">{owner.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Address
                    </h3>
                    <div className="bg-muted p-4 rounded-md">
                      <p>{owner.address.street}</p>
                      <p>{owner.address.city}, {owner.address.state} {owner.address.zipCode}</p>
                      <p>{owner.address.country}</p>
                    </div>
                  </div>
                  
                  <div className="border-t mt-6 pt-6">
                    <p className="text-sm text-muted-foreground">Owner Since</p>
                    <p className="font-medium">{formatDate(owner.dateJoined)}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="properties">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Owner Properties</CardTitle>
                  <CardDescription>Properties owned by this person</CardDescription>
                </CardHeader>
                <CardContent>
                  {owner.properties.length > 0 ? (
                    <div className="space-y-4">
                      {owner.properties.map(property => (
                        <div key={property.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{property.name}</h3>
                              <p className="text-sm text-muted-foreground">{property.type}</p>
                            </div>
                            <Badge className={property.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {property.status}
                            </Badge>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/rooms/view/${property.id}`}>View Details</Link>
                            </Button>
                            <Button variant="outline" size="sm">Manage Bookings</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-muted-foreground">No properties found for this owner</p>
                      <Button className="mt-4" variant="outline" asChild>
                        <Link to="/rooms/add">Add New Property</Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="financial">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Financial Information</CardTitle>
                  <CardDescription>Banking and tax details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Banking Information
                    </h3>
                    <div className="bg-muted p-4 rounded-md space-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Bank Name</p>
                          <p>{owner.accountingInfo.bankName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Payment Method</p>
                          <p>{owner.accountingInfo.paymentMethod}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border-t pt-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Account Number</p>
                          <p>{owner.accountingInfo.accountNumber}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Routing Number</p>
                          <p>{owner.accountingInfo.routingNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Tax Information
                    </h3>
                    <div className="bg-muted p-4 rounded-md space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Tax ID</p>
                        <p>{owner.taxInfo.taxId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Tax Documents</p>
                        <div className="mt-2 space-y-2">
                          {owner.taxInfo.taxDocuments.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                              <span className="text-sm">{doc}</span>
                              <Button variant="ghost" size="sm">
                                Download
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Actions</CardTitle>
              <CardDescription>Manage this owner account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full gap-2" asChild>
                <Link to={`/owners/edit/${id}`}>
                  <Edit className="h-4 w-4" />
                  Edit Owner
                </Link>
              </Button>
              
              <Button className="w-full gap-2" variant="outline" asChild>
                <Link to={`/rooms/add?owner=${owner.id}`}>
                  <Building2 className="h-4 w-4" />
                  Add Property
                </Link>
              </Button>
              
              <Button 
                className="w-full gap-2" 
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Email Sent",
                    description: `An email has been sent to ${owner.firstName} ${owner.lastName}.`
                  });
                }}
              >
                <Mail className="h-4 w-4" />
                Send Email
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    className="w-full gap-2" 
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Owner
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the owner account
                      for {owner.firstName} {owner.lastName} and remove their data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Financial Summary</CardTitle>
              <CardDescription>Overview of financial data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-md">
                    <p className="text-sm text-green-800 font-medium">Total Earnings</p>
                    <p className="text-2xl font-bold text-green-700">$12,458</p>
                    <p className="text-xs text-green-600 mt-1">Year to date</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-md">
                    <p className="text-sm text-blue-800 font-medium">Pending</p>
                    <p className="text-2xl font-bold text-blue-700">$2,341</p>
                    <p className="text-xs text-blue-600 mt-1">To be paid</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/reports">View Full Financial Report</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OwnerView;
