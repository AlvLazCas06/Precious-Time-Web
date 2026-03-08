export interface UserPageResponse {
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
  registerAt: string;
}

export interface Page {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

