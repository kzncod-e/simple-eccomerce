"use client";

import { useState } from "react";

import Image from "next/image";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

// This would typically come from a global state management solution or API
const initialCartItems = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 99.99,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <Card className="w-full" key={item.id}>
                    <CardContent className="flex items-center p-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-md"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                        onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
