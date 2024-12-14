"use server";

import { MyResponse } from "@/db/models/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const handelFormAction = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const data = {
    email,
    password,
  };
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responseJson: MyResponse<string | undefined> = await response.json();
  if (!response.ok) {
    const message = responseJson.error ?? "something went wrong";
    return redirect(`/login?error=${encodeURIComponent(message)}`);
  }
  const token = responseJson.data;
  if (token) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
    });
  }
  // console.log(token);
  redirect("/");
};
