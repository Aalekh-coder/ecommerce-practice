import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetailsView from "./OrderDetails";

const Order = () => {
  const [openShoppingDetails, setOpenShoppingDetails] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Order</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>hellk</TableCell>
              <TableCell>hellk</TableCell>
              <TableCell>hellk</TableCell>
              <TableCell>hellk</TableCell>
              <TableCell>hellk</TableCell>
              <Dialog open={openShoppingDetails} onOpenChange={setOpenShoppingDetails}>
                <Button onClick={()=>setOpenShoppingDetails(true)}>View Details</Button>
                <ShoppingOrderDetailsView />
              </Dialog>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Order;
