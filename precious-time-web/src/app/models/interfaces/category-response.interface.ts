export interface CategoryListResponse {
  current_page: number
  current_page_url: string
  data: CategoryResponse[]
  first_page_url: string
  from: number
  next_page_url: any
  path: string
  per_page: number
  prev_page_url: any
  to: number
}

export interface CategoryResponse {
  id: number
  name: string
  emoji: string
  color: string
  is_system: number
  created_at: string
  updated_at: string
}

