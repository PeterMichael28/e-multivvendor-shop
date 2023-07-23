import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { useCartStore } from "../../store/useCartStore";
import { userStore } from "../../store/userStore";
import CartData from "./CartData";
import ShippingInfo from "./ShippingInfo";
import { useLatestOrder } from "../../store/useLatestOrder";
import styles from "../../styles/style";
import { server } from "../../../server";

const Checkout = () => {
  
 

  const cart = useCartStore(state => state.cart)
  const user = userStore(state => state.user)
  const setLatestOrders = useLatestOrder(state => state.setLatestOrder)
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [zipCode, setZipCode] = useState('');
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState({});
  const [discountPrice, setDiscountPrice] = useState('');
  const navigate = useNavigate();

  useEffect(() => { 
    window.scrollTo(0, 0);
  }, []);


  // handle payment submission
  const paymentSubmit = () => {
   if(address1 === "" || zipCode === null || country === "" || city === "" || state === ''){
      toast.error("Please choose your delivery address!")
   } else{
    const shippingAddress = {
      address1,
      zipCode,
      country,
      city,
      state
    };

    const orderData = {
      cart,
      totalPrice,
      subTotalPrice,
      shipping,
      discountPrice,
      shippingAddress,
      user,
    }

    // update local storage with the updated orders array

    setLatestOrders(orderData)
    navigate("/payment");
   }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  // this is shipping cost variable
  const shipping = subTotalPrice * 0.1;

  //coupon code verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;
      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error("Coupon code is not valid for this shop");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Coupon code doesn't exists!");
        setCouponCode("");
      }
    });
  };

  const discountPercentenge = couponCodeData ? discountPrice : "";
  // const discountPercentenge = couponCodeData ? (subTotalPrice * couponCodeData.value)/100 : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);



  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            zipCode={zipCode}
            setZipCode={setZipCode}
            state={state}
            setState={setState}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};



export default Checkout;
