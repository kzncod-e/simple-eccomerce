"use server";

import { payload } from "@/components/Cards";
import { Cart } from "@/db/models/Cart";
import { MyResponse } from "@/db/models/User";
import { verifToken } from "@/lib/jwt";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getTokenData(): Promise<payload> {
  // Get the cookies from the request
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value; // Retrieve

  if (!token) {
    throw new Error("Token not found");
  }
  const tokenData = verifToken(token);
  return tokenData as payload;
}

export const handleAddToCart = async (userId: string, productId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart`, {
    method: "POST",
    body: JSON.stringify({ userId, productId }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const responseJson: MyResponse<Cart> = await response.json();
    console.log(`error happen while add to cart ${responseJson.error}`);
  }
  console.log("success add to cart");

  redirect("/cart");
};
