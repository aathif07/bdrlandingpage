import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';
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
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Search, FileText } from 'lucide-react';
import { format } from 'date-fns';

interface WhitepaperLead {
  id: string;
  name: string;
  email: string;
  mobile: string;
  whitepaper: string;
  downloadDate: Timestamp;
  createdAt: string;
}

const WhitepaperDownloadsPage = () => {
  const [leads, setLeads] = useState<WhitepaperLead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<WhitepaperLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalDownloads, setTotalDownloads] = useState(0);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const q = query(
          collection(db, "whitepaper_leads"), 
          orderBy("downloadDate", "desc")
        );
        
        const querySnapshot = await getDocs(q);
        const leadsData: WhitepaperLead[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          leadsData.push({
            id: doc.id,
            name: data.name || '',
            email: data.email || '',
            mobile: data.mobile || '',
            whitepaper: data.whitepaper || '',
            downloadDate: data.downloadDate as Timestamp,
            createdAt: data.createdAt || ''
          });
        });
        
        setLeads(leadsData);
        setFilteredLeads(leadsData);
        setTotalDownloads(leadsData.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching whitepaper leads:", error);
        setLoading(false);
      }
    };
    
    fetchLeads();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredLeads(leads);
    } else {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = leads.filter(lead => 
        lead.name.toLowerCase().includes(lowercasedSearch) ||
        lead.email.toLowerCase().includes(lowercasedSearch) ||
        lead.mobile.toLowerCase().includes(lowercasedSearch) ||
        lead.whitepaper.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredLeads(filtered);
    }
  }, [searchTerm, leads]);

  const exportToCSV = () => {
    // Create CSV content
    const headers = ['Name', 'Email', 'Mobile', 'Whitepaper', 'Download Date'];
    const csvRows = [headers];
    
    filteredLeads.forEach(lead => {
      const date = lead.downloadDate ? 
        format(lead.downloadDate.toDate(), 'yyyy-MM-dd HH:mm:ss') : 
        'N/A';
      
      csvRows.push([
        lead.name,
        lead.email,
        lead.mobile,
        lead.whitepaper,
        date
      ]);
    });
    
    // Convert to CSV string
    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `whitepaper-leads-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Whitepaper Downloads</h2>
          <p className="text-muted-foreground">
            View and manage leads who have downloaded whitepapers
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
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDownloads}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, or whitepaper..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading whitepaper download data...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-4">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No download data found</h3>
              <p className="text-muted-foreground mt-2">
                {searchTerm ? "Try adjusting your search terms" : "No whitepaper downloads have been recorded yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Whitepaper</TableHead>
                    <TableHead>Download Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.mobile}</TableCell>
                      <TableCell className="max-w-[200px] truncate" title={lead.whitepaper}>
                        {lead.whitepaper}
                      </TableCell>
                      <TableCell>
                        {lead.downloadDate ? 
                          format(lead.downloadDate.toDate(), 'MMM d, yyyy h:mm a') : 
                          'N/A'}
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

export default WhitepaperDownloadsPage;