export type ReminderListResponse = ReminderResponse[]

export interface ReminderResponse {
  id: number
  title: string
  message: string
  read: boolean
  sendAt: string
}
