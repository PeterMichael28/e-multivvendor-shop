/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "../../styles/style";
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
   
  } from "@stripe/react-stripe-js";
  import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { RxCross1 } from "react-icons/rx";

const PaymentInfo = ({
    user,
    open,
    setOpen,
    onApprove,
    createOrder,
    paymentHandler,
    cashOnDeliveryHandler,
  setSelect,
    select
  }) => {
    
  
    return (
      <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
        {/* select buttons */}
        <div>
          <div className="flex w-full pb-5 border-b mb-2">
            <div
              className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
              onClick={() => setSelect(1)}
            >
              {select === 1 ? (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
              ) : null}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
              Pay with Debit/credit card
            </h4>
          </div>
  
       
          {select === 1 ? (
            <div className="w-full flex border-b">
              <form className="w-full" onSubmit={paymentHandler}>
                <div className="w-full flex pb-3">
                  <div className="w-[50%]">
                    <label className="block pb-2">Name On Card</label>
                    <input
                      required
                      placeholder={user && user.name}
                      className={`${styles.input} !w-[95%] text-[#444]`}
                      value={user && user.name}
                    />
                  </div>
                  <div className="w-[50%]">
                    <label className="block pb-2">Exp Date</label>
                    <CardExpiryElement
                      className={`${styles.input} !h-[35px] !w-[95%]`}
                      options={{
                        style: {
                          base: {
                            fontSize: "19px",
                            lineHeight: 1.5,
                            color: "#444",
                          },
                          empty: {
                            color: "#3a120a",
                            backgroundColor: "transparent",
                            "::placeholder": {
                              color: "#444",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
  
                <div className="w-full flex pb-3">
                  <div className="w-[50%]">
                    <label className="block pb-2">Card Number</label>
                    <CardNumberElement
                      className={`${styles.input} !h-[35px] !w-[95%]`}
                      options={{
                        style: {
                          base: {
                            fontSize: "19px",
                            lineHeight: 1.5,
                            color: "#444",
                          },
                          empty: {
                            color: "#3a120a",
                            backgroundColor: "transparent",
                            "::placeholder": {
                              color: "#444",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="w-[50%]">
                    <label className="block pb-2">CVC</label>
                    <CardCvcElement
                      className={`${styles.input} !h-[35px]`}
                      options={{
                        style: {
                          base: {
                            fontSize: "19px",
                            lineHeight: 1.5,
                            color: "#444",
                          },
                          empty: {
                            color: "#3a120a",
                            backgroundColor: "transparent",
                            "::placeholder": {
                              color: "#444",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                >Submit</button>
              </form>
            </div>
          ) : null}
        </div>
  
        <br />
        {/* paypal payment */}
        <div>
          <div className="flex w-full pb-5 border-b mb-2">
            <div
              className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
              onClick={() => setSelect(2)}
            >
              {select === 2 ? (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
              ) : null}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
              Pay with Paypal
            </h4>
          </div>
  
          {/* pay with paypal */}
          {select === 2 ? (
            <div className="w-full flex border-b">
              <div
                className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                onClick={() => setOpen(true)}
              >
                Pay Now
              </div>
              {open && (
                <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                  <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                    <div className="w-full flex justify-end p-3">
                      <RxCross1
                        size={30}
                        className="cursor-pointer absolute top-3 right-3"
                        onClick={() => setOpen(false)}
                      />
                    </div>
                      <PayPalScriptProvider
                        options={{
                          "client-id":
                            "AcBxF2u6d9SjvVEjeYI7op7nufI8bdfQ7HNNKfU1IpLrkRtzj2uSZxSKxlb61PJsSmeSuFBf3ZfEc39m",
                        }}
                      >
                        <PayPalButtons
                          style={{ layout: "vertical" }}
                          onApprove={onApprove}
                          createOrder={createOrder}
                        />
                      </PayPalScriptProvider>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
  
        <br />
        {/* cash on delivery */}
        <div>
          <div className="flex w-full pb-5 border-b mb-2">
            <div
              className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
              onClick={() => setSelect(3)}
            >
              {select === 3 ? (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
              ) : null}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
              Cash on Delivery
            </h4>
          </div>
  
          {/* cash on delivery */}
          {select === 3 ? (
            <div className="w-full flex">
              <form className="w-full" onSubmit={cashOnDeliveryHandler}>
                <button
                  type="submit"
                  
                  className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                >Confirm</button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    );
  };
  
export default PaymentInfo;