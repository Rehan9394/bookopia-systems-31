
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";

// Mock email templates data
const emailTemplates = {
  "booking-confirmation": {
    id: "booking-confirmation",
    name: "Booking Confirmation",
    subject: "Your booking at {{property_name}} has been confirmed",
    body: `Dear {{guest_name}},

Thank you for your reservation at {{property_name}}. Your booking has been confirmed.

Booking Details:
- Booking Reference: {{booking_ref}}
- Check-in Date: {{check_in_date}}
- Check-out Date: {{check_out_date}}
- Room Type: {{room_type}}
- Room Number: {{room_number}}
- Number of Guests: {{guest_count}}
- Total Amount: {{total_amount}}

We look forward to welcoming you!

Best regards,
The {{property_name}} Team`
  },
  "check-in-reminder": {
    id: "check-in-reminder",
    name: "Check-in Reminder",
    subject: "Reminder: Your stay at {{property_name}} is coming up!",
    body: `Dear {{guest_name}},

We're looking forward to your upcoming stay at {{property_name}}. This is a friendly reminder that your check-in is scheduled for {{check_in_date}}.

Your booking reference is {{booking_ref}}.

Please let us know if you need any assistance with your arrival.

Best regards,
The {{property_name}} Team`
  },
  "check-out-reminder": {
    id: "check-out-reminder",
    name: "Check-out Reminder",
    subject: "Check-out Reminder for your stay at {{property_name}}",
    body: `Dear {{guest_name}},

This is a friendly reminder that your check-out is scheduled for today, {{check_out_date}}.

Your booking reference is {{booking_ref}}.

We hope you enjoyed your stay with us!

Best regards,
The {{property_name}} Team`
  },
  "thank-you": {
    id: "thank-you",
    name: "Thank You",
    subject: "Thank you for staying at {{property_name}}",
    body: `Dear {{guest_name}},

Thank you for choosing to stay at {{property_name}}. We hope you enjoyed your time with us.

We would appreciate if you could take a moment to leave us a review about your experience.

We look forward to welcoming you back again soon!

Best regards,
The {{property_name}} Team`
  },
  "cancellation": {
    id: "cancellation",
    name: "Cancellation",
    subject: "Your booking at {{property_name}} has been cancelled",
    body: `Dear {{guest_name}},

Your booking with reference {{booking_ref}} at {{property_name}} has been cancelled.

If you did not request this cancellation, please contact us immediately.

Best regards,
The {{property_name}} Team`
  }
};

export default function EmailTemplateEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const template = id && emailTemplates[id as keyof typeof emailTemplates];
  
  const [formData, setFormData] = useState({
    name: template?.name || '',
    subject: template?.subject || '',
    body: template?.body || '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to the server
    toast({
      title: "Template Updated",
      description: "The email template has been updated successfully.",
    });
    
    navigate('/settings');
  };
  
  if (!template && id) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Template not found</h1>
        <Button variant="ghost" className="mt-4" onClick={() => navigate('/settings')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Settings
        </Button>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{template ? `Edit ${template.name}` : 'Create Email Template'}</h1>
          <p className="text-muted-foreground mt-1">Customize email templates for guest communications</p>
        </div>
        <Button variant="ghost" onClick={() => navigate('/settings')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Settings
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{template ? `Edit ${template.name}` : 'New Email Template'}</CardTitle>
          <CardDescription>
            Configure the content and appearance of this email template
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Template Name</Label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Email Subject</Label>
              <Input 
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <p className="text-sm text-muted-foreground">
                Use variables like {"{{guest_name}}"} to personalize the subject
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="body">Email Content</Label>
              <Textarea 
                id="body"
                name="body"
                value={formData.body}
                onChange={handleChange}
                rows={15}
                required
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Available Variables</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{"{{guest_name}}"}</code>
                  <p className="text-xs text-muted-foreground mt-1">Guest's full name</p>
                </div>
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{"{{booking_ref}}"}</code>
                  <p className="text-xs text-muted-foreground mt-1">Booking reference</p>
                </div>
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{"{{check_in_date}}"}</code>
                  <p className="text-xs text-muted-foreground mt-1">Check-in date</p>
                </div>
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{"{{check_out_date}}"}</code>
                  <p className="text-xs text-muted-foreground mt-1">Check-out date</p>
                </div>
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{"{{room_type}}"}</code>
                  <p className="text-xs text-muted-foreground mt-1">Room type name</p>
                </div>
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{"{{room_number}}"}</code>
                  <p className="text-xs text-muted-foreground mt-1">Room number</p>
                </div>
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{"{{property_name}}"}</code>
                  <p className="text-xs text-muted-foreground mt-1">Property name</p>
                </div>
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{"{{guest_count}}"}</code>
                  <p className="text-xs text-muted-foreground mt-1">Number of guests</p>
                </div>
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{"{{total_amount}}"}</code>
                  <p className="text-xs text-muted-foreground mt-1">Total booking amount</p>
                </div>
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{"{{payment_status}}"}</code>
                  <p className="text-xs text-muted-foreground mt-1">Payment status</p>
                </div>
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{"{{special_requests}}"}</code>
                  <p className="text-xs text-muted-foreground mt-1">Guest's special requests</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Template
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
