import React, { useEffect, useState } from "react";
import styles from "../../styles/style";
import ProductCard from "../productCard/ProductCard";
import { useProductStore } from "../../store/useProductStore";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const allProducts = useProductStore(state => state.allProducts)
    useEffect( () => {
      const allProductsData = allProducts ? [...allProducts] : [];
      const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
      const firstFive = sortedData && sortedData.slice(0, 5);
      setData(firstFive);
  }, [allProducts])
//   const { allProducts } = useSelector((state) => state.products);
//   useEffect(() => {
    // const allProductsData = allProducts ? [...allProducts] : [];
    // const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
    // const firstFive = sortedData && sortedData.slice(0, 5);
    // setData(firstFive);
//   }, [allProducts]);
  

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-[15px] md:grid-cols-2 md:gap-[20px] lg:grid-cols-4 xl:grid-cols-5 mb-12 border-0">
           {
            data && data.length !== 0 &&(
              <>
               {data && data.map((product, index) => <ProductCard data={product} key={index} />)}
              </>
            )
           }
        </div>
      </div>
    </div>
  );
};

export default BestDeals;