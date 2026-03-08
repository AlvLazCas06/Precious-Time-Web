export type UserListResponse = UserResponse[]

export interface UserResponse {
  username: string
  email: string
  name: string
  lastname: string
  premium: boolean
  roles: string[]
  active: boolean
  registerAt: string
}
