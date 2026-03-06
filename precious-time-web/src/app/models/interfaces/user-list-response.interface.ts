export interface UserListResponse {
  content: UserItem[];
  page: Page;
}

export interface UserItem {
  username: string;
  email: string;
  name: string;
  lastname: string;
  premium: boolean;
  roles: string[];
  active: boolean;
}

export interface Page {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

