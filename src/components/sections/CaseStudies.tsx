import { useState, useEffect } from 'react';
import { getCaseStudies } from '@/lib/services/caseStudyService';
import { CaseStudy } from '@/types/caseStudy';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react'; // Ensure Download and ExternalLink are imported

const CaseStudiesSection = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [industries, setIndustries] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const data = await getCaseStudies();
        // Only show published case studies on the public site
        const publishedStudies = data.filter(study => study.published);
        setCaseStudies(publishedStudies);

        // Extract unique industries for tabs
        const uniqueIndustries = Array.from(
          new Set(publishedStudies.map(study => study.industry))
        );
        // FIX: Corrected typo from uniqueIndusturies to uniqueIndustries
        setIndustries(uniqueIndustries); 

        // Set default tab
        if (uniqueIndustries.length > 0) {
          setActiveTab('all');
        }
      } catch (error) {
        console.error('Error fetching case studies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  const filteredCaseStudies = activeTab === 'all'
    ? caseStudies
    : caseStudies.filter(study => study.industry === activeTab);

  const openCaseStudy = (study: CaseStudy) => {
    setSelectedStudy(study);
  };

  const closeCaseStudy = () => {
    setSelectedStudy(null);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 rounded-lg" />
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </div>
    );
  }

  if (caseStudies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No case studies available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Industries</TabsTrigger>
          {industries.map(industry => (
            <TabsTrigger key={industry} value={industry}>
              {industry}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCaseStudies.map((study) => (
              <Card
                key={study.id}
                id={`case-study-${study.id}`}
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => openCaseStudy(study)}
              >
                {(study.thumbnailPath || study.imageUrl) && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={study.thumbnailPath || study.imageUrl}
                      alt={study.title || 'Case study image'}
                      className="w-full h-full object-cover"
                    />
                    {study.downloadPath && (
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="absolute bottom-3 right-3 z-10 rounded-full shadow-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(study.downloadPath, '_blank');
                        }}
                        title="Download Case Study"
                      >
                        <Download className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                )}

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{study.title}</CardTitle>
                      {/* Added Client Name to card header */}
                      {study.clientName && (
                        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                          Client: {study.clientName}
                        </CardDescription>
                      )}
                      <CardDescription>{study.industry}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-2">
                  {/* Added Summary to card content */}
                  {study.summary && (
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Summary:</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{study.summary}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Challenge:</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Solution:</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{study.solution}</p>
                  </div>
                  {study.results.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Results:</h4>
                      <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 text-sm">
                        {study.results.slice(0, 2).map((result, index) => (
                          <li key={index} className="line-clamp-1">{result}</li>
                        ))}
                        {study.results.length > 2 && (
                          <li className="text-primary">+ {study.results.length - 2} more results</li>
                        )}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Case Study Detail Modal */}
      <Dialog open={!!selectedStudy} onOpenChange={(open) => !open && closeCaseStudy()}>
        {selectedStudy && (
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="text-2xl">{selectedStudy.title}</DialogTitle>
                  {/* Added Client Name to modal header */}
                  {selectedStudy.clientName && (
                    <DialogDescription className="text-md text-gray-500 dark:text-gray-400">
                      Client: {selectedStudy.clientName}
                    </DialogDescription>
                  )}
                  <DialogDescription className="text-lg">{selectedStudy.industry}</DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              {/* Added Summary to modal content */}
              {selectedStudy.summary && (
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Summary</h3>
                  <p className="text-gray-600 dark:text-gray-300">{selectedStudy.summary}</p>
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Challenge</h3>
                <p className="text-gray-600 dark:text-gray-300">{selectedStudy.challenge}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Solution</h3>
                <p className="text-gray-600 dark:text-gray-300">{selectedStudy.solution}</p>
              </div>

              {selectedStudy.results.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Results</h3>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                    {selectedStudy.results.map((result, index) => (
                      <li key={index}>{result}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Added Full Content to modal content */}
              {selectedStudy.content && (
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Full Details</h3>
                  {/* Render HTML content safely. Consider a library like 'dompurify' if 'content' comes from user input */}
                  <div
                    className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: selectedStudy.content }}
                  />
                </div>
              )}

              {/* Download Button for Download Path within Modal */}
              {selectedStudy.downloadPath && (
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Download Case Study</h3>
                  <Button
                    onClick={() => window.open(selectedStudy.downloadPath, '_blank')}
                    className="w-full sm:w-auto"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default CaseStudiesSection;