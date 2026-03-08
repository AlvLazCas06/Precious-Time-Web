export type ProjectListResponse = ProjectResponse[]

export interface ProjectResponse {
  id: number
  name: string
  description: string
  startDate: string
  finishDate: string
  status: string
  progress: number
  author: string
  tasks: Task[]
}

export interface Task {
  id: number
  title: string
  categoryName: string
  priority: string
}
