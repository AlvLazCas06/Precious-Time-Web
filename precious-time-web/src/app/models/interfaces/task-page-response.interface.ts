export interface TaskPageResponse {
  content: Task[];
  page: Page;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: Category;
  projectName: string;
  author: string;
  completedAt: string | null;
}

export interface Category {
  name: string;
  emoji: string;
  color: string;
}

export interface Page {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}
