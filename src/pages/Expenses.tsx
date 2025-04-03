
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Link, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Expenses = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Sample data - in a real app this would come from a database
  const expenses = [
    { id: 1, description: 'Cleaning Supplies', amount: 120, date: '2023-11-15', category: 'Maintenance' },
    { id: 2, description: 'New Bed Linens', amount: 450, date: '2023-11-10', category: 'Room Supplies' },
    { id: 3, description: 'Staff Salaries', amount: 3200, date: '2023-11-01', category: 'Personnel' },
    { id: 4, description: 'Electricity Bill', amount: 780, date: '2023-10-28', category: 'Utilities' },
    { id: 5, description: 'Plumbing Repair', amount: 350, date: '2023-10-20', category: 'Maintenance' },
  ];
  
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || "");
  const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get('category') || "all");
  const [dateFilter, setDateFilter] = useState<string>(searchParams.get('date') || "all");
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  
  // Apply filters
  useEffect(() => {
    let filtered = expenses;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(expense => 
        expense.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(expense => 
        expense.category === categoryFilter
      );
    }
    
    // Apply date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      
      filtered = filtered.filter(expense => {
        const expenseDate = new Date(expense.date);
        
        if (dateFilter === 'thisMonth') {
          return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
        } else if (dateFilter === 'lastMonth') {
          const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
          const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
          return expenseDate.getMonth() === lastMonth && expenseDate.getFullYear() === lastMonthYear;
        } else if (dateFilter === 'thisYear') {
          return expenseDate.getFullYear() === currentYear;
        }
        
        return true;
      });
    }
    
    setFilteredExpenses(filtered);
    
    // Update URL with filters
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (categoryFilter !== 'all') params.set('category', categoryFilter);
    if (dateFilter !== 'all') params.set('date', dateFilter);
    
    setSearchParams(params, { replace: true });
  }, [searchQuery, categoryFilter, dateFilter]);
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        description: `Searching for "${searchQuery}"`,
      });
    }
  };
  
  // Handle clearing filters
  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setDateFilter("all");
    setSearchParams({});
    setFilteredExpenses(expenses);
    toast({
      description: "All filters have been cleared",
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Expenses</h1>
          <p className="text-muted-foreground mt-1">Manage all property expenses</p>
        </div>
        <Button className="flex items-center gap-2" asChild>
          <Link to="/expenses/add">
            <PlusCircle className="h-4 w-4" />
            Add New Expense
          </Link>
        </Button>
      </div>
      
      <Card className="p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <form onSubmit={handleSearch}>
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search expenses..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
              <SelectItem value="Utilities">Utilities</SelectItem>
              <SelectItem value="Room Supplies">Room Supplies</SelectItem>
              <SelectItem value="Personnel">Personnel</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {(searchQuery || categoryFilter !== "all" || dateFilter !== "all") && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {filteredExpenses.length} {filteredExpenses.length === 1 ? 'expense' : 'expenses'} found
            </div>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </Card>
      
      <Card>
        <Table>
          <TableCaption>A list of all property expenses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.description}</TableCell>
                <TableCell>${expense.amount.toFixed(2)}</TableCell>
                <TableCell>{expense.date}</TableCell>
                <TableCell>
                  <Badge variant="outline">{expense.category}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/expenses/${expense.id}`}>View</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/expenses/edit/${expense.id}`}>Edit</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredExpenses.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No expenses found matching your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Expenses;
