export type UserListResponse = User[]

export interface User {
  id: number
  name: string
  email: string
  role: string
  email_verified_at: any
  phone_number?: string
  is_premium: number
  is_active: number
  created_at: string
  updated_at: string
}
