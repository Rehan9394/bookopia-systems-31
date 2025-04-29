import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

type OwnerFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  accountingInfo: {
    paymentMethod: string;
    accountNumber: string;
    bankName: string;
    iban: string;
    swift: string;
  };
  taxInfo: {
    taxId: string;
    taxDocuments: string[];
    taxResidence: string;
  };
  notes: string;
  birthdate?: Date;
  citizenship: string;
};

const OwnerAdd = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<OwnerFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    accountingInfo: {
      paymentMethod: '',
      accountNumber: '',
      bankName: '',
      iban: '',
      swift: '',
    },
    taxInfo: {
      taxId: '',
      taxDocuments: [],
      taxResidence: '',
    },
    notes: '',
    citizenship: '',
  });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'Password and Confirm Password do not match.',
        status: 'error',
      });
      return false;
    }
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested objects
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      if (parentKey === 'accountingInfo') {
        setFormData({
          ...formData,
          accountingInfo: {
            ...formData.accountingInfo,
            [childKey]: value,
          },
        });
      } else if (parentKey === 'taxInfo') {
        setFormData({
          ...formData,
          taxInfo: {
            ...formData.taxInfo,
            [childKey]: value,
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    // Handle nested objects
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      if (parentKey === 'accountingInfo') {
        setFormData({
          ...formData,
          accountingInfo: {
            ...formData.accountingInfo,
            [childKey]: value,
          },
        });
      } else if (parentKey === 'taxInfo') {
        setFormData({
          ...formData,
          taxInfo: {
            ...formData.taxInfo,
            [childKey]: value,
          },
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData({
        ...formData,
        birthdate: date,
      });
    }
  };
  
  const getInitials = () => {
    return (
      (formData.firstName.charAt(0) + formData.lastName.charAt(0)).toUpperCase() ||
      'OW'
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePasswords()) return;

    console.log('Submitting owner:', formData);
    
    toast({
      title: "Owner Added",
      description: `${formData.firstName} ${formData.lastName} has been added successfully.`,
    });
    
    navigate('/owners');
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Owner</h1>
        <p className="text-muted-foreground mt-1">Create a new property owner profile</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="financial">Financial Info</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
          </TabsList>
          
          <TabsContent value="personal">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Enter the owner's personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name*</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name*</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address*</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="owner@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number*</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Birthdate</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.birthdate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.birthdate ? format(formData.birthdate, "PPP") : <span>Select date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.birthdate}
                            onSelect={handleDateChange}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="citizenship">Citizenship</Label>
                      <Select onValueChange={(value) => handleSelectChange('citizenship', value)}>
                        <SelectTrigger id="citizenship">
                          <SelectValue placeholder="Select citizenship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                          <SelectItem value="Germany">Germany</SelectItem>
                          <SelectItem value="France">France</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address*</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Street address"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="city">City*</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province*</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip/Postal Code*</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="Zip code"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country*</Label>
                    <Select onValueChange={(value) => handleSelectChange('country', value)} required>
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States">United States</SelectItem>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Canada">Canada</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Additional notes about this owner"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password*</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter password"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password*</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        placeholder="Confirm password"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Owner Preview</CardTitle>
                  <CardDescription>Preview of the owner profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center justify-center py-4">
                    <Avatar className="w-20 h-20 mb-4">
                      <AvatarFallback className="text-xl">{getInitials()}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium text-lg">
                      {formData.firstName || 'First'} {formData.lastName || 'Last'}
                    </h3>
                    <p className="text-muted-foreground">{formData.email || 'email@example.com'}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Properties:</span>
                      <span className="font-medium">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Revenue:</span>
                      <span className="font-medium">$0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Average Occupancy:</span>
                      <span className="font-medium">0%</span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-md">
                    <h4 className="font-medium text-blue-800 mb-2">Getting Started</h4>
                    <p className="text-sm text-blue-700">
                      After creating the owner, you'll be able to add properties and manage their financial details.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="financial">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Financial Information</CardTitle>
                  <CardDescription>Enter the owner's payment and tax details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountingInfo.paymentMethod">Payment Method*</Label>
                    <Select onValueChange={(value) => handleSelectChange('accountingInfo.paymentMethod', value)}>
                      <SelectTrigger id="accountingInfo.paymentMethod">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="Check">Check</SelectItem>
                        <SelectItem value="PayPal">PayPal</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accountingInfo.bankName">Bank Name</Label>
                    <Input
                      id="accountingInfo.bankName"
                      name="accountingInfo.bankName"
                      value={formData.accountingInfo.bankName}
                      onChange={handleInputChange}
                      placeholder="Enter bank name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="accountingInfo.accountNumber">Account Number</Label>
                      <Input
                        id="accountingInfo.accountNumber"
                        name="accountingInfo.accountNumber"
                        value={formData.accountingInfo.accountNumber}
                        onChange={handleInputChange}
                        placeholder="Enter account number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accountingInfo.iban">IBAN</Label>
                      <Input
                        id="accountingInfo.iban"
                        name="accountingInfo.iban"
                        value={formData.accountingInfo.iban}
                        onChange={handleInputChange}
                        placeholder="Enter IBAN"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accountingInfo.swift">SWIFT/BIC Code</Label>
                    <Input
                      id="accountingInfo.swift"
                      name="accountingInfo.swift"
                      value={formData.accountingInfo.swift}
                      onChange={handleInputChange}
                      placeholder="Enter SWIFT/BIC code"
                    />
                  </div>
                  
                  <div className="pt-4 border-t mt-4">
                    <h3 className="font-medium mb-4">Tax Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="taxInfo.taxId">Tax ID / VAT Number</Label>
                      <Input
                        id="taxInfo.taxId"
                        name="taxInfo.taxId"
                        value={formData.taxInfo.taxId}
                        onChange={handleInputChange}
                        placeholder="Enter tax ID"
                      />
                    </div>
                    
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="taxInfo.taxResidence">Tax Residence</Label>
                      <Select onValueChange={(value) => handleSelectChange('taxInfo.taxResidence', value)}>
                        <SelectTrigger id="taxInfo.taxResidence">
                          <SelectValue placeholder="Select tax residence" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                          <SelectItem value="Germany">Germany</SelectItem>
                          <SelectItem value="France">France</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="mt-4">
                      <Label>Tax Documents</Label>
                      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center mt-2">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">
                            Drag and drop tax documents here, or click to browse
                          </p>
                        </div>
                        <Button type="button" variant="outline" className="mt-4">
                          Upload Documents
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Payment Schedule</CardTitle>
                  <CardDescription>Set up how and when the owner gets paid</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-md">
                    <h4 className="font-medium text-blue-800 mb-2">Payment Information</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• All payments are processed on the 1st of each month</li>
                      <li>• Bank transfers typically take 2-3 business days</li>
                      <li>• Payment receipts are automatically emailed</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Commission Structure</h4>
                    <p className="text-sm text-muted-foreground">
                      Our standard commission rate is 10% of booking revenue.
                      Custom commission rates can be negotiated for owners with multiple properties.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Tax Withholding</h4>
                    <p className="text-sm text-muted-foreground">
                      Depending on the owner's tax residence, we may be required to withhold taxes on payments.
                      Please ensure all tax documents are uploaded.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <CardTitle>Properties</CardTitle>
                <CardDescription>Add properties for this owner</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <h3 className="font-medium text-lg mb-2">No Properties Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    You can add properties after creating the owner account
                  </p>
                  <Button type="button" variant="outline" disabled>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Property
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <div className="flex justify-end gap-4 mt-6">
            <Button type="button" variant="outline" onClick={() => navigate('/owners')}>
              Cancel
            </Button>
            <Button type="submit">
              Add Owner
            </Button>
          </div>
        </Tabs>
      </form>
    </div>
  );
};

export default OwnerAdd;
