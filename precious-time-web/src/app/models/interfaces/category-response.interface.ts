export interface CategoryListResponse {
  content: CategoryResponse[];
  page: Page;
}

export interface CategoryResponse {
  id: number;
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

