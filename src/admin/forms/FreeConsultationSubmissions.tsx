import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Mail, Loader2, AlertCircle, User, Phone, Building, MessageSquare, Target } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  Timestamp
} from 'firebase/firestore';
import { useToast } from '@/components/ui/use-toast';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Consultation {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  company?: string;
  interest?: string;
  message: string;
  createdAt: Timestamp;
  status: string;
}

const statusOptions = [
  { value: 'new', label: 'New Request', color: 'default' },
  { value: 'contacted', label: 'Contacted', color: 'blue' },
  { value: 'scheduled', label: 'Meeting Scheduled', color: 'yellow' },
  { value: 'completed', label: 'Completed', color: 'green' },
  { value: 'declined', label: 'Declined', color: 'destructive' }
];

const FreeConsultationSubmissions = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentItem, setCurrentItem] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<string[]>([]);
  
  const { toast } = useToast();

  // Fetch consultations from Firebase
  useEffect(() => {
    const fetchConsultations = async () => {
      setLoading(true);
      setError(null);
      try {
        const consultationsQuery = query(
          collection(db, 'consultations'), 
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(consultationsQuery);
        const consultationsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Consultation[];
        
        setConsultations(consultationsData);
      } catch (err) {
        console.error("Error fetching consultations:", err);
        setError("Failed to load consultation requests. Please try again.");
        toast({
          title: "Error",
          description: "Failed to load consultation requests",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, [toast]);

  // Helper function to get full name
  const getFullName = (item: Consultation) => {
    if (item.firstName && item.lastName) {
      return `${item.firstName} ${item.lastName}`;
    }
    return item.name || 'N/A';
  };

  // Helper function to get area of interest
  const getAreaOfInterest = (item: Consultation) => {
    return item.interest || item.company || 'Not specified';
  };

  // Filter consultations based on search query and filters
  const filteredConsultations = consultations.filter(item => {
    const fullName = getFullName(item);
    const areaOfInterest = getAreaOfInterest(item);
    
    const matchesSearch = 
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      areaOfInterest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handle selection of items
  const handleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectedItems.length === filteredConsultations.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredConsultations.map(item => item.id));
    }
  };

  // Open delete confirmation dialog
  const confirmDelete = (ids: string[]) => {
    setItemsToDelete(ids);
    setDeleteDialogOpen(true);
  };

  // Handle delete operation
  const handleDelete = async () => {
    setLoading(true);
    try {
      // Delete each selected consultation
      for (const id of itemsToDelete) {
        await deleteDoc(doc(db, 'consultations', id));
      }
      
      // Update local state
      setConsultations(consultations.filter(item => !itemsToDelete.includes(item.id)));
      setSelectedItems(selectedItems.filter(id => !itemsToDelete.includes(id)));
      
      // Clear current item if it was deleted
      if (currentItem && itemsToDelete.includes(currentItem.id)) {
        setCurrentItem(null);
      }
      
      toast({
        title: "Success",
        description: `${itemsToDelete.length} consultation request(s) deleted successfully`,
      });
    } catch (err) {
      console.error("Error deleting consultations:", err);
      toast({
        title: "Error",
        description: "Failed to delete consultation requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setItemsToDelete([]);
    }
  };

  // View consultation details
  const handleViewItem = (item: Consultation) => {
    setCurrentItem(item);
  };

  // Update consultation status
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      // Update in Firestore
      await updateDoc(doc(db, 'consultations', id), {
        status: newStatus
      });
      
      // Update local state
      setConsultations(consultations.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      ));
      
      // Update current item if it's the one being modified
      if (currentItem && currentItem.id === id) {
        setCurrentItem({ ...currentItem, status: newStatus });
      }
      
      toast({
        title: "Status Updated",
        description: "Consultation status has been updated successfully",
      });
    } catch (err) {
      console.error("Error updating status:", err);
      toast({
        title: "Error",
        description: "Failed to update consultation status",
        variant: "destructive",
      });
    }
  };

  // Get appropriate badge for status
  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return (
      <Badge variant={statusOption?.color as any || 'default'}>
        {statusOption?.label || status}
      </Badge>
    );
  };

  // Format date from Firestore timestamp
  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp || !timestamp.toDate) {
      return 'No date';
    }
    return timestamp.toDate().toLocaleDateString();
  };

  if (loading && consultations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Loading consultation requests...</p>
      </div>
    );
  }

  if (error && consultations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-destructive">
        <AlertCircle className="h-8 w-8 mb-4" />
        <p>{error}</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Free Consultation Requests</h1>
        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statusOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Consultations List */}
        <Card className="w-full lg:w-3/5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Consultation Requests</CardTitle>
              <Badge variant="outline">{filteredConsultations.length} Total</Badge>
            </div>
            <CardDescription>
              Manage and respond to free consultation requests
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {filteredConsultations.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedItems.length === filteredConsultations.length && filteredConsultations.length > 0}
                        indeterminate={selectedItems.length > 0 && selectedItems.length < filteredConsultations.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">Email</TableHead>
                    <TableHead className="hidden md:table-cell">Interest</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConsultations.map((item) => (
                    <TableRow 
                      key={item.id} 
                      className="cursor-pointer"
                      onClick={() => handleViewItem(item)}
                    >
                      <TableCell className="p-2" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => handleSelectItem(item.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{getFullName(item)}</div>
                        <div className="text-xs text-muted-foreground md:hidden">{item.email}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-sm">{item.email}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-sm">{getAreaOfInterest(item)}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {getStatusBadge(item.status)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(item.createdAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Mail className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No consultation requests found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery || statusFilter !== 'all'
                    ? "Try adjusting your filters." 
                    : "You haven't received any consultation requests yet."}
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t p-3 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {selectedItems.length} selected
            </div>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                size="sm"
                disabled={selectedItems.length === 0}
                onClick={() => confirmDelete(selectedItems)}
              >
                Delete
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Consultation Details */}
        <Card className="w-full lg:w-2/5">
          <CardHeader>
            <CardTitle>Consultation Details</CardTitle>
          </CardHeader>
          <CardContent>
            {currentItem ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">{getFullName(currentItem)}</div>
                  <Select
                    value={currentItem.status}
                    onValueChange={(value) => handleStatusChange(currentItem.id, value)}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {/* Name Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" />
                        First Name
                      </div>
                      <div className="break-words">{currentItem.firstName || 'Not provided'}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" />
                        Last Name
                      </div>
                      <div className="break-words">{currentItem.lastName || 'Not provided'}</div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        Email
                      </div>
                      <div className="break-words">{currentItem.email}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        Phone
                      </div>
                      <div className="break-words">{currentItem.phone || 'Not provided'}</div>
                    </div>
                  </div>

                  {/* Area of Interest */}
                  <div>
                    <div className="text-sm font-medium text-muted-foreground flex items-center gap-1 mb-1">
                      <Target className="h-3 w-3" />
                      Area of Interest
                    </div>
                    <Badge variant="outline" className="text-sm">
                      {getAreaOfInterest(currentItem)}
                    </Badge>
                  </div>

                  {/* Date Submitted */}
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Date Submitted</div>
                    <div>{formatDate(currentItem.createdAt)}</div>
                  </div>

                  {/* Message */}
                  {currentItem.message && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        Message
                      </div>
                      <ScrollArea className="h-[150px] border rounded-md p-3 bg-muted/20">
                        <div className="break-words whitespace-pre-line">
                          {currentItem.message}
                        </div>
                      </ScrollArea>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Current Status</div>
                    {getStatusBadge(currentItem.status)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Mail className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No consultation selected</h3>
                <p className="text-sm text-muted-foreground">
                  Select a consultation request from the list to view its details.
                </p>
              </div>
            )}
          </CardContent>
          {currentItem && (
            <CardFooter className="border-t flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentItem(null)}
              >
                Close
              </Button>
              <Button
                variant="destructive"
                onClick={() => confirmDelete([currentItem.id])}
              >
                Delete
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete 
              {itemsToDelete.length === 1 
                ? ' the selected consultation request.' 
                : ` ${itemsToDelete.length} consultation requests.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FreeConsultationSubmissions;
