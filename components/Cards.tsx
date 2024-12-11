"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

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

const Cards = ({ image, name, price, _id }: Product) => {
  const [token, setToken] = useState<payload>();
  const [userId, setUserId] = useState("");
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

  return (
    <>
      <Card className="flex-col  flex justify-center">
        <CardHeader>
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            className="w-full h-[200px] object-cover"
          />
        </CardHeader>
        <CardContent>
          <CardTitle>{name}</CardTitle>
          <p className="text-2xl font-bold">${Number(price).toFixed(2)}</p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => handleAddToCart({ userId, _id })}
            className="w-full">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Cards;
