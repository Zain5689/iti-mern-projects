export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface TokenPayload {
  email: string;
  name?: string;
  id?: string | number;
  password: string;
}
