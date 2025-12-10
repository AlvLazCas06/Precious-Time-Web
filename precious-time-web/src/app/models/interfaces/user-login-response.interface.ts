export interface UserLoginResponse {
  token: string
  user: User
}

export interface User {
  id: number
  name: string
  email: string
  role: string
  email_verified_at: any
  created_at: string
  updated_at: string
}
