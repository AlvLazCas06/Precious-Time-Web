export interface UserCreateResponse {
  token: string
  user: User
}

export interface User {
  name: string
  email: string
  updated_at: string
  created_at: string
  id: number
}
