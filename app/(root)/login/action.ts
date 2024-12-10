"use server";

import { MyResponse } from "@/db/models/User";
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
  const response = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJson: MyResponse<unknown> = await response.json();
  if (!response.ok) {
    const message = responseJson.error ?? "something went wrong";
    return redirect(`/login?error=${encodeURIComponent(message)}`);
  }
  redirect("/");
};
