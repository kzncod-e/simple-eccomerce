import { addToCart } from "@/db/models/Cart";
import { MyResponse } from "@/db/models/User";
import { NextRequest, NextResponse } from "next/server";

interface data {
  userId: string;
  productId: string;
}
export const POST = async (request: NextRequest) => {
  try {
    const data: data = await request.json();
    const newProductCart = await addToCart(data);
    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        message: "add to cart success",
        data: newProductCart,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(`someting went error while add to cart ${error}`);
  }
};
