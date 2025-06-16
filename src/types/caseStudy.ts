
export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  summary: string;
  content: string; // HTML or Markdown formatted content
  clientName: string;
  downloadPath: string;
  tags: string[];
  thumbnailPath?: string;
  imageUrl?: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseStudyDownload {
  id: string;
  caseStudyId: string;
  caseStudyTitle: string;
  userEmail?: string; // Optional if anonymously downloaded
  userName?: string;
  downloadDate: Date;
  userIp?: string;
}
