import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import { payload } from "@/components/Cards";
import { getTokenData } from "@/action/cardsAction";
import { myCart } from "@/db/models/Cart";

import ProductCard from "@/components/ProductCard";
export default async function CartPage() {
  const getToken = async () => {
    try {
      const Token: payload = await getTokenData();
      return Token;
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };
  const token = await getToken();
  const userId = token?.id;
  const fetchProductCart = async () => {
    if (!userId) return;
    try {
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

      return responseJson.data;
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };
  const products = await fetchProductCart();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-8">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            {products?.length
              ? products.map((el: myCart, index: number) => (
                  <ProductCard products={el} key={index} />
                ))
              : ""}
            <div className="grid gap-6 lg:grid-cols-2"></div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
