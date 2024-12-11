import { ObjectId } from "mongodb";
import { getDb } from "../config";

export type productCarts = {
  _id: ObjectId;
  name: string;
  image: string;
  slug: string;
  description: string;
  price: string;
  quantity: string;
  createdAt: string;
  updatedAt: string;
};

export type Cart = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: string;
  updatedAt: string;
};

export type myCart = {
  userId: ObjectId;
  productId: ObjectId;
  createdAt: string;
  updatedAt: string;
  productCarts: productCarts[];
};
export type cartInput = Omit<Cart, "_id">;

export const getCart = async () => {
  return (await getDb()).collection("Cart");
};

export const addToCart = async (cart: {
  userId: string;
  productId: string;
}) => {
  const currentDate = new Date().toISOString();
  const cartDoc = {
    userId: new ObjectId(cart.userId),
    productId: new ObjectId(cart.productId),
    createdAt: currentDate,
    updatedAt: currentDate,
  };
  const Cart = (await getCart()).insertOne(cartDoc);
  return Cart;
};
export const getProductCart = async (userId: string) => {
  const cart = await getCart();
  const result = await cart
    .aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "Product",
          localField: "ProductId",
          foreignField: "_id",
          as: "productCarts",
        },
      },
    ])
    .toArray();
  return result;
};
