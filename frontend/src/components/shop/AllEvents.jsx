import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEventStore } from "../../store/useEventStore";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../../server";
import { shallow } from "zustand/shallow";
import { useSellersStore } from "../../store/useSellersStore";
import Loader from "../Layout/Loader";
import { priceFormat } from "../../actions/actions";

const AllEvents = () => {
  
  const seller = useSellersStore(state => state.seller)
  const { getAllEventsShop,  shopEvents, loading } = useEventStore(
    (state) => ({getAllEventsShop: state.getAllEventsShop, shopEvents:state.shopEvents, loading:state.loading}),
    shallow
  )
    const [isLoading, setIsLoading] = useState(false)

    

  useEffect(() => {
    getAllEventsShop(seller._id);
  }, [getAllEventsShop, seller, isLoading]);

  const handleDelete = async (id) => {
    
    try {
        const {data} = await axios.delete(`${server}/event/delete-shop-event/${id}`,{
            withCredentials: true,
          });
          toast.success('Events deleted successfully!!!')
          setIsLoading(!isLoading)
    } catch (error) {
      setIsLoading(!isLoading)
        toast.error(error.response.data.message)
    }
   
  };


  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 160, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 170,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.7,
      minWidth: 160
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
        flex: 0.7,
        headerAlign: 'left',
        align: 'left',
        minWidth: 130
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      flex: 0.8,
      headerAlign: 'left',
      align: 'left',
      minWidth: 130
    },
    {
      field: "Preview",
      flex: 0.6,
      headerName: "",
      minWidth: 120,
      type: "number",
      headerAlign: 'left',
      align: 'left',
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name;
        const product_name = d.replace(/\s+/g, "-");
        return (
          <>
            <Link to={`/product/${product_name}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.5,
      headerName: "",
      type: "number",
      headerAlign: 'left',
      align: 'left',
      minWidth: 130,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
            onClick={() => handleDelete(params.id)}
            >
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  shopEvents &&
  shopEvents.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: priceFormat.format(item.discountPrice),
        Stock: item.stock,
        sold: item.sold_out,
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
             <div className="p-4">
              <h2 className="text-3xl font-semibold text-[#161616] my-3 mb-7">All Shop Events</h2>
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

export default AllEvents;
