import {
  deleteProductFromCart,
  getProductCart,
  ProductCarts,
  updateProductQuantity,
} from "@/db/models/Cart";
import { MyResponse } from "@/db/models/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ userId: string }>;
  }
) => {
  try {
    const userId = (await params).userId;
    const products = await getProductCart(userId);
    return NextResponse.json<MyResponse<ProductCarts>>(
      {
        statusCode: 200,
        message: "fetch product success",
        data: products,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(`error happen when fetcing product cart${error}`);
  }
};

export const DELETE = async (
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ userId: string }>;
  }
) => {
  try {
    const productId = (await params).userId;
    console.log(productId);
    const deletedProduct = await deleteProductFromCart(productId);
    return NextResponse.json<MyResponse<unknown>>({
      statusCode: 201,
      message: "product has beed deleted",
      data: deletedProduct,
    });
  } catch (error) {
    console.log(`error happen while deleting product from cart${error}`);
  }
};

export const PATCH = async (
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ userId: string }>;
  }
) => {
  try {
    const productId = (await params).userId;

    const { quantity } = await request.json();

    if (!quantity || typeof quantity !== "number") {
      return NextResponse.json<MyResponse<unknown>>({
        statusCode: 400,
        message: "Invalid quantity provided",
      });
    }

    const updatedProduct = await updateProductQuantity(productId, quantity);
    return NextResponse.json<MyResponse<unknown>>({
      statusCode: 200,
      message: "Product quantity has been updated",
      data: updatedProduct,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      `Error occurred while updating product quantity: ${errorMessage}`
    );
    return NextResponse.json<MyResponse<unknown>>({
      statusCode: 500,
      message: "Failed to update product quantity",
      error: errorMessage, // Ensure error is a string
    });
  }
};
