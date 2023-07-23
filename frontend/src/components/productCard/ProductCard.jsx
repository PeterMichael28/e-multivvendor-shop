/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  AiFillHeart,
  
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,

} from "react-icons/ai";
import { Link } from "react-router-dom";



import { useEffect } from "react";
import { toast } from "react-toastify";

import ProductDetailsCard from "./ProductDetailsCard";
import styles from "../../styles/style";
import Ratings from "./Ratings";
import { useCartStore } from "../../store/useCartStore";
import { shallow } from "zustand/shallow";
import { useWishlistStore } from "../../store/useWishlistStore";
import { priceFormat } from "../../actions/actions";

const ProductCard = ({ data,isEvent }) => {
//   const { wishlist } = useSelector((state) => state.wishlist);
//   const { cart } = useSelector((state) => state.cart);


  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const { cart,  addToCart, resetCart } = useCartStore(
    (state) => ({cart: state.cart, addToCart:state.addToCart, resetCart:state.resetCart }),
    shallow
  )

  const { wishlists,  addToWishlist, removeFromWishlist } = useWishlistStore(
    (state) => ({wishlists: state.wishlists, addToWishlist:state.addToWishlist, removeFromWishlist:state.removeFromWishlist }),
    shallow
  )

   useEffect(() => {
    if (wishlists && wishlists.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlists]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    removeFromWishlist(data._id);
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    addToWishlist(data);
  };

  const addToCartHandler = async (id) => {
   
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        await addToCart(cartData);
        toast.success("Item added to cart successfully!");
      }
  };

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data?.shop?.name}</h5>
        </Link>
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` :  `/product/${data._id}`}`}>
          <h4 className="pb-3 font-[500] text-[.9rem]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex">
          <Ratings rating={data?.rating} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex mt-4">
              <h5 className={`${styles.productDiscountPrice} text-[1rem]`}>
                {data.originalPrice === 0
                  ? priceFormat.format(data.originalPrice)
                  : priceFormat.format(data.discountPrice)}
                
              </h5>
              <h4 className={`${styles.price} text-[.8rem]`}>
                {data.originalPrice ? priceFormat.format(data.discountPrice) : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.sold_out} sold
            </span>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={ () => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;