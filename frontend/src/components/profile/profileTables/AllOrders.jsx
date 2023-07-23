import { DataGrid } from "@material-ui/data-grid";
import { userStore } from "../../../store/userStore";
import { Button } from "@material-ui/core";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useOrderStore } from "../../../store/useOrderStore";
import { priceFormat } from "../../../actions/actions";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";
const AllOrders = () => {
    
  

  const { userOrders, getAllOrdersOfUser } = useOrderStore(
    ( state ) => ( { userOrders: state.userOrders, getAllOrdersOfUser: state.getAllOrdersOfUser } ),
    shallow
  )
  
    const user = userStore(state => state.user)
    useEffect(() => {
      getAllOrdersOfUser(user._id);
    }, []);

  
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

    
  
    userOrders &&
    userOrders.forEach((item) => {
        row.push({
          id: item._id,
          itemsQty: item.cart.length,
          total: priceFormat.format(item.totalPrice),
          status: item.status,
        });
      });
  
    return (
      <div className="pl-3 md:pl-8 pt-2 ">
        <div className=" bg-white border-none outline-none shadow-md">
        <div className="p-4">
              <h2 className="text-3xl font-semibold text-[#161616] my-3 mb-7">All your Orders</h2>
          </div>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
        </div>
       
      </div>
    );
  };

  export default AllOrders