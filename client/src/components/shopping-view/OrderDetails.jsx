import React, { useState } from "react";
import { Label } from "../ui/label";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";

const ShoppingOrderDetailsView = () => {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center  justify-between">
            <p className="font-medium">Order ID</p>
            <Label>1234</Label>
          </div>
          <div className="flex mt-2 items-center  justify-between">
            <p className="font-medium">Order Date</p>
            <Label>31/12/2025</Label>
          </div>
          <div className="flex mt-2 items-center  justify-between">
            <p className="font-medium">Order Status</p>
            <Label>In Process</Label>
          </div>
          <div className="flex mt-2 items-center  justify-between">
            <p className="font-medium">Order Price</p>
            <Label>$500</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 ">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product One</span>
                <span>$100</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid gap-4 ">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <ul className="grid gap-0.5 text-muted-foreground">
              <li className="flex  justify-between flex-col">
                <span>Aalekh</span>
                <span>Address</span>
                <span>City</span>
                <span>PinCode</span>
                <span>Phone</span>
                <span>Notes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default ShoppingOrderDetailsView;
