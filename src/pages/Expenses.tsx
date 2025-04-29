
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useExpenses } from '@/hooks/useExpenses';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SearchAndFilter } from "@/components/ui/SearchAndFilter";
import { ViewToggle } from "@/components/ui/ViewToggle";
import { format } from 'date-fns';
import { Building, File, FileText, Plus } from 'lucide-react';
import { Expense } from '@/services/supabase-types';

// Define filter options
const filterOptions = [
  {
    name: 'status',
    label: 'Status',
    value: 'all',
    options: [
      { value: 'all', label: 'All Statuses' },
      { value: 'pending', label: 'Pending' },
      { value: 'approved', label: 'Approved' },
      { value: 'rejected', label: 'Rejected' },
      { value: 'paid', label: 'Paid' },
    ]
  },
  {
    name: 'category',
    label: 'Category',
    value: 'all',
    options: [
      { value: 'all', label: 'All Categories' },
      { value: 'maintenance', label: 'Maintenance' },
      { value: 'supplies', label: 'Supplies' },
      { value: 'utilities', label: 'Utilities' },
      { value: 'staff', label: 'Staff' },
      { value: 'marketing', label: 'Marketing' },
      { value: 'other', label: 'Other' },
    ]
  },
];

export default function Expenses() {
  const navigate = useNavigate();
  const { data: expenses, isLoading } = useExpenses();
  
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
  });
  
  // State for view mode (list or grid)
  const [view, setView] = useState<'list' | 'grid'>('list');
  
  // Filter expenses based on search query and filters
  const filteredExpenses = expenses?.filter(expense => {
    // Search filter
    const matchesSearch = 
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.vendor?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.property?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = filters.status === 'all' || expense.status === filters.status;
    
    // Category filter
    const matchesCategory = filters.category === 'all' || expense.category === filters.category;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  // Handle filter changes
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Expenses</h1>
          <p className="text-muted-foreground">Manage and track all property expenses</p>
        </div>
        <Button onClick={() => navigate('/expense/add')}>
          <Plus className="mr-2 h-4 w-4" /> Add Expense
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <SearchAndFilter
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filterOptions}
          onFilterChange={handleFilterChange}
        />
        <ViewToggle view={view} setView={setView} />
      </div>

      {view === 'list' ? (
        <Card>
          <CardHeader>
            <CardTitle>All Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No expenses found. Create a new expense to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredExpenses?.map((expense: Expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.description}</TableCell>
                      <TableCell>${expense.amount.toFixed(2)}</TableCell>
                      <TableCell className="capitalize">{expense.category}</TableCell>
                      <TableCell>{expense.property}</TableCell>
                      <TableCell>{format(new Date(expense.date), 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={expense.status === 'approved' ? 'success' : 
                                expense.status === 'paid' ? 'default' :
                                expense.status === 'rejected' ? 'destructive' : 'outline'}
                        >
                          {expense.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{expense.owner || 'N/A'}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="icon" asChild>
                            <Link to={`/expense/${expense.id}`}>
                              <FileText className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="icon" asChild>
                            <Link to={`/expense/${expense.id}/edit`}>
                              <File className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
          {filteredExpenses && filteredExpenses.length > 0 && (
            <CardFooter className="border-t px-6 py-4">
              <div className="text-xs text-muted-foreground">
                Showing {filteredExpenses.length} of {expenses?.length} total expenses
              </div>
            </CardFooter>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExpenses?.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No expenses found. Create a new expense to get started.</p>
              <Button onClick={() => navigate('/expense/add')} className="mt-4">
                <Plus className="mr-2 h-4 w-4" /> Add Expense
              </Button>
            </div>
          ) : (
            filteredExpenses?.map((expense: Expense) => (
              <Card key={expense.id} className="overflow-hidden">
                <CardHeader className="bg-muted/40 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-4 w-4" /> 
                        {expense.property || 'No Property'}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(expense.date), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <Badge 
                      variant={expense.status === 'approved' ? 'success' : 
                              expense.status === 'paid' ? 'default' :
                              expense.status === 'rejected' ? 'destructive' : 'outline'}
                    >
                      {expense.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{expense.description}</h3>
                      <p className="font-bold">${expense.amount.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">Category</p>
                      <p className="capitalize">{expense.category}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">Vendor</p>
                      <p>{expense.vendor || 'N/A'}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-muted-foreground">Owner</p>
                      <p>{expense.owner || 'N/A'}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/40 pt-2">
                  <div className="flex justify-between w-full">
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/expense/${expense.id}`}>View</Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/expense/${expense.id}/edit`}>Edit</Link>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}
