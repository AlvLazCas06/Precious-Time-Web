export interface CategoryResponse {
  name: string
  emoji: string
  color: string
  is_system: boolean
  updated_at: string
  created_at: string
  id: number
}

export type CategoryListResponse = CategoryResponse[];
