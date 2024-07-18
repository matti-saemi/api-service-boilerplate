export interface User {
  id: number;
  password: string;
  email: string;
}

export interface UserModelObject extends User {
  created_at: string;
  updated_at: string;
}

export interface UserResponse {
  id: number;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}
