
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  createCaseStudy, 
  getCaseStudy, 
  updateCaseStudy 
} from '@/lib/services/caseStudyService';
import { CaseStudy } from '@/types/caseStudy';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Loader2, Save, ArrowLeft, Plus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const CaseStudyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Omit<CaseStudy, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    slug: '',
    industry: '',
    challenge: '',
    solution: '',
    results: [''],
    summary: '',
    content: '',
    clientName: '',
    downloadPath: '',
    tags: [],
    imageUrl: '',
    thumbnailPath: '',
    published: false
  });

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!id) return;
      
      try {
        const caseStudy = await getCaseStudy(id);
        if (caseStudy) {
          setFormData({
            title: caseStudy.title,
            slug: caseStudy.slug,
            industry: caseStudy.industry,
            challenge: caseStudy.challenge,
            solution: caseStudy.solution,
            results: caseStudy.results,
            summary: caseStudy.summary,
            content: caseStudy.content,
            clientName: caseStudy.clientName,
            downloadPath: caseStudy.downloadPath,
            tags: caseStudy.tags,
            imageUrl: caseStudy.imageUrl || '',
            thumbnailPath: caseStudy.thumbnailPath || '',
            published: caseStudy.published
          });
        }
      } catch (error) {
        console.error('Error fetching case study:', error);
        toast({
          title: 'Error',
          description: 'Failed to load case study data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    if (isEditMode) {
      fetchCaseStudy();
    }
  }, [id, isEditMode, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, published: checked }));
  };

  const handleResultChange = (index: number, value: string) => {
    const updatedResults = [...formData.results];
    updatedResults[index] = value;
    setFormData(prev => ({ ...prev, results: updatedResults }));
  };

  const addResult = () => {
    setFormData(prev => ({ ...prev, results: [...prev.results, ''] }));
  };

  const removeResult = (index: number) => {
    const updatedResults = formData.results.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, results: updatedResults }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Filter out empty results
      const cleanedFormData = {
        ...formData,
        results: formData.results.filter(result => result.trim() !== ''),
        // Generate a slug if not provided
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-')
      };

      if (isEditMode && id) {
        await updateCaseStudy(id, cleanedFormData);
        toast({
          title: 'Success',
          description: 'Case study updated successfully',
        });
      } else {
        await createCaseStudy(cleanedFormData);
        toast({
          title: 'Success',
          description: 'Case study created successfully',
        });
      }
      navigate('/admin/case-studies');
    } catch (error) {
      console.error('Error saving case study:', error);
      toast({
        title: 'Error',
        description: isEditMode ? 'Failed to update case study' : 'Failed to create case study',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{isEditMode ? 'Edit Case Study' : 'Create New Case Study'}</CardTitle>
            <CardDescription>
              {isEditMode 
                ? 'Update your case study information' 
                : 'Add a new case study to showcase on the Research page'}
            </CardDescription>
          </div>
          <Button variant="outline" onClick={() => navigate('/admin/case-studies')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
          </Button>
        </div>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter case study title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="Enter client name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="e.g. Healthcare, Finance, Energy"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Short summary of the case study"
              rows={2}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="challenge">Challenge</Label>
            <Textarea
              id="challenge"
              name="challenge"
              value={formData.challenge}
              onChange={handleChange}
              placeholder="Describe the challenge or problem faced"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="solution">Solution</Label>
            <Textarea
              id="solution"
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              placeholder="Describe the solution implemented"
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Results</Label>
              <Button type="button" variant="outline" size="sm" onClick={addResult}>
                <Plus className="h-4 w-4 mr-1" /> Add Result
              </Button>
            </div>
            <div className="space-y-2">
              {formData.results.map((result, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={result}
                    onChange={(e) => handleResultChange(index, e.target.value)}
                    placeholder={`Result ${index + 1}`}
                  />
                  {formData.results.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeResult(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Full Content</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Full case study content (HTML or Markdown supported)"
              rows={6}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="downloadPath">Download Path</Label>
            <Input
              id="downloadPath"
              name="downloadPath"
              value={formData.downloadPath}
              onChange={handleChange}
              placeholder="Path to downloadable PDF version"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL (Optional)</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl || ''}
              onChange={handleChange}
              placeholder="Enter image URL for the case study"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="thumbnailPath">Thumbnail Path (Optional)</Label>
            <Input
              id="thumbnailPath"
              name="thumbnailPath"
              value={formData.thumbnailPath || ''}
              onChange={handleChange}
              placeholder="Path to thumbnail image"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={formData.published}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="published">Published</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/case-studies')}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            {isEditMode ? 'Update' : 'Create'} Case Study
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CaseStudyForm;
