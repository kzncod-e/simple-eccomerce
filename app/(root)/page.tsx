import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { MyResponse } from "@/db/models/User";
import { Product } from "@/db/models/Product";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cards from "@/components/Cards";

//   { name: "Electronics", image: "/placeholder.svg?height=300&width=400" },
//   { name: "Clothing", image: "/placeholder.svg?height=300&width=400" },
//   { name: "Home & Garden", image: "/placeholder.svg?height=300&width=400" },
//   { name: "Sports & Outdoors", image: "/placeholder.svg?height=300&width=400" },
// ];

export default async function HomePage() {
  const fetchProduct = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("fetch product failed");
    }
    const data: MyResponse<Product[]> = await response.json();
    return data.data;
  };
  const products = await fetchProduct();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Welcome to Acme Store
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                  Discover the latest trends and must-have products for your
                  lifestyle.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="#featured-products">Shop Now</Link>
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="featured-products"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Featured Products
            </h2>
            <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products &&
                products.map((product) => (
                  <Cards key={product._id.toString()} product={product} />
                ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Join Our Newsletter
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  Stay up to date with the latest products, exclusive offers,
                  and shopping tips.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
