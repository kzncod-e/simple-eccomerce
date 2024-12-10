import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MyResponse } from "@/db/models/User";
import { Product } from "@/db/models/Product";
import Navbar from "@/components/Navbar";

// const categories = [
//   { name: "Electronics", image: "/placeholder.svg?height=300&width=400" },
//   { name: "Clothing", image: "/placeholder.svg?height=300&width=400" },
//   { name: "Home & Garden", image: "/placeholder.svg?height=300&width=400" },
//   { name: "Sports & Outdoors", image: "/placeholder.svg?height=300&width=400" },
// ];

export default async function HomePage() {
  const fetchProduct = async () => {
    const response = await fetch("http://localhost:3000/api/products", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("fetch product failed");
    }
    const data: MyResponse<Product[]> = await response.json();
    return data.data;
  };
  const products = await fetchProduct();
  console.log(products);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products &&
                products.map((product) => (
                  <Card key={product._id.toString()}>
                    <CardHeader>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-[200px] object-cover"
                      />
                    </CardHeader>
                    <CardContent>
                      <CardTitle>{product.name}</CardTitle>
                      <p className="text-2xl font-bold">
                        ${Number(product.price).toFixed(2)}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Add to Cart</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </div>
        </section>
        {/* <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
              Shop by Category
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Card key={index} className="overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={400}
                    height={300}
                    className="w-full h-[200px] object-cover"
                  />
                  <CardContent className="p-4">
                    <CardTitle className="text-xl mb-2">
                      {category.name}
                    </CardTitle>
                    <Button variant="outline" className="w-full">
                      Explore <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section> */}
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
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 Acme Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
