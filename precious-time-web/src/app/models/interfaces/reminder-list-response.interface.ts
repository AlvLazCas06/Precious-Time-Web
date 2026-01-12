export type ReminderListResponse = ReminderResponse[]

export interface ReminderResponse {
  id: number
  user_id: number
  title: string
  message: string
  is_read: number
  created_at: string
  updated_at: string
}
