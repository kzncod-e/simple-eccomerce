"use server";
import { MyResponse } from "@/db/models/User";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const handleDeleteAction = async (productId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const responseJson: MyResponse<unknown> = await response.json();
    const err = responseJson.error;
    console.log(`error happen while deleting product${err}`);
  }
  revalidatePath("/cart");
  redirect("/cart");
};
