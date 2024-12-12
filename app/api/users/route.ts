import { createUser, getUser, MyResponse } from "@/db/models/User";

import { NextResponse } from "next/server";

import { z } from "zod";

const UserInputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    const parsedData = UserInputSchema.safeParse(data);

    if (!parsedData.success) throw parsedData.error;

    const { name, email, password } = parsedData.data;
    const userCollection = await getUser();
    const existingUser = await userCollection.findOne({ email });

    if (existingUser) {
      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: "Email is already used",
        },
        { status: 400 }
      );
    }

    const user = await createUser({ name, email, password });
    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        message: "User created successfully",
        data: user,
      },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      const issue = err.issues[0];
      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: `${issue.path[0]} - ${issue.message}`,
        },
        { status: 400 }
      );
    }
    if (err instanceof Error) {
      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 500,
          error: err.message || "Internal Server Error",
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 500,
          error: "Internal Server Error",
        },
        { status: 500 }
      );
    }
  }
};
