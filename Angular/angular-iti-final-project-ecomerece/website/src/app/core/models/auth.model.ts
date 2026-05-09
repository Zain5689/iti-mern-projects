export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  status?: string;
  message?: string;
  token: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface MeResponse {
  status: string;
  data: { user: User };
}
