
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";

// Mock SMS templates data
const smsTemplates = {
  "booking-confirmation": {
    id: "booking-confirmation",
    name: "Booking Confirmation",
    body: `Thank you for booking with {{property_name}}! Your reservation #{{booking_ref}} is confirmed for {{check_in_date}}. Check-in: {{check_in_time}}. Questions? Call us at {{property_phone}}.`
  },
  "check-in-reminder": {
    id: "check-in-reminder",
    name: "Check-in Reminder",
    body: `Reminder: Your stay at {{property_name}} begins tomorrow. Check-in time: {{check_in_time}}. Ref: {{booking_ref}}. We look forward to your arrival!`
  },
  "check-out-reminder": {
    id: "check-out-reminder",
    name: "Check-out Reminder",
    body: `Thank you for staying at {{property_name}}. This is a reminder that check-out time is {{check_out_time}} today. We hope you enjoyed your stay!`
  }
};

export default function SmsTemplateEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const template = id && smsTemplates[id as keyof typeof smsTemplates];
  
  const [formData, setFormData] = useState({
    name: template?.name || '',
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
      description: "The SMS template has been updated successfully.",
    });
    
    navigate('/settings');
  };
  
  // Character counter for SMS
  const maxChars = 160;
  const charCount = formData.body.length;
  const messageCount = Math.ceil(charCount / maxChars);
  
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
          <h1 className="text-3xl font-bold">{template ? `Edit ${template.name}` : 'Create SMS Template'}</h1>
          <p className="text-muted-foreground mt-1">Customize SMS templates for guest communications</p>
        </div>
        <Button variant="ghost" onClick={() => navigate('/settings')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Settings
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{template ? `Edit ${template.name}` : 'New SMS Template'}</CardTitle>
          <CardDescription>
            Configure the content of this SMS template
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
              <Label htmlFor="body">SMS Content</Label>
              <Textarea 
                id="body"
                name="body"
                value={formData.body}
                onChange={handleChange}
                rows={6}
                maxLength={480} // Allow up to 3 SMS messages
                required
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <p>
                  {charCount} / {maxChars * 3} characters
                </p>
                <p>
                  {messageCount} {messageCount === 1 ? 'SMS message' : 'SMS messages'}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Available Variables</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{'{{guest_name}}'}</code>
                  <p className="text-xs text-muted-foreground mt-1">Guest's full name</p>
                </div>
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{'{{booking_ref}}'}</code>
                  <p className="text-xs text-muted-foreground mt-1">Booking reference</p>
                </div>
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{'{{check_in_date}}'}</code>
                  <p className="text-xs text-muted-foreground mt-1">Check-in date</p>
                </div>
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{'{{check_out_date}}'}</code>
                  <p className="text-xs text-muted-foreground mt-1">Check-out date</p>
                </div>
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{'{{check_in_time}}'}</code>
                  <p className="text-xs text-muted-foreground mt-1">Check-in time</p>
                </div>
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{'{{check_out_time}}'}</code>
                  <p className="text-xs text-muted-foreground mt-1">Check-out time</p>
                </div>
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{'{{property_name}}'}</code>
                  <p className="text-xs text-muted-foreground mt-1">Property name</p>
                </div>
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{'{{property_phone}}'}</code>
                  <p className="text-xs text-muted-foreground mt-1">Property phone number</p>
                </div>
                <div className="border rounded-md p-3">
                  <code className="text-sm font-mono">{'{{room_number}}'}</code>
                  <p className="text-xs text-muted-foreground mt-1">Room number</p>
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
