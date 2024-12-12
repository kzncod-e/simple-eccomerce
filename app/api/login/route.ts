import { compare } from "@/lib/bcrypt";
import { signToken } from "@/lib/jwt";

import { cookies } from "next/headers";
import { findUser, MyResponse } from "@/db/models/User";
import { NextResponse } from "next/server";
import { z } from "zod";

const UserInputLoginSchema = z.object({
  email: z.string().email().min(1, " email is required"),
  password: z.string().min(1, "password is required"),
});

export const POST = async (request: Request) => {
  const { email, password } = await request.json();
  const parsedData = UserInputLoginSchema.safeParse({ email, password });
  if (!parsedData.success) {
    const errPath = parsedData.error.issues[0].path[0];
    const errMessage = parsedData.error.issues[0].message;
    throw new Error(`${errPath} ${errMessage}`);
  }
  const user = await findUser(parsedData.data);
  if (!user) {
    throw new Error("user nor found");
  }
  if (!compare(parsedData.data.password, user.password)) {
    throw new Error("Invalid password");
  }
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = signToken(payload);
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
  });
  // console.log(token);

  return NextResponse.json<MyResponse<unknown>>(
    {
      statusCode: 200,
      message: "login success",
      data: token,
    },
    { status: 200 }
  );
};
