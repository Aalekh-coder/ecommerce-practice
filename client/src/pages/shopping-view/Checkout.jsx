import Address from "@/components/shopping-view/Address";
import UserCartItemsContent from "@/components/shopping-view/CartItemsContent";
import { Button } from "@/components/ui/button";
import React from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);

  const totalCartAmount =
    cartItems && cartItems?.items.length > 0
      ? cartItems.items?.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={"/11084.jpg"}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address />

        <div className="flex flex-col gap-4=5">
          {cartItems && cartItems?.items?.length > 0
            ? cartItems?.items.map((cartItems) => (
                <UserCartItemsContent cartItems={cartItems} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button className={"w-full"}>Checkout with Paypal</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
