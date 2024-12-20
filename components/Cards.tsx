"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/db/models/Product";
import { getTokenData, handleAddToCart } from "@/action/cardsAction";

export interface payload {
  id: string;
  email: string;
}

const Cards = ({ product }: { product: Product }) => {
  const [token, setToken] = useState<payload>();
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  const getToken = async () => {
    const Token: payload = await getTokenData();
    setToken(Token);
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      setUserId(token.id);
    }
  }, [token]);

  const AddToCart = async (userId: string, productId: string) => {
    try {
      setLoading(true); // Start loading
      toast.success("Product added to cart");
      await handleAddToCart(userId, productId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      <Card className="flex-col  flex justify-center">
        <CardHeader>
          <Image
            src={product?.image}
            alt={product?.name}
            width={200}
            height={200}
            className="w-full h-[200px] object-cover"
          />
        </CardHeader>
        <CardContent>
          <CardTitle>{product?.name}</CardTitle>
          <p className="text-2xl font-bold">
            ${Number(product?.price).toFixed(2)}
          </p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => AddToCart(userId, product._id.toString())}
            className="w-full"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Adding..." : "Add to Cart"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Cards;
