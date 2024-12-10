import { hash } from "@/lib/bcrypt";
import { getDb } from "../config";
import { Db, ObjectId } from "mongodb";

export type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export type UserType = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};
export type UserInput = Omit<UserType, "_id">;

export const getUser = async () => {
  const db: Db = await getDb();
  const user = db.collection("User");
  return user;
};
export const createUser = async (user: UserInput) => {
  const modifiedUser: UserInput = {
    ...user,
    password: hash(user.password),
  };
  const userCollection = await getUser();
  const User = await userCollection.insertOne(modifiedUser);
  return User;
};

export const findUser = async (user: UserLogin) => {
  const User = (await getUser()).findOne({
    email: user.email,
  });
  return User;
};
