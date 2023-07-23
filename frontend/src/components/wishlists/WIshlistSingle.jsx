/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { priceFormat } from "../../actions/actions";


const WishlistSingle = ({ data,removeFromWishlistHandler,addToCartHandler }) => {
    const [value, setValue] = useState(1);
    const totalPrice = data.discountPrice * value;
  
    return (
      <div className="border-b p-4">
        <div className="w-full flex items-center justify-between">
          <RxCross1 className="cursor-pointer 800px:mb-['unset'] size={20} 800px:ml-['unset'] mb-2 ml-2"
          onClick={() => removeFromWishlistHandler(data)}
          />
          <img
            src={`${data?.images[0]?.url}`}
            alt=""
            className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
          />
  
          <div className="pl-[5px] flex-1">
            <h1>{data.name}</h1>
            <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
            {priceFormat.format(totalPrice)}
            </h4>
          </div>
          <div>
            <BsCartPlus size={20} className="cursor-pointer" tile="Add to cart"
             onClick={() => addToCartHandler(data)}
             title="Add to cart"
            />
          </div>
        </div>
      </div>
    );
  };
  

export default WishlistSingle;