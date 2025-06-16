import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, Timestamp, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Search, Phone, CheckCircle, Clock, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
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

interface CallbackRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  datetime: string;
  source: string;
  createdAt: Timestamp;
  status: 'pending' | 'contacted' | 'completed';
}

const CallbackRequestsPage = () => {
  const [requests, setRequests] = useState<CallbackRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<CallbackRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const q = query(
          collection(db, "callback_requests"), 
          orderBy("createdAt", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        const requestsData: CallbackRequest[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          requestsData.push({
            id: doc.id,
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            datetime: data.datetime || '',
            source: data.source || 'Unknown',
            createdAt: data.createdAt as Timestamp,
            status: data.status || 'pending'
          });
        });
        
        setRequests(requestsData);
        setFilteredRequests(requestsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching callback requests:", error);
        setLoading(false);
      }
    };
    
    fetchRequests();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = requests;
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(req => 
        req.name.toLowerCase().includes(lowercasedSearch) ||
        req.email.toLowerCase().includes(lowercasedSearch) ||
        req.phone.toLowerCase().includes(lowercasedSearch) ||
        req.source.toLowerCase().includes(lowercasedSearch)
      );
    }
    
    setFilteredRequests(filtered);
  }, [searchTerm, statusFilter, requests]);

  const updateRequestStatus = async (id: string, newStatus: 'pending' | 'contacted' | 'completed') => {
    try {
      const requestRef = doc(db, "callback_requests", id);
      await updateDoc(requestRef, {
        status: newStatus,
        lastUpdated: serverTimestamp()
      });
      
      // Update local state
      setRequests(prev => 
        prev.map(req => 
          req.id === id ? { ...req, status: newStatus } : req
        )
      );
    } catch (error) {
      console.error("Error updating request status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  const deleteRequest = async (id: string) => {
    setDeletingId(id);
    try {
      const requestRef = doc(db, "callback_requests", id);
      await deleteDoc(requestRef);
      
      // Update local state
      setRequests(prev => prev.filter(req => req.id !== id));
      setDeletingId(null);
    } catch (error) {
      console.error("Error deleting request:", error);
      alert("Failed to delete request. Please try again.");
      setDeletingId(null);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Requested Date/Time', 'Source', 'Status', 'Created At'];
    const csvRows = [headers];
    
    filteredRequests.forEach(req => {
      const date = req.createdAt ? 
        format(req.createdAt.toDate(), 'yyyy-MM-dd HH:mm:ss') : 
        'N/A';
      
      csvRows.push([
        req.name,
        req.email,
        req.phone,
        req.datetime,
        req.source,
        req.status,
        date
      ]);
    });
    
    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `callback-requests-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'contacted':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Contacted</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Callback Requests</h2>
          <p className="text-muted-foreground">
            Manage and track customer callback requests
          </p>
        </div>
        <Button onClick={exportToCSV} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export to CSV
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Callbacks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {requests.filter(req => req.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {requests.filter(req => req.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or phone..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading callback requests...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-4">
              <Phone className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No callback requests found</h3>
              <p className="text-muted-foreground mt-2">
                {searchTerm || statusFilter !== 'all' ? 
                  "Try adjusting your filters" : 
                  "No callback requests have been submitted yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Requested Time</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">{req.name}</TableCell>
                      <TableCell>
                        <div>{req.email}</div>
                        <div className="text-sm text-muted-foreground">{req.phone}</div>
                      </TableCell>
                      <TableCell>
                        {req.datetime ? 
                          format(new Date(req.datetime), 'MMM d, yyyy h:mm a') : 
                          'Not specified'}
                      </TableCell>
                      <TableCell>{req.source}</TableCell>
                      <TableCell>{getStatusBadge(req.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Select
                            value={req.status}
                            onValueChange={(value) => updateRequestStatus(req.id, value as 'pending' | 'contacted' | 'completed')}
                          >
                            <SelectTrigger className="h-8 w-[130px]">
                              <SelectValue placeholder="Update status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4" />
                                  <span>Pending</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="contacted">
                                <div className="flex items-center">
                                  <Phone className="mr-2 h-4 w-4" />
                                  <span>Contacted</span>
                                </div>
                              </SelectItem>
                              <SelectItem value="completed">
                                <div className="flex items-center">
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  <span>Completed</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                disabled={deletingId === req.id}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Callback Request</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this callback request from <strong>{req.name}</strong>? 
                                  This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteRequest(req.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  {deletingId === req.id ? "Deleting..." : "Delete"}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CallbackRequestsPage;
