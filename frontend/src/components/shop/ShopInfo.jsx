/* eslint-disable react/prop-types */
import { Link, useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSellersStore } from '../../store/useSellersStore';
import { useProductStore } from '../../store/useProductStore';
import { server } from "../../../server";
import Loader from "../Layout/Loader";
import styles from "../../styles/style";
import { shallow } from "zustand/shallow";


const ShopInfo = ({ isOwner }) => {
    const [data,setData] = useState({});
   
    const [loading,setLoading] = useState(false);
   
    const logOutSeller = useSellersStore(state => state.logOutSeller)
    const { shopProducts,  getAllProductsShop } = useProductStore(
      (state) => ({shopProducts: state.shopProducts, getAllProductsShop:state.getAllProductsShop}),
      shallow
    )
    const navigate = useNavigate()
    const { id } = useParams();
    useEffect(() => {
      getAllProductsShop(id)
      setLoading(true);
      axios.get(`${server}/shop/get-shop-info/${id}`).then((res) => {
       setData(res.data.shop);
       setLoading(false);
      }).catch((error) => {
        console.log(error);
        setLoading(false);
      })
    }, [])
    
  
    const logoutHandler = async () => {
      axios.get(`${server}/shop/logout`,{
        withCredentials: true,
      });
      logOutSeller()
      navigate('/shop-login  ')
    };
  
    const totalReviewsLength =
    shopProducts &&
    shopProducts.reduce((acc, product) => acc + product?.reviews?.length, 0);
  
    const totalRatings = shopProducts && shopProducts.reduce((acc,product) => acc + product?.reviews?.reduce((sum,review) => sum + review?.rating, 0),0);
  
    const averageRating = totalRatings / totalReviewsLength || 0;
  
    return (
     <>
     {
      loading  ? (
        <Loader />
      ) : (
        <div>
        <div className="w-full py-5">
          <div className="w-full flex item-center justify-center">
            <img
              src={`${data.avatar?.url}`}
              alt=""
              className="w-[100px] h-[100px] object-cover rounded-full"
            />
          </div>
          <h3 className="text-center py-2 text-[20px]">{data?.name}</h3>
          <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
            {data.description}
          </p>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Address</h5>
          <h4 className="text-[#000000a6]">{data?.address}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Phone Number</h5>
          <h4 className="text-[#000000a6]">{data?.phoneNumber}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Total Products</h5>
          <h4 className="text-[#000000a6]">{shopProducts && shopProducts.length}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Shop Ratings</h5>
          <h4 className="text-[#000000b0]">{averageRating}/5</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Joined On</h5>
          <h4 className="text-[#000000b0]">{data?.createdAt?.slice(0, 10)}</h4>
        </div>
        {isOwner && (
          <div className="py-3 px-4">
             <Link to="/settings">
             <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
              <span className="text-white">Edit Shop</span>
            </div>
             </Link>
            <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
            onClick={logoutHandler}
            >
              <span className="text-white">Log Out</span>
            </div>
          </div>
        )}
      </div>
      )
     }
     </>
    );
  };
  
  export default ShopInfo;
  