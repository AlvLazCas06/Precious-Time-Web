export interface CategoryResponse {
  name: string
  emoji: string
  color: string
  updated_at: string
  created_at: string
  id: number
}

export type CategoryListResponse = CategoryResponse[];
