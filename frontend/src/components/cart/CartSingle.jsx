/* eslint-disable react/prop-types */
import { HiOutlineMinus, HiPlus } from "react-icons/hi";

import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/style";
import { useState } from "react";
import { toast } from "react-toastify";
import { priceFormat } from "../../actions/actions";
const CartSingle = ( { data, quantityChangeHandler, removeFromCartHandler } ) => {
   
    const [value, setValue] = useState(data.qty);
    const totalPrice = +data.discountPrice * +value;
  
    const increment = (data) => {
      if (data.stock < value) {
        toast.error("Product stock limited!");
        return
      } else {
        setValue(value + 1);
        const updateCartData = { ...data, qty: value + 1 };
       
        quantityChangeHandler(updateCartData);
        return
      }
    };
  
    const decrement = (data) => {
      setValue(value === 1 ? 1 : value - 1);
      const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
      quantityChangeHandler(updateCartData);
    };
  
    return (
      <div className="border-b p-4 md:px-7 flex justify-between items-center">
        <div className="w-full flex items-center">
          <div>
            <div
              className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
              onClick={() => increment(data)}
            >
              <HiPlus size={18} color="#fff" />
            </div>
            <span className="pl-[10px]">{data.qty}</span>
            <div
              className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
              onClick={() => decrement(data)}
            >
              <HiOutlineMinus size={16} color="#7d879c" />
            </div>
          </div>
          <img
            src={`${data?.images[0]?.url}`}
            alt=""
            className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
          />
          <div className="pl-[5px]">
            <h1 className="text-sm md:text-base">{data.name}</h1>
            <h4 className="font-[400] text-[15px] text-[#00000082]">
              {/* ${data.discountPrice} * {value} */}
              { priceFormat.format( data.discountPrice ) } * {value}
            </h4>
            <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
              
              {priceFormat.format(totalPrice)}
            </h4>
          </div>
          
        </div>
        <RxCross1
            className="cursor-pointer"
            onClick={() => removeFromCartHandler(data._id)}
            title="Remove from cart"
          />
      </div>
    );
  };
  

export default CartSingle;