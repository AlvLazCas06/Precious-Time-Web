export type TaskListResponse = TaskResponse[]

export interface TaskResponse {
  id: number
  title: string
  description: string
  status: string
  priority: string
  category: Category
  projectName: string
  author: string
  completedAt: string
}

export interface Category {
  id: number
  name: string
  emoji: string
  color: string
}
