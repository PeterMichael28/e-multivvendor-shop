import styles from "../../styles/style";
import { priceFormat } from "../../actions/actions";
/* eslint-disable react/prop-types */
const CartData = ({
    handleSubmit,
    totalPrice,
    shipping,
    subTotalPrice,
    couponCode,
    setCouponCode,
    discountPercentenge,
  }) => {
    return (
      <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
          <h5 className="text-[18px] font-[600]">{priceFormat.format(subTotalPrice)}</h5>
        </div>
        <br />
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
          <h5 className="text-[18px] font-[600]">{priceFormat.format(shipping)}</h5>
        </div>
        <br />
        <div className="flex justify-between border-b pb-3">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
          <h5 className="text-[18px] font-[600] text-red-600">
            - {discountPercentenge ? priceFormat.format(discountPercentenge) : null}
          </h5>
        </div>
        <h5 className="text-[18px] font-[600] text-end pt-3"> {priceFormat.format(totalPrice)}</h5>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={`${styles.input} h-[40px] pl-2`}
            placeholder="Coupoun code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            required
          />
              <button
                className={`w-[200px] h-[40px] border-none outline-none bg-[#3a24db] text-center text-white text-lg font-semibold rounded-[8px] mt-8 cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed`}
                
                type="submit"
      
              >Apply code</button>
        </form>
      </div>
    );
  };
  
export default CartData;