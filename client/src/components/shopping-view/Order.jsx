import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/orderSlice";
import { Badge } from "../ui/badge";

const Order = () => {
  const [openShoppingDetails, setOpenShoppingDetails] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  const statusBadgeMap = {
    pending: "bg-yellow-500",
    inProcess: "bg-emerald-500",
    inShipping: "bg-blue-500",
    delivered: "bg-green-500",
    rejected: "bg-red-500",
  };

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  function handleFetchOrderDetails(id) {
    console.log(id);
    dispatch(getOrderDetails(id));
  }

  useEffect(() => {
    if (orderDetails !== null) setOpenShoppingDetails(true);
  }, [orderDetails]);

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
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map(
                  ({ _id, orderDate, orderStatus, totalAmount }) => (
                    <TableRow key={_id}>
                      <TableCell>{_id}</TableCell>
                      <TableCell>{orderDate.split("T")[0]}</TableCell>
                      <TableCell>
                        <Badge
                          className={`py-1 px-3 capitalize ${
                            statusBadgeMap[orderStatus] ||
                            "bg-gray-500"
                          } `}
                        >
                          {orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{totalAmount}</TableCell>
                      <Dialog
                        open={openShoppingDetails}
                        onOpenChange={() => {
                          setOpenShoppingDetails(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button onClick={() => handleFetchOrderDetails(_id)}>
                          View Details
                        </Button>
                        <ShoppingOrderDetailsView orderDetails={orderDetails} />
                      </Dialog>
                    </TableRow>
                  )
                )
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Order;
