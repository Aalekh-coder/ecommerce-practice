import Address from "@/components/shopping-view/Address";
import Order from "@/components/shopping-view/Order";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const Account = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[350px] w-full overflow-hidden">
        <img
          src="https://ca-times.brightspotcdn.com/dims4/default/4a4850d/2147483647/strip/true/crop/4000x2667+0+0/resize/1200x800!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F53%2Fcb%2F30debca64851a65cdd76cf6aba19%2Fla-me-lagence-stores-beverly-hills.jpg"
          alt="image"
          width={"1600"}
          height={"300"}
          style={{ aspectRatio: "1600/300", objectFit: "cover" }}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="container mx-auto  grid  grid-cols-1 gap-8  py-8">
        <div className="flex flex-col rounded-lg border  bg-background  p-6  shadow-2xl">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders"><Order /></TabsContent>
            <TabsContent value="address"><Address /></TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;
