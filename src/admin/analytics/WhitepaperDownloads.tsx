
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from 'date-fns';
import { Download } from 'lucide-react';

interface WhitepaperDownload {
  id: string;
  name: string;
  email: string;
  company?: string;
  phoneNumber?: string;
  whitepaperTitle: string;
  whitepaperPath: string;
  timestamp: Date;
}

const WhitepaperDownloads = () => {
  const [downloads, setDownloads] = useState<WhitepaperDownload[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownloads = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "whitepaperDownloads"),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        
        const downloadData: WhitepaperDownload[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          downloadData.push({
            id: doc.id,
            name: data.name || "Unknown",
            email: data.email || "No email provided",
            company: data.company,
            phoneNumber: data.phoneNumber,
            whitepaperTitle: data.whitepaperTitle || "Unknown Whitepaper",
            whitepaperPath: data.whitepaperPath || "#",
            timestamp: data.timestamp?.toDate() || new Date(),
          });
        });
        
        setDownloads(downloadData);
      } catch (error) {
        console.error("Error fetching whitepaper downloads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Whitepaper Downloads</h1>
          <p className="text-muted-foreground">
            Track user information collected during whitepaper downloads.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Download Records
          </CardTitle>
          <CardDescription>
            {downloads.length} total downloads
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : downloads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Download className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No downloads yet</h3>
              <p className="text-muted-foreground mt-2 max-w-xs">
                When users download whitepapers, their information will appear here.
              </p>
            </div>
          ) : (
            <div className="relative overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Whitepaper</TableHead>
                    <TableHead>Download Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {downloads.map((download) => (
                    <TableRow key={download.id}>
                      <TableCell>{download.name}</TableCell>
                      <TableCell>{download.email}</TableCell>
                      <TableCell>{download.company || "Not provided"}</TableCell>
                      <TableCell>{download.whitepaperTitle}</TableCell>
                      <TableCell>
                        {format(download.timestamp, "MMM d, yyyy 'at' h:mm a")}
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

export default WhitepaperDownloads;
