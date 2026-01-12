export type ProjectListResponse = ProjectResponse[]

export interface ProjectResponse {
  id: number
  user_id: number
  name: string
  description: string
  start_date: string
  finish_date: any
  status: string
  progress: string
  created_at: string
  updated_at: string
}
