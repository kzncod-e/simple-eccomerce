import { ObjectId } from "mongodb";
import { getDb } from "../config";
import { getProducts } from "./Product";

export type ProductCarts = {
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
  productCarts: ProductCarts[];
};
export type cartInput = Omit<Cart, "_id">;

export const getCart = async () => {
  return (await getDb()).collection("Cart");
};

export const addToCart = async (cart: {
  userId: string;
  productId: string;
}) => {
  const cartCollection = await getCart();

  const currentDate = new Date().toISOString();
  const cartDoc = {
    userId: new ObjectId(cart.userId),
    productId: new ObjectId(cart.productId),
    createdAt: currentDate,
    updatedAt: currentDate,
  };
  const newCart = cartCollection.insertOne(cartDoc);
  return newCart;
};
export const getProductCart = async (userId: string): Promise<ProductCarts> => {
  const cart = await getCart();
  const result = (await cart
    .aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "Product",
          localField: "productId",
          foreignField: "_id",
          as: "productCarts",
        },
      },
    ])
    .toArray()) as unknown as ProductCarts;
  return result;
};

export const deleteProductFromCart = async (productId: string) => {
  const cart = await getCart();
  console.log(productId, ">>>>>>>>>>>>>>>>>>>>>>>");

  const result = await cart.deleteOne({ productId: new ObjectId(productId) });
  return result;
};

export const updateProductQuantity = async (
  productId: string,
  quantity: number
) => {
  const product = (await getDb()).collection("Product");
  const currentDate = new Date().toISOString();
  console.log(productId, quantity);

  const result = await product.updateOne(
    { _id: new ObjectId(productId) },
    {
      $set: {
        quantity: Number(quantity),
        updatedAt: currentDate,
      },
    }
  );

  return result;
};
