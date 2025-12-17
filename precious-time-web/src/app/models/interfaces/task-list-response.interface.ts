export type TaskListResponse = Task[]

export interface Task {
  id: number
  category_id: number
  title: string
  description: string
  status: string
  priority: string
  done: number
  completed_at: any
  created_at: string
  updated_at: string
}
