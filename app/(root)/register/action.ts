"use server";
import { MyResponse, UserInput } from "@/db/models/User";
import { redirect } from "next/navigation";

const handelFormAction = async ({ name, email, password }: UserInput) => {
  const response = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJson: MyResponse<unknown> = await response.json();
  if (!response.ok) {
    const message = responseJson.error ?? "Something went wrong !";
    return redirect(`/register?error=${encodeURIComponent(message)}`);
  }

  return redirect("/login");
};
export default handelFormAction;
