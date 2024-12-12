import { getDb } from "@/db/config";
import { addToCart, getCart } from "@/db/models/Cart";
import { MyResponse } from "@/db/models/User";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

interface Data {
  userId: string;
  productId: string;
}

export const POST = async (request: NextRequest) => {
  try {
    const data: Data = await request.json();
    const { productId, userId } = data;

    if (!ObjectId.isValid(productId) || !userId) {
      return NextResponse.json<MyResponse<unknown>>(
        {
          statusCode: 400,
          message: "Invalid productId or userId",
        },
        {
          status: 400,
        }
      );
    }

    const cartCollection = await getCart();
    const existingCartItem = await cartCollection.findOne({
      productId: new ObjectId(productId),
    });

    if (existingCartItem) {
      const productCollection = (await getDb()).collection("Product");
      const result = await productCollection.updateOne(
        { _id: new ObjectId(productId) },
        { $inc: { quantity: 1 } }
      );

      return NextResponse.json<MyResponse<unknown>>(
        {
          statusCode: 200,
          message: "Product quantity updated in cart",
          data: result,
        },
        {
          status: 200,
        }
      );
    }

    // Add new product to cart
    const newProductCart = await addToCart(data);

    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 201,
        message: "Product added to cart successfully",
        data: newProductCart,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(`Error occurred while adding to cart: ${error}`);
    return NextResponse.json<MyResponse<unknown>>(
      {
        statusCode: 500,
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error),
      },
      {
        status: 500,
      }
    );
  }
};
