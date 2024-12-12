"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { payload } from "@/components/Cards";
import { getTokenData } from "@/action/cardsAction";
import { myCart } from "@/db/models/Cart";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [products, setProducts] = useState<myCart[] | null>(null); // Set initial state as null
  const [loading, setLoading] = useState(true); // To handle loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Token: payload = await getTokenData();
        const userId = Token?.id;

        if (userId) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/${userId}`,
            {
              method: "GET",
              cache: "no-store",
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch cart items");
          }

          const responseJson = await response.json();
          setProducts(responseJson.data); // Set the fetched data
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
          {loading ? (
            <p>Loading...</p> // Display loading text while fetching
          ) : products?.length ? (
            products.map((el: myCart, index: number) => (
              <ProductCard products={el} key={index} />
            ))
          ) : (
            <p>Your cart is empty.</p> // Display message if no products
          )}
          <div className="grid gap-6 lg:grid-cols-2"></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
