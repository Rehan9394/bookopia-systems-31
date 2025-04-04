
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';  // Add the missing import
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { 
  Save, 
  Building, 
  CreditCard, 
  Bell, 
  Lock, 
  Users, 
  Mail, 
  Globe,
  DollarSign,
  Percent
} from 'lucide-react';

// Form schema for General Settings
const generalFormSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  address: z.string(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string(),
  website: z.string().url({
    message: "Please enter a valid URL.",
  }).optional().or(z.literal('')),
  timeZone: z.string(),
  dateFormat: z.string(),
  currencySymbol: z.string().min(1, {
    message: "Currency symbol is required.",
  }),
});

// Form schema for Tax Settings
const taxFormSchema = z.object({
  vatRate: z.string(),
  cityTax: z.string(),
  tourismFee: z.string(),
  autoCalculate: z.boolean(),
});

// Form schema for Booking Settings
const bookingFormSchema = z.object({
  checkInTime: z.string(),
  checkOutTime: z.string(),
  minAdvanceBooking: z.string(),
  maxAdvanceBooking: z.string(),
  defaultCancellationPolicy: z.string(),
});

const Settings = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  // General Settings Form
  const generalForm = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      companyName: "DVR Group",
      address: "123 Main Street, New York, NY 10001",
      email: "info@dvrgroup.com",
      phone: "+1 234 567 890",
      website: "https://dvrgroup.com",
      timeZone: "UTC-5",
      dateFormat: "MM/DD/YYYY",
      currencySymbol: "$",
    },
  });
  
  // Tax Settings Form
  const taxForm = useForm<z.infer<typeof taxFormSchema>>({
    resolver: zodResolver(taxFormSchema),
    defaultValues: {
      vatRate: "7.5",
      cityTax: "2",
      tourismFee: "5",
      autoCalculate: true,
    },
  });
  
  // Booking Settings Form
  const bookingForm = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      checkInTime: "15:00",
      checkOutTime: "11:00",
      minAdvanceBooking: "1",
      maxAdvanceBooking: "365",
      defaultCancellationPolicy: "24h",
    },
  });
  
  // Handle form submissions
  function onGeneralSubmit(values: z.infer<typeof generalFormSchema>) {
    console.log(values);
    toast({
      title: "Settings Updated",
      description: "General settings have been updated successfully.",
    });
  }
  
  function onTaxSubmit(values: z.infer<typeof taxFormSchema>) {
    console.log(values);
    toast({
      title: "Settings Updated",
      description: "Tax settings have been updated successfully.",
    });
  }
  
  function onBookingSubmit(values: z.infer<typeof bookingFormSchema>) {
    console.log(values);
    toast({
      title: "Settings Updated",
      description: "Booking settings have been updated successfully.",
    });
  }
  
  function saveNotificationSettings() {
    toast({
      title: "Notifications Updated",
      description: "Notification settings have been updated successfully.",
    });
  }
  
  function saveSecuritySettings() {
    toast({
      title: "Security Settings Updated",
      description: "Security settings have been updated successfully.",
    });
  }
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your application preferences</p>
      </div>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-background border">
          <TabsTrigger value="general" className="data-[state=active]:bg-primary/5">
            <Building className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="tax" className="data-[state=active]:bg-primary/5">
            <DollarSign className="h-4 w-4 mr-2" />
            Tax
          </TabsTrigger>
          <TabsTrigger value="booking" className="data-[state=active]:bg-primary/5">
            <CreditCard className="h-4 w-4 mr-2" />
            Booking
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-primary/5">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary/5">
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-primary/5">
            <Users className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure your company and application settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...generalForm}>
                <form onSubmit={generalForm.handleSubmit(onGeneralSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={generalForm.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Phone</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={generalForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Regional Settings</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={generalForm.control}
                        name="timeZone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time Zone</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a timezone" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="UTC-12">UTC-12</SelectItem>
                                <SelectItem value="UTC-11">UTC-11</SelectItem>
                                <SelectItem value="UTC-10">UTC-10</SelectItem>
                                <SelectItem value="UTC-9">UTC-9</SelectItem>
                                <SelectItem value="UTC-8">UTC-8 (PST)</SelectItem>
                                <SelectItem value="UTC-7">UTC-7 (MST)</SelectItem>
                                <SelectItem value="UTC-6">UTC-6 (CST)</SelectItem>
                                <SelectItem value="UTC-5">UTC-5 (EST)</SelectItem>
                                <SelectItem value="UTC-4">UTC-4</SelectItem>
                                <SelectItem value="UTC-3">UTC-3</SelectItem>
                                <SelectItem value="UTC-2">UTC-2</SelectItem>
                                <SelectItem value="UTC-1">UTC-1</SelectItem>
                                <SelectItem value="UTC">UTC</SelectItem>
                                <SelectItem value="UTC+1">UTC+1</SelectItem>
                                <SelectItem value="UTC+2">UTC+2</SelectItem>
                                <SelectItem value="UTC+3">UTC+3</SelectItem>
                                <SelectItem value="UTC+4">UTC+4</SelectItem>
                                <SelectItem value="UTC+5">UTC+5</SelectItem>
                                <SelectItem value="UTC+6">UTC+6</SelectItem>
                                <SelectItem value="UTC+7">UTC+7</SelectItem>
                                <SelectItem value="UTC+8">UTC+8</SelectItem>
                                <SelectItem value="UTC+9">UTC+9</SelectItem>
                                <SelectItem value="UTC+10">UTC+10</SelectItem>
                                <SelectItem value="UTC+11">UTC+11</SelectItem>
                                <SelectItem value="UTC+12">UTC+12</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="dateFormat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date Format</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select date format" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={generalForm.control}
                        name="currencySymbol"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Currency Symbol</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="$">USD ($)</SelectItem>
                                <SelectItem value="€">EUR (€)</SelectItem>
                                <SelectItem value="£">GBP (£)</SelectItem>
                                <SelectItem value="¥">JPY (¥)</SelectItem>
                                <SelectItem value="₹">INR (₹)</SelectItem>
                                <SelectItem value="₽">RUB (₽)</SelectItem>
                                <SelectItem value="¥">CNY (¥)</SelectItem>
                                <SelectItem value="د.إ">AED (د.إ)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="w-full md:w-auto">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tax Settings */}
        <TabsContent value="tax">
          <Card>
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
              <CardDescription>Configure tax rates and calculation settings</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...taxForm}>
                <form onSubmit={taxForm.handleSubmit(onTaxSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={taxForm.control}
                      name="vatRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>VAT/GST Rate (%)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input {...field} type="number" min="0" step="0.1" />
                              <Percent className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Standard Value Added Tax or Goods and Services Tax rate
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={taxForm.control}
                      name="cityTax"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City Tax (%)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input {...field} type="number" min="0" step="0.1" />
                              <Percent className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Local city tax charged per booking
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={taxForm.control}
                      name="tourismFee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tourism Fee (%)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input {...field} type="number" min="0" step="0.1" />
                              <Percent className="h-4 w-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Tourism development fee charged per night
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={taxForm.control}
                      name="autoCalculate"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Auto-Calculate Taxes</FormLabel>
                            <FormDescription>
                              Automatically calculate and apply taxes to bookings
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="w-full md:w-auto">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Booking Settings */}
        <TabsContent value="booking">
          <Card>
            <CardHeader>
              <CardTitle>Booking Settings</CardTitle>
              <CardDescription>Configure booking policies and defaults</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...bookingForm}>
                <form onSubmit={bookingForm.handleSubmit(onBookingSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={bookingForm.control}
                      name="checkInTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Check-in Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormDescription>
                            Default check-in time for all properties
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={bookingForm.control}
                      name="checkOutTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Check-out Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormDescription>
                            Default check-out time for all properties
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={bookingForm.control}
                      name="minAdvanceBooking"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Advance Booking (days)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormDescription>
                            Minimum days in advance a booking can be made
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={bookingForm.control}
                      name="maxAdvanceBooking"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Advance Booking (days)</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormDescription>
                            Maximum days in advance a booking can be made
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={bookingForm.control}
                      name="defaultCancellationPolicy"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Default Cancellation Policy</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a policy" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="flexible">Flexible (same day)</SelectItem>
                              <SelectItem value="24h">Moderate (24 hours)</SelectItem>
                              <SelectItem value="48h">Strict (48 hours)</SelectItem>
                              <SelectItem value="7d">Super Strict (7 days)</SelectItem>
                              <SelectItem value="non-refundable">Non-refundable</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Default cancellation policy applied to new bookings
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="w-full md:w-auto">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when notifications are sent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                    <span>Email Notifications</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive notifications via email
                    </span>
                  </Label>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="sms-notifications" className="flex flex-col space-y-1">
                    <span>SMS Notifications</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Receive notifications via SMS
                    </span>
                  </Label>
                  <Switch
                    id="sms-notifications"
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  />
                </div>
              </div>
              
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">New Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Send notification when a new booking is created
                        </span>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Cancelled Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Send notification when a booking is cancelled
                        </span>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Check-in Reminders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Send reminder notification for upcoming check-ins
                        </span>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Check-out Reminders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Send reminder notification for upcoming check-outs
                        </span>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button onClick={saveNotificationSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security and backup options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Account Security</h3>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="two-factor" className="flex flex-col space-y-1">
                    <span>Two-Factor Authentication</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Require 2FA for all administrator accounts
                    </span>
                  </Label>
                  <Switch id="two-factor" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="session-timeout" className="flex flex-col space-y-1">
                    <span>Session Timeout</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Automatically log out inactive users after 30 minutes
                    </span>
                  </Label>
                  <Switch id="session-timeout" defaultChecked />
                </div>
              </div>
              
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">System Settings</h3>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="auto-backup" className="flex flex-col space-y-1">
                    <span>Automatic Backups</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Automatically back up system data daily
                    </span>
                  </Label>
                  <Switch
                    id="auto-backup"
                    checked={autoBackup}
                    onCheckedChange={setAutoBackup}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="maintenance-mode" className="flex flex-col space-y-1">
                    <span>Maintenance Mode</span>
                    <span className="font-normal text-sm text-muted-foreground">
                      Put the system in maintenance mode
                    </span>
                  </Label>
                  <Switch
                    id="maintenance-mode"
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>
              </div>
              
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium">Password Policy</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="min-length">Minimum Password Length</Label>
                    <Select defaultValue="8">
                      <SelectTrigger id="min-length">
                        <SelectValue placeholder="Select minimum length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 characters</SelectItem>
                        <SelectItem value="8">8 characters</SelectItem>
                        <SelectItem value="10">10 characters</SelectItem>
                        <SelectItem value="12">12 characters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="password-expiry">Password Expiry</Label>
                    <Select defaultValue="90">
                      <SelectTrigger id="password-expiry">
                        <SelectValue placeholder="Select expiry period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="require-uppercase" defaultChecked />
                    <Label htmlFor="require-uppercase">Require uppercase letters</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="require-numbers" defaultChecked />
                    <Label htmlFor="require-numbers">Require numbers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="require-special" defaultChecked />
                    <Label htmlFor="require-special">Require special characters</Label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button onClick={saveSecuritySettings}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* User Settings */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Configure user roles and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">User Roles</h3>
                <Button variant="outline" size="sm">Edit Roles</Button>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Administrator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Full access to all system functions and settings
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Manager</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Can manage bookings, rooms, and reports but cannot change system settings
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Receptionist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Can handle check-ins, check-outs, and view room availability
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Cleaning Staff</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Limited access to view and update cleaning status only
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-between items-center pt-4">
                <h3 className="text-lg font-medium">Active Users</h3>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/users">Manage Users</Link>
                </Button>
              </div>
              
              <div className="pt-4">
                <Button asChild>
                  <Link to="/users/add">
                    <Users className="h-4 w-4 mr-2" />
                    Add New User
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
