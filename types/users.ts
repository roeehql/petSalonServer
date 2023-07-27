export interface User {
  id: string;
  tel: string;
  name: string;
  password: string;
  createdAt: string;
}

export type UserInput = Pick<User, "tel" | "name" | "password">;
