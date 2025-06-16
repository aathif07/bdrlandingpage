
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
import { FileText } from 'lucide-react';

interface CaseStudyDownload {
  id: string;
  name: string;
  email: string;
  company?: string;
  jobTitle?: string;
  caseStudyTitle: string;
  caseStudyId: string;
  timestamp: Date;
}

const CaseStudyDownloads = () => {
  const [downloads, setDownloads] = useState<CaseStudyDownload[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownloads = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "caseStudyDownloads"),
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        
        const downloadData: CaseStudyDownload[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          downloadData.push({
            id: doc.id,
            name: data.name || "Unknown",
            email: data.email || "No email provided",
            company: data.company,
            jobTitle: data.jobTitle,
            caseStudyTitle: data.caseStudyTitle || "Unknown Case Study",
            caseStudyId: data.caseStudyId || "",
            timestamp: data.timestamp?.toDate() || new Date(),
          });
        });
        
        setDownloads(downloadData);
      } catch (error) {
        console.error("Error fetching case study downloads:", error);
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
          <h1 className="text-2xl font-bold tracking-tight">Case Study Downloads</h1>
          <p className="text-muted-foreground">
            Track user information collected during case study downloads.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
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
              <FileText className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-medium">No downloads yet</h3>
              <p className="text-muted-foreground mt-2 max-w-xs">
                When users download case studies, their information will appear here.
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
                    <TableHead>Job Title</TableHead>
                    <TableHead>Case Study</TableHead>
                    <TableHead>Download Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {downloads.map((download) => (
                    <TableRow key={download.id}>
                      <TableCell>{download.name}</TableCell>
                      <TableCell>{download.email}</TableCell>
                      <TableCell>{download.company || "Not provided"}</TableCell>
                      <TableCell>{download.jobTitle || "Not provided"}</TableCell>
                      <TableCell>{download.caseStudyTitle}</TableCell>
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

export default CaseStudyDownloads;
