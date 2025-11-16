import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import AdminOrderDetailsView from "@/components/admin-view/OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrderForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
} from "@/store/admin/orderSlice";
import { Badge } from "@/components/ui/badge";

const Order = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);

  const dispatch = useDispatch();

  const statusBadgeMap = {
    pending: "bg-yellow-500",
    inProcess: "bg-emerald-500",
    inShipping: "bg-blue-500",
    delivered: "bg-green-500",
    rejected: "bg-red-500",
  };

  function handleFetchOrderDetails(id) {
    dispatch(getOrderDetailsForAdmin(id));
  }

  useEffect(() => {
    dispatch(getAllOrderForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
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
                        open={openDetailsDialog}
                        onOpenChange={() => {
                          setOpenDetailsDialog(false);
                          dispatch(resetOrderDetails());
                        }}
                      >
                        <Button onClick={() => handleFetchOrderDetails(_id)}>
                          View Details
                        </Button>
                        <AdminOrderDetailsView orderDetails={orderDetails} />
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
