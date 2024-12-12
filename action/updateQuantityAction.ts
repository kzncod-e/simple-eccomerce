"use server";
import { revalidatePath } from "next/cache";

export const updateQuantity = async (productId: string, quantity: number) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/cart/${productId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update quantity");
    }

    revalidatePath("/cart");
    console.log("update success", data);
  } catch (error) {
    console.error("Error updating quantity:", error);
    return null;
  }
};
