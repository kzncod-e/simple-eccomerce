"use client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { myCart } from "@/db/models/Cart";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { handleDeleteAction } from "@/action/deleteAction";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateQuantity } from "@/action/updateQuantityAction";

const ProductCard = ({ products }: { products: myCart }) => {
  const [quantity, setQuantity] = useState("");
  const [loadingProductId, setLoadingProductId] = useState<string | null>(null);

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    try {
      setLoadingProductId(productId); // Start loading state
      await updateQuantity(productId, quantity);
      toast("🦄 success update the product", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProductId(null); // End loading state
    }
  };

  if (!products) return null;

  return (
    <>
      {products?.productCarts?.map((product, index) => (
        <div key={index} className="space-y-4">
          <Card key={product._id?.toString()}>
            <CardContent className="flex items-center p-4">
              <div className="relative h-24 w-24">
                <Image
                  src={product?.image}
                  alt={product?.name}
                  fill
                  className="rounded-md object-cover"
                  sizes="(max-width: 768px) 100px, 100px"
                />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-semibold">{product.name}</h3>
                {/* Quantity Dropdown */}
                <div className="flex justify-between mt-2">
                  <Select onValueChange={(value) => setQuantity(value)}>
                    <SelectTrigger className="w-[50px]">
                      <SelectValue placeholder={product.quantity} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button
                    className="self-end"
                    onClick={() =>
                      handleUpdateQuantity(
                        product._id.toString(),
                        Number(quantity)
                      )
                    }
                    disabled={loadingProductId === product._id.toString()} // Disable while loading
                  >
                    {loadingProductId === product._id.toString()
                      ? "Updating..."
                      : "Update"}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  ${Number(product?.price || 0).toFixed(2)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:bg-red-50"
                onClick={() => handleDeleteAction(product._id.toString())}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove item</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      ))}
      <ToastContainer />
    </>
  );
};

export default ProductCard;
