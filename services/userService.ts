import { create, db } from "../models/db";
import type { User } from "../types/users";

export const createUser = async ({
  tel, 
  name,
  password,
}: Pick<User, "tel" | "name" | "password">) => {
  const newUser = create<User>({ tel,name, password });

  db.data?.users.push(newUser);
  await db.write();

  return newUser;
};

export const findUser = (predicate: (user: User) => boolean) => {
  return db.data?.users.find(predicate);
};
