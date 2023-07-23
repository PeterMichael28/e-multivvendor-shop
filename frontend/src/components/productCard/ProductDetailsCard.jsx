/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import styles from "../../styles/style";
import { useCartStore } from "../../store/useCartStore";
import { shallow } from "zustand/shallow";
import { useWishlistStore } from "../../store/useWishlistStore";

import { priceFormat } from "../../actions/actions";


const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart,  addToCart, removeFromCart } = useCartStore(
    (state) => ({cart: state.cart, addToCart:state.addToCart, removeFromCart:state.removeFromCart }),
    shallow
  )

  const { wishlists,  addToWishlist, removeFromWishlist } = useWishlistStore(
    (state) => ({wishlists: state.wishlists, addToWishlist:state.addToWishlist, removeFromWishlist:state.removeFromWishlist }),
    shallow
  )
   

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  //   const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = async (id) => {
    const isItemExists = cart && cart.find((i) => i?._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else if (data.stock < count) {
        toast.error("Product stock limited!, Please select a smaller unit");
      } else {
        const cartData = { ...data, qty: count };
        await addToCart(cartData);
        toast.success("Item added to cart successfully!");
      }
    
  };

  useEffect(() => {
    if (wishlists && wishlists.length > 0 && wishlists.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlists]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    removeFromWishlist(data?._id);
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    addToWishlist(data);
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-10 md:top-0 left-0 bg-[#00000072] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[70%] h-[90vh] overflow-y-scroll 800px:h-[85vh] bg-white rounded-md shadow-sm relative pb-8 pt-12 px-9">
            <RxCross1
              size={30}
              className="absolute right-3 top-5 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${data.images && data.images[0]?.url}`}
                  alt=""
                />
                <div className="flex">
                  <Link to={`/shop/preview/${data?.shop._id}`} className="flex items-center">
                    <img
                      src={`${data.shop && data.shop?.avatar?.url}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {data?.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">(4.5) Ratings</h5>
                    </div>
                  </Link>
                </div>
                <div
                  className={`${styles.button} bg-blue-600 hover:bg-blue-700 transition-all duration-300  mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5">{data.sold_out} Sold out</h5>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data?.name}
                </h1>
                <p className="text-[.9rem]">{data.description.slice(0, 500)}...</p>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                   { priceFormat.format(data.discountPrice)}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data?.originalPrice ? priceFormat.format(data.originalPrice): null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} bg-blue-600 hover:bg-blue-700 transition-all duration-300 mt-6 rounded-[4px] h-11 flex items-center`}
                  onClick={() => addToCartHandler(data?._id)}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;