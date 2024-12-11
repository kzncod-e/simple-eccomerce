"use server";

import { payload } from "@/components/Cards";
import { Cart } from "@/db/models/Cart";
import { MyResponse } from "@/db/models/User";
import { verifToken } from "@/lib/jwt";
import { ObjectId } from "mongodb";

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
interface handleAddToCart {
  userId: string;
  _id: ObjectId;
}
export const handleAddToCart = async (data: handleAddToCart) => {
  const response = await fetch("http://localhost:3000/api/cart", {
    method: "POST",
    body: JSON.stringify(data),
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
