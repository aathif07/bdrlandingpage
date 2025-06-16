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
import { FileText, Download, FileUp, Loader2, AlertCircle, User, Mail, Phone, Briefcase, GraduationCap, Calendar, MessageSquare, Target, Shield, CheckCircle, XCircle } from "lucide-react";
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

interface Application {
  id: string;
  name?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  yearsExperience: string;
  coverLetter: string;
  greatFit: string;
  consent: boolean;
  createdAt: Timestamp;
  status: string;
}

const statusOptions = [
  { value: 'new', label: 'New Application', color: 'default' },
  { value: 'screening', label: 'Screening', color: 'blue' },
  { value: 'interview', label: 'Interview', color: 'yellow' },
  { value: 'offer', label: 'Offer Extended', color: 'green' },
  { value: 'hired', label: 'Hired', color: 'green' },
  { value: 'rejected', label: 'Rejected', color: 'destructive' }
];

const CareerApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [positionFilter, setPositionFilter] = useState('all');
  const [currentItem, setCurrentItem] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<string[]>([]);
  
  const { toast } = useToast();

  // Helper function to get full name
  const getFullName = (item: Application) => {
    if (item.firstName && item.lastName) {
      return `${item.firstName} ${item.lastName}`;
    }
    // Fallback to name field if firstName/lastName not available
    return item.name || 'N/A';
  };

  // Get unique positions for filter dropdown
  const positions = [...new Set(applications.map(app => app.position))];

  // Fetch applications from Firebase
  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const applicationsQuery = query(
          collection(db, 'careerApplications'), 
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(applicationsQuery);
        const applicationsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Application[];
        
        setApplications(applicationsData);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications. Please try again.");
        toast({
          title: "Error",
          description: "Failed to load applications",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [toast]);

  // Filter applications based on search query and filters
  const filteredApplications = applications.filter(item => {
    const fullName = getFullName(item);
    const matchesSearch = 
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesPosition = positionFilter === 'all' || item.position === positionFilter;
    
    return matchesSearch && matchesStatus && matchesPosition;
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
    if (selectedItems.length === filteredApplications.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredApplications.map(item => item.id));
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
      // Delete each selected application
      for (const id of itemsToDelete) {
        await deleteDoc(doc(db, 'careerApplications', id));
      }
      
      // Update local state
      setApplications(applications.filter(item => !itemsToDelete.includes(item.id)));
      setSelectedItems(selectedItems.filter(id => !itemsToDelete.includes(id)));
      
      // Clear current item if it was deleted
      if (currentItem && itemsToDelete.includes(currentItem.id)) {
        setCurrentItem(null);
      }
      
      toast({
        title: "Success",
        description: `${itemsToDelete.length} application(s) deleted successfully`,
      });
    } catch (err) {
      console.error("Error deleting applications:", err);
      toast({
        title: "Error",
        description: "Failed to delete applications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setItemsToDelete([]);
    }
  };

  // View application details
  const handleViewItem = (item: Application) => {
    setCurrentItem(item);
  };

  // Update application status
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      // Update in Firestore
      await updateDoc(doc(db, 'careerApplications', id), {
        status: newStatus
      });
      
      // Update local state
      setApplications(applications.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      ));
      
      // Update current item if it's the one being modified
      if (currentItem && currentItem.id === id) {
        setCurrentItem({ ...currentItem, status: newStatus });
      }
      
      toast({
        title: "Status Updated",
        description: "Application status has been updated successfully",
      });
    } catch (err) {
      console.error("Error updating status:", err);
      toast({
        title: "Error",
        description: "Failed to update application status",
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

  // Get consent badge
  const getConsentBadge = (consent: boolean) => {
    return consent ? (
      <Badge variant="default" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800">
        <CheckCircle className="h-3 w-3 mr-1" />
        Consented
      </Badge>
    ) : (
      <Badge variant="destructive">
        <XCircle className="h-3 w-3 mr-1" />
        No Consent
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

  if (loading && applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Loading applications...</p>
      </div>
    );
  }

  if (error && applications.length === 0) {
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
        <h1 className="text-2xl font-bold">Career Applications</h1>
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
          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Position Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              {positions.map(position => (
                <SelectItem key={position} value={position}>
                  {position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Applications List */}
        <Card className="w-full lg:w-3/5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Job Applications</CardTitle>
              <Badge variant="outline">{filteredApplications.length} Total</Badge>
            </div>
            <CardDescription>
              Manage and review job applications
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {filteredApplications.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedItems.length === filteredApplications.length && filteredApplications.length > 0}
                        indeterminate={selectedItems.length > 0 && selectedItems.length < filteredApplications.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Applicant Name</TableHead>
                    <TableHead className="hidden md:table-cell">Position</TableHead>
                    <TableHead className="hidden md:table-cell">Experience</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((item) => (
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
                        <div className="text-xs text-muted-foreground">{item.email}</div>
                        <div className="text-xs text-muted-foreground md:hidden">{item.position}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{item.position}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.yearsExperience} years</TableCell>
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
                <FileUp className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No applications found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery || statusFilter !== 'all' || positionFilter !== 'all' 
                    ? "Try adjusting your filters." 
                    : "You haven't received any job applications yet."}
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

        {/* Application Details */}
        <Card className="w-full lg:w-2/5">
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
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
                  {/* Personal Information */}
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Personal Information
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">First Name</div>
                        <div className="break-words font-medium">{currentItem.firstName || 'Not provided'}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Last Name</div>
                        <div className="break-words font-medium">{currentItem.lastName || 'Not provided'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Contact Information
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          Email Address
                        </div>
                        <div className="break-words font-medium">{currentItem.email}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          Phone Number
                        </div>
                        <div className="break-words font-medium">{currentItem.phone || 'Not provided'}</div>
                      </div>
                    </div>
                  </div>

                  {/* Job Information */}
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Job Application Details
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Position Apply For</div>
                        <Badge variant="outline" className="text-sm mt-1">
                          {currentItem.position}
                        </Badge>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Year of Experience
                        </div>
                        <div className="font-medium">{currentItem.yearsExperience} years</div>
                      </div>
                    </div>
                  </div>

                  {/* Application Date */}
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Date Applied</div>
                    <div className="font-medium">{formatDate(currentItem.createdAt)}</div>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      Cover Letter
                    </div>
                    <ScrollArea className="h-[120px] border rounded-md p-3 bg-muted/20">
                      <div className="break-words whitespace-pre-line text-sm">
                        {currentItem.coverLetter || 'No cover letter provided'}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Why I'm a Great Fit */}
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      Why am I a great fit for this role?
                    </div>
                    <ScrollArea className="h-[120px] border rounded-md p-3 bg-muted/20">
                      <div className="break-words whitespace-pre-line text-sm">
                        {currentItem.greatFit || 'No response provided'}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="border rounded-lg p-4 bg-muted/20">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Consent & Privacy
                    </h4>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-2">Consent Status</div>
                      {getConsentBadge(currentItem.consent)}
                      <div className="text-xs text-muted-foreground mt-2">
                        {currentItem.consent 
                          ? 'Applicant has consented to data processing and storage.' 
                          : 'Applicant has not provided consent for data processing.'}
                      </div>
                    </div>
                  </div>

                  {/* Current Status */}
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-2">Current Application Status</div>
                    {getStatusBadge(currentItem.status)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <FileText className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No application selected</h3>
                <p className="text-sm text-muted-foreground">
                  Select an application from the list to view its details.
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

      {/* Statistics Cards */}
      {applications.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{filteredApplications.length}</div>
                  <div className="text-sm text-muted-foreground">Total Applications</div>
                </div>
                <FileUp className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {applications.filter(a => a.status === 'new').length}
                  </div>
                  <div className="text-sm text-muted-foreground">New Applications</div>
                </div>
                <User className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {applications.filter(a => a.status === 'interview').length}
                  </div>
                  <div className="text-sm text-muted-foreground">In Interview</div>
                </div>
                <MessageSquare className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {applications.filter(a => a.status === 'hired').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Hired</div>
                </div>
                <Briefcase className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {applications.filter(a => a.consent === true).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Consented</div>
                </div>
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete 
              {itemsToDelete.length === 1 
                ? ' the selected application.' 
                : ` ${itemsToDelete.length} applications.`
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

export default CareerApplications;
