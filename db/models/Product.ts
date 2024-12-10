import { ObjectId } from "mongodb";
import { getDb } from "../config";
export type Product = {
  _id: ObjectId;
  name: string;
  image: string;
  slug: string;
  description: string;
  price: string;
  createdAt: string;
  updatedAt: string;
};
export const getProducts = async () => {
  const getProduct = (await getDb()).collection("Product");
  const Product = await getProduct.find().toArray();
  return Product;
};
