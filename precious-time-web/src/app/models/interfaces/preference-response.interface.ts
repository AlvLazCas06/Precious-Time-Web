export type PreferenceResponse = Preference[]

export interface Preference {
  id: number
  user_id: number
  theme: string
  notifications_active: number
  notification_type: string
  created_at: string
  updated_at: string
}
