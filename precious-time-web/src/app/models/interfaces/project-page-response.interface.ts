export interface ProjectPageResponse {
  content: ProjectResponse[];
  page: Page;
}

export interface ProjectResponse {
  id: number;
  name: string;
  description: string;
  startDate: string | null;
  finishDate: string | null;
  status: string;
  progress: number;
  author: string;
  tasks: any[];
}

export interface Page {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}
