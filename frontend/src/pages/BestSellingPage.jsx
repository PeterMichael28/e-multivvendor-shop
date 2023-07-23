import React, { useEffect, useState } from "react";

import Loader from "../components/layout/Loader";
import styles from "../styles/style";
import ProductCard from "../components/productCard/ProductCard";
import { userStore } from "../store/userStore";
import { useProductStore } from "../store/useProductStore";


const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const loading = userStore((state) => state.loading)
  const allProducts = useProductStore(state => state.allProducts)
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a,b) => b.total_sell - a.total_sell); 
    setData(sortedData);
  }, [allProducts]);

  return (
   <>
   {
   loading ? (
      <Loader />
    ) : (
      <div>

      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
 
    </div>
    )
   }
   </>
  );
};

export default BestSellingPage;