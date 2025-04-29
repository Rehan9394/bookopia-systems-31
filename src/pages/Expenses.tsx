
// Fix the property field error in Expenses.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '@/hooks/useExpenses';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SearchAndFilter } from '@/components/ui/SearchAndFilter';
import { format } from 'date-fns';
import { Plus, EyeIcon, Edit, PenIcon, Trash, Loader2 } from 'lucide-react';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { Expense } from '@/services/supabase-types';

export default function Expenses() {
  const navigate = useNavigate();
  const { data: expenses, isLoading, error } = useExpenses();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{ category: string; status: string; }>({
    category: 'all',
    status: 'all',
  });
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');
  
  // Filter and search expenses
  const filteredExpenses = expenses?.filter(expense => {
    const matchesSearch = 
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.vendor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (expense.property_id || '').toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = filters.category === 'all' || expense.category === filters.category;
    const matchesStatus = filters.status === 'all' || expense.status === filters.status;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Extract unique categories and statuses for filter options
  const categories = expenses ? 
    ['all', ...Array.from(new Set(expenses.map(expense => expense.category)))] : 
    ['all'];
    
  const statuses = expenses ? 
    ['all', ...Array.from(new Set(expenses.map(expense => expense.status)))] : 
    ['all'];
  
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };
  
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
          <CardDescription>
            There was an error loading the expenses: {error.message}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground">
            Manage and track all property expenses.
          </p>
        </div>
        <Button onClick={() => navigate('/expenses/add')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>All Expenses</CardTitle>
              <CardDescription>
                {filteredExpenses?.length} expenses found
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <SearchAndFilter
                searchValue={searchTerm}
                onSearchChange={handleSearchChange}
                filters={[
                  {
                    name: 'category',
                    label: 'Category',
                    value: filters.category,
                    options: categories.map(cat => ({ value: cat, label: cat === 'all' ? 'All Categories' : cat })),
                  },
                  {
                    name: 'status',
                    label: 'Status',
                    value: filters.status,
                    options: statuses.map(status => ({ value: status, label: status === 'all' ? 'All Statuses' : status })),
                  },
                ]}
                onFilterChange={handleFilterChange}
              />
              <ViewToggle value={viewType} onChange={setViewType} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewType === 'list' ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses?.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.description}</TableCell>
                      <TableCell>{formatDate(expense.date)}</TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{expense.property_id || 'N/A'}</TableCell>
                      <TableCell>{formatCurrency(expense.amount)}</TableCell>
                      <TableCell>
                        <Badge variant={expense.status === 'paid' ? 'default' : expense.status === 'pending' ? 'secondary' : 'outline'}>
                          {expense.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => navigate(`/expenses/${expense.id}`)}>
                            <EyeIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => navigate(`/expenses/${expense.id}/edit`)}>
                            <PenIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExpenses?.map((expense) => (
                <Card key={expense.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{expense.description}</CardTitle>
                    <CardDescription>{formatDate(expense.date)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                      <div>
                        <p className="text-muted-foreground">Category:</p>
                        <p>{expense.category}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Property:</p>
                        <p>{expense.property_id || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Amount:</p>
                        <p className="font-semibold">{formatCurrency(expense.amount)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Status:</p>
                        <Badge variant={expense.status === 'paid' ? 'default' : expense.status === 'pending' ? 'secondary' : 'outline'}>
                          {expense.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/expenses/${expense.id}`)}>
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/expenses/${expense.id}/edit`)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
