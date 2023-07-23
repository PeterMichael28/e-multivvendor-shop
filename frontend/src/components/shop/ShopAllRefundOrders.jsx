import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { useOrderStore } from "../../store/useOrderStore";
import { shallow } from "zustand/shallow";
import { useSellersStore } from "../../store/useSellersStore";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader";
import { priceFormat } from "../../actions/actions";
import { AiOutlineArrowRight } from "react-icons/ai";

const ShopAllRefundOrders = () => {
  
  const seller = useSellersStore(state => state.seller)

  const { shopOrders, getAllOrdersOfShop, loading } = useOrderStore(
    ( state ) => ( { shopOrders: state.shopOrders, getAllOrdersOfShop: state.getAllOrdersOfShop, loading:state.loading } ),
    shallow
  )
  

  useEffect(() => {
    getAllOrdersOfShop(seller._id);
  }, [getAllOrdersOfShop, seller]);

  const refundOrders = shopOrders && shopOrders.filter((item) => item.status === "Processing refund"  || item.status === "Refund Success");

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  refundOrders &&
  refundOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: priceFormat.format(item.totalPrice),
        status: item.status,
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="p-4">
              <h2 className="text-3xl font-semibold text-[#161616] my-3 mb-7">All Refunds Orders</h2>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default ShopAllRefundOrders;
