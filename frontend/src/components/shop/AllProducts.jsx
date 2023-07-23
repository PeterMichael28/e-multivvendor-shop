import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSellersStore } from "../../store/useSellersStore";
import { server } from "../../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { shallow } from "zustand/shallow";
import { useProductStore } from "../../store/useProductStore";
import Loader from "../Layout/Loader";
import { priceFormat } from "../../actions/actions";


const AllProducts = () => {

  const seller = useSellersStore(state => state.seller)
  const { getAllProductsShop,  shopProducts, loading } = useProductStore(
    (state) => ({getAllProductsShop: state.getAllProductsShop, shopProducts:state.shopProducts, loading:state.loading}),
    shallow
  )
    const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getAllProductsShop(seller._id);
  }, [getAllProductsShop, seller, isLoading]);

  const handleDelete = async (id) => {
    
    try {
        const { data } = await axios.delete(
            `${server}/product/delete-shop-product/${id}`,
            {
              withCredentials: true,
            }
          );
          toast.success('Product deleted successfully!!!')
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
      minWidth: 180,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 140,
      flex: 0.5,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 130,
      flex: 0.5,
      headerAlign: 'left',
      align: 'left',
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: "Preview",
      flex: 0.5,
      minWidth: 130,
      headerName: "",
      type: "number",
      headerAlign: 'left',
      align: 'left',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
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
      minWidth: 130,
      headerName: "",
      type: "number",
      headerAlign: 'left',
      align: 'left',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  shopProducts &&
  shopProducts.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: priceFormat.format(item.discountPrice),
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
            <div className="p-4">
              <h2 className="text-3xl font-semibold text-[#161616] my-3 mb-7">All Shop Products</h2>
          </div>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            sx={{
                borderInline: '0'
            }}
          />
        </div>
      )}
    </>
  );
};

export default AllProducts;
