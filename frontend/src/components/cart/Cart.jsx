/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";


import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import CartSingle from "./CartSingle";
import { useCartStore } from "../../store/useCartStore";
import { shallow } from "zustand/shallow";
import styles from "../../styles/style";
import { priceFormat } from "../../actions/actions";

const Cart = ({ setOpenCart, openCart }) => {
    const { cart,  addToCart, removeFromCart } = useCartStore(
        (state) => ({cart: state.cart, addToCart:state.addToCart, removeFromCart:state.removeFromCart }),
        shallow
      )

  const removeFromCartHandler = async (data) => {
    await removeFromCart(data);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = async (data) => {
    await addToCart(data);
  };

  return (
    <div className={`fixed top-0 w-full bg-[#00000086] h-screen z-10 ${ openCart ? 'left-0' : '-left-full' } overflow-hidden`}>
      <div className={`fixed top-0 h-full w-[80%] md:w-[65%] lg:w-[40%] bg-white flex flex-col transition-all duration-500 delay-150 overflow-y-scroll shadow-sm ${ openCart ? 'right-0' : '-right-full' }`}>
      <h2 className="text-[2rem] font-semibold text-red-600 font-Roboto mx-4 mt-9">Cart</h2>
        {cart && cart.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center  ">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
               <RxCross1 
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
                />
            </div>
            <h5>Cart Items is empty!</h5>
          </div>
        ) : (
          <>
          <div className='mb-16'>
              <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3 ">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenCart(false)}
                  title="close cart"
                />
              </div>
              {/* Item length */}
              <div className={`${styles.normalFlex} p-4 mt-6`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">{cart && cart.length} item(s)</h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {cart &&
                  cart.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      quantityChangeHandler={quantityChangeHandler}
                      removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
            </div>

            <div className="px-5 mb-3 mt-auto">
              {/* checkout buttons */}
              <Link to="/checkout" onClick={() => setOpenCart(false)}>
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now ({priceFormat.format(totalPrice)})
                  </h1>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};


export default Cart;