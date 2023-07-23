/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

import styles from "../../styles/style";
import ProductCard from "./ProductCard";
import { useProductStore } from "../../store/useProductStore";


const SuggestedProduct = ({ data }) => {
  const allProducts = useProductStore(state => state.allProducts)
  const [productDatas,setProductDatas] = useState();

  useEffect(() => {
    const d =
    allProducts && allProducts.filter((i) => i.category === data.category);
    setProductDatas(d);
  }, []);

  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
             {
                productDatas && productDatas.map((i,index) => (
                    <ProductCard data={i} key={index} />
                ))
             }
      </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;