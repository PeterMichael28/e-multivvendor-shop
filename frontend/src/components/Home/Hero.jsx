import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/style";
import hero from '../../assets/hero4.png'

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full hero bg-no-repeat ${styles.normalFlex}`}
     
    >
      <div className={`${styles.section} w-[90%] 800px:w-[70%]`}>
        <h1
          className={`text-[35px] leading-[.9] 800px:text-[50px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Unleash Your Shopping Potential
        </h1>
        <p className="pt-5 text-[13px] md:text-[14px] font-[Poppins] font-[400] text-[#000000d4]">
        Discover a world of endless possibilities at our multi-vendor marketplace, where innovation meets convenience. We are dedicated to bringing you the best products and services from a diverse community of trusted sellers, all in one convenient online destination.
        <br />
        <br />
        Unleash your shopping desires and explore a vast array of categories, ranging from fashion and beauty to electronics, home decor, and much more. With our user-friendly interface, finding the perfect item is just a few clicks away. Whether you're searching for the latest fashion trends, unique handmade crafts, or cutting-edge technology, our marketplace has it all.
        </p>
        <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    Shop Now
                 </span>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;