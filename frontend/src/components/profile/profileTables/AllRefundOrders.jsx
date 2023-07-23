import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";
import { useOrderStore } from "../../../store/useOrderStore";
import { priceFormat } from "../../../actions/actions";
import { userStore } from "../../../store/userStore";
const AllRefundOrders = () => {
   
    const user = userStore(state => state.user)

      const { userOrders, getAllOrdersOfUser } = useOrderStore(
        ( state ) => ( { userOrders: state.userOrders, getAllOrdersOfUser: state.getAllOrdersOfUser } ),
        shallow
      )
  
    useEffect(() => {
     getAllOrdersOfUser(user._id);
    }, [getAllOrdersOfUser, user]);
  
    const eligibleOrders = userOrders && userOrders.filter((item) => item.status === "Processing refund");
  
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
              <Link to={`/user/order/${params.id}`}>
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
  
    eligibleOrders &&
     eligibleOrders.forEach((item) => {
        row.push({
          id: item._id,
          itemsQty: item.cart.length,
          total: priceFormat.format(item.totalPrice),
          status: item.status,
        });
      });
  
    return (
      <div className="pl-8 pt-1 w-full">
        <div className=" bg-white border-none outline-none shadow-md w-full">
        <div className="p-4">
              <h2 className="text-3xl font-semibold text-[#161616] my-3 mb-7">All your Refund Orders</h2>
          </div>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          autoHeight
          disableSelectionOnClick
        />
        </div>
      </div>
    );
  };


  export default AllRefundOrders