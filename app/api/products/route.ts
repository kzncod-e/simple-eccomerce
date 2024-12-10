import { getProducts } from "@/db/models/Product";
import { MyResponse } from "@/db/models/User";
import { NextResponse } from "next/server";

export const GET = async () => {
  const products = await getProducts();
  return NextResponse.json<MyResponse<unknown>>(
    {
      statusCode: 200,
      message: "fetch products sduccess",
      data: products,
    },
    {
      status: 200,
    }
  );
};
