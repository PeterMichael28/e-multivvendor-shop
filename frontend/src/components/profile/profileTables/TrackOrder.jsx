import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MdTrackChanges } from "react-icons/md";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";
import { useOrderStore } from "../../../store/useOrderStore";
import { priceFormat } from "../../../actions/actions";
import { userStore } from "../../../store/userStore";
const TrackOrder = () => {
    // const { user } = useSelector((state) => state.user);
    
    
      const user = userStore(state => state.user)

      const { userOrders, getAllOrdersOfUser } = useOrderStore(
        ( state ) => ( { userOrders: state.userOrders, getAllOrdersOfUser: state.getAllOrdersOfUser } ),
        shallow
      )
  
    useEffect(() => {
     getAllOrdersOfUser(user._id);
    }, [getAllOrdersOfUser, user]);
   
  
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
              <Link to={`/user/track/order/${params.id}`}>
                <Button>
                  <MdTrackChanges size={20} />
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
          total:  priceFormat.format(item.totalPrice),
          status: item.status,
        });
      });
  
    return (
      <div className="pl-8 pt-1">
         <div className=" bg-white border-none outline-none shadow-md">
         <div className="p-4">
              <h2 className="text-3xl font-semibold text-[#161616] my-3 mb-7">Track your Orders</h2>
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
  

  export default TrackOrder