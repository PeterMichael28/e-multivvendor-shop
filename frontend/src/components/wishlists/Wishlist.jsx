import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";

import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useWishlistStore } from "../../store/useWishlistStore";
import { shallow } from "zustand/shallow";
import styles from "../../styles/style";
import WishlistSingle from "./WIshlistSingle";
import { useCartStore } from "../../store/useCartStore";
import { toast } from "react-toastify";


const Wishlist = ({ setOpenWishlist }) => {
    const { wishlists,  addToWishlist, removeFromWishlist } = useWishlistStore(
        (state) => ({wishlists: state.wishlists, addToWishlist:state.addToWishlist, removeFromWishlist:state.removeFromWishlist }),
        shallow
      )
      
      const { cart,  addToCart } = useCartStore(
        (state) => ({cart: state.cart, addToCart:state.addToCart }),
        shallow
      )

  const removeFromWishlistHandler = (data) => {
    removeFromWishlist(data._id);
  };

  const addToCartHandler = async (data) => {
  
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        await addToCart(cartData);
        toast.success("Item added to cart successfully!");
      }

  }

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full  w-[80%] md:w-[65%] lg:w-[40%] overflow-y-scroll bg-white flex flex-col shadow-sm">
        <h2 className="text-[2rem] font-semibold text-red-600 font-Roboto mx-4 mt-9">Wishlist(s)</h2>
        {wishlists && wishlists.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Wishlist Items is empty!</h5>
          </div>
        ) : (
          <>
            <div className="">
              <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.normalFlex} p-4 mt-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlists && wishlists.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {wishlists &&
                  wishlists.map((i, index) => (
                    <WishlistSingle key={index} data={i} removeFromWishlistHandler={removeFromWishlistHandler} addToCartHandler={addToCartHandler} />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};


export default Wishlist;