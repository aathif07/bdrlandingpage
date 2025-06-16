import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCaseStudies, deleteCaseStudy } from '@/lib/services/caseStudyService';
import { CaseStudy } from '@/types/caseStudy';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
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
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CaseStudiesList = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const data = await getCaseStudies();
        setCaseStudies(data);
      } catch (error) {
        console.error('Error fetching case studies:', error);
        toast({
          title: 'Error',
          description: 'Failed to load case studies',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, [toast]);

  const handleDelete = async (id: string) => {
    try {
      await deleteCaseStudy(id);
      setCaseStudies(caseStudies.filter(study => study.id !== id));
      toast({
        title: 'Success',
        description: 'Case study deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting case study:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete case study',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading case studies...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Case Studies</CardTitle>
            <CardDescription>Manage your case studies for the Research page</CardDescription>
          </div>
          <Button asChild>
            <Link to="/admin/case-studies/new">
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {caseStudies.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No case studies found</p>
            <Button asChild>
              <Link to="/admin/case-studies/new">Create your first case study</Link>
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caseStudies.map((study) => (
                <TableRow key={study.id}>
                  <TableCell className="font-medium">{study.title}</TableCell>
                  <TableCell>{study.industry}</TableCell>
                  <TableCell>
                    <Badge variant={study.published ? "default" : "secondary"}>
                      {study.published ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>{study.updatedAt.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link to={`/admin/case-studies/edit/${study.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link to={`/research#case-study-${study.id}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => setDeleteId(study.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the case study.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => deleteId && handleDelete(deleteId)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
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
        )}
      </CardContent>
    </Card>
  );
};

export default CaseStudiesList;